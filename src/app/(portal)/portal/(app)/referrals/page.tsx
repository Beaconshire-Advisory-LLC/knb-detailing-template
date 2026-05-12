import { Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  getCurrentUser,
  getCurrentProfile,
  getSupabaseServerClient,
} from "@/lib/supabase/server";
import { SITE } from "@/lib/constants";
import { ReferralShare } from "@/components/portal/referral-share";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Refer a friend",
  description: "",
  path: "/portal/referrals",
  noIndex: true,
});

export default async function ReferralsPage() {
  const user = await getCurrentUser();
  const profile = await getCurrentProfile();
  const supabase = await getSupabaseServerClient();

  const code = profile?.referral_code ?? "KNB-PENDING";

  const { count: signupsCount } = await supabase
    .from("profiles")
    .select("id", { count: "exact", head: true })
    .eq("referred_by", user!.id);

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Refer a friend</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Give friends $25 off their first detail. Get a $25 credit on yours
          when they book.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <Gift className="size-7 text-primary" aria-hidden />
            <h2 className="mt-3 text-lg font-bold">Share your code</h2>
            <div className="mt-4">
              <ReferralShare code={code} siteUrl={SITE.url} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              Your referrals
            </h3>
            <p className="mt-3 text-4xl font-extrabold tabular-nums">
              {signupsCount ?? 0}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Friends who&apos;ve signed up using your code.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-xl border border-border bg-muted/30 p-6 text-sm text-muted-foreground">
        <h3 className="font-semibold text-foreground">How it works</h3>
        <ol className="mt-3 list-inside list-decimal space-y-1.5">
          <li>Share your code with a friend.</li>
          <li>They use it at checkout — saves them $25 on their first detail.</li>
          <li>
            After their service is complete, you get a $25 credit applied
            automatically to your next invoice.
          </li>
          <li>No cap. Refer as many friends as you like.</li>
        </ol>
      </div>
    </div>
  );
}
