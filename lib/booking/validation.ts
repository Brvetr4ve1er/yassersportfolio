import { z } from "zod";

const PHONE_DZ = /^(?:\+213|0)(5|6|7)\d{8}$/;

export const guestDetailsSchema = z.object({
  fullName: z.string().min(2, "Nom requis"),
  phone: z
    .string()
    .min(10)
    .regex(PHONE_DZ, "Numéro algérien attendu (0X XX XX XX XX)"),
  guests: z.number().int().min(1).max(20),
  adults: z.number().int().min(1).max(20),
  children: z.number().int().min(0).max(20),
  specialRequests: z.string().max(500).optional().or(z.literal("")),
});

export const datesSchema = z
  .object({
    checkIn: z.string().min(10),
    checkOut: z.string().min(10).optional().nullable(),
    type: z.enum(["accommodation", "activity", "package"]),
  })
  .refine(
    (v) => {
      if (v.type === "activity") return true;
      return v.checkOut != null && v.checkOut > v.checkIn;
    },
    { message: "Date de départ invalide", path: ["checkOut"] },
  );

export const paymentSchema = z.object({
  method: z.enum(["baridi", "cib", "cash"]),
});

export type GuestDetails = z.infer<typeof guestDetailsSchema>;
