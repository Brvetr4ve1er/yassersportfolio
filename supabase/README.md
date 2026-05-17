# Supabase setup — L'Étoile de l'Est

## 1. Create the project

1. Sign up at https://supabase.com and create a new project.
2. Region: **EU West (Ireland)** — lowest latency to Algeria of compliant options.
3. Save the project URL and the `anon` and `service_role` keys to `.env.local`.

## 2. Apply migrations

The recommended path is the Supabase CLI:

```bash
npm install -g supabase
supabase login
supabase link --project-ref <your-project-ref>
supabase db push
```

Or apply each file manually in the SQL editor (Dashboard → SQL → New query),
in order:

1. `0001_init.sql` — users, accommodations, activities
2. `0002_bookings.sql` — packages, bookings, loyalty
3. `0003_engagement.sql` — reviews, notifications, FCM tokens
4. `0004_rls.sql` — RLS policies + auth-user trigger
5. `0005_seed.sql` — demo content matching the in-app mock data

## 3. Configure Auth → Phone

Dashboard → Authentication → Providers → **Phone**:

- Enable.
- Provider: Twilio. Fill `Account SID`, `Auth Token`, `Messaging Service SID`.
- SMS template (FR):
  ```
  L'Étoile de l'Est — Votre code : {{ .Code }}. Valide 60 secondes.
  ```
- SMS template (AR):
  ```
  نجمة الشرق — رمزك: {{ .Code }}. صالح لمدة 60 ثانية.
  ```

## 4. Bootstrap an admin

After signing in once with your phone, run in the SQL editor:

```sql
update public.users set role = 'admin' where phone = '+213XXXXXXXXX';
```

(Or set `ADMIN_PHONE_ALLOWLIST` in `.env` and add a server-side trigger.)

## 5. Storage buckets

Dashboard → Storage → Create bucket:

- `gallery` (public read)
- `accommodations` (public read)
- `activities` (public read)
- `ugc` (authenticated read, write requires booking_id metadata)

## 6. Realtime

Enable replication on `bookings` only — the booking flow uses it to surface
unavailable dates in real time (spec §5 step 2).

Dashboard → Database → Replication → enable `bookings`.
