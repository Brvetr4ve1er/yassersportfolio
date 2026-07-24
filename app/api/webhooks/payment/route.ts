import { NextResponse } from "next/server";
import { z } from "zod";
import { createAdminClient } from "@/lib/supabase/admin";
import { serverEnv } from "@/lib/env.server";

/**
 * POST /api/webhooks/payment — payment provider callback (BaridiMob / CIB-SATIM).
 *
 * STATUS: stub. The exact payload and signature scheme are finalised once the
 * merchant agreements with BaridiMob (Algérie Poste) and CIB / SATIM are
 * signed. Both providers post server-to-server after the guest completes a
 * transaction; we reconcile the booking here rather than trusting the browser.
 *
 * ─── Signature verification (how it will work) ───────────────────────────────
 * Each provider signs the raw request body with a shared secret and sends the
 * result in a header (here normalised to `x-signature`). We recompute it and
 * compare in constant time:
 *
 *     const secret = provider === "baridi"
 *       ? serverEnv.BARIDIMOB_WEBHOOK_SECRET
 *       : serverEnv.CIB_WEBHOOK_SECRET;
 *     const expected = crypto
 *       .createHmac("sha256", secret)
 *       .update(rawBody, "utf8")
 *       .digest("hex");
 *     const ok = crypto.timingSafeEqual(
 *       Buffer.from(signature),
 *       Buffer.from(expected),
 *     );
 *     if (!ok) return 401;
 *
 * IMPORTANT: verify against the RAW body bytes, before JSON.parse — any
 * re-serialisation changes whitespace/key-order and breaks the HMAC. Until the
 * secrets are provisioned we log the presence of the header and continue in a
 * no-op-safe way (we never confirm a booking without a live admin client).
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const webhookSchema = z.object({
  reference: z.string().min(3).max(40),
  provider: z.enum(["baridi", "cib"]),
  status: z.enum(["paid", "failed", "pending", "refunded"]),
  external_ref: z.string().optional(),
});

export async function POST(request: Request) {
  const signature = request.headers.get("x-signature");

  // Read the RAW body first — needed for a byte-exact HMAC once secrets exist.
  const rawBody = await request.text();

  let json: unknown;
  try {
    json = JSON.parse(rawBody);
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = webhookSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { reference, provider, status, external_ref } = parsed.data;

  // Placeholder for the constant-time HMAC check described above.
  const secret =
    provider === "baridi"
      ? serverEnv.BARIDIMOB_WEBHOOK_SECRET
      : serverEnv.CIB_WEBHOOK_SECRET;
  if (!secret) {
    console.warn(
      `[webhooks/payment] ${provider} webhook secret not set — skipping signature check (stub)`,
    );
  } else if (!signature) {
    return NextResponse.json(
      { ok: false, error: "Missing x-signature header" },
      { status: 401 },
    );
  }
  // TODO: once `secret` and `signature` are both present, verify with the
  // crypto.createHmac / timingSafeEqual routine documented above and 401 on
  // mismatch before touching the database.

  console.info("[webhooks/payment] received", {
    reference,
    provider,
    status,
    external_ref,
    signed: Boolean(signature),
  });

  // Reconcile the booking. Uses the service-role client so it can update rows
  // regardless of RLS. Absent (no service key) → acknowledge without writing.
  const admin = createAdminClient();
  if (admin && status === "paid") {
    const { error } = await admin
      .from("bookings")
      .update({ payment_status: "paid", status: "confirmed" })
      .eq("reference", reference);
    if (error) {
      console.error("[webhooks/payment] reconcile failed", error);
      return NextResponse.json(
        { ok: false, error: error.message },
        { status: 500 },
      );
    }
  }

  // Always 200 quickly so the provider does not retry a processed event.
  return NextResponse.json({ ok: true });
}
