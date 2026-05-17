export type Locale = "fr" | "ar";

export type AccommodationType = "chalet" | "tent" | "glamping";

export type Accommodation = {
  id: string;
  slug: string;
  name_fr: string;
  name_ar: string;
  type: AccommodationType;
  capacity: number;
  price_weekday: number;
  price_weekend: number;
  price_holiday: number;
  amenities: string[];
  description_fr: string;
  description_ar: string;
  images: string[];
  is_active: boolean;
};

export type Activity = {
  id: string;
  slug: string;
  name_fr: string;
  name_ar: string;
  description_fr: string;
  description_ar: string;
  price_per_person: number;
  min_participants: number;
  max_participants: number;
  duration_minutes: number;
  available_days: string[];
  images: string[];
};

export type Package = {
  id: string;
  slug: string;
  name_fr: string;
  name_ar: string;
  description_fr: string;
  description_ar: string;
  price: number;
  includes_accommodation_id: string | null;
  includes_activity_ids: string[];
  valid_from: string;
  valid_until: string;
  max_bookings: number;
  current_bookings: number;
  images: string[];
};

export type LoyaltyTier = "bronze" | "silver" | "gold";

export type User = {
  id: string;
  phone: string;
  email: string | null;
  full_name: string;
  preferred_lang: Locale;
  loyalty_points: number;
  tier: LoyaltyTier;
};

export type BookingType = "accommodation" | "activity" | "package";
export type BookingStatus = "pending" | "confirmed" | "cancelled" | "completed";
export type PaymentMethod = "baridi" | "cib" | "cash";
export type PaymentStatus = "pending" | "paid" | "refunded";

export type Booking = {
  id: string;
  reference: string;
  user_id: string;
  booking_type: BookingType;
  accommodation_id: string | null;
  activity_id: string | null;
  package_id: string | null;
  check_in: string;
  check_out: string | null;
  guests_count: number;
  total_price: number;
  status: BookingStatus;
  payment_method: PaymentMethod;
  payment_status: PaymentStatus;
  qr_code_token: string;
  special_requests: string | null;
  created_at: string;
};

export function tierFromPoints(points: number): LoyaltyTier {
  if (points >= 5000) return "gold";
  if (points >= 1000) return "silver";
  return "bronze";
}
