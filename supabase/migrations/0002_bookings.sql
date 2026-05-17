-- ============================================================================
-- 0002_bookings.sql — Bookings, packages, loyalty transactions
-- ============================================================================

create type booking_type as enum ('accommodation', 'activity', 'package');
create type booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
create type payment_method as enum ('baridi', 'cib', 'cash');
create type payment_status as enum ('pending', 'paid', 'refunded');
create type loyalty_tx_type as enum ('earn', 'redeem');

-- ---- PACKAGES --------------------------------------------------------------

create table public.packages (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_fr text not null,
  name_ar text not null,
  description_fr text,
  description_ar text,
  price numeric(10, 2) not null,
  includes_accommodation_id uuid references public.accommodations (id) on delete set null,
  includes_activity_ids uuid[] not null default '{}',
  valid_from date not null,
  valid_until date not null,
  max_bookings int not null,
  current_bookings int not null default 0,
  images text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger packages_touch
before update on public.packages
for each row execute procedure public.touch_updated_at();

-- ---- BOOKINGS --------------------------------------------------------------

create table public.bookings (
  id uuid primary key default gen_random_uuid(),
  reference text unique not null,
  user_id uuid not null references public.users (id) on delete restrict,
  booking_type booking_type not null,
  accommodation_id uuid references public.accommodations (id) on delete restrict,
  activity_id uuid references public.activities (id) on delete restrict,
  package_id uuid references public.packages (id) on delete restrict,
  check_in date not null,
  check_out date,
  guests_count int not null check (guests_count > 0),
  total_price numeric(10, 2) not null,
  status booking_status not null default 'pending',
  payment_method payment_method not null,
  payment_status payment_status not null default 'pending',
  payment_reference text,
  qr_code_token uuid not null unique default gen_random_uuid(),
  special_requests text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  constraint bookings_one_subject check (
    (booking_type = 'accommodation' and accommodation_id is not null and activity_id is null and package_id is null) or
    (booking_type = 'activity' and activity_id is not null and accommodation_id is null and package_id is null) or
    (booking_type = 'package' and package_id is not null)
  ),
  constraint bookings_checkout_after_checkin check (check_out is null or check_out > check_in)
);

create index bookings_user_idx on public.bookings (user_id);
create index bookings_dates_idx on public.bookings (check_in, check_out);
create index bookings_qr_idx on public.bookings (qr_code_token);
create index bookings_status_idx on public.bookings (status);

create trigger bookings_touch
before update on public.bookings
for each row execute procedure public.touch_updated_at();

-- ---- LOYALTY TRANSACTIONS --------------------------------------------------

create table public.loyalty_transactions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  booking_id uuid references public.bookings (id) on delete set null,
  points_earned int not null default 0,
  points_redeemed int not null default 0,
  transaction_type loyalty_tx_type not null,
  created_at timestamptz not null default now()
);

create index loyalty_tx_user_idx on public.loyalty_transactions (user_id);

-- Helper to recompute user.loyalty_points after a transaction.
create or replace function public.recompute_user_loyalty(p_user uuid)
returns void
language sql
as $$
  update public.users
  set loyalty_points = coalesce((
    select sum(points_earned) - sum(points_redeemed)
    from public.loyalty_transactions
    where user_id = p_user
  ), 0)
  where id = p_user;
$$;
