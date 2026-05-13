import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckCircle2, ArrowRight, Calendar } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BeforeAfterCard } from "@/components/marketing/before-after";
import { PhotoBackdrop } from "@/components/marketing/photo-backdrop";
import { WaveDivider } from "@/components/marketing/wave-divider";
import {
  SERVICE_PAGES,
  findServicePage,
  type ServicePage,
} from "@/content/services-data";
import { PHOTOS, GALLERY_PHOTOS } from "@/lib/images";
import { formatCurrency } from "@/lib/formatting";
import {
  pageMetadata,
  breadcrumbJsonLd,
  faqJsonLd,
  serviceJsonLd,
} from "@/lib/seo";

export function generateStaticParams() {
  return SERVICE_PAGES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = findServicePage(slug);
  if (!service) return pageMetadata({ title: "Not found", description: "", noIndex: true });
  return pageMetadata({
    title: service.title,
    description: service.hero.description,
    path: `/services/${slug}`,
  });
}

const KIND_FOR_CATEGORY: Record<
  ServicePage["category"],
  "car" | "boat" | "rv" | "motorcycle"
> = {
  auto: "car",
  boat: "boat",
  rv: "rv",
  motorcycle: "motorcycle",
  ceramic: "car",
  correction: "car",
};

const HERO_PHOTO_FOR_CATEGORY: Record<ServicePage["category"], string> = {
  auto: PHOTOS.servicesAuto,
  boat: PHOTOS.servicesBoat,
  rv: PHOTOS.servicesRv,
  motorcycle: PHOTOS.servicesMotorcycle,
  ceramic: PHOTOS.servicesCeramic,
  correction: PHOTOS.servicesPaintCorrection,
};

export default async function ServicePage(
  props: PageProps<"/services/[slug]">,
) {
  const { slug } = await props.params;
  const service = findServicePage(slug);
  if (!service) notFound();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify([
            serviceJsonLd({
              name: service.title,
              description: service.hero.description,
              path: `/services/${slug}`,
              serviceType: service.category,
            }),
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
              { name: service.title, path: `/services/${slug}` },
            ]),
            faqJsonLd(service.faqs),
          ]),
        }}
      />

      {/* Hero */}
      <PhotoBackdrop
        src={HERO_PHOTO_FOR_CATEGORY[service.category]}
        alt={`${service.title} hero image`}
        priority
        overlayFrom="from-brand-graphite/80"
        overlayTo="to-brand-wawasee/75"
        className="text-white"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <Badge
            variant="secondary"
            className="mb-3 border-white/30 bg-white/15 text-white backdrop-blur"
          >
            {service.badge}
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight text-white drop-shadow sm:text-5xl">
            {service.title}
          </h1>
          <p className="mt-3 text-balance text-xl text-white/90 sm:text-2xl">
            {service.hero.tagline}
          </p>
          <p className="mt-4 max-w-2xl text-pretty text-white/85">
            {service.hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 bg-white px-8 text-brand-wawasee hover:bg-white/90"
              render={<Link href={`/book?service=${service.slug}`} />}
            >
              <Calendar className="mr-2 size-5" aria-hidden />
              Book this service
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="h-12 border-white/40 bg-white/10 px-8 text-white backdrop-blur hover:bg-white/20 hover:text-white"
              render={<Link href={`/quote?service=${service.slug}`} />}
            >
              Get an instant quote
            </Button>
          </div>
        </div>
        <WaveDivider
          fill="var(--background)"
          className="absolute -bottom-px left-0 right-0 h-10 w-full"
        />
      </PhotoBackdrop>

      {/* What's included + Pricing */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-8 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8">
          <div>
            <h2 className="text-2xl font-bold">What&apos;s included</h2>
            <ul className="mt-6 space-y-3">
              {service.whatsIncluded.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <CheckCircle2
                    className="mt-0.5 size-5 shrink-0 text-primary"
                    aria-hidden
                  />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-2xl font-bold">Pricing</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Starting prices. Final cost depends on size and condition; we
              confirm the total before any work begins.
            </p>
            <div className="mt-6 space-y-3">
              {service.pricing.map((tier, i) => (
                <Card key={i}>
                  <CardContent className="flex items-start justify-between gap-4 p-4">
                    <div>
                      <p className="text-sm font-semibold">{tier.tier}</p>
                      <p className="text-xs text-muted-foreground">
                        {tier.size}
                        {tier.detail ? ` · ${tier.detail}` : ""}
                      </p>
                    </div>
                    <p className="shrink-0 text-lg font-bold tabular-nums">
                      {formatCurrency(tier.fromCents, { showCents: false })}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">How we do it</h2>
          <ol className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, i) => (
              <li
                key={step.title}
                className="rounded-xl border border-border bg-card p-6"
              >
                <span className="text-2xl font-extrabold text-primary tabular-nums">
                  {i + 1}
                </span>
                <h3 className="mt-2 text-lg font-semibold">{step.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  {step.detail}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Extra sections (boat-specific etc.) */}
      {service.extraSections && service.extraSections.length > 0 && (
        <section className="border-t border-border bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {service.extraSections.map((sec) => (
                <div key={sec.title}>
                  <h3 className="text-lg font-bold">{sec.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {sec.body}
                  </p>
                  {sec.bullets && (
                    <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
                      {sec.bullets.map((b) => (
                        <li key={b} className="flex items-start gap-2">
                          <span aria-hidden className="mt-0.5 text-primary">
                            ✓
                          </span>
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Examples */}
      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Recent work</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Stand-in imagery shown — real KNB before/after photos arrive as
            we complete more of these services this season.
          </p>
          <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(() => {
              const kindMatch = KIND_FOR_CATEGORY[service.category];
              const matching = GALLERY_PHOTOS.filter(
                (g) => g.kind === kindMatch,
              );
              // Fall back to all photos if we have <3 of this kind
              const pool = matching.length >= 3 ? matching : GALLERY_PHOTOS;
              return pool.slice(0, 3).map((g, i) => (
                <BeforeAfterCard
                  key={`${g.title}-${i}`}
                  title={g.title}
                  kind={g.kind}
                  imageUrl={g.url}
                />
              ));
            })()}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Questions</h2>
          <Accordion className="mt-6">
            {service.faqs.map((f, i) => (
              <AccordionItem key={f.q} value={`s-faq-${i}`}>
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

      {/* Related */}
      {service.relatedSlugs.length > 0 && (
        <section className="border-t border-border bg-muted/30">
          <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold">Related services</h2>
            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {service.relatedSlugs.map((rs) => {
                const r = findServicePage(rs);
                if (!r) return null;
                return (
                  <Card key={rs}>
                    <CardContent className="p-6">
                      <h3 className="text-lg font-bold">{r.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {r.hero.tagline}
                      </p>
                      <Link
                        href={`/services/${rs}`}
                        className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary hover:gap-2 transition-all"
                      >
                        Learn more <ArrowRight className="size-4" aria-hidden />
                      </Link>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to book {service.title.toLowerCase()}?
          </h2>
          <p className="mt-3 text-primary-foreground/85">
            Two-minute booking. 25% deposit. We come to you.
          </p>
          <div className="mt-6">
            <Button
              size="lg"
              variant="secondary"
              className="h-12 px-8 text-base font-semibold"
              render={<Link href={`/book?service=${service.slug}`} />}
            >
              <Calendar className="mr-2 size-5" aria-hidden />
              Book now
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
