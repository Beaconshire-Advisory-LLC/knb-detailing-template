import Link from "next/link";
import { Plus, Car } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getCurrentUser, getSupabaseServerClient } from "@/lib/supabase/server";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Vehicles",
  description: "",
  path: "/portal/vehicles",
  noIndex: true,
});

export default async function VehiclesPage() {
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();
  const { data: vehicles } = await supabase
    .from("vehicles")
    .select("id, kind, year, make, model, color, primary_photo_url, notes")
    .eq("owner_id", user!.id)
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Your vehicles</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            We&apos;ll use these to pre-fill your bookings and build your
            service history.
          </p>
        </div>
        <Button render={<Link href="/portal/vehicles/new" />}>
          <Plus className="mr-1.5 size-4" aria-hidden />
          Add vehicle
        </Button>
      </header>

      {(vehicles ?? []).length === 0 ? (
        <Card>
          <CardContent className="p-10 text-center">
            <Car className="mx-auto size-10 text-muted-foreground" aria-hidden />
            <p className="mt-3 text-base font-medium">No vehicles yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first vehicle to skip these fields on future bookings.
            </p>
            <Button
              className="mt-6"
              render={<Link href="/portal/vehicles/new" />}
            >
              Add a vehicle
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles!.map((v) => (
            <Card key={v.id}>
              <CardContent className="p-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {v.kind}
                </p>
                <h2 className="mt-1 text-lg font-bold">
                  {v.year} {v.make} {v.model}
                </h2>
                {v.color && (
                  <p className="text-sm text-muted-foreground">{v.color}</p>
                )}
                {v.notes && (
                  <p className="mt-3 text-xs text-muted-foreground line-clamp-2">
                    {v.notes}
                  </p>
                )}
                <div className="mt-4 flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    render={<Link href={`/portal/vehicles/${v.id}`} />}
                  >
                    View
                  </Button>
                  <Button
                    size="sm"
                    render={
                      <Link href={`/book?vehicle=${v.id}`} />
                    }
                  >
                    Book for this
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
