import "server-only";
import { z } from "zod";

/**
 * Server env — secrets and server-only configuration.
 *
 * This module is `server-only`. Importing it from a client component triggers
 * a build-time error in Next.js, which is the second line of defense against
 * accidentally bundling a secret into a JavaScript file shipped to the browser.
 *
 * All values are OPTIONAL because the app runs in mock mode without them
 * (documented in TECHNICAL_SHEET.md). Each consumer that uses a server-only
 * value is responsible for checking it's present before relying on it.
 */
const schema = z.object({
  // Supabase server-side (service-role key — bypasses RLS, the master key)
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),

  // BaridiMob (Algérie Poste) — manual confirmation flow + webhook
  BARIDIMOB_CCP_ACCOUNT: z.string().optional(),
  BARIDIMOB_CCP_KEY: z.string().optional(),
  BARIDIMOB_RIB: z.string().optional(),
  BARIDIMOB_WEBHOOK_SECRET: z.string().min(16).optional(),

  // CIB / SATIM gateway
  CIB_MERCHANT_ID: z.string().optional(),
  CIB_API_KEY: z.string().optional(),
  CIB_WEBHOOK_SECRET: z.string().min(16).optional(),
  CIB_GATEWAY_URL: z.string().url().optional(),

  // FCM server send key (DO NOT prefix NEXT_PUBLIC_)
  FCM_SERVER_KEY: z.string().optional(),

  // 360dialog WhatsApp Business
  WHATSAPP_360DIALOG_API_KEY: z.string().optional(),
  WHATSAPP_360DIALOG_PHONE: z.string().optional(),

  // Admin bootstrap — comma-separated +213 phone numbers
  ADMIN_PHONE_ALLOWLIST: z
    .string()
    .optional()
    .transform((s) =>
      s
        ? s
            .split(",")
            .map((p) => p.trim())
            .filter(Boolean)
        : [],
    ),

  // Runtime env (Vercel injects)
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
});

function read() {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(
      `[env.server] Invalid server environment variables:\n${issues}\n` +
        `Fix .env.local or your deploy environment.`,
    );
  }
  return parsed.data;
}

export const serverEnv = read();
export type ServerEnv = typeof serverEnv;

/** Helper: is this build production-mode, on Vercel or otherwise? */
export const isProduction =
  serverEnv.NODE_ENV === "production" ||
  serverEnv.VERCEL_ENV === "production";
