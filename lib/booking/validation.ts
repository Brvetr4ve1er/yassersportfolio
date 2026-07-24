import { z } from "zod";

const PHONE_DZ = /^(?:\+213|0)(5|6|7)\d{8}$/;

export const guestDetailsSchema = z.object({
  fullName: z.string().min(2, "Nom requis"),
  phone: z
    .string()
    .min(10)
    .regex(PHONE_DZ, "Numéro algérien attendu (0X XX XX XX XX)"),
  adults: z.number().int().min(1).max(30),
  children: z.number().int().min(0).max(30),
  specialRequests: z.string().max(500).optional().or(z.literal("")),
});

export type GuestDetails = z.infer<typeof guestDetailsSchema>;
