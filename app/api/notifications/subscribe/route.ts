import { NextResponse } from "next/server";

/**
 * Register an FCM subscription token for the current user.
 *
 * V1 stub: logs and returns ok. Wire up to:
 *   1. Persist token to a `fcm_tokens` table keyed by user_id
 *   2. Send a "welcome" notification to test the channel
 *   3. Mark user as opted-in
 */
export async function POST(request: Request) {
  const body = await request.json().catch(() => null);
  if (!body?.token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }
  console.info("[fcm] token registered (stub)", { tokenPrefix: body.token.slice(0, 12) });
  return NextResponse.json({ ok: true });
}
