import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, MapPin, Calendar, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getCurrentUser,
  getSupabaseServerClient,
} from "@/lib/supabase/server";
import { formatDateTime, formatCurrency } from "@/lib/formatting";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Appointment",
  description: "",
  path: "/portal/appointments",
  noIndex: true,
});

const STATUS_TONE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-900",
  confirmed: "bg-primary/10 text-primary",
  in_progress: "bg-blue-100 text-blue-900",
  completed: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-muted text-muted-foreground",
  no_show: "bg-rose-100 text-rose-900",
};

export default async function AppointmentDetailPage(
  props: PageProps<"/portal/appointments/[id]">,
) {
  const { id } = await props.params;
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();

  const { data: appt } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .eq("customer_id", user!.id)
    .maybeSingle();

  if (!appt) notFound();

  // Resolve linked entities separately (Relationships aren't declared)
  const [vehicleRes, lineItemsRes] = await Promise.all([
    supabase
      .from("vehicles")
      .select("year, make, model, kind")
      .eq("id", appt.vehicle_id)
      .maybeSingle(),
    supabase
      .from("appointment_services")
      .select("price_cents, service_id")
      .eq("appointment_id", id),
  ]);
  const vehicle = vehicleRes.data;
  const lineItems = lineItemsRes.data ?? [];

  // Resolve service names for line items
  const serviceIds = lineItems.map((li) => li.service_id);
  const serviceNames: Record<string, string> = {};
  if (serviceIds.length > 0) {
    const { data: svcs } = await supabase
      .from("services")
      .select("id, name")
      .in("id", serviceIds);
    (svcs ?? []).forEach((s) => {
      serviceNames[s.id] = s.name;
    });
  }

  return (
    <div className="space-y-6">
      <Link
        href="/portal/appointments"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden />
        Back to appointments
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Badge
            className={`mb-2 ${STATUS_TONE[appt.status] ?? "bg-muted text-muted-foreground"}`}
          >
            {appt.status.replace("_", " ")}
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight">
            {formatDateTime(appt.scheduled_start)}
          </h1>
          {vehicle && (
            <p className="mt-1 text-sm text-muted-foreground">
              {vehicle.year} {vehicle.make} {vehicle.model}
            </p>
          )}
        </div>
        {appt.status === "completed" && !appt.balance_paid && (
          <Button render={<Link href={`/portal/billing?appt=${appt.id}`} />}>
            <CreditCard className="mr-1.5 size-4" aria-hidden />
            Pay balance
          </Button>
        )}
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Services
            </h2>
            <ul className="mt-3 divide-y divide-border">
              {lineItems.length === 0 ? (
                <li className="py-3 text-sm text-muted-foreground">
                  Package details below.
                </li>
              ) : (
                lineItems.map((s, i) => (
                  <li key={i} className="flex items-center justify-between py-3">
                    <span className="text-sm">
                      {serviceNames[s.service_id] ?? "Service"}
                    </span>
                    <span className="text-sm font-medium tabular-nums">
                      {formatCurrency(s.price_cents, { showCents: false })}
                    </span>
                  </li>
                ))
              )}
              <li className="flex items-center justify-between py-3">
                <span className="text-sm text-muted-foreground">Travel</span>
                <span className="text-sm tabular-nums">
                  {formatCurrency(appt.travel_fee_cents, { showCents: false })}
                </span>
              </li>
              {appt.discount_cents > 0 && (
                <li className="flex items-center justify-between py-3">
                  <span className="text-sm text-muted-foreground">Discount</span>
                  <span className="text-sm tabular-nums text-emerald-700">
                    −{formatCurrency(appt.discount_cents, { showCents: false })}
                  </span>
                </li>
              )}
              <li className="flex items-center justify-between py-3 text-lg font-bold">
                <span>Total</span>
                <span className="tabular-nums">
                  {formatCurrency(appt.total_cents)}
                </span>
              </li>
              <li className="flex items-center justify-between py-3 text-xs text-muted-foreground">
                <span>Deposit ({appt.deposit_paid ? "paid" : "pending"})</span>
                <span className="tabular-nums">
                  {formatCurrency(appt.deposit_cents)}
                </span>
              </li>
            </ul>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Where
              </h3>
              <div className="mt-3 flex items-start gap-2 text-sm">
                <MapPin className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <p>
                  {appt.service_address}
                  {appt.service_city && (
                    <>
                      <br />
                      {appt.service_city}, {appt.service_state}{" "}
                      {appt.service_zip}
                    </>
                  )}
                </p>
              </div>
            </CardContent>
          </Card>
          {appt.service_notes && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Your notes
                </h3>
                <p className="mt-2 text-sm">{appt.service_notes}</p>
              </CardContent>
            </Card>
          )}
          {appt.status === "confirmed" && (
            <Card className="border-amber-300/40 bg-amber-50/40">
              <CardContent className="p-6">
                <Calendar className="size-5 text-amber-700" aria-hidden />
                <p className="mt-2 text-sm font-medium">Need to reschedule?</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  Free reschedule &gt;48 hours out. Call us within 48 hours.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
