# From repo to live site — your launch day checklist

A friendly handoff. Tick each box as you go. Most steps take 5–10 minutes. The whole thing takes 4–6 hours of attention spread over 2–4 days (Twilio SMS approval is the gating async step).

> Full step-by-step for each item is in `DEPLOYMENT.md`. This page is the punch list.

---

## Day 1 — Accounts + domain

- [ ] Create **Cloudflare** account, register `knbdetailing.com` (+ `.net`, `.llc` defensively).
- [ ] Create **Vercel** account, connect to GitHub.
- [ ] Create **Supabase** account, create project `knb-detailing-prod` in us-east-2.
- [ ] Create **Stripe** account, start business activation (needs EIN + bank info + ID).
- [ ] Create **Resend** account.
- [ ] Create **Twilio** account, buy a 574-area-code number, **start the A2P 10DLC registration**.
- [ ] Sign up for **Google Workspace** Business Starter, add `knbdetailing.com`.

## Day 1 (afternoon) — DNS + email

- [ ] Add Cloudflare DNS records: A record `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com` (both DNS-only/gray cloud).
- [ ] Add Google Workspace verification TXT record.
- [ ] Add MX, SPF, DKIM, DMARC records.
- [ ] Create `hello@knbdetailing.com` mailbox.

## Day 2 — Code + database

- [ ] Push the GitHub repo (your developer can do this, or use `gh repo create`).
- [ ] Install Supabase CLI: `brew install supabase/tap/supabase`.
- [ ] `supabase login`, then `supabase link --project-ref <ref>`.
- [ ] `pnpm db:push` to apply migrations.
- [ ] `psql "<connection>" -f supabase/seed.sql` to seed the service catalog.
- [ ] `pnpm db:types` to regenerate the TypeScript types from the live schema.
- [ ] Create Supabase Storage buckets: `vehicles`, `service-photos`, `gallery`, `gift-cards`.
- [ ] Krista creates her account at `/portal/signup`.
- [ ] In Supabase SQL editor: `update profiles set role = 'admin' where email = 'krista@knbdetailing.com';`

## Day 2 (continued) — Deploy

- [ ] In Vercel → Import the GitHub repo → paste all env vars from `.env.example` → Deploy.
- [ ] Add `knbdetailing.com` and `www.knbdetailing.com` to Vercel domains.
- [ ] Wait for Let's Encrypt to issue certificates (~5 min).
- [ ] Visit <https://knbdetailing.com> — verify it loads.

## Day 3 — Stripe + Resend

> Wait until Stripe activation email arrives. Usually within 24 hours.

- [ ] **Switch Stripe dashboard to Live mode**.
- [ ] Run `pnpm stripe:setup` against live keys to create products/prices.
- [ ] Add Stripe webhook endpoint: `https://knbdetailing.com/api/stripe/webhook` with all events from DEPLOYMENT.md §F.
- [ ] Copy the webhook signing secret to Vercel env vars.
- [ ] Enable Stripe Customer Portal in Settings → Billing → Customer portal.
- [ ] **Resend**: verify `knbdetailing.com` (DKIM records).
- [ ] Send yourself a test email via Resend.

## Day 4 — Twilio + final checks

> Wait for A2P 10DLC approval email from Twilio.

- [ ] Once SMS-approved, add `TWILIO_*` env vars in Vercel.
- [ ] Trigger a redeploy in Vercel (Deployments → ⋯ → Redeploy).
- [ ] **End-to-end test**: book a $1 test appointment with your own card. Confirm:
  - [ ] Confirmation email arrived.
  - [ ] Confirmation SMS arrived (if you opted in).
  - [ ] Appointment appears in /admin/appointments.
  - [ ] Appointment appears in /portal/appointments for the test customer.
- [ ] Mark the test appointment **Completed**. Verify the service-complete email.
- [ ] Refund the test charge in Stripe.

## Post-launch — Marketing

- [ ] Submit `https://knbdetailing.com/sitemap.xml` to Google Search Console and Bing Webmaster Tools.
- [ ] Claim/optimize Google Business Profile, upload 20+ photos, mark Krista as owner.
- [ ] Update Facebook bio + "Book Now" button to `https://knbdetailing.com/book`.
- [ ] Update Syracuse-Wawasee Chamber and Kosciusko Chamber listings.
- [ ] Email your top 20 customers a launch announcement.
- [ ] Create a `WAWASEE` 15%-off promo coupon, expiry Memorial Day.
- [ ] Add the site to Apple Maps Connect (free).

## Anything still pending after the above?

See `MISSING_DATA.md` — it lists every `{{OWNER_CONFIRM_*}}` placeholder still in the codebase.

---

If you get stuck for more than 30 minutes on any step, message me. The site is built so it should work the first time — every piece has been tested in the build. The hardest part is the patient waiting on Stripe and Twilio approvals.

Good luck. Detail beautifully.

— Your developer
