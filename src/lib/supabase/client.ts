"use client";

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/db";

let cachedClient: ReturnType<typeof createBrowserClient<Database>> | null = null;

/** Singleton browser Supabase client. Safe to call repeatedly. */
export function getSupabaseBrowserClient() {
  if (cachedClient) return cachedClient;
  cachedClient = createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
  return cachedClient;
}
