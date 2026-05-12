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
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { upsertCoupon, deleteCoupon } from "@/lib/actions/admin";
import { formatDate } from "@/lib/formatting";

export default async function AdminCouponsPage() {
  const supabase = await getSupabaseServerClient();
  const { data: coupons } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Coupons</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Promo codes for one-off discounts. Encoded as percent or fixed-dollar
          off.
        </p>
      </header>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold">Create coupon</h2>
          <form action={upsertCoupon} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="code">Code</Label>
              <Input id="code" name="code" required placeholder="SPRING25" />
            </div>
            <div>
              <Label htmlFor="discount_type">Type</Label>
              <Select name="discount_type" defaultValue="pct">
                <SelectTrigger id="discount_type">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pct">% off</SelectItem>
                  <SelectItem value="fixed">$ off</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="discount_value">Value</Label>
              <Input
                id="discount_value"
                name="discount_value"
                type="number"
                min={1}
                required
                placeholder="25"
              />
              <p className="mt-1 text-[11px] text-muted-foreground">
                For % type: 1–100. For $ type: dollars (we store as cents).
              </p>
            </div>
            <div>
              <Label htmlFor="max_uses">Max uses (optional)</Label>
              <Input id="max_uses" name="max_uses" type="number" min={1} />
            </div>
            <div className="sm:col-span-2">
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                placeholder="Wawasee Season Opener"
              />
            </div>
            <div>
              <Label htmlFor="expires_at">Expires</Label>
              <Input id="expires_at" name="expires_at" type="date" />
            </div>
            <div className="flex items-end gap-2">
              <label className="flex items-center gap-2">
                <Checkbox name="active" defaultChecked />
                <span className="text-sm">Active</span>
              </label>
            </div>
            <div className="sm:col-span-2">
              <Button type="submit">Save coupon</Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Code</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Uses</TableHead>
                <TableHead>Expires</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {(coupons ?? []).length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="py-8 text-center text-sm text-muted-foreground">
                    No coupons yet.
                  </TableCell>
                </TableRow>
              ) : (
                coupons!.map((c) => (
                  <TableRow key={c.id}>
                    <TableCell className="font-mono">{c.code}</TableCell>
                    <TableCell>{c.discount_type === "pct" ? "%" : "$"}</TableCell>
                    <TableCell className="tabular-nums">
                      {c.discount_type === "pct"
                        ? `${c.discount_value}%`
                        : `$${c.discount_value}`}
                    </TableCell>
                    <TableCell className="tabular-nums">
                      {c.uses}
                      {c.max_uses ? ` / ${c.max_uses}` : ""}
                    </TableCell>
                    <TableCell className="text-xs">
                      {c.expires_at
                        ? formatDate(c.expires_at, { weekday: undefined })
                        : "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={c.active ? "bg-emerald-100 text-emerald-900" : "bg-muted text-muted-foreground"}
                      >
                        {c.active ? "Active" : "Inactive"}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <form action={deleteCoupon} className="inline-block">
                        <input type="hidden" name="id" value={c.id} />
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
    </div>
  );
}
