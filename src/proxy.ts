import { NextRequest, NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";
import type { Database } from "@/types/db";

/**
 * Next.js 16: middleware was renamed to proxy. nodejs runtime only.
 *
 * This proxy refreshes the Supabase auth session on every navigation and
 * gates the /portal/* and /admin/* areas behind authentication and role
 * checks.
 */
export async function proxy(request: NextRequest) {
  let response = NextResponse.next({ request });

  // Supabase configured? If not, no auth gating to enforce.
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  ) {
    return response;
  }

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll: () => request.cookies.getAll(),
        setAll: (toSet) => {
          toSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          response = NextResponse.next({ request });
          toSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Always refresh — Supabase rotates the access token.
  const { data: userResult } = await supabase.auth.getUser();
  const user = userResult.user;

  const { pathname } = request.nextUrl;
  const isPortal = pathname.startsWith("/portal");
  const isAdmin = pathname.startsWith("/admin");
  const isAuthEntry =
    pathname === "/portal/login" || pathname === "/portal/signup";

  // Unauthenticated → require sign-in for portal/admin (except the auth pages).
  if ((isPortal || isAdmin) && !isAuthEntry && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // If we're signed in and visiting the auth entry pages, send to dashboard.
  if (isAuthEntry && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/portal/dashboard";
    url.search = "";
    return NextResponse.redirect(url);
  }

  // /admin/* requires role=admin (or staff)
  if (isAdmin && user) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();
    if (!profile || (profile.role !== "admin" && profile.role !== "staff")) {
      const url = request.nextUrl.clone();
      url.pathname = "/portal/dashboard";
      return NextResponse.redirect(url);
    }
  }

  return response;
}

export const config = {
  // Only run proxy on auth-relevant routes (cheaper, avoids static-asset overhead).
  matcher: ["/portal/:path*", "/admin/:path*"],
};
