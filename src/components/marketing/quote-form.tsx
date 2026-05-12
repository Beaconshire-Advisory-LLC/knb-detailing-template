"use client";

import { useActionState, useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  RadioGroup,
  RadioGroupItem,
} from "@/components/ui/radio-group";
import { submitQuoteForm, type ActionResult } from "@/lib/actions/contact";
import { VEHICLE_KIND_LABELS, SIZE_LABELS } from "@/types/domain";
import { formatCurrency } from "@/lib/formatting";

const PACKAGE_OPTIONS = [
  { value: "auto-express", label: "Auto Express", priceCents: 7500 },
  { value: "auto-full", label: "Auto Full Detail", priceCents: 28500 },
  { value: "auto-premium", label: "Auto Premium", priceCents: 49500 },
  { value: "boat-full", label: "Boat Full Detail", priceCents: 49500 },
  { value: "boat-gelcoat", label: "Boat Gel-Coat Restoration", priceCents: 79500 },
  { value: "rv-full", label: "RV Full Detail", priceCents: 44500 },
  { value: "moto-full", label: "Motorcycle Full Detail", priceCents: 18500 },
  { value: "ceramic", label: "Ceramic Coating", priceCents: 129500 },
];

const CONDITION_OPTIONS = [
  { value: "clean", label: "Pretty clean — just maintained" },
  { value: "average", label: "Average — normal use" },
  { value: "rough", label: "Rough — hasn't been detailed in a while" },
];

const SIZE_KEYS = ["compact", "midsize", "large", "xl", "xxl"] as const;
type SizeKey = (typeof SIZE_KEYS)[number];

function estimate(
  pkgCents: number | undefined,
  size: SizeKey,
  condition: "clean" | "average" | "rough",
): { min: number; max: number } | null {
  if (!pkgCents) return null;
  const sizeMul: Record<SizeKey, number> = {
    compact: 1,
    midsize: 1.15,
    large: 1.3,
    xl: 1.5,
    xxl: 1.75,
  };
  const condMul = { clean: 0.9, average: 1, rough: 1.2 }[condition];
  const center = Math.round(pkgCents * sizeMul[size] * condMul);
  return { min: Math.round(center * 0.85), max: Math.round(center * 1.15) };
}

export function QuoteForm({ initialService }: { initialService?: string }) {
  const [state, formAction, isPending] = useActionState<ActionResult | null, FormData>(
    submitQuoteForm,
    null,
  );

  // Live estimate state
  const [pkg, setPkg] = useState<string>(
    PACKAGE_OPTIONS.find((p) => p.value.includes(initialService ?? ""))?.value ??
      PACKAGE_OPTIONS[1].value,
  );
  const [size, setSize] = useState<SizeKey>("midsize");
  const [condition, setCondition] = useState<"clean" | "average" | "rough">(
    "average",
  );
  const estimateRange = useMemo(() => {
    const item = PACKAGE_OPTIONS.find((p) => p.value === pkg);
    return estimate(item?.priceCents, size, condition);
  }, [pkg, size, condition]);

  useEffect(() => {
    if (state?.ok) toast.success(state.message);
    else if (state && !state.ok && state.errors._form) {
      toast.error(state.errors._form[0]);
    }
  }, [state]);

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <p className="text-xl font-bold">Quote received.</p>
        <p className="mt-2 text-muted-foreground">{state.message}</p>
        {estimateRange && (
          <p className="mt-4 text-sm">
            Your rough estimate: <strong>
              {formatCurrency(estimateRange.min, { showCents: false })}–
              {formatCurrency(estimateRange.max, { showCents: false })}
            </strong>
          </p>
        )}
      </div>
    );
  }

  const errs = state && !state.ok ? state.errors : {};

  return (
    <form action={formAction} className="space-y-6">
      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          1 · Vehicle
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="vehicle_type">Type</Label>
            <Select name="vehicle_type" defaultValue="car">
              <SelectTrigger id="vehicle_type">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(VEHICLE_KIND_LABELS).map(([v, l]) => (
                  <SelectItem key={v} value={v}>
                    {l}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="vehicle_size">Size</Label>
            <Select
              name="vehicle_size"
              value={size}
              onValueChange={(v) => v && setSize(v as SizeKey)}
            >
              <SelectTrigger id="vehicle_size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {SIZE_KEYS.map((s) => (
                  <SelectItem key={s} value={s}>
                    {SIZE_LABELS[s]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          2 · Condition
        </legend>
        <RadioGroup
          name="condition"
          value={condition}
          onValueChange={(v) =>
            v && setCondition(v as "clean" | "average" | "rough")
          }
          className="grid grid-cols-1 gap-2"
        >
          {CONDITION_OPTIONS.map((opt) => (
            <Label
              key={opt.value}
              htmlFor={`cond-${opt.value}`}
              className="flex cursor-pointer items-center gap-3 rounded-lg border border-border bg-card p-4 hover:bg-muted"
            >
              <RadioGroupItem id={`cond-${opt.value}`} value={opt.value} />
              <span className="text-sm">{opt.label}</span>
            </Label>
          ))}
        </RadioGroup>
      </fieldset>

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          3 · Package
        </legend>
        <Select name="package_interest" value={pkg} onValueChange={(v) => v && setPkg(v)}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {PACKAGE_OPTIONS.map((p) => (
              <SelectItem key={p.value} value={p.value}>
                {p.label} — from {formatCurrency(p.priceCents, { showCents: false })}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </fieldset>

      {estimateRange && (
        <div className="rounded-xl border border-primary/30 bg-primary/5 p-5">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">
            Live estimate
          </p>
          <p className="mt-2 text-2xl font-extrabold tabular-nums">
            {formatCurrency(estimateRange.min, { showCents: false })}–
            {formatCurrency(estimateRange.max, { showCents: false })}
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Updates as you change selections. Final price confirmed before any work begins.
          </p>
        </div>
      )}

      <fieldset className="space-y-4">
        <legend className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          4 · You
        </legend>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <Label htmlFor="q-name">Name</Label>
            <Input id="q-name" name="name" required autoComplete="name" />
            {errs.name && <p className="mt-1 text-xs text-destructive">{errs.name[0]}</p>}
          </div>
          <div>
            <Label htmlFor="q-zip">ZIP code</Label>
            <Input
              id="q-zip"
              name="zip"
              required
              inputMode="numeric"
              pattern="\d{5}"
              maxLength={5}
              autoComplete="postal-code"
              placeholder="46567"
            />
            {errs.zip && <p className="mt-1 text-xs text-destructive">{errs.zip[0]}</p>}
          </div>
          <div>
            <Label htmlFor="q-email">Email</Label>
            <Input id="q-email" name="email" type="email" required autoComplete="email" />
            {errs.email && <p className="mt-1 text-xs text-destructive">{errs.email[0]}</p>}
          </div>
          <div>
            <Label htmlFor="q-phone">Phone</Label>
            <Input id="q-phone" name="phone" type="tel" required autoComplete="tel" />
            {errs.phone && <p className="mt-1 text-xs text-destructive">{errs.phone[0]}</p>}
          </div>
        </div>
        <div>
          <Label htmlFor="q-notes">Anything else? (optional)</Label>
          <Textarea
            id="q-notes"
            name="notes"
            rows={3}
            placeholder="Pet hair, specific stains, dock location, etc."
          />
        </div>
        <input
          type="text"
          name="website"
          tabIndex={-1}
          autoComplete="off"
          className="sr-only"
          aria-hidden="true"
        />
      </fieldset>

      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send my quote request"
        )}
      </Button>
    </form>
  );
}
