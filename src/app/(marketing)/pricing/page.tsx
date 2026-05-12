import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SERVICE_PAGES } from "@/content/services-data";
import { formatCurrency } from "@/lib/formatting";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pricing",
  description:
    "Starting prices for KNB Detailing services — auto, boat, RV, motorcycle, ceramic, and paint correction. Pick your category for full tiers.",
  path: "/pricing",
});

const PRICING_FAQS = [
  {
    q: "Why are prices listed as starting points?",
    a: "Detailing is condition-dependent. A daily-driver Civic that gets weekly washes is half the work of a 6-year-old farm truck. We quote firm pricing during the walkaround.",
  },
  {
    q: "What's the difference between Express, Full, Premium, and Ceramic?",
    a: "Express is maintenance between full details. Full Detail covers inside-and-out top to bottom. Premium adds a single-step paint correction and 6-month sealant. Ceramic is multi-year protection with full prep correction.",
  },
  {
    q: "Are travel fees baked in?",
    a: "Syracuse and the Lake Wawasee shoreline (Tier 1) have no travel fee. Tier 2 (Kosciusko County) is +$25. Tier 3 (Elkhart, Noble) is +$50. Shown at checkout.",
  },
  {
    q: "Do you offer discounts?",
    a: "Yes — Lake Life Members get 5–15% off à la carte services depending on tier. Captain's Club bundles boat services year-round at ~20% less.",
  },
  {
    q: "Indiana sales tax?",
    a: "Most detailing services aren't taxable in Indiana. Ceramic coating may include a tangible-property component — we'll itemize on the receipt.",
  },
];

export default function PricingPage() {
  const categories = ["auto", "boat", "rv", "motorcycle"] as const;
  const categoryLabel: Record<(typeof categories)[number], string> = {
    auto: "Auto",
    boat: "Boat",
    rv: "RV",
    motorcycle: "Motorcycle",
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Pricing", path: "/pricing" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Pricing
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Honest pricing. No surprises.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            Starting prices by vehicle category. Final cost depends on size and
            condition — we walk the vehicle with you before any work begins.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <Tabs defaultValue="auto">
            <TabsList className="grid w-full max-w-md grid-cols-4">
              {categories.map((c) => (
                <TabsTrigger key={c} value={c}>
                  {categoryLabel[c]}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((c) => {
              const services = SERVICE_PAGES.filter(
                (s) => s.category === c || (c === "auto" && s.category === "ceramic") || (c === "auto" && s.category === "correction"),
              );
              return (
                <TabsContent key={c} value={c} className="mt-8 space-y-8">
                  {services.map((s) => (
                    <div key={s.slug}>
                      <div className="mb-3 flex flex-wrap items-baseline justify-between gap-2">
                        <h2 className="text-xl font-bold">{s.title}</h2>
                        <Link
                          href={`/services/${s.slug}`}
                          className="text-sm font-medium text-primary hover:underline"
                        >
                          What&apos;s included →
                        </Link>
                      </div>
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
                        {s.pricing.map((tier, i) => (
                          <Card key={i}>
                            <CardContent className="p-4">
                              <p className="text-sm font-semibold">
                                {tier.tier}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {tier.size}
                                {tier.detail ? ` · ${tier.detail}` : ""}
                              </p>
                              <p className="mt-3 text-2xl font-bold tabular-nums">
                                {formatCurrency(tier.fromCents, { showCents: false })}
                              </p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  ))}
                </TabsContent>
              );
            })}
          </Tabs>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Pricing questions</h2>
          <Accordion className="mt-6">
            {PRICING_FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`p-faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">
                  {f.q}
                </AccordionTrigger>
                <AccordionContent className="text-pretty text-sm text-muted-foreground">
                  {f.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-pretty text-muted-foreground">
            Want a firm number for your exact vehicle and condition?
          </p>
          <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button render={<Link href="/quote" />}>Get an instant quote</Button>
            <Button variant="outline" render={<Link href="/book" />}>
              Skip ahead and book
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
