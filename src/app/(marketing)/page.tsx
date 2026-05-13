import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  ShieldCheck,
  MapPin,
  Car,
  Ship,
  Bike,
  Calendar,
  Sparkles,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ReviewsCarousel } from "@/components/marketing/reviews-carousel";
import { BeforeAfterCard } from "@/components/marketing/before-after";
import { PhotoBackdrop } from "@/components/marketing/photo-backdrop";
import { WaveDivider } from "@/components/marketing/wave-divider";
import { BUSINESS, SERVICE_AREA } from "@/lib/constants";
import { PHOTOS, GALLERY_PHOTOS } from "@/lib/images";
import {
  PLACEHOLDER_REVIEWS,
  HOME_FAQS,
} from "@/lib/placeholders";
import { pageMetadata, faqJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: BUSINESS.tagline,
  description:
    "Mobile auto, boat, RV, and motorcycle detailing on Lake Wawasee and across Kosciusko County. Licensed, insured, and locally owned by Krista & Benjamin Hohman.",
  path: "/",
});

const PACKAGES = [
  {
    name: "Auto Express",
    blurb: "Wash, wheels, tires, and a streak-free interior wipe-down.",
    price: "From $75",
    href: "/services/auto",
  },
  {
    name: "Auto Full Detail",
    blurb: "Inside and out — every panel, vent, and cup holder.",
    price: "From $285",
    href: "/services/auto",
    highlight: true,
  },
  {
    name: "Boat Full Detail",
    blurb: "Hull wash, oxidation light-cut, vinyl & carpet — dockside.",
    price: "From $495",
    href: "/services/boat",
  },
  {
    name: "Ceramic Coating",
    blurb: "Multi-year hydrophobic paint protection with prep correction.",
    price: "From $1,295",
    href: "/services/ceramic-coating",
  },
];

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqJsonLd(HOME_FAQS.map((f) => f))),
        }}
      />

      {/* 1 · Hero */}
      <PhotoBackdrop
        src={PHOTOS.homeHero}
        alt="Mobile detailing at Lake Wawasee"
        priority
        overlayFrom="from-brand-graphite/85"
        overlayTo="to-brand-wawasee/80"
        className="text-white"
      >
        <div className="mx-auto max-w-7xl px-4 pt-20 pb-24 sm:px-6 sm:pt-28 sm:pb-32 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 border-white/30 bg-white/15 px-3 py-1 text-xs font-medium uppercase tracking-wider text-white backdrop-blur"
            >
              Mobile detailing · Syracuse, IN
            </Badge>
            <h1 className="text-balance text-4xl font-extrabold tracking-tight text-white drop-shadow-md sm:text-5xl md:text-6xl">
              {BUSINESS.tagline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-white/90 sm:text-xl">
              We come to your driveway, dock, or lift to detail your car, boat,
              RV, or motorcycle. Licensed and insured. Locally owned by Krista
              &amp; Benjamin Hohman.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                variant="secondary"
                className="h-12 w-full bg-white px-8 text-base font-semibold text-brand-wawasee hover:bg-white/90 sm:w-auto"
                render={<Link href="/book" />}
              >
                Book now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full border-white/40 bg-white/10 px-8 text-base font-semibold text-white backdrop-blur hover:bg-white/20 hover:text-white sm:w-auto"
                render={<Link href="/quote" />}
              >
                Get an instant quote
              </Button>
            </div>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white tabular-nums"
            >
              <Phone className="size-4" aria-hidden />
              or call {BUSINESS.phone}
            </a>
          </div>
          <ul className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 text-sm text-white/85 sm:grid-cols-3">
            <li className="flex items-center justify-center gap-2">
              <ShieldCheck className="size-4 text-white" aria-hidden />
              Licensed &amp; insured
            </li>
            <li className="flex items-center justify-center gap-2">
              <MapPin className="size-4 text-white" aria-hidden />
              {SERVICE_AREA.primary.join(" · ")}
            </li>
            <li className="flex items-center justify-center gap-2">
              <span aria-hidden className="text-white">
                ★
              </span>
              Syracuse-Wawasee Chamber member
            </li>
          </ul>
        </div>
        <WaveDivider
          fill="var(--background)"
          className="absolute -bottom-px left-0 right-0 h-12 w-full"
        />
      </PhotoBackdrop>

      {/* 2 · We come to you */}
      <section
        aria-labelledby="we-come-to-you"
        className="border-t border-border bg-background"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2
              id="we-come-to-you"
              className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
            >
              We come to you.
            </h2>
            <p className="mt-3 text-balance text-muted-foreground">
              You don&apos;t haul the boat back to a shop. You don&apos;t miss work
              dropping off the truck. We arrive ready to detail wherever you keep it.
            </p>
          </div>
          <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              {
                icon: Car,
                title: "Auto",
                blurb:
                  "Sedans, trucks, SUVs. Driveway or covered garage. Express to ceramic.",
                href: "/services/auto",
                photo: PHOTOS.weComeAuto,
              },
              {
                icon: Ship,
                title: "Boat",
                blurb:
                  "Dockside on Lake Wawasee. On-lift or on-trailer. Gel-coat specialty.",
                href: "/services/boat",
                photo: PHOTOS.weComeBoat,
              },
              {
                icon: Bike,
                title: "RV + Moto",
                blurb:
                  "Class C and Class A details, Harley and sportbike show prep.",
                href: "/services/rv",
                photo: PHOTOS.weComeRvMoto,
              },
            ].map(({ icon: Icon, title, blurb, href, photo }) => (
              <Link
                key={title}
                href={href}
                className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <Image
                    src={photo}
                    alt={`${title} detailing`}
                    fill
                    sizes="(max-width: 640px) 100vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-graphite/40 to-transparent" />
                  <Icon
                    className="absolute right-4 top-4 size-7 text-white drop-shadow-md"
                    aria-hidden
                  />
                </div>
                <div className="flex flex-1 flex-col gap-3 p-6">
                  <h3 className="text-lg font-semibold text-foreground">
                    {title}
                  </h3>
                  <p className="text-sm text-muted-foreground">{blurb}</p>
                  <span className="mt-auto inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:gap-2 transition-all">
                    See services <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · Featured packages */}
      <section
        aria-labelledby="packages-heading"
        className="border-t border-border bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
            <div>
              <h2
                id="packages-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                Popular packages
              </h2>
              <p className="mt-2 text-muted-foreground">
                Starting prices. Final price depends on vehicle size and condition.
              </p>
            </div>
            <Link
              href="/pricing"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
            >
              Full pricing <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PACKAGES.map((p) => (
              <Card
                key={p.name}
                className={
                  p.highlight
                    ? "border-primary/40 ring-2 ring-primary/10"
                    : ""
                }
              >
                <CardContent className="p-6">
                  {p.highlight && (
                    <Badge className="mb-3 bg-primary/10 text-primary hover:bg-primary/15">
                      Most booked
                    </Badge>
                  )}
                  <h3 className="text-lg font-semibold">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{p.blurb}</p>
                  <p className="mt-4 text-2xl font-bold tabular-nums text-foreground">
                    {p.price}
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4 w-full"
                    render={<Link href={p.href} />}
                  >
                    Learn more
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · Before & after */}
      <section
        aria-labelledby="ba-heading"
        className="border-t border-border bg-background"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2
            id="ba-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Recent work
          </h2>
          <p className="mt-2 text-muted-foreground">
            Real before/after photos arrive after our first few jobs of the season.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {GALLERY_PHOTOS.slice(0, 4).map((item) => (
              <BeforeAfterCard
                key={item.title}
                title={item.title}
                kind={item.kind}
                imageUrl={item.url}
              />
            ))}
          </div>
          <div className="mt-8">
            <Button variant="outline" render={<Link href="/gallery" />}>
              View full gallery
            </Button>
          </div>
        </div>
      </section>

      {/* 5 · How it works */}
      <section
        aria-labelledby="how-heading"
        className="border-t border-border bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2
            id="how-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            How it works
          </h2>
          <ol className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                n: "1",
                title: "Book online",
                blurb:
                  "Pick a package, your vehicle, a date. Pay a 25% deposit — under 3 minutes.",
              },
              {
                n: "2",
                title: "We confirm",
                blurb:
                  "You get a text + email with the time window and our route plan.",
              },
              {
                n: "3",
                title: "We come to you",
                blurb:
                  "Driveway, dock, or lift. We bring everything — water, power, products.",
              },
              {
                n: "4",
                title: "Showroom-clean",
                blurb:
                  "We send before/after photos, charge the balance, and your detail history is in your portal.",
              },
            ].map((step) => (
              <li
                key={step.n}
                className="flex flex-col gap-2 rounded-xl border border-border bg-card p-6"
              >
                <span className="text-3xl font-extrabold text-primary tabular-nums">
                  {step.n}
                </span>
                <h3 className="text-lg font-semibold">{step.title}</h3>
                <p className="text-sm text-muted-foreground">{step.blurb}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 6 · Membership teaser */}
      <section
        aria-labelledby="membership-heading"
        className="relative isolate overflow-hidden border-t border-border bg-primary/5"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-10 lg:grid-cols-2">
            <div>
              <Badge className="bg-primary/10 text-primary hover:bg-primary/15">
                Lake Life Membership
              </Badge>
              <h2
                id="membership-heading"
                className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl"
              >
                The clean car people don&apos;t book details. They schedule them.
              </h2>
              <p className="mt-4 text-muted-foreground">
                Monthly Express, bi-monthly Full, or quarterly Premium — your
                vehicle stays maintained year-round and you save up to 20% versus
                à la carte. Pause anytime. Captain&apos;s Club for boats covers
                spring de-winterize through fall winterize.
              </p>
              <ul className="mt-6 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
                {[
                  "Priority scheduling",
                  "10% off any add-on",
                  "Free travel to Tier-2 ZIPs",
                  "Annual ceramic refresh (premium)",
                ].map((line) => (
                  <li
                    key={line}
                    className="flex items-start gap-2 rounded-md bg-background p-3 ring-1 ring-border"
                  >
                    <CheckCircle2
                      className="mt-0.5 size-4 shrink-0 text-primary"
                      aria-hidden
                    />
                    <span>{line}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Button render={<Link href="/membership" />}>
                  See membership tiers
                </Button>
                <Button variant="outline" render={<Link href="/quote" />}>
                  Get an estimate
                </Button>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl shadow-xl">
              <Image
                src={PHOTOS.membershipBackdrop}
                alt="Pontoon on Lake Wawasee"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-wawasee/40 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-background/90 p-4 backdrop-blur">
                <p className="text-xs uppercase tracking-wider text-muted-foreground">
                  Captain&apos;s Club · Boats
                </p>
                <p className="mt-1 text-sm font-semibold text-foreground">
                  Spring de-winterize + monthly wash + fall winterize. Save
                  ~20% vs. à la carte.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · Reviews */}
      <section
        aria-labelledby="reviews-heading"
        className="border-t border-border bg-background"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2
                id="reviews-heading"
                className="text-3xl font-bold tracking-tight sm:text-4xl"
              >
                What lake folks say
              </h2>
              <p className="mt-2 text-muted-foreground">
                Reviews from neighbors and customers we&apos;ve detailed for.
              </p>
            </div>
            <Link
              href="/reviews"
              className="text-sm font-medium text-primary hover:underline"
            >
              All reviews →
            </Link>
          </div>
          <div className="mt-8">
            <ReviewsCarousel reviews={PLACEHOLDER_REVIEWS} />
          </div>
        </div>
      </section>

      {/* 8 · Service area */}
      <section
        aria-labelledby="area-heading"
        className="border-t border-border bg-muted/30"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2
            id="area-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Where we work
          </h2>
          <p className="mt-2 text-muted-foreground">
            Centered on Syracuse, IN. ~25-mile primary radius. Travel fees for
            tier 2 and 3 ZIPs are small and shown at checkout.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Tier 1 · no travel fee
                </h3>
                <ul className="mt-3 text-sm">
                  {SERVICE_AREA.primary.map((c) => (
                    <li key={c} className="py-1">
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Tier 2 · Kosciusko County
                </h3>
                <ul className="mt-3 text-sm columns-2">
                  {SERVICE_AREA.secondary.map((c) => (
                    <li key={c} className="py-1">
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Tier 3 · Elkhart &amp; Noble
                </h3>
                <ul className="mt-3 text-sm columns-2">
                  {SERVICE_AREA.tertiary.map((c) => (
                    <li key={c} className="py-1">
                      {c}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* 9 · About teaser */}
      <section
        aria-labelledby="about-heading"
        className="border-t border-border bg-background"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="rounded-2xl border border-border bg-card p-8 sm:p-10">
            <h2
              id="about-heading"
              className="text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Hi — we&apos;re Krista &amp; Benjamin.
            </h2>
            <p className="mt-4 text-pretty text-muted-foreground">
              We started KNB Detailing because Lake Wawasee deserved a detailer
              who actually shows up, takes care, and treats your vehicle like it
              belongs to family. We&apos;re a small, female-owned business who
              cares about our clients and our community. Licensed and insured,
              members of the Syracuse-Wawasee and Kosciusko Chambers of
              Commerce.
            </p>
            <div className="mt-6">
              <Button variant="outline" render={<Link href="/about" />}>
                Read our story
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 10 · FAQ */}
      <section
        aria-labelledby="faq-heading"
        className="border-t border-border bg-muted/30"
      >
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2
            id="faq-heading"
            className="text-3xl font-bold tracking-tight sm:text-4xl"
          >
            Common questions
          </h2>
          <Accordion className="mt-8">
            {HOME_FAQS.map((f, i) => (
              <AccordionItem key={f.q} value={`faq-${i}`}>
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

      {/* 11 · Final CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <Sparkles className="mx-auto mb-4 size-8" aria-hidden />
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Ready when you are.
          </h2>
          <p className="mt-3 text-pretty text-primary-foreground/85">
            Two-minute booking. We&apos;ll come to your driveway, dock, or lift.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-base font-semibold"
              render={<Link href="/book" />}
            >
              <Calendar className="mr-2 size-5" aria-hidden />
              Book now
            </Button>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="inline-flex h-12 items-center gap-2 px-4 text-base font-semibold text-primary-foreground hover:underline tabular-nums"
            >
              <Phone className="size-5" aria-hidden />
              {BUSINESS.phone}
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
