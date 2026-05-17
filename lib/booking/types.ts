import type { BookingType, PaymentMethod } from "@/types/domain";

export type BookingDraft = {
  step: number;
  type: BookingType | null;
  checkIn: string | null;
  checkOut: string | null;
  accommodationId: string | null;
  activityId: string | null;
  packageId: string | null;
  guests: number;
  adults: number;
  children: number;
  fullName: string;
  phone: string;
  specialRequests: string;
  redeemLoyalty: boolean;
  paymentMethod: PaymentMethod | null;
  totalPrice: number;
};

export const emptyDraft: BookingDraft = {
  step: 1,
  type: null,
  checkIn: null,
  checkOut: null,
  accommodationId: null,
  activityId: null,
  packageId: null,
  guests: 2,
  adults: 2,
  children: 0,
  fullName: "",
  phone: "",
  specialRequests: "",
  redeemLoyalty: false,
  paymentMethod: null,
  totalPrice: 0,
};
