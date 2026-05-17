-- ============================================================================
-- 0003_engagement.sql — Reviews & notifications log
-- ============================================================================

create type notif_channel as enum ('push', 'whatsapp', 'sms');
create type notif_type as enum ('booking_confirm', 'reminder', 'offer', 'checkin_ready');
create type notif_status as enum ('sent', 'failed');

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  booking_id uuid not null references public.bookings (id) on delete cascade,
  rating int not null check (rating between 1 and 5),
  comment text,
  is_published boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (user_id, booking_id)
);

create index reviews_published_idx on public.reviews (is_published);

create trigger reviews_touch
before update on public.reviews
for each row execute procedure public.touch_updated_at();

create table public.notifications_log (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  channel notif_channel not null,
  type notif_type not null,
  payload jsonb not null default '{}'::jsonb,
  sent_at timestamptz not null default now(),
  status notif_status not null default 'sent'
);

create index notifications_user_idx on public.notifications_log (user_id);
create index notifications_sent_idx on public.notifications_log (sent_at desc);

create table public.fcm_tokens (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.users (id) on delete cascade,
  token text not null,
  device_label text,
  created_at timestamptz not null default now(),
  unique (user_id, token)
);
