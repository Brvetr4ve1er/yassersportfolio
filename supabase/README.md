# Supabase — Oxygen Island DZ

Database, auth, and storage for the Oxygen Island PWA. The app runs in **mock
mode** with no Supabase project (see the root `README.md`); follow this guide to
go live.

## Migrations

| File | What it creates |
| --- | --- |
| `0001_init.sql` | `pgcrypto`, enums, `set_updated_at()` trigger, and the catalog tables: `users`, `passes`, `cabanas`, `events`. |
| `0002_bookings.sql` | `bookings` (+ product/payment enums), the product-FK `CHECK`, and indexes on `visit_date`, `user_id`, `qr_code_token`, `status`. |
| `0003_engagement.sql` | `reviews`, `notifications_log`, `fcm_tokens`. |
| `0004_rls.sql` | RLS on every table, `is_admin()`, `handle_new_auth_user()` (auth→profile), and all policies. |
| `0005_seed.sql` | The 3 passes / 3 cabanas / 3 events from `lib/data/mock.ts` (idempotent). |

Apply them **in order**. They are idempotent where practical (`create ... if not
exists`, `on conflict do nothing`, guarded enum creation).

## 1. Create the project

1. In the [Supabase dashboard](https://supabase.com/dashboard) → **New project**.
2. **Region: EU (West) — `eu-west-2` (London)** or `eu-west-3` (Paris). Closest
   low-latency region to Algeria; keeps guest data inside the EU.
3. Pick a strong database password and store it in your password manager.
4. Wait for provisioning, then copy from **Project Settings → API**:
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` public key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `service_role` secret → `SUPABASE_SERVICE_ROLE_KEY` (server-only, never ship
     to the browser)

Put these in `.env.local` (local) and in the Vercel project env (production).

## 2. Apply the migrations

### Option A — Supabase CLI (recommended)

```bash
npm i -g supabase                 # or: brew install supabase/tap/supabase
supabase login
supabase link --project-ref <your-project-ref>
supabase db push                  # applies everything in supabase/migrations
```

### Option B — SQL editor (no CLI)

Open **SQL Editor** in the dashboard and run each file's contents in order,
`0001` → `0005`.

Verify: **Table editor** shows `users`, `passes`, `cabanas`, `events`,
`bookings`, `reviews`, `notifications_log`, `fcm_tokens`, and the catalog tables
hold 3 rows each.

## 3. Configure phone auth (OTP)

Phone is the primary identity for Algerian guests.

1. **Authentication → Providers → Phone** → enable.
2. Choose an SMS provider. Twilio works internationally; for `+213` delivery
   confirm the provider routes to Algerian carriers (Mobilis / Djezzy / Ooredoo)
   and check per-message cost. Vonage and MessageBird are alternatives.
3. Enter the provider credentials (Account SID / Auth Token / sender ID).
4. **Authentication → URL Configuration** → add the production origin
   (`https://<domain>`) and `http://localhost:3000` to redirect allow-list.
5. The `handle_new_auth_user()` trigger (migration `0004`) auto-creates the
   `public.users` profile on first sign-in — nothing else to wire.

## 4. Bootstrap an admin

Admins pass the `is_admin()` check via `users.role = 'admin'`. After the owner
signs in once by phone so their row exists:

```sql
update public.users
set role = 'admin'
where phone = '+213660056583';   -- the owner's login phone, E.164
```

Keep `ADMIN_PHONE_ALLOWLIST` (server env) in sync as a second guard for
admin-only server actions.

## 5. Storage buckets for images

The seed points `image` columns at local `/images/*.svg` placeholders. To serve
real photos from Supabase Storage:

1. **Storage → New bucket** → `catalog` (passes/cabanas/events art) — **public**.
2. **Storage → New bucket** → `venue` (gallery / hero photos) — **public**.
3. Optionally `qr` — **private** — if you ever store rendered QR PNGs (the app
   generates QR client-side from `qr_code_token`, so this is usually not needed).
4. Upload the assets, then update the `image` columns to the public URLs
   (`https://<ref>.supabase.co/storage/v1/object/public/catalog/...`). The
   `next.config.mjs` `images.remotePatterns` already allows `*.supabase.co`.

Public buckets are read-only to anon by default; grant writes to admins only.

## 6. Security checklist

- [ ] RLS enabled on all 8 tables (migration `0004` — confirm none show
      "RLS disabled" in the dashboard).
- [ ] `service_role` key only in server env (Vercel / `.env.local`), never in a
      `NEXT_PUBLIC_*` var.
- [ ] Run **Advisors → Security** and clear warnings after applying migrations.
- [ ] Payment webhook confirms bookings with the service-role client only.
