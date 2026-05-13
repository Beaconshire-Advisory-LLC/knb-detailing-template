import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail } from "lucide-react";
import { FacebookIcon } from "@/components/icons/social";
import { Logo } from "@/components/layout/logo";
import {
  BUSINESS,
  NAV_FOOTER,
  SERVICE_AREA,
  BEACONSHIRE,
} from "@/lib/constants";

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="mt-24 border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand column */}
          <div>
            <Logo />
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              {BUSINESS.description}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <a
                href={BUSINESS.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="KNB Detailing on Facebook"
                className="inline-flex size-9 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                <FacebookIcon className="size-5" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Services
            </h3>
            <ul className="mt-4 space-y-2 text-sm">
              {NAV_FOOTER.services.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Service area */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Service area
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
              {SERVICE_AREA.primary.map((c) => (
                <li key={c}>{c}</li>
              ))}
              {SERVICE_AREA.secondary.slice(0, 5).map((c) => (
                <li key={c}>{c}</li>
              ))}
              <li>
                <Link
                  href="/service-area"
                  className="font-medium text-foreground hover:underline"
                >
                  View all areas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact + chambers */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-foreground">
              Contact
            </h3>
            <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
              <li>
                <a
                  href={`tel:${BUSINESS.phoneE164}`}
                  className="inline-flex items-center gap-2 hover:text-foreground tabular-nums"
                >
                  <Phone className="size-4 shrink-0" aria-hidden />
                  {BUSINESS.phone}
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Mail className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>{BUSINESS.email}</span>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="mt-0.5 size-4 shrink-0" aria-hidden />
                <span>
                  {BUSINESS.address.street}
                  <br />
                  {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
                  {BUSINESS.address.zip}
                </span>
              </li>
            </ul>

            <h3 className="mt-6 text-sm font-semibold uppercase tracking-wider text-foreground">
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
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {BUSINESS.legalName}. Licensed &amp; insured. All rights
            reserved.
          </p>
          <ul className="flex flex-wrap gap-4">
            {NAV_FOOTER.legal.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {BEACONSHIRE.enabled && (
          <div className="mt-6 flex items-center justify-center gap-2 text-[11px] text-muted-foreground/80">
            <Image
              src="/beaconshire-logo.png"
              alt=""
              width={14}
              height={14}
              className="opacity-70"
            />
            <span>
              Built by{" "}
              {BEACONSHIRE.url.includes("OWNER_CONFIRM") ? (
                <span className="font-medium">{BEACONSHIRE.name}</span>
              ) : (
                <a
                  href={BEACONSHIRE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium hover:text-foreground"
                >
                  {BEACONSHIRE.name}
                </a>
              )}{" "}
              · {BEACONSHIRE.tagline}
            </span>
          </div>
        )}
      </div>
    </footer>
  );
}
