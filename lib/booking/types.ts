import type { BookingProduct, PaymentMethod } from "@/types/domain";

export type BookingDraft = {
  step: number;
  product: BookingProduct | null;
  passId: string | null;
  cabanaId: string | null;
  eventId: string | null;
  visitDate: string | null;
  adults: number;
  children: number;
  fullName: string;
  phone: string;
  specialRequests: string;
  paymentMethod: PaymentMethod | null;
  totalPrice: number;
};

export const emptyDraft: BookingDraft = {
  step: 1,
  product: null,
  passId: null,
  cabanaId: null,
  eventId: null,
  visitDate: null,
  adults: 2,
  children: 0,
  fullName: "",
  phone: "",
  specialRequests: "",
  paymentMethod: null,
  totalPrice: 0,
};
