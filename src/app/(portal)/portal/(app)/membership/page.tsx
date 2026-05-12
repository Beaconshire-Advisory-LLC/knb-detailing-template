import Link from "next/link";
import { Sparkles, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  getCurrentUser,
  getSupabaseServerClient,
} from "@/lib/supabase/server";
import { formatDate } from "@/lib/formatting";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Membership",
  description: "",
  path: "/portal/membership",
  noIndex: true,
});

export default async function MembershipPage() {
  const user = await getCurrentUser();
  const supabase = await getSupabaseServerClient();

  const { data: memberships } = await supabase
    .from("memberships")
    .select("id, status, current_period_end, cancel_at_period_end, package_id")
    .eq("customer_id", user!.id)
    .order("created_at", { ascending: false });

  // Resolve package details (Relationships aren't declared in hand-written types)
  const allList = memberships ?? [];
  const pkgIds = Array.from(new Set(allList.map((m) => m.package_id)));
  const pkgMap: Record<string, { name: string; description: string | null }> = {};
  if (pkgIds.length > 0) {
    const { data: pkgs } = await supabase
      .from("packages")
      .select("id, name, description")
      .in("id", pkgIds);
    (pkgs ?? []).forEach((p) => {
      pkgMap[p.id] = { name: p.name, description: p.description };
    });
  }

  const active = allList.filter((m) => m.status === "active");
  const inactive = allList.filter((m) => m.status !== "active");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Membership</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your recurring plan. Cancel or update payment from the
          Stripe customer portal.
        </p>
      </header>

      {active.length === 0 ? (
        <Card>
          <CardContent className="p-8 text-center">
            <Sparkles className="mx-auto size-10 text-primary" aria-hidden />
            <h2 className="mt-3 text-xl font-bold">Not subscribed yet</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Recurring plans save up to 20% and give you priority scheduling.
            </p>
            <Button className="mt-6" render={<Link href="/membership" />}>
              See plans
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-4">
          {active.map((m) => (
            <Card key={m.id}>
              <CardContent className="p-6">
                <Badge className="bg-primary/10 text-primary hover:bg-primary/15">
                  Active
                </Badge>
                <h2 className="mt-3 text-xl font-bold">
                  {pkgMap[m.package_id]?.name ?? "Membership"}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {pkgMap[m.package_id]?.description}
                </p>
                <p className="mt-4 text-sm">
                  {m.cancel_at_period_end
                    ? "Cancels at "
                    : "Renews "}
                  <strong>
                    {m.current_period_end
                      ? formatDate(m.current_period_end, {
                          weekday: undefined,
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })
                      : "—"}
                  </strong>
                </p>
                <Button variant="outline" className="mt-6">
                  <ExternalLink className="mr-1.5 size-4" aria-hidden />
                  Manage in Stripe portal
                </Button>
                <p className="mt-2 text-[11px] text-muted-foreground">
                  Stripe Customer Portal session is created in Phase 6.
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {inactive.length > 0 && (
        <section>
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Past memberships
          </h2>
          <ul className="mt-3 space-y-2">
            {inactive.map((m) => (
              <li key={m.id}>
                <Card>
                  <CardContent className="flex items-center justify-between p-4">
                    <div>
                      <p className="text-sm font-medium">
                        {pkgMap[m.package_id]?.name ?? "Membership"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Status: {m.status}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
