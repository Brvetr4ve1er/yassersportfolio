-- ============================================================================
-- 0004_rls.sql — Row Level Security policies (spec §3 "RLS RULES")
-- Assumes Supabase Auth: auth.uid() corresponds to a row in public.users
-- created on first sign-in (trigger below maps auth.users.id → users.id).
-- ============================================================================

-- Helper to mirror auth.users → public.users on signup. The phone is set by
-- Supabase phone-auth; full_name and preferred_lang are filled by the profile
-- update flow after first sign-in.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.users (id, phone, full_name, preferred_lang)
  values (
    new.id,
    coalesce(new.phone, new.email, new.id::text),
    coalesce(new.raw_user_meta_data->>'full_name', 'Nouveau client'),
    coalesce((new.raw_user_meta_data->>'preferred_lang')::user_lang, 'fr')
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_auth_user();

-- Helper: is current authenticated user an admin?
create or replace function public.is_admin()
returns boolean
language sql
stable
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

-- ---- ENABLE RLS ON ALL DOMAIN TABLES ---------------------------------------

alter table public.users enable row level security;
alter table public.accommodations enable row level security;
alter table public.activities enable row level security;
alter table public.packages enable row level security;
alter table public.bookings enable row level security;
alter table public.loyalty_transactions enable row level security;
alter table public.reviews enable row level security;
alter table public.notifications_log enable row level security;
alter table public.fcm_tokens enable row level security;

-- ---- USERS -----------------------------------------------------------------
-- "users can only read/write their own row" + admin override

create policy users_self_read on public.users
  for select using (id = auth.uid() or public.is_admin());

create policy users_self_update on public.users
  for update using (id = auth.uid()) with check (id = auth.uid());

create policy users_admin_all on public.users
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- ACCOMMODATIONS / ACTIVITIES / PACKAGES --------------------------------
-- Public read for active rows; admin-only write.

create policy accommodations_public_read on public.accommodations
  for select using (is_active = true or public.is_admin());

create policy accommodations_admin_write on public.accommodations
  for all using (public.is_admin()) with check (public.is_admin());

create policy activities_public_read on public.activities
  for select using (is_active = true or public.is_admin());

create policy activities_admin_write on public.activities
  for all using (public.is_admin()) with check (public.is_admin());

create policy packages_public_read on public.packages
  for select using (is_active = true or public.is_admin());

create policy packages_admin_write on public.packages
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- BOOKINGS --------------------------------------------------------------
-- Users see only their own bookings; admins see all.

create policy bookings_self_read on public.bookings
  for select using (user_id = auth.uid() or public.is_admin());

create policy bookings_self_insert on public.bookings
  for insert with check (user_id = auth.uid());

create policy bookings_self_cancel on public.bookings
  for update using (user_id = auth.uid())
  with check (user_id = auth.uid() and status in ('pending', 'cancelled'));

create policy bookings_admin_all on public.bookings
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- LOYALTY TRANSACTIONS --------------------------------------------------

create policy loyalty_self_read on public.loyalty_transactions
  for select using (user_id = auth.uid() or public.is_admin());

create policy loyalty_admin_write on public.loyalty_transactions
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- REVIEWS ---------------------------------------------------------------
-- Authenticated users read published reviews; users write their own; admins
-- moderate (set is_published = true).

create policy reviews_published_read on public.reviews
  for select using (is_published = true or user_id = auth.uid() or public.is_admin());

create policy reviews_self_write on public.reviews
  for insert with check (user_id = auth.uid());

create policy reviews_self_update on public.reviews
  for update using (user_id = auth.uid())
  with check (user_id = auth.uid() and is_published = false);

create policy reviews_admin_all on public.reviews
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- NOTIFICATIONS & TOKENS ------------------------------------------------

create policy notifications_self_read on public.notifications_log
  for select using (user_id = auth.uid() or public.is_admin());

create policy notifications_admin_write on public.notifications_log
  for all using (public.is_admin()) with check (public.is_admin());

create policy fcm_tokens_self_all on public.fcm_tokens
  for all using (user_id = auth.uid()) with check (user_id = auth.uid());
