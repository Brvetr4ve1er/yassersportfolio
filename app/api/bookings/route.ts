import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isMockMode } from "@/lib/supabase/mock-mode";
import { generateBookingReference } from "@/lib/utils";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  if (isMockMode()) {
    console.info("[mock] Booking received:", body.reference ?? "no-ref");
    return NextResponse.json({
      ok: true,
      mock: true,
      reference: body.reference ?? generateBookingReference(),
    });
  }

  const supabase = createClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase unavailable" }, { status: 503 });
  }

  const { draft, reference } = body;
  const { data, error } = await supabase
    .from("bookings")
    .insert({
      reference: reference ?? generateBookingReference(),
      booking_type: draft.type,
      accommodation_id: draft.accommodationId,
      activity_id: draft.activityId,
      package_id: draft.packageId,
      check_in: draft.checkIn,
      check_out: draft.checkOut,
      guests_count: draft.guests,
      total_price: draft.totalPrice,
      status: "pending",
      payment_method: draft.paymentMethod,
      payment_status: "pending",
      special_requests: draft.specialRequests || null,
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, booking: data });
}
