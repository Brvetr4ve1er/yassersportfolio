-- ============================================================================
-- 0001_init.sql — Core domain tables: users, accommodations, activities
-- L'Étoile de l'Est PWA — schema per spec §3
-- ============================================================================

create extension if not exists "pgcrypto";

-- ---- USERS -----------------------------------------------------------------

create type user_lang as enum ('fr', 'ar');
create type loyalty_tier as enum ('bronze', 'silver', 'gold');
create type app_role as enum ('guest', 'admin');

create table public.users (
  id uuid primary key default gen_random_uuid(),
  phone text unique not null,
  email text,
  full_name text not null,
  preferred_lang user_lang not null default 'fr',
  loyalty_points int not null default 0,
  tier loyalty_tier generated always as (
    case
      when loyalty_points >= 5000 then 'gold'::loyalty_tier
      when loyalty_points >= 1000 then 'silver'::loyalty_tier
      else 'bronze'::loyalty_tier
    end
  ) stored,
  role app_role not null default 'guest',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index users_phone_idx on public.users (phone);

-- updated_at trigger helper used by all tables in subsequent migrations
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger users_touch
before update on public.users
for each row execute procedure public.touch_updated_at();

-- ---- ACCOMMODATIONS --------------------------------------------------------

create type accommodation_type as enum ('chalet', 'tent', 'glamping');

create table public.accommodations (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_fr text not null,
  name_ar text not null,
  type accommodation_type not null,
  capacity int not null,
  price_weekday numeric(10, 2) not null,
  price_weekend numeric(10, 2) not null,
  price_holiday numeric(10, 2) not null,
  amenities text[] not null default '{}',
  description_fr text,
  description_ar text,
  images text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index accommodations_active_idx on public.accommodations (is_active);

create trigger accommodations_touch
before update on public.accommodations
for each row execute procedure public.touch_updated_at();

-- ---- ACTIVITIES ------------------------------------------------------------

create table public.activities (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name_fr text not null,
  name_ar text not null,
  description_fr text,
  description_ar text,
  price_per_person numeric(10, 2) not null,
  min_participants int not null default 1,
  max_participants int not null default 10,
  duration_minutes int not null,
  available_days text[] not null default '{}',
  images text[] not null default '{}',
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger activities_touch
before update on public.activities
for each row execute procedure public.touch_updated_at();
