-- ============================================================================
-- 0003_engagement.sql — Oxygen Island DZ · engagement
-- Guest reviews, an outbound notifications ledger, and FCM device tokens.
-- ============================================================================

-- ---- reviews ---------------------------------------------------------------
-- A guest can review the product tied to a completed booking. Reviews are
-- moderated: is_published gates public visibility (see 0004_rls.sql).
create table if not exists public.reviews (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid references public.users(id) on delete cascade,
  booking_id   uuid references public.bookings(id) on delete set null,
  product      booking_product,
  rating       integer not null check (rating between 1 and 5),
  title        text,
  body         text,
  is_published boolean not null default false,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

drop trigger if exists trg_reviews_updated_at on public.reviews;
create trigger trg_reviews_updated_at
  before update on public.reviews
  for each row execute function public.set_updated_at();

create index if not exists reviews_published_idx on public.reviews (is_published);
create index if not exists reviews_user_id_idx    on public.reviews (user_id);

-- ---- notifications_log -----------------------------------------------------
-- Append-only ledger of every push / WhatsApp / SMS / email we send, for
-- auditing delivery and debugging. Written by admin/service-role code only.
do $$ begin
  create type notification_channel as enum ('push', 'whatsapp', 'sms', 'email');
exception when duplicate_object then null; end $$;

do $$ begin
  create type notification_status as enum ('queued', 'sent', 'failed');
exception when duplicate_object then null; end $$;

create table if not exists public.notifications_log (
  id          uuid primary key default gen_random_uuid(),
  user_id     uuid references public.users(id) on delete set null,
  booking_id  uuid references public.bookings(id) on delete set null,
  channel     notification_channel not null,
  template    text not null,
  payload     jsonb not null default '{}'::jsonb,
  status      notification_status not null default 'queued',
  error       text,
  sent_at     timestamptz,
  created_at  timestamptz not null default now()
);

create index if not exists notifications_log_user_id_idx on public.notifications_log (user_id);
create index if not exists notifications_log_created_idx  on public.notifications_log (created_at);

-- ---- fcm_tokens ------------------------------------------------------------
-- Firebase Cloud Messaging registration tokens, one row per device.
-- Upserted by /api/notifications/subscribe (ON CONFLICT (token)).
create table if not exists public.fcm_tokens (
  token        text primary key,
  user_id      uuid references public.users(id) on delete cascade,
  platform     text not null default 'web',
  lang         lang_code not null default 'fr',
  last_seen_at timestamptz not null default now(),
  created_at   timestamptz not null default now()
);

create index if not exists fcm_tokens_user_id_idx on public.fcm_tokens (user_id);
