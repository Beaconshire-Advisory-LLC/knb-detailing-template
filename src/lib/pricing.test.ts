import { describe, it, expect } from "vitest";
import {
  priceForSize,
  priceRangeForService,
  refundCentsForCancellation,
  composeAppointmentTotal,
  depositCents,
} from "@/lib/pricing";

describe("priceForSize", () => {
  const prices = [
    { size_category: "compact" as const, price_cents: 7500 },
    { size_category: "midsize" as const, price_cents: 9500 },
    { size_category: "large" as const, price_cents: 11500 },
  ];

  it("returns the matching size price", () => {
    expect(priceForSize(prices, "midsize")).toBe(9500);
  });

  it("returns null when size has no entry", () => {
    expect(priceForSize(prices, "xxl")).toBeNull();
  });
});

describe("priceRangeForService", () => {
  it("returns min and max", () => {
    const r = priceRangeForService([
      { price_cents: 7500 },
      { price_cents: 12500 },
      { price_cents: 9500 },
    ]);
    expect(r).toEqual({ min: 7500, max: 12500 });
  });

  it("returns null for empty input", () => {
    expect(priceRangeForService([])).toBeNull();
  });
});

describe("refundCentsForCancellation", () => {
  const total = 10000;
  const base = new Date("2026-06-01T00:00:00Z");
  const plusHours = (h: number) => new Date(base.getTime() + h * 3600_000);

  it("full refund more than 48 hours out", () => {
    expect(
      refundCentsForCancellation({
        totalCents: total,
        scheduledStart: plusHours(72),
        cancelledAt: base,
      }),
    ).toBe(total);
  });

  it("50% refund 24–48 hours out", () => {
    expect(
      refundCentsForCancellation({
        totalCents: total,
        scheduledStart: plusHours(36),
        cancelledAt: base,
      }),
    ).toBe(5000);
  });

  it("no refund within 24 hours", () => {
    expect(
      refundCentsForCancellation({
        totalCents: total,
        scheduledStart: plusHours(12),
        cancelledAt: base,
      }),
    ).toBe(0);
  });

  it("no refund when already past scheduled start", () => {
    expect(
      refundCentsForCancellation({
        totalCents: total,
        scheduledStart: base,
        cancelledAt: plusHours(24),
      }),
    ).toBe(0);
  });
});

describe("composeAppointmentTotal", () => {
  it("sums line items + travel - discount", () => {
    const r = composeAppointmentTotal({
      serviceLineItemsCents: [10000, 2500],
      travelFeeCents: 2500,
      discountCents: 1000,
    });
    expect(r.subtotal).toBe(12500);
    expect(r.total).toBe(14000);
  });

  it("never goes negative", () => {
    const r = composeAppointmentTotal({
      serviceLineItemsCents: [1000],
      travelFeeCents: 0,
      discountCents: 5000,
    });
    expect(r.total).toBe(0);
  });
});

describe("depositCents", () => {
  it("default 25% deposit, rounded", () => {
    expect(depositCents(10000)).toBe(2500);
    expect(depositCents(10001)).toBe(2500);
  });

  it("custom percentage", () => {
    expect(depositCents(10000, 50)).toBe(5000);
  });
});
