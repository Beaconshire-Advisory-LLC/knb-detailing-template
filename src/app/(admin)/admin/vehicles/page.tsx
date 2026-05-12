import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getSupabaseServerClient } from "@/lib/supabase/server";

export default async function AdminVehiclesPage(
  props: PageProps<"/admin/vehicles">,
) {
  const sp = await props.searchParams;
  const filter = (sp?.kind as string | undefined) ?? "";
  const supabase = await getSupabaseServerClient();

  let query = supabase
    .from("vehicles")
    .select("id, kind, year, make, model, color, owner_id, created_at")
    .order("created_at", { ascending: false })
    .limit(200);
  const VALID_KINDS = ["car", "truck", "suv", "boat", "rv", "motorcycle"] as const;
  if (filter && (VALID_KINDS as readonly string[]).includes(filter)) {
    query = query.eq("kind", filter as (typeof VALID_KINDS)[number]);
  }
  const { data } = await query;

  const kinds = ["car", "truck", "suv", "boat", "rv", "motorcycle"];
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">All vehicles</h1>
      </header>

      <div className="flex flex-wrap gap-2 text-xs">
        <Link
          href="/admin/vehicles"
          className={`rounded-full border px-3 py-1 ${!filter ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}
        >
          All
        </Link>
        {kinds.map((k) => (
          <Link
            key={k}
            href={`/admin/vehicles?kind=${k}`}
            className={`rounded-full border px-3 py-1 capitalize ${filter === k ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground hover:bg-muted"}`}
          >
            {k}
          </Link>
        ))}
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Vehicle</TableHead>
                <TableHead>Color</TableHead>
                <TableHead className="text-right">Owner</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(data ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="py-8 text-center text-sm text-muted-foreground">
                    No vehicles match.
                  </TableCell>
                </TableRow>
              ) : (
                data!.map((v) => (
                  <TableRow key={v.id}>
                    <TableCell className="capitalize">{v.kind}</TableCell>
                    <TableCell>{v.year} {v.make} {v.model}</TableCell>
                    <TableCell>{v.color ?? "—"}</TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/customers/${v.owner_id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        Owner →
                      </Link>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
