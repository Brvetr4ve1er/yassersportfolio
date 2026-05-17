import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * Stub webhook for BaridiMob/CIB payment confirmation.
 *
 * Expected payload (V1 manual flow):
 *   { reference, provider: 'baridi' | 'cib', status: 'paid' | 'failed', external_ref }
 *
 * Signature verification: providers send HMAC in `x-signature` header.
 * For BaridiMob, validate against BARIDIMOB_WEBHOOK_SECRET.
 * For CIB/SATIM, validate against CIB_WEBHOOK_SECRET.
 *
 * On success: update bookings.payment_status, send WhatsApp confirmation,
 * trigger FCM push if user has a subscription.
 */
export async function POST(request: Request) {
  const signature = request.headers.get("x-signature");
  const body = await request.json().catch(() => null);
  if (!body) return NextResponse.json({ error: "Bad request" }, { status: 400 });

  console.info("[webhook] payment", {
    reference: body.reference,
    provider: body.provider,
    status: body.status,
    hasSignature: !!signature,
  });

  const admin = createAdminClient();
  if (!admin) {
    return NextResponse.json({ ok: true, mock: true });
  }

  if (body.status === "paid") {
    await admin
      .from("bookings")
      .update({
        payment_status: "paid",
        status: "confirmed",
        payment_reference: body.external_ref,
      })
      .eq("reference", body.reference);
  } else if (body.status === "failed") {
    await admin
      .from("bookings")
      .update({ payment_status: "pending" })
      .eq("reference", body.reference);
  }

  return NextResponse.json({ ok: true });
}
