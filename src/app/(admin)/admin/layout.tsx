import { redirect } from "next/navigation";
import { AdminShell } from "@/components/admin/admin-shell";
import {
  getCurrentUser,
  getCurrentProfile,
} from "@/lib/supabase/server";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/portal/login?next=/admin");

  const profile = await getCurrentProfile();
  if (!profile || (profile.role !== "admin" && profile.role !== "staff")) {
    redirect("/portal/dashboard");
  }

  return <AdminShell userEmail={user.email ?? ""}>{children}</AdminShell>;
}

export const dynamic = "force-dynamic";
