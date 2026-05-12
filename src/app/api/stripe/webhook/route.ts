import { NextResponse, type NextRequest } from "next/server";
import type Stripe from "stripe";
import { getStripe, stripeEnabled } from "@/lib/stripe/client";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";

/**
 * Stripe webhook handler.
 *
 * Idempotency: each event id is recorded in `stripe_events` before
 * processing. If we see the same event twice, we no-op.
 *
 * Signature verification: required — Stripe will only sign requests we
 * registered, and the webhook secret rotates per environment.
 */
export async function POST(request: NextRequest) {
  if (!stripeEnabled() || !process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "stripe not configured" },
      { status: 503 },
    );
  }

  const stripe = getStripe();
  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "no signature" }, { status: 400 });
  }
  const body = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.error("[stripe/webhook] signature verification failed", err);
    return NextResponse.json({ error: "invalid signature" }, { status: 400 });
  }

  const supabase = getSupabaseAdminClient();

  // Idempotency: have we processed this event before?
  const existing = await supabase
    .from("stripe_events")
    .select("id")
    .eq("id", event.id)
    .maybeSingle();
  if (existing.data) {
    return NextResponse.json({ received: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case "checkout.session.completed":
        await handleCheckoutCompleted(event.data.object as Stripe.Checkout.Session);
        break;
      case "payment_intent.succeeded":
        await handlePaymentSucceeded(event.data.object as Stripe.PaymentIntent);
        break;
      case "payment_intent.payment_failed":
        await handlePaymentFailed(event.data.object as Stripe.PaymentIntent);
        break;
      case "customer.subscription.created":
      case "customer.subscription.updated":
        await handleSubscriptionUpsert(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "customer.subscription.deleted":
        await handleSubscriptionDeleted(
          event.data.object as Stripe.Subscription,
        );
        break;
      case "invoice.paid":
      case "invoice.payment_failed":
        // Logged for audit; subscription event handles the state.
        break;
      case "charge.refunded":
        await handleRefund(event.data.object as Stripe.Charge);
        break;
      default:
        // Log unhandled types for visibility but acknowledge to Stripe.
        console.info("[stripe/webhook] unhandled", event.type);
    }

    // Record the event AFTER successful processing
    await supabase.from("stripe_events").insert({
      id: event.id,
      type: event.type,
      payload: JSON.parse(JSON.stringify(event)),
    });

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("[stripe/webhook] handler error", err);
    return NextResponse.json({ error: "handler failed" }, { status: 500 });
  }
}

async function handleCheckoutCompleted(session: Stripe.Checkout.Session) {
  const supabase = getSupabaseAdminClient();
  const kind = session.metadata?.kind;

  if (
    session.mode === "payment" &&
    session.metadata?.appointment_id &&
    kind !== "gift_card"
  ) {
    // Booking deposit
    await supabase
      .from("appointments")
      .update({
        deposit_paid: true,
        stripe_payment_intent_id:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id ?? null,
        status: "confirmed",
      })
      .eq("id", session.metadata.appointment_id);
  } else if (session.mode === "payment" && kind === "gift_card") {
    // Mint gift card
    const code = generateGiftCardCode();
    const amount = session.amount_total ?? 0;
    await supabase.from("gift_cards").insert({
      code,
      initial_amount_cents: amount,
      remaining_amount_cents: amount,
      purchaser_email: session.customer_email ?? null,
      recipient_email: session.metadata?.recipient_email ?? null,
      recipient_name: session.metadata?.recipient_name ?? null,
      message: session.metadata?.message ?? null,
      stripe_payment_intent_id:
        typeof session.payment_intent === "string"
          ? session.payment_intent
          : session.payment_intent?.id ?? null,
    });
    // Email delivery (Phase 7) — emit owner notification for now
    console.info("[gift-card] minted", code);
  } else if (session.mode === "subscription") {
    // Membership subscription — subscription.created event will sync the row
    if (session.customer && typeof session.customer === "string" && session.customer_email) {
      // Attach the Stripe customer id to the profile (best-effort)
      await supabase
        .from("profiles")
        .update({ stripe_customer_id: session.customer })
        .eq("email", session.customer_email);
    }
  }
}

async function handlePaymentSucceeded(pi: Stripe.PaymentIntent) {
  const supabase = getSupabaseAdminClient();
  const apptId = pi.metadata?.appointment_id;
  if (!apptId) return;
  if (pi.metadata?.kind === "booking_balance") {
    await supabase
      .from("appointments")
      .update({
        balance_paid: true,
        stripe_balance_intent_id: pi.id,
      })
      .eq("id", apptId);
  }
}

async function handlePaymentFailed(pi: Stripe.PaymentIntent) {
  const apptId = pi.metadata?.appointment_id;
  if (!apptId) return;
  const supabase = getSupabaseAdminClient();
  await supabase.from("audit_log").insert({
    actor_id: null,
    action: "payment_failed",
    entity: "appointment",
    entity_id: apptId,
    payload: {
      stripe_pi: pi.id,
      error_code: pi.last_payment_error?.code ?? null,
      error_message: pi.last_payment_error?.message ?? null,
      decline_code: pi.last_payment_error?.decline_code ?? null,
    },
  });
}

async function handleSubscriptionUpsert(sub: Stripe.Subscription) {
  const supabase = getSupabaseAdminClient();
  const customerId =
    typeof sub.customer === "string" ? sub.customer : sub.customer.id;

  const { data: profile } = await supabase
    .from("profiles")
    .select("id")
    .eq("stripe_customer_id", customerId)
    .maybeSingle();
  if (!profile) return;

  const priceId = sub.items.data[0]?.price.id;
  const { data: pkg } = await supabase
    .from("packages")
    .select("id")
    .eq("stripe_price_id", priceId ?? "")
    .maybeSingle();

  const periodStart = (sub as Stripe.Subscription & { current_period_start?: number }).current_period_start;
  const periodEnd = (sub as Stripe.Subscription & { current_period_end?: number }).current_period_end;

  const status: "active" | "past_due" | "paused" | "cancelled" | "incomplete" =
    sub.status === "active"
      ? "active"
      : sub.status === "past_due"
        ? "past_due"
        : sub.status === "canceled"
          ? "cancelled"
          : sub.status === "paused"
            ? "paused"
            : "incomplete";

  if (!pkg?.id) {
    console.warn("[stripe/webhook] subscription without matching package_id, price:", priceId);
    return;
  }

  const finalPayload = {
    customer_id: profile.id,
    package_id: pkg.id,
    stripe_subscription_id: sub.id,
    status,
    current_period_start: periodStart ? new Date(periodStart * 1000).toISOString() : null,
    current_period_end: periodEnd ? new Date(periodEnd * 1000).toISOString() : null,
    cancel_at_period_end: sub.cancel_at_period_end ?? false,
  };

  const { data: existing } = await supabase
    .from("memberships")
    .select("id")
    .eq("stripe_subscription_id", sub.id)
    .maybeSingle();

  if (existing) {
    await supabase
      .from("memberships")
      .update(finalPayload)
      .eq("id", existing.id);
  } else {
    await supabase.from("memberships").insert(finalPayload);
  }
}

async function handleSubscriptionDeleted(sub: Stripe.Subscription) {
  const supabase = getSupabaseAdminClient();
  await supabase
    .from("memberships")
    .update({ status: "cancelled", cancel_at_period_end: true })
    .eq("stripe_subscription_id", sub.id);
}

async function handleRefund(charge: Stripe.Charge) {
  const supabase = getSupabaseAdminClient();
  const piId =
    typeof charge.payment_intent === "string"
      ? charge.payment_intent
      : charge.payment_intent?.id;
  if (!piId) return;
  await supabase
    .from("appointments")
    .update({
      refund_amount_cents: charge.amount_refunded,
    })
    .eq("stripe_payment_intent_id", piId);
}

function generateGiftCardCode(): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let s = "KNB-";
  for (let i = 0; i < 8; i++) {
    s += chars[Math.floor(Math.random() * chars.length)];
  }
  return s;
}

// Stripe sends webhooks as application/json with binary signing — disable body parsing
// (Next.js App Router automatically reads as text via request.text(); no special config needed).
