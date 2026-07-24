import type { Locale } from "@/lib/i18n/config";
import type {
  Booking,
  BookingProduct,
  BookingStatus,
  PaymentStatus,
} from "@/types/domain";
import type { BadgeProps } from "@/components/ui/badge";
import { mockPasses, mockCabanas, mockEvents } from "@/lib/data/mock";

/**
 * Shared, trilingual copy + resolution helpers for the admin dashboard.
 * User-facing strings live in Record<Locale> maps so labels stay FR/EN/AR.
 */

type BadgeVariant = NonNullable<BadgeProps["variant"]>;

/** Resolve the localized catalog name for whatever product a booking points at. */
export function bookingProductName(booking: Booking, locale: Locale): string {
  const key = `name_${locale}` as const;
  if (booking.pass_id) {
    const p = mockPasses.find((x) => x.id === booking.pass_id);
    if (p) return p[key];
  }
  if (booking.cabana_id) {
    const c = mockCabanas.find((x) => x.id === booking.cabana_id);
    if (c) return c[key];
  }
  if (booking.event_id) {
    const e = mockEvents.find((x) => x.id === booking.event_id);
    if (e) return e[key];
  }
  return booking.reference;
}

/** Short family label ("Pass" / "Cabana" / "Événement"). */
export const PRODUCT_COPY: Record<BookingProduct, Record<Locale, string>> = {
  pass: { fr: "Pass", en: "Pass", ar: "تذكرة" },
  cabana: { fr: "Cabana", en: "Cabana", ar: "كابانا" },
  event: { fr: "Événement", en: "Event", ar: "فعالية" },
};

export const STATUS_COPY: Record<BookingStatus, Record<Locale, string>> = {
  pending: { fr: "En attente", en: "Pending", ar: "قيد الانتظار" },
  confirmed: { fr: "Confirmée", en: "Confirmed", ar: "مؤكَّدة" },
  cancelled: { fr: "Annulée", en: "Cancelled", ar: "ملغاة" },
  completed: { fr: "Terminée", en: "Completed", ar: "منتهية" },
};

export const PAYMENT_COPY: Record<PaymentStatus, Record<Locale, string>> = {
  pending: { fr: "À payer", en: "Unpaid", ar: "غير مدفوعة" },
  paid: { fr: "Payé", en: "Paid", ar: "مدفوعة" },
  refunded: { fr: "Remboursé", en: "Refunded", ar: "مُسترجعة" },
};

export function statusBadgeVariant(status: BookingStatus): BadgeVariant {
  switch (status) {
    case "confirmed":
      return "success";
    case "pending":
      return "warning";
    case "cancelled":
      return "danger";
    case "completed":
      return "lagoon";
  }
}

export function paymentBadgeVariant(payment: PaymentStatus): BadgeVariant {
  switch (payment) {
    case "paid":
      return "success";
    case "pending":
      return "warning";
    case "refunded":
      return "outline";
  }
}

/** Product colour language shared by the agenda + legends. */
export const PRODUCT_ACCENT: Record<
  BookingProduct,
  { dot: string; pill: string; bar: string }
> = {
  pass: {
    dot: "bg-lagoon-500",
    pill: "bg-lagoon-500/12 text-lagoon-700 border-lagoon-300/40",
    bar: "bg-lagoon-500",
  },
  cabana: {
    dot: "bg-coral",
    pill: "bg-coral/12 text-coral-dark border-coral/40",
    bar: "bg-coral",
  },
  event: {
    dot: "bg-palm-400",
    pill: "bg-palm-400/15 text-palm-700 border-palm-300/50",
    bar: "bg-palm-400",
  },
};

/** Number of guests on a booking. */
export function guestCount(booking: Booking): number {
  return booking.adults + booking.children;
}

/**
 * Parse an ISO string to a local Date. Date-only values ("YYYY-MM-DD") are
 * built from their components so they land on the intended local calendar day
 * instead of being read as UTC midnight (which can shift a day in some zones).
 */
export function parseLocalDate(iso: string): Date {
  const dateOnly = /^\d{4}-\d{2}-\d{2}$/.exec(iso);
  if (dateOnly) {
    const [y, m, d] = iso.split("-").map(Number);
    return new Date(y, m - 1, d);
  }
  return new Date(iso);
}

/** True when an ISO date string falls on the same calendar day as `ref`. */
export function isSameDay(iso: string, ref: Date): boolean {
  const d = parseLocalDate(iso);
  return (
    d.getFullYear() === ref.getFullYear() &&
    d.getMonth() === ref.getMonth() &&
    d.getDate() === ref.getDate()
  );
}

/** Monday–Sunday range containing `ref`, as [start, end] at day boundaries. */
export function weekRange(ref: Date): [Date, Date] {
  const start = new Date(ref);
  const day = (start.getDay() + 6) % 7; // 0 = Monday
  start.setDate(start.getDate() - day);
  start.setHours(0, 0, 0, 0);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  end.setHours(23, 59, 59, 999);
  return [start, end];
}
