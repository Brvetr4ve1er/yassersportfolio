import { mockCabanas, mockEvents, mockPasses } from "@/lib/data/mock";
import type { Locale } from "@/lib/i18n/config";
import type { Booking } from "@/types/domain";
import type { BookingDraft } from "@/lib/booking/types";

/**
 * Read a locale-suffixed field (name_fr / name_ar / description_en …) off any
 * mock record. Keeps the trilingual copy sourced from the shared catalog
 * instead of duplicating it inside each wizard step.
 */
export function localizedField(
  item: Record<string, unknown>,
  base: string,
  locale: Locale,
): string {
  return String(item[`${base}_${locale}`] ?? "");
}

/** Human name of whatever a confirmed booking points at. */
export function bookingProductName(booking: Booking, locale: Locale): string {
  if (booking.product === "pass") {
    const p = mockPasses.find((x) => x.id === booking.pass_id);
    return p ? localizedField(p, "name", locale) : "";
  }
  if (booking.product === "cabana") {
    const c = mockCabanas.find((x) => x.id === booking.cabana_id);
    return c ? localizedField(c, "name", locale) : "";
  }
  const e = mockEvents.find((x) => x.id === booking.event_id);
  return e ? localizedField(e, "name", locale) : "";
}

/** Name of the item currently held in a draft (pre-confirmation). */
export function draftProductName(draft: BookingDraft, locale: Locale): string {
  if (draft.product === "pass") {
    const p = mockPasses.find((x) => x.id === draft.passId);
    return p ? localizedField(p, "name", locale) : "";
  }
  if (draft.product === "cabana") {
    const c = mockCabanas.find((x) => x.id === draft.cabanaId);
    return c ? localizedField(c, "name", locale) : "";
  }
  const e = mockEvents.find((x) => x.id === draft.eventId);
  return e ? localizedField(e, "name", locale) : "";
}

/** Cabana capacity ceiling for guest counters, else a generous default. */
export function guestCap(draft: BookingDraft): number {
  if (draft.product === "cabana") {
    return mockCabanas.find((c) => c.id === draft.cabanaId)?.capacity ?? 30;
  }
  return 30;
}

/** true when the chosen event is quote-only (privatisation, price === null). */
export function isQuoteOnly(draft: BookingDraft): boolean {
  if (draft.product !== "event") return false;
  const e = mockEvents.find((x) => x.id === draft.eventId);
  return e ? e.price === null : false;
}

/** Local yyyy-mm-dd without the UTC shift `toISOString()` would introduce. */
export function toDateKey(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
}
