/**
 * One-time Stripe setup: provision the products and recurring prices for
 * KNB Detailing's memberships, then store the price ids in the packages
 * table.
 *
 * Usage:
 *   pnpm tsx scripts/stripe-setup.ts
 *
 * Required env: STRIPE_SECRET_KEY (use TEST keys until ready for live),
 *               NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY.
 *
 * Safe to re-run — uses lookup_key to find existing prices.
 */

import "dotenv/config";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "../src/types/db";

const MEMBERSHIPS = [
  {
    slug: "membership-express",
    name: "Express Refresh",
    amountCents: 7500,
    interval: "month" as const,
    lookupKey: "knb_membership_express_monthly",
  },
  {
    slug: "membership-lake",
    name: "Lake Life Standard",
    amountCents: 25500,
    interval: "month" as const,
    lookupKey: "knb_membership_lake_monthly",
  },
  {
    slug: "membership-wawasee",
    name: "Wawasee Premium",
    amountCents: 39500,
    interval: "month" as const,
    lookupKey: "knb_membership_wawasee_monthly",
  },
  {
    slug: "boat-captains-pkg",
    name: "Captain's Club (seasonal)",
    amountCents: 125000,
    interval: "year" as const,
    lookupKey: "knb_membership_captains_yearly",
  },
];

async function main() {
  const stripeKey = process.env.STRIPE_SECRET_KEY;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!stripeKey || !supabaseUrl || !serviceRole) {
    throw new Error(
      "Missing env: STRIPE_SECRET_KEY, NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY",
    );
  }
  const stripe = new Stripe(stripeKey, { apiVersion: "2026-04-22.dahlia" });
  const supabase = createClient<Database>(supabaseUrl, serviceRole, {
    auth: { persistSession: false },
  });

  for (const m of MEMBERSHIPS) {
    // Find or create product
    let product: Stripe.Product;
    const products = await stripe.products.search({
      query: `metadata['slug']:'${m.slug}'`,
    });
    if (products.data.length > 0) {
      product = products.data[0];
      console.log(`✓ product exists: ${m.name} (${product.id})`);
    } else {
      product = await stripe.products.create({
        name: m.name,
        metadata: { slug: m.slug },
      });
      console.log(`✓ created product: ${m.name} (${product.id})`);
    }

    // Find or create price by lookup_key
    let price: Stripe.Price;
    const prices = await stripe.prices.list({
      lookup_keys: [m.lookupKey],
      active: true,
      limit: 1,
    });
    if (prices.data.length > 0) {
      price = prices.data[0];
      console.log(`  ↳ price exists (${price.id})`);
    } else {
      price = await stripe.prices.create({
        product: product.id,
        unit_amount: m.amountCents,
        currency: "usd",
        recurring: { interval: m.interval },
        lookup_key: m.lookupKey,
      });
      console.log(`  ↳ created price (${price.id})`);
    }

    // Persist to packages table
    const { error } = await supabase
      .from("packages")
      .update({ stripe_price_id: price.id })
      .eq("slug", m.slug);
    if (error) {
      console.error(`  ✗ DB update failed for ${m.slug}`, error);
    } else {
      console.log(`  ↳ DB row updated`);
    }
  }

  console.log("\nDone.\n");
  console.log("Next: set these env vars (in Vercel for prod):");
  for (const m of MEMBERSHIPS) {
    console.log(`  ${m.slug.toUpperCase().replace(/-/g, "_")}_PRICE=<lookup ${m.lookupKey}>`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
