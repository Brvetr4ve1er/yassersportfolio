import "server-only";
import { createClient as createSupabase } from "@supabase/supabase-js";
import { publicEnv } from "@/lib/env.public";
import { serverEnv } from "@/lib/env.server";

export function createAdminClient() {
  const url = publicEnv.NEXT_PUBLIC_SUPABASE_URL;
  const serviceKey = serverEnv.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceKey) return null;
  return createSupabase(url, serviceKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
