import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SERVICE_AREA } from "@/lib/constants";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Service area",
  description:
    "Where KNB Detailing works — Syracuse, Lake Wawasee, Kosciusko County, plus parts of Elkhart and Noble counties.",
  path: "/service-area",
});

const TIERED = [
  {
    title: "Tier 1 — No travel fee",
    description: "Syracuse and the Lake Wawasee shoreline. Our home base.",
    cities: SERVICE_AREA.primary,
    color: "border-primary/40 bg-primary/5",
  },
  {
    title: "Tier 2 — +$25 travel fee",
    description: "Most of Kosciusko County.",
    cities: SERVICE_AREA.secondary,
    color: "border-border",
  },
  {
    title: "Tier 3 — +$50 travel fee",
    description: "Elkhart and Noble counties.",
    cities: SERVICE_AREA.tertiary,
    color: "border-border",
  },
];

const LAKES = SERVICE_AREA.lakes;

export default function ServiceAreaPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Service area", path: "/service-area" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Service area
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Where we work
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            Centered on Syracuse, IN. Primary radius ~25 miles. We do the lakes
            and the small towns around them. Travel fees are small and shown
            transparently at checkout.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {TIERED.map((t) => (
              <Card key={t.title} className={t.color}>
                <CardContent className="p-6">
                  <h2 className="text-lg font-bold">{t.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {t.description}
                  </p>
                  <ul className="mt-4 columns-2 text-sm">
                    {t.cities.map((c) => (
                      <li key={c} className="py-1">
                        {c}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-muted/30">
        <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold">Lakes we serve</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Dockside, on the lift, in storage — we&apos;ve worked on boats
            across all the local water.
          </p>
          <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-2 text-sm sm:grid-cols-3">
            {LAKES.map((l) => (
              <li key={l} className="rounded-md bg-background px-3 py-2 ring-1 ring-border">
                {l}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 text-center sm:px-6 lg:px-8">
          <p className="text-pretty text-muted-foreground">
            Don&apos;t see your town?
          </p>
          <p className="mt-2 text-lg font-semibold">
            Call us — we travel for the right job.
          </p>
          <div className="mt-4">
            <Button render={<Link href="/contact" />}>Get in touch</Button>
          </div>
        </div>
      </section>
    </>
  );
}
