import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  updateAppointmentStatus,
  addAppointmentNote,
} from "@/lib/actions/admin";
import { formatDateTime, formatCurrency } from "@/lib/formatting";

export default async function AdminAppointmentDetail(
  props: PageProps<"/admin/appointments/[id]">,
) {
  const { id } = await props.params;
  const supabase = await getSupabaseServerClient();
  const { data: appt } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!appt) notFound();

  const [vehicleRes, customerRes] = await Promise.all([
    supabase
      .from("vehicles")
      .select("year, make, model, kind, color")
      .eq("id", appt.vehicle_id)
      .maybeSingle(),
    supabase
      .from("profiles")
      .select("email, full_name, phone")
      .eq("id", appt.customer_id)
      .maybeSingle(),
  ]);
  const vehicle = vehicleRes.data;
  const customer = customerRes.data;

  return (
    <div className="space-y-6">
      <Link
        href="/admin/appointments"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden />
        Back to appointments
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <Badge className="mb-2">
            {appt.status.replace("_", " ")}
          </Badge>
          <h1 className="text-2xl font-bold tracking-tight">
            {formatDateTime(appt.scheduled_start)}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {vehicle?.year} {vehicle?.make} {vehicle?.model} ({vehicle?.kind})
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="space-y-6 p-6">
            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Status
              </h2>
              <form action={updateAppointmentStatus} className="mt-3 flex gap-2">
                <input type="hidden" name="id" value={appt.id} />
                <Select name="status" defaultValue={appt.status}>
                  <SelectTrigger className="w-60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="confirmed">Confirmed</SelectItem>
                    <SelectItem value="in_progress">In progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                    <SelectItem value="no_show">No-show</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" size="sm">
                  Save
                </Button>
              </form>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Internal notes
              </h2>
              <form action={addAppointmentNote} className="mt-3 space-y-2">
                <input type="hidden" name="id" value={appt.id} />
                <Textarea
                  name="internal_notes"
                  defaultValue={appt.internal_notes ?? ""}
                  rows={4}
                  placeholder="Crew notes, weather decisions, customer quirks, route notes…"
                />
                <Button type="submit" size="sm" variant="outline">
                  Save note
                </Button>
              </form>
            </section>

            <section>
              <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Money
              </h2>
              <div className="mt-3 grid grid-cols-2 gap-2 text-sm">
                <p>Total</p>
                <p className="text-right font-semibold tabular-nums">
                  {formatCurrency(appt.total_cents)}
                </p>
                <p>Deposit ({appt.deposit_paid ? "paid" : "pending"})</p>
                <p className="text-right tabular-nums">
                  {formatCurrency(appt.deposit_cents)}
                </p>
                <p>Balance ({appt.balance_paid ? "paid" : "pending"})</p>
                <p className="text-right tabular-nums">
                  {formatCurrency(appt.total_cents - appt.deposit_cents)}
                </p>
              </div>
              <Label className="mt-4 block text-xs text-muted-foreground">
                Balance-charge button connects to Stripe in Phase 6.
              </Label>
            </section>

            <section>
              <Label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Photos
              </Label>
              <p className="mt-2 text-sm text-muted-foreground">
                Photo upload reads from Supabase Storage <code>service-photos/</code>{" "}
                bucket. The upload UI is a Phase 5b enhancement; for now,
                upload manually in Supabase Studio and the photo will appear
                in the customer&apos;s portal.
              </p>
            </section>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Customer
              </h3>
              <p className="mt-2 text-sm font-medium">
                {customer?.full_name ?? "—"}
              </p>
              <p className="text-xs text-muted-foreground break-all">
                {customer?.email}
              </p>
              {customer?.phone && (
                <p className="mt-1 text-xs tabular-nums">{customer.phone}</p>
              )}
              <Button
                variant="outline"
                size="sm"
                className="mt-4"
                render={<Link href={`/admin/customers/${appt.customer_id}`} />}
              >
                View customer
              </Button>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                Location
              </h3>
              <p className="mt-2 text-sm">
                {appt.service_address}
                {appt.service_city && (
                  <>
                    <br />
                    {appt.service_city}, {appt.service_state} {appt.service_zip}
                  </>
                )}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
