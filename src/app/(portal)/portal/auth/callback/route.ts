import { NextResponse, type NextRequest } from "next/server";
import { getSupabaseServerClient } from "@/lib/supabase/server";

/**
 * Supabase auth callback — exchanges the OAuth code or magic-link code for
 * a session, then forwards the user to ?next= or /portal/dashboard.
 */
export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl;
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/portal/dashboard";

  if (code) {
    const supabase = await getSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (error) {
      console.error("[auth/callback] exchange failed", error);
      return NextResponse.redirect(`${origin}/portal/login?error=exchange`);
    }
  }
  return NextResponse.redirect(`${origin}${next}`);
}
