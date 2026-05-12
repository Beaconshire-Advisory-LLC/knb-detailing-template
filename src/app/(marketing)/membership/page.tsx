import Link from "next/link";
import { CheckCircle2, Calendar, Ship } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Membership · Lake Life",
  description:
    "Lake Life Memberships and Captain's Club for boats — recurring detailing at a discount with priority scheduling, pause anytime.",
  path: "/membership",
});

type Tier = {
  name: string;
  blurb: string;
  pricePerMonth: string;
  cadence: string;
  features: string[];
  highlight?: boolean;
  cta: string;
};

const AUTO_TIERS: Tier[] = [
  {
    name: "Express Refresh",
    blurb: "Monthly Express auto wash. Keeps the car looking 'just-done' between Full Details.",
    pricePerMonth: "$75 / month",
    cadence: "Every month",
    features: [
      "1 Express auto wash per month",
      "Priority scheduling — book a week ahead of public openings",
      "Pause or skip any month",
      "5% off any add-on",
    ],
    cta: "Subscribe — Express Refresh",
  },
  {
    name: "Lake Life Standard",
    blurb: "Bi-monthly Full Detail. Most popular for everyday SUVs and trucks on lake roads.",
    pricePerMonth: "$255 / month",
    cadence: "Every other month",
    features: [
      "1 Full Detail every 8 weeks",
      "Priority scheduling — book 2 weeks ahead",
      "10% off any add-on",
      "Free travel to Tier-2 ZIPs",
      "Pause or skip any cycle",
    ],
    highlight: true,
    cta: "Subscribe — Lake Life Standard",
  },
  {
    name: "Wawasee Premium",
    blurb: "Quarterly Full Detail + annual ceramic refresh. For the showroom-clean crowd.",
    pricePerMonth: "$395 / month",
    cadence: "Quarterly",
    features: [
      "1 Full Detail per quarter",
      "Annual ceramic top-up included",
      "15% off any add-on",
      "Free travel anywhere in our service area",
      "First-in-line for peak-season slots",
    ],
    cta: "Subscribe — Wawasee Premium",
  },
];

const BOAT_TIER: Tier = {
  name: "Captain's Club",
  blurb: "Spring de-winterize + monthly wash + fall winterize. Year-round, all-in.",
  pricePerMonth: "$1,250 / season",
  cadence: "May–October",
  features: [
    "Spring de-winterize + first detail",
    "Monthly maintenance wash (May–Sept)",
    "Fall winterize + storage-ready detail",
    "Priority dockside slots Memorial Day and July 4 weekends",
    "~20% less than à la carte",
  ],
  cta: "Subscribe — Captain's Club",
};

function TierCard({ t }: { t: Tier }) {
  return (
    <Card
      className={
        t.highlight ? "border-primary/40 ring-2 ring-primary/10" : ""
      }
    >
      <CardContent className="flex h-full flex-col p-6">
        {t.highlight && (
          <Badge className="mb-3 w-fit bg-primary/10 text-primary hover:bg-primary/15">
            Most popular
          </Badge>
        )}
        <h3 className="text-xl font-bold">{t.name}</h3>
        <p className="mt-1 text-sm text-muted-foreground">{t.blurb}</p>
        <p className="mt-4 text-3xl font-extrabold tabular-nums">
          {t.pricePerMonth}
        </p>
        <p className="text-xs text-muted-foreground">{t.cadence}</p>
        <ul className="mt-6 space-y-2">
          {t.features.map((f) => (
            <li key={f} className="flex items-start gap-2 text-sm">
              <CheckCircle2
                className="mt-0.5 size-4 shrink-0 text-primary"
                aria-hidden
              />
              <span>{f}</span>
            </li>
          ))}
        </ul>
        <Button
          className="mt-6 w-full"
          render={<Link href={`/book?membership=${encodeURIComponent(t.name)}`} />}
        >
          <Calendar className="mr-2 size-4" aria-hidden />
          {t.cta}
        </Button>
      </CardContent>
    </Card>
  );
}

export default function MembershipPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Membership", path: "/membership" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Membership
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Lake Life Membership
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            The clean-car people don&apos;t book details — they schedule them.
            Pick a cadence, get priority slots, save versus à la carte. Pause or
            skip anytime.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">For your auto</h2>
          <div className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-3">
            {AUTO_TIERS.map((t) => (
              <TierCard key={t.name} t={t} />
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mb-6 flex items-center gap-3">
            <Ship className="size-7 text-primary" aria-hidden />
            <h2 className="text-2xl font-bold">For your boat</h2>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <TierCard t={BOAT_TIER} />
            <Card className="md:col-span-2">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div>
                  <h3 className="text-lg font-bold">
                    Why Captain&apos;s Club makes sense
                  </h3>
                  <p className="mt-3 text-sm text-muted-foreground">
                    Most boat owners want their pontoon clean the first
                    Memorial Day weekend, freshened up around July 4, and
                    storage-ready before October. À la carte, that&apos;s about
                    $1,550. Captain&apos;s Club is $1,250 and includes monthly
                    maintenance washes between full details — keeps pollen and
                    water spots from baking in.
                  </p>
                </div>
                <Button
                  className="mt-6 w-fit"
                  variant="outline"
                  render={<Link href="/services/boat" />}
                >
                  How boat detailing works
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-pretty text-muted-foreground">
            Memberships bill via Stripe. Pause, skip, or cancel any time from
            your customer portal.
          </p>
          <div className="mt-4">
            <Button variant="outline" render={<Link href="/portal" />}>
              Already a member? Sign in →
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
