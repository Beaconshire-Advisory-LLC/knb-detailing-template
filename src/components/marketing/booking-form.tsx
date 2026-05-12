"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { submitBooking, type BookingResult } from "@/lib/actions/booking";
import { VEHICLE_KIND_LABELS, SIZE_LABELS } from "@/types/domain";

const SIZE_KEYS = ["compact", "midsize", "large", "xl", "xxl"] as const;

const PACKAGES = [
  { slug: "auto-express-pkg", label: "Auto Express" },
  { slug: "auto-full-pkg", label: "Auto Full Detail" },
  { slug: "auto-premium-pkg", label: "Auto Premium" },
  { slug: "auto-ceramic-pkg", label: "Auto Ceramic Coating" },
  { slug: "boat-express-pkg", label: "Boat Express" },
  { slug: "boat-full-pkg", label: "Boat Full Detail" },
  { slug: "boat-premium-pkg", label: "Boat Premium (gel-coat)" },
  { slug: "rv-full", label: "RV Full Detail" },
  { slug: "moto-full", label: "Motorcycle Full Detail" },
];

function todayDateLocal(daysAhead = 1) {
  const d = new Date();
  d.setDate(d.getDate() + daysAhead);
  d.setHours(9, 0, 0, 0);
  // datetime-local input format: YYYY-MM-DDTHH:MM
  const pad = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;
}

export function BookingForm({
  initialService,
}: {
  initialService?: string;
}) {
  const [state, formAction, isPending] = useActionState<BookingResult | null, FormData>(
    submitBooking,
    null,
  );
  const [pkg, setPkg] = useState<string>(
    PACKAGES.find((p) => p.slug.includes(initialService ?? ""))?.slug ??
      PACKAGES[1].slug,
  );

  useEffect(() => {
    if (state?.ok) toast.success("Booking request received.");
  }, [state]);

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <CheckCircle2 className="mx-auto size-10 text-primary" aria-hidden />
        <h2 className="mt-4 text-2xl font-bold">Booking request received!</h2>
        <p className="mt-3 text-pretty text-muted-foreground">{state.message}</p>
        <p className="mt-3 text-xs text-muted-foreground">
          Once Stripe is connected (Phase 6), this page will redirect directly
          to a secure deposit checkout — no &quot;wait for the link&quot; step.
        </p>
      </div>
    );
  }

  const errs = state && !state.ok ? state.errors : {};

  return (
    <form action={formAction} className="space-y-10">
      <input type="hidden" name="package_id" value={pkg} />

      <section aria-labelledby="step-1">
        <h2 id="step-1" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          1 · Service
        </h2>
        <div className="mt-3">
          <Label htmlFor="pkg">Package</Label>
          <Select value={pkg} onValueChange={(v) => v && setPkg(v)}>
            <SelectTrigger id="pkg">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {PACKAGES.map((p) => (
                <SelectItem key={p.slug} value={p.slug}>
                  {p.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </section>

      <section aria-labelledby="step-2">
        <h2 id="step-2" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          2 · Vehicle
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="vehicle_kind">Type</Label>
            <Select name="vehicle_kind" defaultValue="car">
              <SelectTrigger id="vehicle_kind">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(VEHICLE_KIND_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v}>{l}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="vehicle_size">Size</Label>
            <Select name="vehicle_size" defaultValue="midsize">
              <SelectTrigger id="vehicle_size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIZE_KEYS.map((s) => (
                  <SelectItem key={s} value={s}>{SIZE_LABELS[s]}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="vehicle_year">Year</Label>
            <Input id="vehicle_year" name="vehicle_year" type="number" min={1900} max={2030} placeholder="2020" />
          </div>
          <div>
            <Label htmlFor="vehicle_make">Make</Label>
            <Input id="vehicle_make" name="vehicle_make" placeholder="Ford" />
          </div>
          <div>
            <Label htmlFor="vehicle_model">Model</Label>
            <Input id="vehicle_model" name="vehicle_model" placeholder="F-150" />
          </div>
          <div>
            <Label htmlFor="vehicle_color">Color</Label>
            <Input id="vehicle_color" name="vehicle_color" placeholder="Black" />
          </div>
        </div>
        <div className="mt-3">
          <Label htmlFor="vehicle_notes">Anything we should know?</Label>
          <Textarea id="vehicle_notes" name="vehicle_notes" rows={2} placeholder="Pet hair, lift access, specific stains, etc." />
        </div>
      </section>

      <section aria-labelledby="step-3">
        <h2 id="step-3" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          3 · When
        </h2>
        <div className="mt-3">
          <Label htmlFor="scheduled_start">Date and time</Label>
          <Input
            id="scheduled_start"
            name="scheduled_start"
            type="datetime-local"
            required
            defaultValue={todayDateLocal(2)}
            aria-invalid={!!errs.scheduled_start}
          />
          {errs.scheduled_start && <p className="mt-1 text-xs text-destructive">{errs.scheduled_start[0]}</p>}
          <p className="mt-2 text-xs text-muted-foreground">
            Pick a target start time. We&apos;ll confirm a 30-minute window
            within the hour. Same-day bookings need a phone call.
          </p>
        </div>
      </section>

      <section aria-labelledby="step-4">
        <h2 id="step-4" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          4 · Where
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4">
          <div>
            <Label htmlFor="service_address">Service address</Label>
            <Input
              id="service_address"
              name="service_address"
              required
              autoComplete="street-address"
              placeholder="4381 E Magill Court (or your dock / lift)"
            />
            {errs.service_address && <p className="mt-1 text-xs text-destructive">{errs.service_address[0]}</p>}
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="service_city">City</Label>
              <Input id="service_city" name="service_city" autoComplete="address-level2" placeholder="Syracuse" />
            </div>
            <div>
              <Label htmlFor="service_zip">ZIP</Label>
              <Input
                id="service_zip"
                name="service_zip"
                required
                inputMode="numeric"
                pattern="\d{5}"
                maxLength={5}
                autoComplete="postal-code"
                placeholder="46567"
                aria-invalid={!!errs.service_zip}
              />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="step-5">
        <h2 id="step-5" className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          5 · You
        </h2>
        <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="b-name">Name</Label>
            <Input id="b-name" name="name" required autoComplete="name" />
          </div>
          <div>
            <Label htmlFor="b-phone">Phone</Label>
            <Input id="b-phone" name="phone" type="tel" required autoComplete="tel" />
          </div>
          <div className="sm:col-span-2">
            <Label htmlFor="b-email">Email</Label>
            <Input id="b-email" name="email" type="email" required autoComplete="email" />
          </div>
        </div>
        <div className="mt-4 flex items-start gap-3 rounded-lg border border-border bg-muted/30 p-4">
          <Checkbox id="sms_opt_in" name="sms_opt_in" defaultChecked />
          <Label htmlFor="sms_opt_in" className="text-sm font-normal leading-snug">
            Text me booking confirmation, reminders, and an &quot;on-the-way&quot;
            notice on the day of service. Standard rates. Reply STOP to opt out.
          </Label>
        </div>
        <div className="mt-3">
          <Label htmlFor="notes">Anything else?</Label>
          <Textarea id="notes" name="notes" rows={2} placeholder="Gate codes, lift instructions, etc." />
        </div>
      </section>

      <div className="rounded-xl border border-border bg-muted/30 p-4 text-sm text-muted-foreground">
        <p>
          By submitting, you agree to our 25% deposit policy and cancellation
          terms: full refund &gt;48h, 50% refund 24–48h, no refund within 24h.
        </p>
      </div>

      <Button type="submit" size="lg" disabled={isPending} className="h-12 w-full text-base font-semibold">
        {isPending ? (
          <>
            <Loader2 className="mr-2 size-5 animate-spin" aria-hidden />
            Submitting…
          </>
        ) : (
          "Request booking"
        )}
      </Button>
    </form>
  );
}
