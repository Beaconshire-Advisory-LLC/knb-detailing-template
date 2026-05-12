import Stripe from "stripe";

/**
 * Server-only Stripe client. Importing this from a Client Component will
 * fail at build time because of the secret-key dep.
 *
 * Latest API version pinned so behavior is deterministic across deploys.
 */
let cached: Stripe | null = null;

export function getStripe(): Stripe {
  if (cached) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  if (!key) {
    throw new Error(
      "STRIPE_SECRET_KEY is not set. Stripe operations cannot run.",
    );
  }
  cached = new Stripe(key, {
    apiVersion: "2026-04-22.dahlia",
    appInfo: {
      name: "knb-detailing",
      version: "0.1.0",
    },
  });
  return cached;
}

/** True if Stripe is configured in this environment. Use to short-circuit
 *  flows that would otherwise crash when STRIPE_SECRET_KEY is missing. */
export function stripeEnabled(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY);
}
