import { createBrowserClient } from "@supabase/ssr";
import { isMockMode } from "./mock-mode";

export function createClient() {
  if (isMockMode()) {
    return null;
  }
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
