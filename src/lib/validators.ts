import { z } from "zod";

const phoneSchema = z
  .string()
  .min(10, "Please enter a valid phone number")
  .transform((v) => v.replace(/\D/g, ""))
  .refine((v) => v.length === 10 || v.length === 11, "Please enter a valid phone number");

const emailSchema = z.string().email("Please enter a valid email");

const zipSchema = z
  .string()
  .regex(/^\d{5}$/, "Please enter a 5-digit ZIP code");

export const contactFormSchema = z.object({
  name: z.string().min(2, "Please enter your name").max(100),
  email: emailSchema,
  phone: phoneSchema.optional().or(z.literal("")),
  message: z.string().min(10, "Tell us a little more (at least 10 characters)").max(2000),
  // Anti-spam honeypot — should be empty
  website: z.string().max(0, "").optional(),
});

export const quoteFormSchema = z.object({
  vehicle_type: z.enum(["car", "truck", "suv", "boat", "rv", "motorcycle"]),
  vehicle_size: z.enum(["compact", "midsize", "large", "xl", "xxl"]),
  condition: z.enum(["clean", "average", "rough"]),
  package_interest: z.string().min(1, "Pick a package to estimate"),
  zip: zipSchema,
  name: z.string().min(2).max(100),
  email: emailSchema,
  phone: phoneSchema,
  notes: z.string().max(1000).optional(),
  website: z.string().max(0).optional(),
});

export const bookingDraftSchema = z.object({
  package_id: z.string().uuid(),
  vehicle: z.object({
    kind: z.enum(["car", "truck", "suv", "boat", "rv", "motorcycle"]),
    size_category: z.enum(["compact", "midsize", "large", "xl", "xxl"]),
    year: z.coerce.number().int().min(1900).max(2030).optional(),
    make: z.string().max(50).optional(),
    model: z.string().max(50).optional(),
    color: z.string().max(30).optional(),
    notes: z.string().max(500).optional(),
  }),
  scheduled_start: z.string().datetime(),
  service_address: z.string().min(5).max(200),
  service_city: z.string().max(80).optional(),
  service_zip: zipSchema,
  customer: z.object({
    name: z.string().min(2).max(100),
    email: emailSchema,
    phone: phoneSchema,
    sms_opt_in: z.boolean().default(false),
  }),
  notes: z.string().max(1000).optional(),
});

export const giftCardPurchaseSchema = z.object({
  amount_cents: z.coerce.number().int().min(2500).max(100000),
  purchaser_email: emailSchema,
  recipient_name: z.string().min(1).max(100),
  recipient_email: emailSchema,
  message: z.string().max(500).optional(),
});

export const reviewSchema = z.object({
  rating: z.coerce.number().int().min(1).max(5),
  body: z.string().min(10).max(2000),
  display_name: z.string().min(1).max(80),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
export type QuoteFormData = z.infer<typeof quoteFormSchema>;
export type BookingDraft = z.infer<typeof bookingDraftSchema>;
export type GiftCardPurchase = z.infer<typeof giftCardPurchaseSchema>;
