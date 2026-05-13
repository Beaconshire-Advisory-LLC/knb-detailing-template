import Link from "next/link";
import Image from "next/image";
import { Heart, MapPin, ShieldCheck, Users, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { BUSINESS } from "@/lib/constants";
import { PHOTOS } from "@/lib/images";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About Krista & Benjamin",
  description:
    "KNB Detailing is a small, female-owned mobile detailing business in Syracuse, IN — Krista & Benjamin Hohman, owners. Licensed, insured, locally rooted.",
  path: "/about",
});

const VALUES = [
  {
    icon: MapPin,
    title: "Local",
    blurb:
      "Syracuse-based, Lake Wawasee-focused. We know which docks are tricky, which storage lots need extra time, and which lakes need extra-careful chemistry.",
  },
  {
    icon: Heart,
    title: "Honest",
    blurb:
      "We tell you what your vehicle needs and what it doesn't. If a Full is overkill, we'll recommend Express. If ceramic isn't worth it for your car, we'll say so.",
  },
  {
    icon: ShieldCheck,
    title: "Insured",
    blurb:
      "Fully licensed Indiana LLC, fully insured. If something goes wrong, it's on us — and we won't disappear.",
  },
  {
    icon: Users,
    title: "Family-run",
    blurb:
      "It's just the two of us. You'll always know who's coming, and we'll never sub the work out.",
  },
];

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "About", path: "/about" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            About
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Hi — we&apos;re Krista &amp; Benjamin Hohman.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            We started KNB Detailing because the lake deserved a detailer who
            shows up, takes care, and treats every vehicle like it belongs to
            family.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 pt-12 sm:px-6 lg:px-8">
          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lg sm:aspect-[16/7]">
            <Image
              src={PHOTOS.aboutOwners}
              alt="Krista & Benjamin Hohman — owners, KNB Detailing"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 1024px"
              className="object-cover object-top"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-graphite/65 via-brand-graphite/10 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 rounded-lg bg-background/92 px-4 py-3 text-sm font-medium text-foreground backdrop-blur sm:bottom-6 sm:left-6 sm:right-auto sm:max-w-sm">
              Krista &amp; Benjamin Hohman — owners.
            </div>
          </div>
        </div>
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-10 px-4 py-16 sm:px-6 lg:grid-cols-3 lg:px-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold">Our story</h2>
            <div className="mt-4 space-y-4 text-pretty text-muted-foreground">
              <p>
                We&apos;re a small, female-owned business who cares about our
                clients and our community. We live just off Magill Court in
                Syracuse and most of our work happens within sight of Lake
                Wawasee — driveways, docks, lifts, and storage lots.
              </p>
              <p>
                Krista runs scheduling and customer care; you&apos;ll talk to
                her when you book. Benjamin runs the rigs and most of the boat
                work. We split the bigger jobs.
              </p>
              <p>
                We&apos;re registered, licensed, insured, and members of the
                Syracuse-Wawasee Chamber and the Kosciusko Chamber. The
                Chamber&apos;s words about us — &ldquo;We are a small
                female-owned business who cares about our clients and
                community&rdquo; — still feel right.
              </p>
            </div>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button render={<Link href="/book" />}>Book a detail</Button>
              <Button variant="outline" render={<Link href="/contact" />}>
                Get in touch
              </Button>
            </div>
          </div>
          <div className="space-y-4">
            <Card className="overflow-hidden border-brand-cyan/30 bg-gradient-to-br from-brand-graphite to-brand-wawasee text-white">
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Image
                    src={PHOTOS.awardBadge}
                    alt="Best of BusinessRate 2025 plaque"
                    width={80}
                    height={106}
                    className="rounded shadow-lg ring-1 ring-white/20"
                  />
                  <div>
                    <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-cyan/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-brand-cyan ring-1 ring-brand-cyan/30">
                      <Award className="size-3" aria-hidden />
                      2025
                    </div>
                    <h3 className="mt-1.5 text-sm font-bold leading-tight">
                      Best of BusinessRate
                    </h3>
                    <p className="mt-1 text-xs text-white/85">
                      Car Detailing Service · Kosciusko County · based on Google reviews through July 2025
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Where we&apos;re from
                </h3>
                <p className="mt-3 text-sm">
                  {BUSINESS.address.street}
                  <br />
                  {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
                  {BUSINESS.address.zip}
                </p>
                <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Member of
                </h3>
                <ul className="mt-3 space-y-2 text-sm">
                  {BUSINESS.chambers.map((c) => (
                    <li key={c.name}>
                      <a
                        href={c.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground"
                      >
                        {c.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">What we believe</h2>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map(({ icon: Icon, title, blurb }) => (
              <div
                key={title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <Icon className="size-6 text-primary" aria-hidden />
                <h3 className="mt-3 text-lg font-semibold">{title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{blurb}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
