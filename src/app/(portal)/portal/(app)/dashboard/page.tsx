import Link from "next/link";
import { Calendar, Car, Plus, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCurrentUser,
  getSupabaseServerClient,
} from "@/lib/supabase/server";
import { formatDateTime } from "@/lib/formatting";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Dashboard",
  description: "",
  path: "/portal/dashboard",
  noIndex: true,
});

export default async function DashboardPage() {
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();

  const [vehiclesRes, upcomingRes, membershipRes] = await Promise.all([
    supabase
      .from("vehicles")
      .select("id, kind, year, make, model, color, primary_photo_url")
      .eq("owner_id", user!.id)
      .limit(4),
    supabase
      .from("appointments")
      .select("id, status, scheduled_start, service_address, total_cents, package_id")
      .eq("customer_id", user!.id)
      .gte("scheduled_start", new Date().toISOString())
      .neq("status", "cancelled")
      .order("scheduled_start", { ascending: true })
      .limit(1),
    supabase
      .from("memberships")
      .select("id, status, current_period_end, package_id")
      .eq("customer_id", user!.id)
      .eq("status", "active")
      .maybeSingle(),
  ]);

  const vehicles = vehiclesRes.data ?? [];
  const nextAppt = upcomingRes.data?.[0];
  const membership = membershipRes.data;

  // Resolve package name separately (Relationships aren't declared in hand-written types)
  let membershipPkgName: string | null = null;
  let membershipPkgRenewal: string | null = null;
  if (membership?.package_id) {
    const { data: pkg } = await supabase
      .from("packages")
      .select("name")
      .eq("id", membership.package_id)
      .maybeSingle();
    membershipPkgName = pkg?.name ?? null;
    membershipPkgRenewal = membership.current_period_end;
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Welcome back.</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your detailing at a glance.
        </p>
      </header>

      <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* Next appointment */}
        <Card className="sm:col-span-2 lg:col-span-2">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Calendar className="size-4" aria-hidden />
              Next appointment
            </div>
            {nextAppt ? (
              <>
                <p className="mt-2 text-xl font-bold">
                  {formatDateTime(nextAppt.scheduled_start)}
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {nextAppt.service_address}
                </p>
                <p className="mt-2 text-xs uppercase tracking-wider text-primary">
                  {nextAppt.status.replace("_", " ")}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  render={<Link href={`/portal/appointments/${nextAppt.id}`} />}
                >
                  View details
                </Button>
              </>
            ) : (
              <>
                <p className="mt-2 text-base text-muted-foreground">
                  No upcoming bookings. Let&apos;s fix that.
                </p>
                <Button className="mt-4" render={<Link href="/book" />}>
                  Book a detail
                </Button>
              </>
            )}
          </CardContent>
        </Card>

        {/* Membership status */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
              <Sparkles className="size-4" aria-hidden />
              Membership
            </div>
            {membership ? (
              <>
                <p className="mt-2 text-base font-bold">
                  {membershipPkgName ?? "Active"}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Renews{" "}
                  {membershipPkgRenewal
                    ? formatDateTime(membershipPkgRenewal)
                    : "—"}
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  render={<Link href="/portal/membership" />}
                >
                  Manage
                </Button>
              </>
            ) : (
              <>
                <p className="mt-2 text-sm text-muted-foreground">
                  Not subscribed yet. Save up to 20% with a recurring plan.
                </p>
                <Button
                  variant="outline"
                  className="mt-4"
                  render={<Link href="/membership" />}
                >
                  See plans
                </Button>
              </>
            )}
          </CardContent>
        </Card>
      </section>

      <section>
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold">Your vehicles</h2>
          <Button
            variant="outline"
            size="sm"
            render={<Link href="/portal/vehicles/new" />}
          >
            <Plus className="mr-1.5 size-4" aria-hidden />
            Add vehicle
          </Button>
        </div>
        {vehicles.length === 0 ? (
          <Card className="mt-3">
            <CardContent className="p-6 text-center">
              <Car className="mx-auto size-8 text-muted-foreground" aria-hidden />
              <p className="mt-2 text-sm text-muted-foreground">
                No vehicles on file yet. Add one to speed up future bookings.
              </p>
              <Button
                className="mt-4"
                render={<Link href="/portal/vehicles/new" />}
              >
                Add a vehicle
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {vehicles.map((v) => (
              <Card key={v.id}>
                <CardContent className="p-4">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {v.kind}
                  </p>
                  <p className="mt-1 text-base font-bold">
                    {v.year} {v.make} {v.model}
                  </p>
                  <p className="text-xs text-muted-foreground">{v.color}</p>
                  <Link
                    href={`/portal/vehicles/${v.id}`}
                    className="mt-3 inline-block text-sm font-medium text-primary hover:underline"
                  >
                    Details →
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
