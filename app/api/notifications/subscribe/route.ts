import { NextResponse } from "next/server";
import { z } from "zod";

/**
 * POST /api/notifications/subscribe — register a device for push.
 *
 * STATUS: stub. Firebase Cloud Messaging (FCM) is a deferred integration.
 * The web client requests notification permission, obtains an FCM device
 * token via the Firebase SDK, and posts it here. Body: { token: string }.
 *
 * When FCM is wired this handler will:
 *   1. Upsert the token into the `fcm_tokens` table (see
 *      supabase/migrations/0003_engagement.sql), keyed by token with an
 *      optional user_id so we can target a specific guest, and de-duplicated
 *      via ON CONFLICT (token) DO UPDATE SET last_seen_at = now().
 *   2. Send a localized welcome push ("Merci ! Vous recevrez vos
 *      confirmations et offres ici.") through the FCM HTTP v1 API using the
 *      service-account credentials, so the guest sees delivery works.
 *
 * For now we validate and log; nothing is persisted.
 */

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const subscribeSchema = z.object({
  token: z.string().min(10, "an FCM registration token is required"),
});

export async function POST(request: Request) {
  let json: unknown;
  try {
    json = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Invalid JSON body" },
      { status: 400 },
    );
  }

  const parsed = subscribeSchema.safeParse(json);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: "Validation failed", issues: parsed.error.flatten() },
      { status: 422 },
    );
  }

  const { token } = parsed.data;

  // TODO: upsert into fcm_tokens + send welcome push (see header comment).
  console.info("[notifications/subscribe] token registered (stub)", {
    token: `${token.slice(0, 12)}…`,
  });

  return NextResponse.json({ ok: true });
}
