import { NextResponse } from "next/server";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/supabase/mock-mode";

/**
 * POST /api/bookings — create a booking.
 *
 * Body: { reference: string, draft: BookingDraft }
 *   - `reference` is generated client-side with generateBookingReference()
 *     (lib/utils.ts) so the confirmation screen can show it optimistically.
 *   - `draft` carries the columns the booking-flow collects.
 *
 * In mock mode (no Supabase env) we log and echo back so the whole flow is
 * demoable offline. With Supabase configured we insert a row and return it.
 *
 * Columns NOT accepted from the client — they are owned by the database:
 *   - id            (uuid default gen_random_uuid)
 *   - qr_code_token (uuid default gen_random_uuid — the QR the guest scans)
 *   - created_at / updated_at (timestamps)
 * `status` defaults to 'pending' and `payment_status` to 'pending'; the
 * payment webhook (app/api/webhooks/payment) promotes them once money lands.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const bookingDraftSchema = z
  .object({
    user_id: z.string().uuid().nullish(),
    product: z.enum(["pass", "cabana", "event"]),
    pass_id: z.string().nullish(),
    cabana_id: z.string().nullish(),
    event_id: z.string().nullish(),
    visit_date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "expected YYYY-MM-DD"),
    adults: z.number().int().min(0).default(0),
    children: z.number().int().min(0).default(0),
    total_price: z.number().int().min(0),
    status: z
      .enum(["pending", "confirmed", "cancelled", "completed"])
      .default("pending"),
    payment_method: z.enum(["baridi", "cib", "cash"]),
    payment_status: z.enum(["pending", "paid", "refunded"]).default("pending"),
    special_requests: z.string().max(1000).nullish(),
  })
  .refine(
    (d) =>
      (d.product === "pass" && !!d.pass_id) ||
      (d.product === "cabana" && !!d.cabana_id) ||
      (d.product === "event" && !!d.event_id),
    { message: "product must match the matching *_id (pass_id/cabana_id/event_id)" },
  );

const payloadSchema = z.object({
  reference: z.string().min(3).max(40),
  draft: bookingDraftSchema,
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = payloadSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { reference, draft } = parsed.data;

  // ---- Mock mode: no database, just log + echo ----------------------------
  if (isMockMode()) {
    console.info("[bookings] mock insert", { reference, draft });
    return NextResponse.json({ ok: true, mock: true, reference }, { status: 201 });
  }

  // ---- Live mode: insert into Supabase ------------------------------------
  const supabase = createClient();
  if (!supabase) {
    return NextResponse.json(
      { ok: false, error: "Supabase client unavailable" },
      { status: 503 },
    );
  }

  // Map draft fields → bookings columns. Only the guest-owned columns; the
  // DB fills id, qr_code_token, created_at, updated_at.
  const row = {
    reference,
    user_id: draft.user_id ?? null,
    product: draft.product,
    pass_id: draft.pass_id ?? null,
    cabana_id: draft.cabana_id ?? null,
    event_id: draft.event_id ?? null,
    visit_date: draft.visit_date,
    adults: draft.adults,
    children: draft.children,
    total_price: draft.total_price,
    status: draft.status,
    payment_method: draft.payment_method,
    payment_status: draft.payment_status,
    special_requests: draft.special_requests ?? null,
  };

  const { data, error } = await supabase
    .from("bookings")
    .insert(row)
    .select()
    .single();

  if (error) {
    // 23505 = unique_violation (duplicate reference)
    const status = error.code === "23505" ? 409 : 500;
    console.error("[bookings] insert failed", error);
    return NextResponse.json(
      { ok: false, error: error.message, code: error.code },
      { status },
    );
  }

  return NextResponse.json({ ok: true, booking: data }, { status: 201 });
}
