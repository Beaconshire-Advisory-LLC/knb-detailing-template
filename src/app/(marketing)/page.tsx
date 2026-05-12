import Link from "next/link";
import { Phone, ShieldCheck, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { BUSINESS, SERVICE_AREA } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: `${BUSINESS.tagline}`,
  description:
    "Mobile auto, boat, RV, and motorcycle detailing on Lake Wawasee and across Kosciusko County. We come to your driveway, dock, or lift.",
  path: "/",
});

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section
        aria-labelledby="hero-heading"
        className="relative overflow-hidden bg-gradient-to-b from-secondary via-background to-background"
      >
        <div className="mx-auto max-w-7xl px-4 pt-16 pb-20 sm:px-6 sm:pt-20 sm:pb-28 lg:px-8">
          <div className="mx-auto max-w-3xl text-center">
            <Badge
              variant="secondary"
              className="mb-6 border-border bg-background/80 px-3 py-1 text-xs font-medium uppercase tracking-wider text-muted-foreground"
            >
              Mobile detailing · Syracuse, IN
            </Badge>
            <h1
              id="hero-heading"
              className="text-balance text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl"
            >
              {BUSINESS.tagline}
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground sm:text-xl">
              We come to your driveway, dock, or lift to detail your car, boat,
              RV, or motorcycle. Licensed and insured. Locally owned by Krista
              &amp; Benjamin Hohman.
            </p>
            <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button
                size="lg"
                className="h-12 w-full px-8 text-base font-semibold sm:w-auto"
                render={<Link href="/book" />}
              >
                Book now
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="h-12 w-full px-8 text-base font-semibold sm:w-auto"
                render={<Link href="/quote" />}
              >
                Get an instant quote
              </Button>
            </div>
            <a
              href={`tel:${BUSINESS.phoneE164}`}
              className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground tabular-nums"
            >
              <Phone className="size-4" aria-hidden />
              or call {BUSINESS.phone}
            </a>
          </div>

          {/* Trust strip */}
          <ul className="mx-auto mt-14 grid max-w-3xl grid-cols-1 gap-4 text-sm text-muted-foreground sm:grid-cols-3">
            <li className="flex items-center justify-center gap-2">
              <ShieldCheck className="size-4 text-primary" aria-hidden />
              Licensed &amp; insured
            </li>
            <li className="flex items-center justify-center gap-2">
              <MapPin className="size-4 text-primary" aria-hidden />
              {SERVICE_AREA.primary.join(" · ")}
            </li>
            <li className="flex items-center justify-center gap-2">
              <span aria-hidden className="text-primary">★</span>
              Syracuse-Wawasee Chamber member
            </li>
          </ul>
        </div>
      </section>

      {/* Placeholder section flagging Phase 3 content */}
      <section
        aria-labelledby="coming-soon-heading"
        className="border-t border-border bg-background"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <h2
            id="coming-soon-heading"
            className="text-sm font-semibold uppercase tracking-wider text-muted-foreground"
          >
            What we detail
          </h2>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { label: "Auto", href: "/services/auto" },
              { label: "Boat", href: "/services/boat" },
              { label: "RV", href: "/services/rv" },
              { label: "Motorcycle", href: "/services/motorcycle" },
            ].map((s) => (
              <Link
                key={s.href}
                href={s.href}
                className="group rounded-xl border border-border bg-card p-6 transition-colors hover:border-primary/40 hover:bg-accent"
              >
                <div className="text-lg font-semibold text-foreground">
                  {s.label}
                </div>
                <div className="mt-1 text-sm text-muted-foreground">
                  Mobile service →
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-12 text-sm text-muted-foreground">
            Phase 1 scaffold — full homepage sections (packages, before/after,
            reviews, FAQ, map) are built in Phase 3.
          </p>
        </div>
      </section>
    </>
  );
}
