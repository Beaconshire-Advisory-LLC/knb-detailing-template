import Link from "next/link";
import {
  Car,
  Ship,
  Bike,
  Sparkles,
  Wrench,
  ArrowRight,
  Compass,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { SERVICE_PAGES } from "@/content/services-data";
import {
  pageMetadata,
  breadcrumbJsonLd,
  serviceJsonLd,
} from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Services",
  description:
    "Mobile detailing for auto, boat, RV, and motorcycle — express, full detail, premium, ceramic coating, and paint correction. Lake Wawasee and Kosciusko County.",
  path: "/services",
});

const ICON: Record<string, typeof Car> = {
  auto: Car,
  boat: Ship,
  rv: Compass,
  motorcycle: Bike,
  ceramic: Sparkles,
  correction: Wrench,
};

export default function ServicesIndexPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Services", path: "/services" },
            ]),
          ),
        }}
      />
      {SERVICE_PAGES.map((s) => (
        <script
          key={s.slug}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              serviceJsonLd({
                name: s.title,
                description: s.hero.description,
                path: `/services/${s.slug}`,
                serviceType: s.category,
              }),
            ),
          }}
        />
      ))}

      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Services
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Pick your vehicle. We&apos;ll handle the rest.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            Mobile-only. We come to your driveway, dock, lift, or storage lot.
            Every service includes a pre-detail walkaround, transparent pricing
            by size, and before/after photos in your customer portal.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICE_PAGES.map((s) => {
              const Icon = ICON[s.category] ?? Car;
              return (
                <Card key={s.slug} className="flex h-full flex-col">
                  <CardContent className="flex h-full flex-col p-6">
                    <Icon className="size-8 text-primary" aria-hidden />
                    <h2 className="mt-4 text-xl font-bold">{s.title}</h2>
                    <p className="mt-2 text-pretty text-sm text-muted-foreground">
                      {s.hero.tagline}
                    </p>
                    <Button
                      variant="outline"
                      className="mt-6 w-full"
                      render={<Link href={`/services/${s.slug}`} />}
                    >
                      <span className="flex items-center gap-2">
                        See details <ArrowRight className="size-4" aria-hidden />
                      </span>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
