import "server-only";
import { z } from "zod";

/**
 * Server env — secrets. This module is `server-only`; importing it from a
 * client component triggers a build error, the second line of defense
 * against bundling a secret into browser JS. All optional (mock mode runs
 * without them).
 */
const schema = z.object({
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(20).optional(),
  BARIDIMOB_CCP_ACCOUNT: z.string().optional(),
  BARIDIMOB_RIB: z.string().optional(),
  BARIDIMOB_WEBHOOK_SECRET: z.string().min(16).optional(),
  CIB_MERCHANT_ID: z.string().optional(),
  CIB_API_KEY: z.string().optional(),
  CIB_WEBHOOK_SECRET: z.string().min(16).optional(),
  CIB_GATEWAY_URL: z.string().url().optional(),
  ADMIN_PHONE_ALLOWLIST: z
    .string()
    .optional()
    .transform((s) =>
      s ? s.split(",").map((p) => p.trim()).filter(Boolean) : [],
    ),
  NODE_ENV: z.enum(["development", "production", "test"]).default("development"),
  VERCEL_ENV: z.enum(["development", "preview", "production"]).optional(),
});

function read() {
  const parsed = schema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  · ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`[env.server] Invalid server env:\n${issues}`);
  }
  return parsed.data;
}

export const serverEnv = read();
export type ServerEnv = typeof serverEnv;
export const isProduction =
  serverEnv.NODE_ENV === "production" || serverEnv.VERCEL_ENV === "production";
