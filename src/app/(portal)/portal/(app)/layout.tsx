import { redirect } from "next/navigation";
import { PortalShell } from "@/components/portal/portal-shell";
import {
  getCurrentUser,
  getCurrentProfile,
} from "@/lib/supabase/server";

/**
 * Auth-required portal layout. Wraps every page under /portal/(app)/*.
 * The proxy enforces auth at the request boundary; this layout is a
 * belt-and-suspenders fallback that also fetches the profile for the shell.
 */
export default async function AuthedPortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login");
  const profile = await getCurrentProfile();

  return (
    <PortalShell
      userEmail={user.email ?? ""}
      userName={profile?.full_name ?? null}
    >
      {children}
    </PortalShell>
  );
}
