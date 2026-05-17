export function isMockMode(): boolean {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  return !url || !anon;
}

if (typeof window === "undefined" && isMockMode()) {
  console.warn(
    "[supabase] Running in mock mode — set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to wire the real backend.",
  );
}
