import Link from "next/link";
import { Gift, Mail, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gift cards",
  description:
    "Give the gift of a sparkling-clean ride. Buy a KNB Detailing gift card online — delivered by email, redeemable on any service.",
  path: "/gift-cards",
});

const PRESETS = [
  { amount: 50, blurb: "Adds to any service" },
  { amount: 100, blurb: "Covers most Express details" },
  { amount: 200, blurb: "Most-popular gift amount" },
  { amount: 500, blurb: "A Full Detail or membership starter" },
];

export default function GiftCardsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Gift cards", path: "/gift-cards" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Gift cards
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            The clean-truck dad&apos;s favorite gift.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            KNB Detailing gift cards are delivered by email, redeemable on any
            service. Father&apos;s Day, birthdays, retirement, &ldquo;sorry the
            dog got in the boat&rdquo; — they cover it.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PRESETS.map((p) => (
              <Card key={p.amount}>
                <CardContent className="p-6">
                  <Gift className="size-7 text-primary" aria-hidden />
                  <p className="mt-4 text-3xl font-extrabold tabular-nums">
                    ${p.amount}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-10 rounded-xl border border-border bg-muted/30 p-8 text-center">
            <Mail className="mx-auto size-10 text-primary" aria-hidden />
            <h2 className="mt-4 text-xl font-bold">
              Online checkout opens with Phase 6
            </h2>
            <p className="mt-2 text-pretty text-sm text-muted-foreground">
              Gift card purchase is wired through Stripe Checkout. Until the
              Stripe production account is activated and webhooks are
              configured, gift cards are sold by phone or in person.
            </p>
            <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="outline" render={<Link href="/contact" />}>
                Buy a card by phone
              </Button>
            </div>
          </div>

          <ul className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {[
              "Any amount $25–$1,000",
              "Delivered to the recipient by email",
              "Custom message",
              "No expiration on amounts $50+",
              "Redeemable on any KNB Detailing service",
              "Combine with membership and seasonal discounts",
            ].map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm">
                <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
