import { CreditCard, ExternalLink, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCurrentUser,
  getSupabaseServerClient,
} from "@/lib/supabase/server";
import { formatCurrency, formatDateTime } from "@/lib/formatting";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Billing",
  description: "",
  path: "/portal/billing",
  noIndex: true,
});

export default async function BillingPage() {
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();

  const { data: appts } = await supabase
    .from("appointments")
    .select(
      "id, scheduled_start, total_cents, deposit_paid, balance_paid, status",
    )
    .eq("customer_id", user!.id)
    .order("scheduled_start", { ascending: false })
    .limit(50);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Billing</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Invoices, payment methods, and receipts.
        </p>
      </header>

      <Card>
        <CardContent className="p-6">
          <div className="flex items-center gap-3">
            <CreditCard className="size-6 text-primary" aria-hidden />
            <div>
              <h2 className="text-lg font-bold">Payment methods</h2>
              <p className="text-xs text-muted-foreground">
                Cards on file, updates, and removal happen in the Stripe
                Customer Portal.
              </p>
            </div>
          </div>
          <Button variant="outline" className="mt-6">
            <ExternalLink className="mr-1.5 size-4" aria-hidden />
            Open Stripe portal
          </Button>
          <p className="mt-2 text-[11px] text-muted-foreground">
            Phase 6 wires this button to create a Stripe Customer Portal
            session for your account.
          </p>
        </CardContent>
      </Card>

      <section>
        <h2 className="text-lg font-bold">Receipts</h2>
        {!appts || appts.length === 0 ? (
          <Card className="mt-3">
            <CardContent className="p-6 text-center text-sm text-muted-foreground">
              No receipts yet.
            </CardContent>
          </Card>
        ) : (
          <ul className="mt-3 space-y-2">
            {appts.map((a) => (
              <li key={a.id}>
                <Card>
                  <CardContent className="flex items-center justify-between gap-3 p-4">
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">
                        {formatDateTime(a.scheduled_start)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {a.balance_paid
                          ? "Paid in full"
                          : a.deposit_paid
                            ? "Deposit paid · balance pending"
                            : "Awaiting payment"}
                      </p>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <span className="text-sm font-semibold tabular-nums">
                        {formatCurrency(a.total_cents)}
                      </span>
                      <Button variant="ghost" size="sm">
                        <Receipt className="mr-1 size-3.5" aria-hidden />
                        Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
        <p className="mt-3 text-[11px] text-muted-foreground">
          PDF receipt download lands in Phase 6 alongside the Stripe wiring.
        </p>
      </section>
    </div>
  );
}
