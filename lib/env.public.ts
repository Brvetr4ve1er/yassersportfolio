/**
 * Public env — values sent to the browser. Only NEXT_PUBLIC_* belong here.
 * Safe to import from client or server. Validates at load; a malformed
 * value fails the build/boot with a clear message instead of a runtime
 * crash on a remote machine.
 */
import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z.string().url().default("http://localhost:3000"),
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20).optional(),
  NEXT_PUBLIC_WHATSAPP_BOOKING: z
    .string()
    .regex(/^\d{6,15}$/, "digits only, country code included")
    .default("213660056583"),
  NEXT_PUBLIC_WHATSAPP_INFO: z
    .string()
    .regex(/^\d{6,15}$/, "digits only, country code included")
    .default("213560343422"),
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_FB_PIXEL_ID: z.string().optional(),
});

function read() {
  const parsed = schema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_WHATSAPP_BOOKING: process.env.NEXT_PUBLIC_WHATSAPP_BOOKING,
    NEXT_PUBLIC_WHATSAPP_INFO: process.env.NEXT_PUBLIC_WHATSAPP_INFO,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_FB_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  });
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`[env.public] Invalid public env:\n${issues}`);
  }
  return parsed.data;
}

export const publicEnv = read();
export type PublicEnv = typeof publicEnv;
