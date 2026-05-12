import Link from "next/link";
import { Phone, Calendar } from "lucide-react";
import { BUSINESS } from "@/lib/constants";

/**
 * Sticky bottom CTA bar — visible on mobile only.
 * Lives inside the marketing route group so it never appears on /portal or /admin.
 */
export function MobileCtaBar() {
  return (
    <div
      role="region"
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="grid grid-cols-2 gap-2 p-3">
        <a
          href={`tel:${BUSINESS.phoneE164}`}
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md border border-input bg-background text-sm font-semibold text-foreground hover:bg-muted"
        >
          <Phone className="size-4" aria-hidden />
          Call
        </a>
        <Link
          href="/book"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-primary text-sm font-semibold text-primary-foreground hover:bg-primary/90"
        >
          <Calendar className="size-4" aria-hidden />
          Book now
        </Link>
      </div>
    </div>
  );
}
