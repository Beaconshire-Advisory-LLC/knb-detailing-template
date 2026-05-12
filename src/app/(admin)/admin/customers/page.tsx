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
import { Input } from "@/components/ui/input";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { formatDate } from "@/lib/formatting";

export default async function AdminCustomersPage(
  props: PageProps<"/admin/customers">,
) {
  const sp = await props.searchParams;
  const q = (sp?.q as string | undefined) ?? "";

  const supabase = await getSupabaseServerClient();
  let query = supabase
    .from("profiles")
    .select("id, email, full_name, phone, role, created_at")
    .eq("role", "customer")
    .order("created_at", { ascending: false })
    .limit(100);
  if (q) {
    query = query.or(
      `email.ilike.%${q}%,full_name.ilike.%${q}%,phone.ilike.%${q}%`,
    );
  }
  const { data: customers } = await query;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Customers</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Everyone who has signed in to the portal.
        </p>
      </header>

      <form className="max-w-sm">
        <Input name="q" defaultValue={q} placeholder="Search name, email, or phone" />
      </form>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(customers ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="py-8 text-center text-sm text-muted-foreground">
                    No customers yet.
                  </TableCell>
                </TableRow>
              ) : (
                customers!.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell>{c.full_name ?? "—"}</TableCell>
                    <TableCell className="break-all">{c.email}</TableCell>
                    <TableCell className="tabular-nums">{c.phone ?? "—"}</TableCell>
                    <TableCell className="text-xs text-muted-foreground">
                      {formatDate(c.created_at, { weekday: undefined })}
                    </TableCell>
                    <TableCell className="text-right">
                      <Link
                        href={`/admin/customers/${c.id}`}
                        className="text-sm font-medium text-primary hover:underline"
                      >
                        View →
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
