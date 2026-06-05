/**
 * Public env — values that ARE sent to the browser.
 *
 * Only `NEXT_PUBLIC_*` prefixed vars belong here. The module is safe to
 * import from both server and client code. Anything secret MUST live in
 * `env.server.ts` instead.
 *
 * Validates at module load: if a required value is missing in production,
 * the build/boot fails immediately with a clear error rather than producing
 * a cryptic runtime crash on a remote machine.
 */
import { z } from "zod";

const schema = z.object({
  NEXT_PUBLIC_SITE_URL: z
    .string()
    .url()
    .default("http://localhost:3000"),

  // Supabase — public anon key + URL are browser-safe
  NEXT_PUBLIC_SUPABASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(20).optional(),

  // WhatsApp deep-link numbers (digits only)
  NEXT_PUBLIC_WHATSAPP_BOOKING: z
    .string()
    .regex(/^\d{6,15}$/, "digits only, country code included")
    .default("213555000000"),
  NEXT_PUBLIC_WHATSAPP_POOL: z
    .string()
    .regex(/^\d{6,15}$/, "digits only, country code included")
    .default("213555000000"),

  // FCM web push (browser SDK config)
  NEXT_PUBLIC_FCM_API_KEY: z.string().optional(),
  NEXT_PUBLIC_FCM_AUTH_DOMAIN: z.string().optional(),
  NEXT_PUBLIC_FCM_PROJECT_ID: z.string().optional(),
  NEXT_PUBLIC_FCM_SENDER_ID: z.string().optional(),
  NEXT_PUBLIC_FCM_APP_ID: z.string().optional(),
  NEXT_PUBLIC_FCM_VAPID_KEY: z.string().optional(),

  // Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: z.string().optional(),
  NEXT_PUBLIC_FB_PIXEL_ID: z.string().optional(),
});

function read() {
  const parsed = schema.safeParse({
    NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    NEXT_PUBLIC_WHATSAPP_BOOKING: process.env.NEXT_PUBLIC_WHATSAPP_BOOKING,
    NEXT_PUBLIC_WHATSAPP_POOL: process.env.NEXT_PUBLIC_WHATSAPP_POOL,
    NEXT_PUBLIC_FCM_API_KEY: process.env.NEXT_PUBLIC_FCM_API_KEY,
    NEXT_PUBLIC_FCM_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FCM_AUTH_DOMAIN,
    NEXT_PUBLIC_FCM_PROJECT_ID: process.env.NEXT_PUBLIC_FCM_PROJECT_ID,
    NEXT_PUBLIC_FCM_SENDER_ID: process.env.NEXT_PUBLIC_FCM_SENDER_ID,
    NEXT_PUBLIC_FCM_APP_ID: process.env.NEXT_PUBLIC_FCM_APP_ID,
    NEXT_PUBLIC_FCM_VAPID_KEY: process.env.NEXT_PUBLIC_FCM_VAPID_KEY,
    NEXT_PUBLIC_GA_MEASUREMENT_ID: process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
    NEXT_PUBLIC_FB_PIXEL_ID: process.env.NEXT_PUBLIC_FB_PIXEL_ID,
  });
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `[env.public] Invalid public environment variables:\n${issues}\n` +
        `Fix .env.local or your deploy environment.`,
    );
  }
  return parsed.data;
}

export const publicEnv = read();
export type PublicEnv = typeof publicEnv;
