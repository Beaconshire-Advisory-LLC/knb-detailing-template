import { describe, it, expect } from "vitest";
import {
  formatCurrency,
  formatPriceRange,
  formatPhone,
} from "@/lib/formatting";

describe("formatCurrency", () => {
  it("formats cents as USD with two decimals", () => {
    expect(formatCurrency(12345)).toBe("$123.45");
  });

  it("rounds with showCents=false", () => {
    expect(formatCurrency(12345, { showCents: false })).toBe("$123");
  });

  it("handles zero", () => {
    expect(formatCurrency(0)).toBe("$0.00");
  });
});

describe("formatPriceRange", () => {
  it("collapses when min == max", () => {
    expect(formatPriceRange(10000, 10000)).toBe("$100");
  });

  it("emits a min–max range", () => {
    expect(formatPriceRange(10000, 20000)).toBe("$100–$200");
  });
});

describe("formatPhone", () => {
  it("formats a 10-digit number", () => {
    expect(formatPhone("5742657278")).toBe("(574) 265-7278");
  });

  it("accepts a +1-prefixed number", () => {
    expect(formatPhone("+15742657278")).toBe("(574) 265-7278");
  });

  it("accepts an already-formatted number", () => {
    expect(formatPhone("(574) 265-7278")).toBe("(574) 265-7278");
  });

  it("returns input unchanged for malformed input", () => {
    expect(formatPhone("abc")).toBe("abc");
  });
});
