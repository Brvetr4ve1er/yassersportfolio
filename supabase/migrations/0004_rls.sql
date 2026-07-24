-- ============================================================================
-- 0004_rls.sql — Oxygen Island DZ · Row Level Security
-- Enables RLS on every table, wires auth.users → public.users, and defines
-- the access policies. Run AFTER 0001–0003.
--
-- Model: phone-OTP auth. A guest authenticates, then books. auth.uid() is the
-- guest's users.id. The service-role key (webhook / cron / admin scripts)
-- bypasses RLS entirely and is never shipped to the browser.
-- ============================================================================

-- ---- Helpers ---------------------------------------------------------------

-- is_admin(): true when the caller's users row has role = 'admin'.
-- SECURITY DEFINER so it can read public.users without tripping the users
-- policies (avoids recursion inside the users table's own policy).
create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.users
    where id = auth.uid() and role = 'admin'
  );
$$;

-- handle_new_auth_user(): on every new auth.users row, mirror a public.users
-- profile so the app always has one to join against.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  meta_lang text := new.raw_user_meta_data->>'preferred_lang';
begin
  insert into public.users (id, phone, email, full_name, preferred_lang)
  values (
    new.id,
    new.phone,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    case when meta_lang in ('fr', 'en', 'ar') then meta_lang::lang_code else 'fr' end
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_auth_user();

-- ---- Enable RLS ------------------------------------------------------------
alter table public.users             enable row level security;
alter table public.passes            enable row level security;
alter table public.cabanas           enable row level security;
alter table public.events            enable row level security;
alter table public.bookings          enable row level security;
alter table public.reviews           enable row level security;
alter table public.notifications_log enable row level security;
alter table public.fcm_tokens        enable row level security;

-- ---- users -----------------------------------------------------------------
-- A user reads and edits only their own row; admins see everything.
drop policy if exists users_select_self on public.users;
create policy users_select_self on public.users
  for select using (id = auth.uid() or public.is_admin());

drop policy if exists users_insert_self on public.users;
create policy users_insert_self on public.users
  for insert with check (id = auth.uid());

drop policy if exists users_update_self on public.users;
create policy users_update_self on public.users
  for update using (id = auth.uid() or public.is_admin())
  with check (id = auth.uid() or public.is_admin());

-- ---- Catalog (passes / cabanas / events) -----------------------------------
-- Public read for everyone (anon + authenticated); only admins may write.
drop policy if exists passes_select_all on public.passes;
create policy passes_select_all on public.passes for select using (true);
drop policy if exists passes_admin_write on public.passes;
create policy passes_admin_write on public.passes
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists cabanas_select_all on public.cabanas;
create policy cabanas_select_all on public.cabanas for select using (true);
drop policy if exists cabanas_admin_write on public.cabanas;
create policy cabanas_admin_write on public.cabanas
  for all using (public.is_admin()) with check (public.is_admin());

drop policy if exists events_select_all on public.events;
create policy events_select_all on public.events for select using (true);
drop policy if exists events_admin_write on public.events;
create policy events_admin_write on public.events
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- bookings --------------------------------------------------------------
-- Guests see and create only their own bookings; admins see and manage all.
-- The payment webhook confirms bookings via the service-role client, which
-- bypasses RLS, so no public UPDATE policy is granted to guests.
drop policy if exists bookings_select_own on public.bookings;
create policy bookings_select_own on public.bookings
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists bookings_insert_own on public.bookings;
create policy bookings_insert_own on public.bookings
  for insert with check (user_id = auth.uid() or public.is_admin());

drop policy if exists bookings_admin_update on public.bookings;
create policy bookings_admin_update on public.bookings
  for update using (public.is_admin()) with check (public.is_admin());

drop policy if exists bookings_admin_delete on public.bookings;
create policy bookings_admin_delete on public.bookings
  for delete using (public.is_admin());

-- ---- reviews ---------------------------------------------------------------
-- Anyone reads published reviews; authors read their own (draft) reviews and
-- write their own; admins moderate everything.
drop policy if exists reviews_select_published on public.reviews;
create policy reviews_select_published on public.reviews
  for select using (is_published or user_id = auth.uid() or public.is_admin());

drop policy if exists reviews_insert_own on public.reviews;
create policy reviews_insert_own on public.reviews
  for insert with check (user_id = auth.uid());

drop policy if exists reviews_update_own on public.reviews;
create policy reviews_update_own on public.reviews
  for update using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());

drop policy if exists reviews_delete_own on public.reviews;
create policy reviews_delete_own on public.reviews
  for delete using (user_id = auth.uid() or public.is_admin());

-- ---- notifications_log -----------------------------------------------------
-- Admin-only. Inserts happen through the service-role client (bypasses RLS).
drop policy if exists notifications_admin_all on public.notifications_log;
create policy notifications_admin_all on public.notifications_log
  for all using (public.is_admin()) with check (public.is_admin());

-- ---- fcm_tokens ------------------------------------------------------------
-- A user manages their own device tokens; admins may read all.
drop policy if exists fcm_tokens_select on public.fcm_tokens;
create policy fcm_tokens_select on public.fcm_tokens
  for select using (user_id = auth.uid() or public.is_admin());

drop policy if exists fcm_tokens_write_own on public.fcm_tokens;
create policy fcm_tokens_write_own on public.fcm_tokens
  for all using (user_id = auth.uid() or public.is_admin())
  with check (user_id = auth.uid() or public.is_admin());
