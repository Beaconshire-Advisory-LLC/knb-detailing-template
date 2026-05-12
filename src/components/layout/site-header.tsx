import Link from "next/link";
import { Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/layout/logo";
import { MobileNav } from "@/components/layout/mobile-nav";
import { BUSINESS, NAV_PRIMARY } from "@/lib/constants";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/60 bg-background/85 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <Logo />
        </div>

        <nav
          aria-label="Primary"
          className="hidden flex-1 items-center justify-center md:flex"
        >
          <ul className="flex items-center gap-1">
            {NAV_PRIMARY.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${BUSINESS.phoneE164}`}
            className="hidden items-center gap-2 rounded-md px-3 py-2 text-sm font-medium text-foreground hover:bg-muted lg:inline-flex tabular-nums"
            aria-label={`Call ${BUSINESS.phone}`}
          >
            <Phone className="size-4" aria-hidden />
            <span>{BUSINESS.phone}</span>
          </a>
          <Button
            size="default"
            className="hidden h-10 px-5 text-sm font-semibold md:inline-flex"
            render={<Link href="/book" />}
          >
            Book now
          </Button>
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
