import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/db";

/**
 * Service-role Supabase client — bypasses RLS. Use ONLY in:
 *  - Stripe webhook handlers
 *  - Cron jobs
 *  - Server actions explicitly running with elevated privileges
 *
 * NEVER import this from a Client Component or any code that ships to the
 * browser. The service role key is a full bypass.
 */
let cached: ReturnType<typeof createClient<Database>> | null = null;

export function getSupabaseAdminClient() {
  if (cached) return cached;
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    throw new Error(
      "SUPABASE_SERVICE_ROLE_KEY is not set. This client cannot run without it.",
    );
  }
  cached = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    { auth: { persistSession: false, autoRefreshToken: false } },
  );
  return cached;
}
