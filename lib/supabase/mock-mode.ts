import { publicEnv } from "@/lib/env.public";

export function isMockMode(): boolean {
  return (
    !publicEnv.NEXT_PUBLIC_SUPABASE_URL ||
    !publicEnv.NEXT_PUBLIC_SUPABASE_ANON_KEY
  );
}

if (typeof window === "undefined" && isMockMode()) {
  console.warn(
    "[supabase] Running in mock mode — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to wire the real backend.",
  );
}
