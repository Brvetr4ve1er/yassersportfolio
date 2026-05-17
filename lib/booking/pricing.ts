import type { Accommodation, Activity, Package } from "@/types/domain";

const ALGERIAN_HOLIDAYS_2026 = new Set([
  "2026-01-01",
  "2026-01-12",
  "2026-03-20",
  "2026-05-01",
  "2026-05-20",
  "2026-07-05",
  "2026-07-26",
  "2026-08-15",
  "2026-11-01",
]);

export function isWeekend(dateISO: string): boolean {
  const day = new Date(dateISO).getDay();
  return day === 5 || day === 6;
}

export function isHoliday(dateISO: string): boolean {
  return ALGERIAN_HOLIDAYS_2026.has(dateISO);
}

export function nightsBetween(checkIn: string, checkOut: string): number {
  const ms = new Date(checkOut).getTime() - new Date(checkIn).getTime();
  return Math.max(1, Math.round(ms / (1000 * 60 * 60 * 24)));
}

export function priceForNight(accommodation: Accommodation, dateISO: string): number {
  if (isHoliday(dateISO)) return accommodation.price_holiday;
  if (isWeekend(dateISO)) return accommodation.price_weekend;
  return accommodation.price_weekday;
}

export function totalAccommodation(
  accommodation: Accommodation,
  checkIn: string,
  checkOut: string,
): number {
  const nights = nightsBetween(checkIn, checkOut);
  let total = 0;
  for (let i = 0; i < nights; i++) {
    const d = new Date(checkIn);
    d.setDate(d.getDate() + i);
    total += priceForNight(accommodation, d.toISOString().slice(0, 10));
  }
  return total;
}

export function totalActivity(activity: Activity, participants: number): number {
  return activity.price_per_person * Math.max(1, participants);
}

export function totalPackage(pkg: Package): number {
  return pkg.price;
}

export const LOYALTY_DISCOUNT_DZD = 500;
export const LOYALTY_DISCOUNT_POINTS = 500;
