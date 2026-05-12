import { Card, CardContent } from "@/components/ui/card";
import { Clock } from "lucide-react";

export default function AdminAvailabilityPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Availability</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Business hours, day blocks, and same-day cutoffs.
        </p>
      </header>

      <Card>
        <CardContent className="p-8 text-center">
          <Clock className="mx-auto size-10 text-muted-foreground" aria-hidden />
          <h2 className="mt-3 text-lg font-bold">
            Coming in Phase 5b
          </h2>
          <p className="mt-2 max-w-md text-sm text-muted-foreground">
            Configurable weekly hours, vacation blocks, buffer time between
            appointments, and a same-day booking cutoff. For now,
            availability is determined by the booking form&apos;s
            datetime-local input and the owner&apos;s manual confirmation.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
