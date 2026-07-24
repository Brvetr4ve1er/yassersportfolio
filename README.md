# Oxygen Island DZ

**Algiers' first artificial beach — a beach & pool club in Bouchaoui.**
Progressive web app for browsing passes, cabanas and events, booking online, and
checking in at the lagoon with a QR code. Trilingual (Français · English ·
العربية), mobile-first, installable.

---

## What it is

Oxygen Island is a lagoon-and-forest beach club on the western edge of Algiers
(Bouchaoui). This app is its public storefront and booking system:

- **Discover** — a cinematic homepage and catalog of day passes (adult / child /
  sunset), private cabanas, and events (Friday kids' shows, Saturday sunset DJ,
  private hire).
- **Book** — pick a product, date, and party size, pay with an Algerian method
  (BaridiMob / CIB), and receive a booking reference.
- **Check in** — every booking carries a QR token the guest shows at the gate;
  it works offline once cached.
- **Manage** — a `compte` area for guests (their bookings and QR) and an `admin`
  area for staff (reservations, day agenda, gate scanner).

## Stack

| Layer | Choice |
| --- | --- |
| Framework | Next.js 14 (App Router, RSC) + TypeScript |
| Styling | Tailwind CSS + Radix UI primitives, custom "lagoon-in-the-forest" theme |
| Motion | Framer Motion, Lenis smooth scroll |
| Backend | Supabase (Postgres + Auth + Storage) |
| PWA | `@ducanh2912/next-pwa` (Workbox service worker, offline fallback) |
| i18n | Route-segment locales `fr` · `en` · `ar` (RTL-aware) |
| QR | `qrcode` (client-side render from the booking token) |
| Hosting | Vercel |

## Quick start

Requires **Node ≥ 20** (`.nvmrc` pins 20).

```bash
git clone <repo-url> oxygen-island-dz
cd oxygen-island-dz

nvm use                     # Node 20
cp .env.example .env.local  # all values optional — see "Mock mode" below
npm install
npm run dev                 # http://localhost:3000  → redirects to /fr
```

Scripts: `npm run dev` · `npm run build` · `npm run start` · `npm run lint` ·
`npm run typecheck`.

## Mock mode

**The app runs fully without any backend.** When
`NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` are unset,
`isMockMode()` (in `lib/supabase/mock-mode.ts`) returns `true` and:

- the catalog is served from `lib/data/mock.ts` (real venue pricing);
- `POST /api/bookings` logs the booking and echoes `{ ok, mock: true, reference }`
  instead of writing to Postgres;
- Supabase clients return `null`, so no network calls are made.

This makes the whole flow demoable offline and keeps CI green with no secrets.
To go live, set the Supabase env vars and apply the migrations — see
[`supabase/README.md`](supabase/README.md).

## Project layout

```
app/
  [lang]/                      # locale segment: fr | en | ar
    page.tsx                   # cinematic homepage (own dark chrome)
    (shell)/                   # light-theme app shell (header + footer)
      reservation/             #   booking flow  (+ /whatsapp fallback)
      compte/                  #   guest area: reservations, qr-checkin
      admin/                   #   staff: reservations, agenda, scan
      offline/                 #   PWA offline fallback
  api/
    bookings/                  # POST — create a booking (mock or Supabase)
    webhooks/payment/          # POST — BaridiMob / CIB reconciliation (stub)
    notifications/subscribe/   # POST — register an FCM token (stub)
components/                    # ui, layout, cinematic, booking, admin, i18n, …
lib/
  data/mock.ts                 # mock catalog (mirrored by the SQL seed)
  supabase/                    # server / admin clients + mock-mode guard
  i18n/                        # locale config + dictionaries
  env.public.ts / env.server.ts# zod-validated env
  utils.ts                     # cn(), generateBookingReference()
supabase/
  migrations/                  # 0001_init … 0005_seed
  README.md                    # provisioning guide
types/domain.ts                # Booking, Pass, Cabana, EventOffer, …
docs/TECHNICAL_SHEET.md        # owner-facing platform & cost sheet
```

## Deferred integrations

These are stubbed with clear TODOs so the app ships in mock mode today and wires
up when the owner's accounts and contracts are ready:

- **Payments — BaridiMob & CIB / SATIM.** No Stripe/PayPal in Algeria. The
  webhook at `app/api/webhooks/payment` documents the HMAC signature scheme
  (`BARIDIMOB_WEBHOOK_SECRET` / `CIB_WEBHOOK_SECRET`) and, once live, flips a
  booking to `paid` / `confirmed`.
- **Phone OTP auth.** Supabase phone provider + an SMS gateway that delivers to
  `+213` numbers. The `handle_new_auth_user()` trigger creates the profile.
- **Push notifications — FCM.** `app/api/notifications/subscribe` accepts a
  device token; persistence to `fcm_tokens` and the welcome push are pending the
  Firebase project.
- **WhatsApp Business.** Reservations currently deep-link to WhatsApp
  (`NEXT_PUBLIC_WHATSAPP_BOOKING` / `_INFO`). A future Business API integration
  would send confirmations automatically.

See [`docs/TECHNICAL_SHEET.md`](docs/TECHNICAL_SHEET.md) for the owner's setup
checklist, external services, and cost estimate in DZD.

## Environment

All variables are documented in [`.env.example`](.env.example) and validated at
boot by `lib/env.public.ts` (browser-safe) and `lib/env.server.ts` (secrets,
`server-only`). Everything is optional — a malformed value fails fast with a
readable message rather than crashing at runtime.

---

© Oxygen Island DZ. Bouchaoui, Algiers.
