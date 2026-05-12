import Link from "next/link";
import { startOfDay, endOfDay, addDays } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { formatDateTime, formatCurrency } from "@/lib/formatting";

type Row = {
  id: string;
  status: string;
  scheduled_start: string;
  scheduled_end: string;
  service_address: string;
  service_zip: string | null;
  service_city: string | null;
  total_cents: number;
  customer_id: string;
};

const STATUS_TONE: Record<string, string> = {
  pending: "bg-amber-100 text-amber-900",
  confirmed: "bg-primary/10 text-primary",
  in_progress: "bg-blue-100 text-blue-900",
  completed: "bg-emerald-100 text-emerald-900",
  cancelled: "bg-muted text-muted-foreground",
  no_show: "bg-rose-100 text-rose-900",
};

export default async function AdminAppointmentsPage() {
  const supabase = await getSupabaseServerClient();
  const now = new Date();
  const todayStart = startOfDay(now).toISOString();
  const todayEnd = endOfDay(now).toISOString();
  const weekEnd = endOfDay(addDays(now, 7)).toISOString();

  const [todayRes, weekRes, allRes] = await Promise.all([
    supabase
      .from("appointments")
      .select("id,status,scheduled_start,scheduled_end,service_address,service_zip,service_city,total_cents,customer_id")
      .gte("scheduled_start", todayStart)
      .lte("scheduled_start", todayEnd)
      .order("scheduled_start", { ascending: true }),
    supabase
      .from("appointments")
      .select("id,status,scheduled_start,scheduled_end,service_address,service_zip,service_city,total_cents,customer_id")
      .gt("scheduled_start", todayEnd)
      .lte("scheduled_start", weekEnd)
      .neq("status", "cancelled")
      .order("scheduled_start", { ascending: true }),
    supabase
      .from("appointments")
      .select("id,status,scheduled_start,scheduled_end,service_address,service_zip,service_city,total_cents,customer_id")
      .order("scheduled_start", { ascending: false })
      .limit(100),
  ]);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Appointments</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Today first, then this week. Tap a row to manage.
        </p>
      </header>

      <Tabs defaultValue="today">
        <TabsList>
          <TabsTrigger value="today">
            Today ({todayRes.data?.length ?? 0})
          </TabsTrigger>
          <TabsTrigger value="week">
            This week ({weekRes.data?.length ?? 0})
          </TabsTrigger>
          <TabsTrigger value="all">All</TabsTrigger>
        </TabsList>
        <TabsContent value="today" className="mt-6">
          <GroupedByZip rows={todayRes.data ?? []} />
        </TabsContent>
        <TabsContent value="week" className="mt-6">
          <GroupedByZip rows={weekRes.data ?? []} />
        </TabsContent>
        <TabsContent value="all" className="mt-6 space-y-2">
          {(allRes.data ?? []).length === 0 ? (
            <Card>
              <CardContent className="p-6 text-center text-sm text-muted-foreground">
                No appointments yet.
              </CardContent>
            </Card>
          ) : (
            (allRes.data ?? []).map((r) => <AppointmentRow key={r.id} row={r} />)
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}

function GroupedByZip({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center text-sm text-muted-foreground">
          Nothing scheduled.
        </CardContent>
      </Card>
    );
  }
  const grouped: Record<string, Row[]> = {};
  rows.forEach((r) => {
    const key = r.service_zip || "no-zip";
    grouped[key] ??= [];
    grouped[key].push(r);
  });
  return (
    <div className="space-y-4">
      {Object.entries(grouped).map(([zip, group]) => (
        <div key={zip}>
          <h2 className="mb-2 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            ZIP {zip} · {group.length} job{group.length === 1 ? "" : "s"}
          </h2>
          <div className="space-y-2">
            {group.map((r) => (
              <AppointmentRow key={r.id} row={r} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

function AppointmentRow({ row }: { row: Row }) {
  return (
    <Card>
      <CardContent className="flex items-center justify-between gap-4 p-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <Badge className={STATUS_TONE[row.status] ?? "bg-muted text-muted-foreground"}>
              {row.status.replace("_", " ")}
            </Badge>
            <span className="text-sm font-medium">
              {formatDateTime(row.scheduled_start)}
            </span>
          </div>
          <p className="mt-1 truncate text-xs text-muted-foreground">
            {row.service_address}
            {row.service_city ? `, ${row.service_city}` : ""}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm font-semibold tabular-nums">
            {formatCurrency(row.total_cents, { showCents: false })}
          </span>
          <Button
            size="sm"
            variant="outline"
            render={<Link href={`/admin/appointments/${row.id}`} />}
          >
            Manage
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
