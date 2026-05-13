import { describe, it, expect } from "vitest";
import {
  contactFormSchema,
  quoteFormSchema,
  giftCardPurchaseSchema,
} from "@/lib/validators";

describe("contactFormSchema", () => {
  it("accepts a valid submission", () => {
    const r = contactFormSchema.safeParse({
      name: "Krista Hohman",
      email: "krista@example.com",
      phone: "5742657278",
      message: "Please detail my pontoon dockside next Saturday.",
    });
    expect(r.success).toBe(true);
  });

  it("rejects short messages", () => {
    const r = contactFormSchema.safeParse({
      name: "K",
      email: "k@e.com",
      message: "hi",
    });
    expect(r.success).toBe(false);
  });

  it("rejects honeypot fills", () => {
    const r = contactFormSchema.safeParse({
      name: "Krista",
      email: "k@example.com",
      message: "Long enough message here",
      website: "spam.com",
    });
    expect(r.success).toBe(false);
  });
});

describe("quoteFormSchema", () => {
  it("validates a complete quote", () => {
    const r = quoteFormSchema.safeParse({
      vehicle_type: "boat",
      vehicle_size: "large",
      condition: "rough",
      package_interest: "boat-gelcoat",
      zip: "46567",
      name: "James",
      email: "james@example.com",
      phone: "5742657278",
    });
    expect(r.success).toBe(true);
  });

  it("requires 5-digit ZIP", () => {
    const r = quoteFormSchema.safeParse({
      vehicle_type: "car",
      vehicle_size: "midsize",
      condition: "average",
      package_interest: "auto-full",
      zip: "4656",
      name: "x",
      email: "x@e.com",
      phone: "5742657278",
    });
    expect(r.success).toBe(false);
  });
});

describe("giftCardPurchaseSchema", () => {
  it("accepts valid input", () => {
    const r = giftCardPurchaseSchema.safeParse({
      amount_cents: 10000,
      purchaser_email: "buyer@example.com",
      recipient_email: "recip@example.com",
      recipient_name: "Dad",
    });
    expect(r.success).toBe(true);
  });

  it("rejects sub-minimum amounts", () => {
    const r = giftCardPurchaseSchema.safeParse({
      amount_cents: 1000,
      purchaser_email: "b@e.com",
      recipient_email: "r@e.com",
      recipient_name: "Dad",
    });
    expect(r.success).toBe(false);
  });
});
