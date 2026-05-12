import "server-only";
import { getStripe } from "@/lib/stripe/client";
import { SITE } from "@/lib/constants";

type CreateBookingDepositSessionArgs = {
  customerEmail: string;
  customerName: string;
  appointmentId: string;
  totalCents: number;
  depositCents: number;
  packageLabel: string;
  scheduledStartIso: string;
  serviceAddress: string;
};

/**
 * Create a Stripe Checkout session for the deposit on a booking. The
 * customer pays the deposit; the saved payment method is reused later
 * to charge the balance off-session.
 */
export async function createBookingDepositSession(
  args: CreateBookingDepositSessionArgs,
) {
  const stripe = getStripe();
  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: args.customerEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: args.depositCents,
          product_data: {
            name: `${args.packageLabel} — Deposit`,
            description: `Service ${args.scheduledStartIso} at ${args.serviceAddress}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      appointment_id: args.appointmentId,
      total_cents: String(args.totalCents),
      deposit_cents: String(args.depositCents),
      customer_name: args.customerName,
    },
    payment_intent_data: {
      setup_future_usage: "off_session",
      metadata: {
        appointment_id: args.appointmentId,
        kind: "booking_deposit",
      },
    },
    success_url: `${SITE.url}/book/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE.url}/book?cancelled=1`,
  });
}

type CreateGiftCardSessionArgs = {
  amountCents: number;
  purchaserEmail: string;
  recipientEmail: string;
  recipientName: string;
  message?: string;
};

export async function createGiftCardSession(args: CreateGiftCardSessionArgs) {
  const stripe = getStripe();
  return stripe.checkout.sessions.create({
    mode: "payment",
    payment_method_types: ["card"],
    customer_email: args.purchaserEmail,
    line_items: [
      {
        price_data: {
          currency: "usd",
          unit_amount: args.amountCents,
          product_data: {
            name: `KNB Detailing Gift Card`,
            description: `For ${args.recipientName}`,
          },
        },
        quantity: 1,
      },
    ],
    metadata: {
      kind: "gift_card",
      recipient_email: args.recipientEmail,
      recipient_name: args.recipientName,
      message: args.message ?? "",
    },
    success_url: `${SITE.url}/gift-cards/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${SITE.url}/gift-cards?cancelled=1`,
  });
}

type CreateMembershipSessionArgs = {
  stripeCustomerId?: string | null;
  customerEmail: string;
  stripePriceId: string;
  membershipSlug: string;
};

export async function createMembershipSession(
  args: CreateMembershipSessionArgs,
) {
  const stripe = getStripe();
  return stripe.checkout.sessions.create({
    mode: "subscription",
    payment_method_types: ["card"],
    customer: args.stripeCustomerId ?? undefined,
    customer_email: args.stripeCustomerId ? undefined : args.customerEmail,
    line_items: [{ price: args.stripePriceId, quantity: 1 }],
    metadata: {
      kind: "membership",
      membership_slug: args.membershipSlug,
    },
    success_url: `${SITE.url}/portal/membership?subscribed=1`,
    cancel_url: `${SITE.url}/membership?cancelled=1`,
  });
}

/**
 * Create a Stripe Customer Portal session — for self-service plan
 * management, payment-method updates, and invoice history.
 */
export async function createCustomerPortalSession(stripeCustomerId: string) {
  const stripe = getStripe();
  return stripe.billingPortal.sessions.create({
    customer: stripeCustomerId,
    return_url: `${SITE.url}/portal/dashboard`,
  });
}

/**
 * Charge the balance on a completed appointment, off-session, using the
 * payment method saved during the deposit Checkout.
 */
export async function chargeAppointmentBalance(args: {
  paymentMethodId: string;
  stripeCustomerId: string;
  amountCents: number;
  appointmentId: string;
}) {
  const stripe = getStripe();
  return stripe.paymentIntents.create({
    amount: args.amountCents,
    currency: "usd",
    customer: args.stripeCustomerId,
    payment_method: args.paymentMethodId,
    off_session: true,
    confirm: true,
    metadata: {
      appointment_id: args.appointmentId,
      kind: "booking_balance",
    },
  });
}

export async function refundCharge(args: {
  paymentIntentId: string;
  amountCents?: number;
  reason?: "duplicate" | "fraudulent" | "requested_by_customer";
}) {
  const stripe = getStripe();
  return stripe.refunds.create({
    payment_intent: args.paymentIntentId,
    amount: args.amountCents,
    reason: args.reason ?? "requested_by_customer",
  });
}
