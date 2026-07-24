import { mockCabanas, mockEvents, mockPasses } from "@/lib/data/mock";
import type { BookingDraft } from "./types";

/**
 * Compute the total for a booking draft.
 *  · pass:   adult pass price × adults + child pass price × children
 *  · cabana: flat cabana price (capacity covers the group)
 *  · event:  event price × (adults + children), null price = 0 (quote-only)
 */
export function computeTotal(draft: BookingDraft): number {
  if (draft.product === "pass") {
    const adult = mockPasses.find((p) => p.audience === "adult");
    const child = mockPasses.find((p) => p.audience === "child");
    // The selected pass sets the adult rate; children always use child rate.
    const selected = mockPasses.find((p) => p.id === draft.passId) ?? adult;
    const adultRate = selected?.price ?? adult?.price ?? 8500;
    const childRate = child?.price ?? 5000;
    return draft.adults * adultRate + draft.children * childRate;
  }
  if (draft.product === "cabana") {
    const cabana = mockCabanas.find((c) => c.id === draft.cabanaId);
    return cabana?.price ?? 0;
  }
  if (draft.product === "event") {
    const ev = mockEvents.find((e) => e.id === draft.eventId);
    const rate = ev?.price ?? 0;
    return rate * Math.max(1, draft.adults + draft.children);
  }
  return 0;
}

export const OPENING_HOURS = "10:00 – 19:30";
export const SEASON = "Mai → Octobre";
