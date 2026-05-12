import { startOfMonth, startOfYear } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { formatCurrency } from "@/lib/formatting";

export default async function AdminReportsPage() {
  const supabase = await getSupabaseServerClient();
  const now = new Date();
  const monthStart = startOfMonth(now).toISOString();
  const yearStart = startOfYear(now).toISOString();

  const [monthRes, yearRes, customerRes] = await Promise.all([
    supabase
      .from("appointments")
      .select("total_cents", { count: "exact" })
      .gte("scheduled_start", monthStart)
      .eq("status", "completed"),
    supabase
      .from("appointments")
      .select("total_cents")
      .gte("scheduled_start", yearStart)
      .eq("status", "completed"),
    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .eq("role", "customer"),
  ]);

  const monthCents = (monthRes.data ?? []).reduce((s, a) => s + a.total_cents, 0);
  const yearCents = (yearRes.data ?? []).reduce((s, a) => s + a.total_cents, 0);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Reports</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Quick at-a-glance numbers. Phase 8 expands this with charts and
          per-service breakdowns.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Revenue this month
            </p>
            <p className="mt-3 text-3xl font-extrabold tabular-nums">
              {formatCurrency(monthCents)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {monthRes.count ?? 0} completed appointments
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Revenue this year
            </p>
            <p className="mt-3 text-3xl font-extrabold tabular-nums">
              {formatCurrency(yearCents)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Customers
            </p>
            <p className="mt-3 text-3xl font-extrabold tabular-nums">
              {customerRes.count ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
