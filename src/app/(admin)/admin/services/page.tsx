import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  deleteService,
} from "@/lib/actions/admin";

export default async function AdminServicesPage() {
  const supabase = await getSupabaseServerClient();
  const { data: services } = await supabase
    .from("services")
    .select("id, slug, name, category, base_duration_min, active, sort_order")
    .order("category")
    .order("sort_order");

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Services</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Catalog management. Pricing per size is managed inline once a
            service exists.
          </p>
        </div>
      </header>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Service</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Duration</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(services ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                    No services in catalog yet. Apply <code>supabase/seed.sql</code>{" "}
                    to populate.
                  </TableCell>
                </TableRow>
              ) : (
                services!.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>
                      <p className="font-medium">{s.name}</p>
                      <p className="text-xs text-muted-foreground">{s.slug}</p>
                    </TableCell>
                    <TableCell className="capitalize">{s.category}</TableCell>
                    <TableCell className="tabular-nums">
                      {s.base_duration_min} min
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={s.active ? "bg-emerald-100 text-emerald-900" : "bg-muted text-muted-foreground"}
                      >
                        {s.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <form action={deleteService} className="inline-block">
                        <input type="hidden" name="id" value={s.id} />
                        <Button
                          type="submit"
                          variant="ghost"
                          size="sm"
                          className="text-destructive"
                        >
                          Delete
                        </Button>
                      </form>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <p className="text-xs text-muted-foreground">
        Inline service create/edit form is a Phase 5b enhancement. For now,
        edit prices in Supabase Studio or in <code>supabase/seed.sql</code> and
        run <code>pnpm db:reset</code>.
      </p>
    </div>
  );
}
