import type { ServicePrice, SizeCategory } from "@/types/domain";

/**
 * Pure pricing functions. Read from data passed in — never makes its own
 * DB queries — so the same logic works server-side, in route handlers,
 * and in the quote wizard's client-side estimator.
 */

export function priceForSize(
  prices: Pick<ServicePrice, "size_category" | "price_cents">[],
  size: SizeCategory,
): number | null {
  const match = prices.find((p) => p.size_category === size);
  return match ? match.price_cents : null;
}

export function priceRangeForService(
  prices: Pick<ServicePrice, "price_cents">[],
): { min: number; max: number } | null {
  if (prices.length === 0) return null;
  const cents = prices.map((p) => p.price_cents);
  return { min: Math.min(...cents), max: Math.max(...cents) };
}

/** Cancellation refund logic — encodes the published policy. */
export function refundCentsForCancellation(opts: {
  totalCents: number;
  scheduledStart: Date;
  cancelledAt: Date;
}): number {
  const hoursOut =
    (opts.scheduledStart.getTime() - opts.cancelledAt.getTime()) / 36e5;
  if (hoursOut >= 48) return opts.totalCents;
  if (hoursOut >= 24) return Math.round(opts.totalCents * 0.5);
  return 0;
}

/**
 * Compose an appointment total from line items + travel + discount.
 * Returns cents.
 */
export function composeAppointmentTotal(opts: {
  serviceLineItemsCents: number[];
  travelFeeCents: number;
  discountCents: number;
}): { subtotal: number; total: number } {
  const subtotal = opts.serviceLineItemsCents.reduce((a, b) => a + b, 0);
  const total = Math.max(0, subtotal + opts.travelFeeCents - opts.discountCents);
  return { subtotal, total };
}

export function depositCents(totalCents: number, depositPct: number = 25) {
  return Math.round((totalCents * depositPct) / 100);
}
