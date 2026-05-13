import Image from "next/image";
import { Award } from "lucide-react";
import { PHOTOS } from "@/lib/images";

/**
 * Best of BusinessRate 2025 award — Kosciusko County Car Detailing Service.
 * Real plaque photo provided by the owner.
 */
export function AwardCallout() {
  return (
    <section
      aria-labelledby="award-heading"
      className="border-y border-border bg-gradient-to-br from-brand-graphite via-brand-graphite to-brand-wawasee text-white"
    >
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[auto_1fr]">
          <div className="relative mx-auto aspect-[3/4] w-44 shrink-0 overflow-hidden rounded-lg shadow-2xl ring-1 ring-white/10 md:w-56">
            <Image
              src={PHOTOS.awardBadge}
              alt="Best of BusinessRate 2025 — Car Detailing Service — Kosciusko County"
              fill
              sizes="(max-width: 768px) 11rem, 14rem"
              className="object-cover"
            />
          </div>
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-brand-cyan/15 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-brand-cyan ring-1 ring-brand-cyan/30">
              <Award className="size-3.5" aria-hidden />
              Recognized locally
            </div>
            <h2
              id="award-heading"
              className="mt-3 text-balance text-2xl font-bold tracking-tight sm:text-3xl"
            >
              Best of BusinessRate <span className="text-brand-cyan">2025</span> — Car Detailing Service
            </h2>
            <p className="mt-2 text-pretty text-white/85">
              Kosciusko County, Indiana. Recognized based on Google reviews
              through July 2025 — the kind of word-of-mouth you don&apos;t buy.
              We are proud, and we are grateful.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
