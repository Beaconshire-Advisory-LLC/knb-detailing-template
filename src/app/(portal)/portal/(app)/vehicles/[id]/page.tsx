import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCurrentUser,
  getSupabaseServerClient,
} from "@/lib/supabase/server";
import { deleteVehicle } from "@/lib/actions/vehicles";
import { formatDateTime } from "@/lib/formatting";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vehicle detail",
  description: "",
  path: "/portal/vehicles",
  noIndex: true,
});

export default async function VehicleDetailPage(
  props: PageProps<"/portal/vehicles/[id]">,
) {
  const { id } = await props.params;
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();

  const { data: vehicle } = await supabase
    .from("vehicles")
    .select("*")
    .eq("id", id)
    .eq("owner_id", user!.id)
    .maybeSingle();

  if (!vehicle) notFound();

  const { data: appointments } = await supabase
    .from("appointments")
    .select("id, status, scheduled_start, total_cents")
    .eq("vehicle_id", id)
    .order("scheduled_start", { ascending: false });

  return (
    <div className="space-y-6">
      <Link
        href="/portal/vehicles"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden />
        Back to vehicles
      </Link>

      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {vehicle.kind}
          </p>
          <h1 className="text-2xl font-bold tracking-tight">
            {vehicle.year} {vehicle.make} {vehicle.model}
          </h1>
          {vehicle.color && (
            <p className="text-sm text-muted-foreground">{vehicle.color}</p>
          )}
        </div>
        <Button render={<Link href={`/book?vehicle=${vehicle.id}`} />}>
          <Calendar className="mr-1.5 size-4" aria-hidden />
          Book service
        </Button>
      </header>

      {vehicle.notes && (
        <Card>
          <CardContent className="p-6">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Notes
            </h2>
            <p className="mt-2 text-sm">{vehicle.notes}</p>
          </CardContent>
        </Card>
      )}

      <section>
        <h2 className="text-lg font-bold">Service history</h2>
        {!appointments || appointments.length === 0 ? (
          <Card className="mt-3">
            <CardContent className="p-6 text-center">
              <p className="text-sm text-muted-foreground">
                No appointments yet for this vehicle.
              </p>
            </CardContent>
          </Card>
        ) : (
          <ul className="mt-3 space-y-2">
            {appointments.map((a) => (
              <li key={a.id}>
                <Card>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium">
                        {formatDateTime(a.scheduled_start)}
                      </p>
                      <p className="text-xs uppercase tracking-wider text-muted-foreground">
                        {a.status.replace("_", " ")}
                      </p>
                    </div>
                    <Link
                      href={`/portal/appointments/${a.id}`}
                      className="text-sm font-medium text-primary hover:underline"
                    >
                      Details →
                    </Link>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </section>

      <Card className="border-destructive/30">
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <p className="text-sm font-semibold">Remove this vehicle</p>
            <p className="text-xs text-muted-foreground">
              Service history is preserved.
            </p>
          </div>
          <form action={deleteVehicle}>
            <input type="hidden" name="id" value={vehicle.id} />
            <Button variant="destructive" size="sm" type="submit">
              Delete
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
