import Link from "next/link";
import { Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { formatDateTime, formatCurrency } from "@/lib/formatting";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Appointments",
  description: "",
  path: "/portal/appointments",
  noIndex: true,
});

const STATUS_LABEL: Record<string, string> = {
  pending: "Pending confirmation",
  confirmed: "Confirmed",
  in_progress: "In progress",
  completed: "Completed",
  cancelled: "Cancelled",
  no_show: "No-show",
};

export default async function AppointmentsPage() {
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();
  const now = new Date().toISOString();

  const [upcoming, past] = await Promise.all([
    supabase
      .from("appointments")
      .select("id, status, scheduled_start, service_address, total_cents")
      .eq("customer_id", user!.id)
      .gte("scheduled_start", now)
      .neq("status", "cancelled")
      .order("scheduled_start", { ascending: true }),
    supabase
      .from("appointments")
      .select("id, status, scheduled_start, service_address, total_cents")
      .eq("customer_id", user!.id)
      .or(`scheduled_start.lt.${now},status.eq.cancelled`)
      .order("scheduled_start", { ascending: false })
      .limit(50),
  ]);

  const upcomingList = upcoming.data ?? [];
  const pastList = past.data ?? [];

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your scheduled and past services.
          </p>
        </div>
        <Button render={<Link href="/book" />}>
          <Calendar className="mr-1.5 size-4" aria-hidden />
          Book another
        </Button>
      </header>

      <Tabs defaultValue="upcoming">
        <TabsList>
          <TabsTrigger value="upcoming">
            Upcoming ({upcomingList.length})
          </TabsTrigger>
          <TabsTrigger value="past">Past ({pastList.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-6 space-y-3">
          {upcomingList.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                No upcoming appointments.
              </CardContent>
            </Card>
          ) : (
            upcomingList.map((a) => (
              <AppointmentRow key={a.id} appointment={a} />
            ))
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-6 space-y-3">
          {pastList.length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                No past appointments yet.
              </CardContent>
            </Card>
          ) : (
            pastList.map((a) => (
              <AppointmentRow key={a.id} appointment={a} />
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function AppointmentRow({
  appointment,
}: {
  appointment: {
    id: string;
    status: string;
    scheduled_start: string;
    service_address: string;
    total_cents: number;
  };
}) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-medium">
            {formatDateTime(appointment.scheduled_start)}
          </p>
          <p className="truncate text-xs text-muted-foreground">
            {appointment.service_address}
          </p>
          <div className="mt-2 flex items-center gap-2">
            <Badge variant="secondary" className="text-[10px] uppercase">
              {STATUS_LABEL[appointment.status] ?? appointment.status}
            </Badge>
            <span className="text-xs tabular-nums text-muted-foreground">
              {formatCurrency(appointment.total_cents, { showCents: false })}
            </span>
          </div>
        </div>
        <Link
          href={`/portal/appointments/${appointment.id}`}
          className="shrink-0 text-sm font-medium text-primary hover:underline"
        >
          View →
        </Link>
      </CardContent>
    </Card>
  );
}
