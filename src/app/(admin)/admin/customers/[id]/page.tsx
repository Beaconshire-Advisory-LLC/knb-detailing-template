import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate, formatDateTime, formatCurrency } from "@/lib/formatting";

export default async function AdminCustomerDetail(
  props: PageProps<"/admin/customers/[id]">,
) {
  const { id } = await props.params;
  const supabase = await getSupabaseServerClient();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (!profile) notFound();

  const [vehiclesRes, apptsRes] = await Promise.all([
    supabase
      .from("vehicles")
      .select("id, kind, year, make, model")
      .eq("owner_id", id),
    supabase
      .from("appointments")
      .select("id, status, scheduled_start, total_cents")
      .eq("customer_id", id)
      .order("scheduled_start", { ascending: false })
      .limit(50),
  ]);

  const lifetimeCents = (apptsRes.data ?? [])
    .filter((a) => a.status === "completed")
    .reduce((s, a) => s + a.total_cents, 0);

  return (
    <div className="space-y-6">
      <Link
        href="/admin/customers"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden />
        Back to customers
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            {profile.full_name ?? "—"}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground break-all">
            {profile.email}
          </p>
          {profile.phone && (
            <p className="text-sm tabular-nums">{profile.phone}</p>
          )}
        </div>
        <div className="text-right">
          <p className="text-xs text-muted-foreground">Joined</p>
          <p className="text-sm">
            {formatDate(profile.created_at, { weekday: undefined })}
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Lifetime value
            </p>
            <p className="mt-2 text-3xl font-bold tabular-nums">
              {formatCurrency(lifetimeCents)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Vehicles
            </p>
            <p className="mt-2 text-3xl font-bold tabular-nums">
              {vehiclesRes.data?.length ?? 0}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <p className="text-xs uppercase tracking-wider text-muted-foreground">
              Total appointments
            </p>
            <p className="mt-2 text-3xl font-bold tabular-nums">
              {apptsRes.data?.length ?? 0}
            </p>
          </CardContent>
        </Card>
      </div>

      <section>
        <h2 className="text-lg font-bold">Vehicles</h2>
        <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {(vehiclesRes.data ?? []).map((v) => (
            <Card key={v.id}>
              <CardContent className="p-4">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  {v.kind}
                </p>
                <p className="mt-1 text-sm font-medium">
                  {v.year} {v.make} {v.model}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-bold">Appointments</h2>
        <ul className="mt-3 space-y-2">
          {(apptsRes.data ?? []).map((a) => (
            <li key={a.id}>
              <Link href={`/admin/appointments/${a.id}`}>
                <Card className="transition-colors hover:bg-muted/40">
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <Badge variant="secondary" className="mb-1 text-[10px] uppercase">
                        {a.status.replace("_", " ")}
                      </Badge>
                      <p className="text-sm">{formatDateTime(a.scheduled_start)}</p>
                    </div>
                    <span className="text-sm font-semibold tabular-nums">
                      {formatCurrency(a.total_cents, { showCents: false })}
                    </span>
                  </CardContent>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
