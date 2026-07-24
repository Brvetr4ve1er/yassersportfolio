-- ============================================================================
-- 0002_bookings.sql — Oxygen Island DZ · bookings
-- The central transactional table. One row per reservation of a pass, a
-- cabana, or an event. Mirrors types/domain.ts Booking.
-- ============================================================================

-- ---- Booking / payment enums ----------------------------------------------
do $$ begin
  create type booking_product as enum ('pass', 'cabana', 'event');
exception when duplicate_object then null; end $$;

do $$ begin
  create type booking_status as enum ('pending', 'confirmed', 'cancelled', 'completed');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_method as enum ('baridi', 'cib', 'cash');
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_status as enum ('pending', 'paid', 'refunded');
exception when duplicate_object then null; end $$;

-- ---- bookings --------------------------------------------------------------
create table if not exists public.bookings (
  id              uuid primary key default gen_random_uuid(),
  reference       text unique not null,           -- OXI-XXXX-XX (lib/utils.ts)
  user_id         uuid references public.users(id) on delete set null,
  product         booking_product not null,
  pass_id         text references public.passes(id)  on delete restrict,
  cabana_id       text references public.cabanas(id) on delete restrict,
  event_id        text references public.events(id)  on delete restrict,
  visit_date      date not null,
  adults          integer not null default 0 check (adults >= 0),
  children        integer not null default 0 check (children >= 0),
  total_price     integer not null default 0 check (total_price >= 0),  -- DZD
  status          booking_status not null default 'pending',
  payment_method  payment_method not null,
  payment_status  payment_status not null default 'pending',
  qr_code_token   uuid unique not null default gen_random_uuid(),
  -- Walk-in guest contact captured at checkout. A booker need not be a
  -- registered user (beach-club day passes are mostly anonymous), so the
  -- name + phone are stored on the booking itself rather than via user_id.
  guest_name      text,
  guest_phone     text,
  special_requests text,
  created_at      timestamptz not null default now(),
  updated_at      timestamptz not null default now(),

  -- Exactly the product's own foreign key may be set; the other two must be
  -- NULL. Guarantees product and *_id can never disagree.
  constraint bookings_product_fk_ck check (
    (product = 'pass'   and pass_id   is not null and cabana_id is null and event_id is null) or
    (product = 'cabana' and cabana_id is not null and pass_id   is null and event_id is null) or
    (product = 'event'  and event_id  is not null and pass_id   is null and cabana_id is null)
  )
);

drop trigger if exists trg_bookings_updated_at on public.bookings;
create trigger trg_bookings_updated_at
  before update on public.bookings
  for each row execute function public.set_updated_at();

-- ---- Indexes ---------------------------------------------------------------
create index if not exists bookings_visit_date_idx    on public.bookings (visit_date);
create index if not exists bookings_user_id_idx       on public.bookings (user_id);
create index if not exists bookings_qr_code_token_idx on public.bookings (qr_code_token);
create index if not exists bookings_status_idx        on public.bookings (status);
