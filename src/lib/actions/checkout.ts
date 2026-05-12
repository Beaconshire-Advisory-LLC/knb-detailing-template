"use server";

import { redirect } from "next/navigation";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import {
  createCustomerPortalSession,
  createGiftCardSession,
  createMembershipSession,
  chargeAppointmentBalance,
  refundCharge,
} from "@/lib/stripe/checkout";
import { stripeEnabled } from "@/lib/stripe/client";
import { giftCardPurchaseSchema } from "@/lib/validators";
import { refundCentsForCancellation } from "@/lib/pricing";

/**
 * Customer: redirect to Stripe Customer Portal for plan management.
 */
export async function openCustomerPortal() {
  if (!stripeEnabled()) redirect("/portal/billing?stripe=not-configured");
  const supabase = await getSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();
  if (!userResult.user) redirect("/portal/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", userResult.user.id)
    .maybeSingle();

  if (!profile?.stripe_customer_id) {
    redirect("/portal/billing?stripe=no-customer");
  }

  const session = await createCustomerPortalSession(profile.stripe_customer_id);
  redirect(session.url);
}

/**
 * Customer: subscribe to a membership tier — redirects to Stripe Checkout.
 */
export async function subscribeMembership(formData: FormData) {
  if (!stripeEnabled()) redirect("/membership?stripe=not-configured");
  const packageSlug = formData.get("package_slug") as string;
  const supabase = await getSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();
  if (!userResult.user) {
    redirect(`/portal/login?next=${encodeURIComponent("/membership")}`);
  }

  const { data: pkg } = await supabase
    .from("packages")
    .select("id, stripe_price_id, name")
    .eq("slug", packageSlug)
    .maybeSingle();
  if (!pkg?.stripe_price_id) {
    redirect("/membership?error=no-price");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("stripe_customer_id, email")
    .eq("id", userResult.user.id)
    .maybeSingle();

  const session = await createMembershipSession({
    stripeCustomerId: profile?.stripe_customer_id ?? null,
    customerEmail: profile?.email ?? userResult.user.email!,
    stripePriceId: pkg.stripe_price_id,
    membershipSlug: packageSlug,
  });
  redirect(session.url ?? "/membership");
}

/**
 * Public: buy a gift card.
 */
export async function purchaseGiftCard(formData: FormData) {
  if (!stripeEnabled()) redirect("/gift-cards?stripe=not-configured");
  const parsed = giftCardPurchaseSchema.safeParse({
    amount_cents: formData.get("amount_cents"),
    purchaser_email: formData.get("purchaser_email"),
    recipient_name: formData.get("recipient_name"),
    recipient_email: formData.get("recipient_email"),
    message: formData.get("message") ?? "",
  });
  if (!parsed.success) redirect("/gift-cards?error=invalid");
  const session = await createGiftCardSession({
    amountCents: parsed.data.amount_cents,
    purchaserEmail: parsed.data.purchaser_email,
    recipientEmail: parsed.data.recipient_email,
    recipientName: parsed.data.recipient_name,
    message: parsed.data.message,
  });
  redirect(session.url ?? "/gift-cards");
}

/**
 * Admin: charge the balance on a completed appointment using the saved
 * payment method from the deposit Checkout.
 */
export async function chargeBalance(formData: FormData) {
  if (!stripeEnabled()) return;
  const supabase = await getSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();
  if (!userResult.user) return;

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userResult.user.id)
    .maybeSingle();
  if (profile?.role !== "admin" && profile?.role !== "staff") return;

  const apptId = formData.get("id") as string;

  const { data: appt } = await supabase
    .from("appointments")
    .select(
      "id, total_cents, deposit_cents, balance_paid, stripe_payment_intent_id, customer_id",
    )
    .eq("id", apptId)
    .maybeSingle();
  if (!appt || appt.balance_paid) return;

  const balance = appt.total_cents - appt.deposit_cents;
  if (balance <= 0) return;

  const { data: customer } = await supabase
    .from("profiles")
    .select("stripe_customer_id")
    .eq("id", appt.customer_id)
    .maybeSingle();
  if (!customer?.stripe_customer_id || !appt.stripe_payment_intent_id) return;

  // Look up the payment method id from the deposit PaymentIntent
  const { getStripe } = await import("@/lib/stripe/client");
  const stripe = getStripe();
  const pi = await stripe.paymentIntents.retrieve(
    appt.stripe_payment_intent_id,
  );
  const paymentMethodId =
    typeof pi.payment_method === "string"
      ? pi.payment_method
      : pi.payment_method?.id;
  if (!paymentMethodId) return;

  await chargeAppointmentBalance({
    paymentMethodId,
    stripeCustomerId: customer.stripe_customer_id,
    amountCents: balance,
    appointmentId: apptId,
  });
}

/**
 * Customer: cancel an upcoming appointment. Computes the policy refund and
 * issues it via Stripe.
 */
export async function cancelAppointment(formData: FormData) {
  if (!stripeEnabled()) return;
  const supabase = await getSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();
  if (!userResult.user) return;
  const apptId = formData.get("id") as string;

  const { data: appt } = await supabase
    .from("appointments")
    .select("*")
    .eq("id", apptId)
    .eq("customer_id", userResult.user.id)
    .maybeSingle();
  if (!appt || appt.status === "cancelled") return;

  const refund = refundCentsForCancellation({
    totalCents: appt.deposit_cents,
    scheduledStart: new Date(appt.scheduled_start),
    cancelledAt: new Date(),
  });

  if (refund > 0 && appt.stripe_payment_intent_id) {
    await refundCharge({
      paymentIntentId: appt.stripe_payment_intent_id,
      amountCents: refund,
    });
  }

  await supabase
    .from("appointments")
    .update({
      status: "cancelled",
      cancelled_at: new Date().toISOString(),
      refund_amount_cents: refund,
    })
    .eq("id", apptId);
}
