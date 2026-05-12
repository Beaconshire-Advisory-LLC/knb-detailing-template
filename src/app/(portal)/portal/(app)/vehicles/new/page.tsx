import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { VehicleForm } from "@/components/portal/vehicle-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Add vehicle",
  description: "",
  path: "/portal/vehicles/new",
  noIndex: true,
});

export default function NewVehiclePage() {
  return (
    <div className="space-y-6">
      <Link
        href="/portal/vehicles"
        className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground hover:text-foreground"
      >
        <ChevronLeft className="size-4" aria-hidden />
        Back to vehicles
      </Link>
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Add a vehicle</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Fill in what you know. You can edit later.
        </p>
      </header>
      <Card>
        <CardContent className="p-6">
          <VehicleForm />
        </CardContent>
      </Card>
    </div>
  );
}
