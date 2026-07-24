-- ============================================================================
-- 0001_init.sql — Oxygen Island DZ · foundation
-- Extensions, enums, the updated_at helper, and the catalog tables
-- (users, passes, cabanas, events). Field names mirror lib/data/mock.ts and
-- types/domain.ts exactly so the app can move from mock mode to live rows
-- with no shape change.
-- ============================================================================

-- ---- Extensions ------------------------------------------------------------
-- pgcrypto gives us gen_random_uuid() for primary keys and QR tokens.
create extension if not exists pgcrypto;

-- ---- Shared enums ----------------------------------------------------------
do $$ begin
  create type lang_code as enum ('fr', 'en', 'ar');
exception when duplicate_object then null; end $$;

do $$ begin
  create type user_role as enum ('guest', 'admin');
exception when duplicate_object then null; end $$;

do $$ begin
  create type pass_audience as enum ('adult', 'child', 'evening');
exception when duplicate_object then null; end $$;

do $$ begin
  create type cabana_zone as enum ('lagoon', 'palm', 'sunset');
exception when duplicate_object then null; end $$;

do $$ begin
  create type event_kind as enum ('kids', 'dj', 'private');
exception when duplicate_object then null; end $$;

-- ---- updated_at helper -----------------------------------------------------
-- Attached as a BEFORE UPDATE trigger on every table that carries updated_at.
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---- users -----------------------------------------------------------------
-- id matches auth.users.id (see 0004_rls.sql handle_new_auth_user trigger).
-- Phone is the primary identity in Algeria (OTP sign-in); email is optional.
create table if not exists public.users (
  id             uuid primary key default gen_random_uuid(),
  phone          text unique,
  email          text,
  full_name      text not null default '',
  preferred_lang lang_code not null default 'fr',
  role           user_role not null default 'guest',
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

drop trigger if exists trg_users_updated_at on public.users;
create trigger trg_users_updated_at
  before update on public.users
  for each row execute function public.set_updated_at();

-- ---- passes ----------------------------------------------------------------
-- Text id (e.g. 'pass-adult') mirrors mock.ts so seeds and links stay stable.
create table if not exists public.passes (
  id             text primary key,
  slug           text unique not null,
  name_fr        text not null,
  name_en        text not null,
  name_ar        text not null,
  audience       pass_audience not null,
  price          integer not null,            -- DZD
  description_fr text not null default '',
  description_en text not null default '',
  description_ar text not null default '',
  includes       text[] not null default '{}',
  image          text not null default '',
  is_active      boolean not null default true,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

drop trigger if exists trg_passes_updated_at on public.passes;
create trigger trg_passes_updated_at
  before update on public.passes
  for each row execute function public.set_updated_at();

-- ---- cabanas ---------------------------------------------------------------
create table if not exists public.cabanas (
  id             text primary key,
  slug           text unique not null,
  name_fr        text not null,
  name_en        text not null,
  name_ar        text not null,
  capacity       integer not null,
  price          integer not null,            -- DZD per day
  zone           cabana_zone not null,
  amenities      text[] not null default '{}',
  description_fr text not null default '',
  description_en text not null default '',
  description_ar text not null default '',
  image          text not null default '',
  is_active      boolean not null default true,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

drop trigger if exists trg_cabanas_updated_at on public.cabanas;
create trigger trg_cabanas_updated_at
  before update on public.cabanas
  for each row execute function public.set_updated_at();

-- ---- events ----------------------------------------------------------------
-- price is nullable: NULL = quote-only (privatization).
-- day / time stay text to allow 'on-request' and '—' as in mock.ts.
create table if not exists public.events (
  id             text primary key,
  slug           text unique not null,
  name_fr        text not null,
  name_en        text not null,
  name_ar        text not null,
  kind           event_kind not null,
  day            text not null default '',
  "time"         text not null default '',
  price          integer,                     -- DZD, NULL = quote-only
  description_fr text not null default '',
  description_en text not null default '',
  description_ar text not null default '',
  image          text not null default '',
  is_active      boolean not null default true,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

drop trigger if exists trg_events_updated_at on public.events;
create trigger trg_events_updated_at
  before update on public.events
  for each row execute function public.set_updated_at();
