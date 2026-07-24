export type Locale = "fr" | "en" | "ar";

/** Product families sold online. */
export type ProductType = "pass" | "cabana" | "event";

/** A day-pass tier (adult / child / evening). */
export type Pass = {
  id: string;
  slug: string;
  name_fr: string;
  name_en: string;
  name_ar: string;
  audience: "adult" | "child" | "evening";
  price: number; // DZD
  description_fr: string;
  description_en: string;
  description_ar: string;
  includes: string[]; // amenity keys
  image: string;
};

/** A private cabana that can be reserved for the day. */
export type Cabana = {
  id: string;
  slug: string;
  name_fr: string;
  name_en: string;
  name_ar: string;
  capacity: number;
  price: number; // DZD per day
  zone: "lagoon" | "palm" | "sunset";
  amenities: string[];
  description_fr: string;
  description_en: string;
  description_ar: string;
  image: string;
};

/** A ticketed / bookable event (Friday kids show, Saturday DJ, privatization). */
export type EventOffer = {
  id: string;
  slug: string;
  name_fr: string;
  name_en: string;
  name_ar: string;
  kind: "kids" | "dj" | "private";
  day: string; // e.g. "friday"
  time: string; // e.g. "15:00"
  price: number | null; // null = quote-only (privatization)
  description_fr: string;
  description_en: string;
  description_ar: string;
  image: string;
};

export type BookingProduct = "pass" | "cabana" | "event";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type PaymentMethod = "baridi" | "cib" | "cash";
export type PaymentStatus = "pending" | "paid" | "refunded";

export type Booking = {
  id: string;
  reference: string;
  user_id: string;
  product: BookingProduct;
  pass_id: string | null;
  cabana_id: string | null;
  event_id: string | null;
  visit_date: string; // ISO date
  adults: number;
  children: number;
  total_price: number;
  status: BookingStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  qr_code_token: string;
  special_requests: string | null;
  created_at: string;
};

export type User = {
  id: string;
  phone: string;
  email: string | null;
  full_name: string;
  preferred_lang: Locale;
};

export type LagoonZoneCategory =
  | "lagoon"
  | "cabana"
  | "bar"
  | "restaurant"
  | "kids"
  | "entrance"
  | "parking"
  | "deck";
