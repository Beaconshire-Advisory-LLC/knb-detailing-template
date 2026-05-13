# Deployment — repo to live site

A non-developer can follow this top-to-bottom and the site will be live with real payments. Section letters match the spec.

> **Estimated time, end to end:** 4–6 hours of attention, spread over 2–4 days (Twilio A2P registration takes 1–3 days asynchronously).

> **Estimated launch cost:** ~$10/mo + $10/yr first month (domain), variable after.

---

## A · Accounts to create (with expected monthly cost)

Sign up for each in this order. Use the same email everywhere — preferably `krista@knbdetailing.com` once email is live, or a personal email for now.

### 1. Cloudflare — domain registrar + DNS
- Go to <https://cloudflare.com>. Click **Sign Up** (top right).
- Verify your email.
- You don't have a "team" or "site" yet — that's normal. We'll register the domain in Section B.
- **Cost:** about $10/yr for `knbdetailing.com` at-cost from Cloudflare. Free WHOIS privacy included.

### 2. Vercel — hosting
- Go to <https://vercel.com>. Click **Sign Up**.
- Choose **Continue with GitHub** (recommended) — connects your account so deploys happen automatically when you push to GitHub.
- Pick the **Hobby** plan ($0).
- If/when traffic grows or commercial-use enforcement bites, upgrade to **Pro** ($20/mo).

### 3. Supabase — database, auth, file storage
- Go to <https://supabase.com>. Click **Start your project**.
- Sign in with GitHub.
- Click **New Project**:
  - Organization: create one called "KNB Detailing" if none exists.
  - Name: `knb-detailing-prod`
  - Region: **East US (us-east-2)** — closest to Indiana.
  - Database Password: generate a strong one. **Save it in a password manager** (you'll only see it once).
  - Plan: **Free** is fine to start; upgrade to Pro ($25/mo) when you cross the free tier limits (500MB storage, 50K monthly active users) or want Point-in-Time Recovery.
- Wait ~2 minutes for provisioning.

### 4. Stripe — payments
- Go to <https://stripe.com>. Click **Start now**.
- Sign up with your business email.
- Stripe will ask you to **activate** the account before you can take live payments:
  - Legal business name: **KNB Detailing LLC**
  - EIN: from your Indiana SOS filing
  - Bank account: routing + account number for deposits
  - Owner ID: Krista's driver's license (photo upload)
  - Industry: **Automotive / Auto repair & maintenance**
- Activation typically takes a few hours to a couple business days. You can develop and test with TEST keys before activation.

### 5. Resend — transactional email
- Go to <https://resend.com>. Sign up.
- **Free tier**: 3,000 emails/month, 100/day. Enough to start.
- We'll verify the `knbdetailing.com` domain in Section G after DNS is set up.

### 6. Twilio — SMS
- Go to <https://twilio.com>. Sign up (free trial gives you $15 credit).
- After verifying your phone:
  - **Phone Numbers → Buy a number**: pick a local 574 area code number (~$1.15/mo).
  - **Messaging → Senders → A2P 10DLC**: register your business (required for US SMS). This takes 1–3 business days. Use the EIN from your Stripe activation.

### 7. Google Workspace — for `hello@knbdetailing.com`
- Go to <https://workspace.google.com>. Sign up for **Business Starter** ($7/user/mo).
- Add `knbdetailing.com` as your domain (we'll verify it via DNS in Section D).
- Or alternative: **Fastmail** at $5/mo if you prefer not to use Google.

### 8. Google Business Profile — free, do this after launch
- <https://business.google.com>. Claim or create the listing for "KNB Detailing LLC, Syracuse, IN".

### 9. Sentry (optional) — error monitoring
- <https://sentry.io>. Free tier is fine for a small site.
- We'll wire it up in Section J post-deploy.

---

## B · Domain registration

1. Log into Cloudflare → **Domain Registration** → **Register Domain**.
2. Search for **`knbdetailing.com`**.
3. Add to cart. **Recommended add-ons:**
   - Also register `knbdetailingllc.com` and `knbdetailing.net` defensively (~$10/yr each).
4. Complete checkout. WHOIS privacy is included free.
5. Cloudflare emails you a verification link — click it within 15 days or the domain is locked.
6. Domain takes ~30 minutes to register fully.

---

## C · DNS setup (Cloudflare → Vercel)

1. In your **Vercel** project dashboard (we'll create the project in Section I — come back here after that):
   - **Settings → Domains → Add Domain**: enter `knbdetailing.com`, then add `www.knbdetailing.com` as a second domain.
   - Vercel shows you a DNS configuration screen.
2. In Cloudflare:
   - Open the **DNS** tab for `knbdetailing.com`.
   - **Delete any existing A or CNAME records on `@` and `www`.**
   - **Add:**
     - **Type** A · **Name** `@` · **Content** `76.76.21.21` · **Proxy status: DNS only** (gray cloud, NOT orange — Vercel needs unproxied so it can issue certificates).
     - **Type** CNAME · **Name** `www` · **Content** `cname.vercel-dns.com` · **Proxy status: DNS only**.
3. Wait 1–5 minutes.
4. In Vercel, the domains should turn green ("Valid Configuration"). Vercel auto-issues an SSL certificate via Let's Encrypt.
5. **Set the primary**: in Vercel → Domains, click the three-dot menu on `knbdetailing.com` → **Set as Primary**. The `www` domain will automatically redirect to apex.
6. Verify: open <https://knbdetailing.com> and <https://www.knbdetailing.com> in a private window. Both should work, both should be HTTPS.

---

## D · Email DNS (`hello@knbdetailing.com` via Google Workspace)

1. In Google Workspace setup, add `knbdetailing.com`.
2. Google gives you a verification TXT record. Add it in Cloudflare:
   - **Type** TXT · **Name** `@` · **Content** the exact `google-site-verification=...` string · **Proxy status: DNS only**.
3. Wait ~5 minutes, click **Verify** in Google.
4. Add Google's **MX records** (Cloudflare DNS):
   - **Type** MX · **Name** `@` · **Priority** 1 · **Content** `smtp.google.com`
5. Add the **SPF** record:
   - **Type** TXT · **Name** `@` · **Content** `v=spf1 include:_spf.google.com include:resend.com ~all`
6. Add **DKIM** (Google generates this for you under Admin → Apps → Gmail → Authenticate email):
   - **Type** TXT · **Name** `google._domainkey` · **Content** the long string Google provides.
7. Add **DMARC**:
   - **Type** TXT · **Name** `_dmarc` · **Content** `v=DMARC1; p=quarantine; rua=mailto:dmarc@knbdetailing.com`
8. In Google Workspace Admin → Users → **Add user**:
   - First name: `Hello`, Last name: ` ` (single space), primary email: `hello@knbdetailing.com`.
   - (Or use a real personal mailbox like `krista@knbdetailing.com` and an alias for `hello@`.)

---

## E · Supabase production setup

1. **Install the Supabase CLI** (one-time, on your laptop):
   ```bash
   brew install supabase/tap/supabase
   ```
2. From the project root:
   ```bash
   cd ~/Desktop/knb-detailing
   supabase login                 # opens a browser, link your account
   supabase link --project-ref <YOUR_PROJECT_REF>
   ```
   `YOUR_PROJECT_REF` is in your Supabase URL: `https://<ref>.supabase.co`.
3. Apply migrations:
   ```bash
   pnpm db:push
   ```
4. Seed the service catalog:
   ```bash
   # Get your DB connection string from Supabase → Settings → Database → Connection string
   psql "<connection-string>" -f supabase/seed.sql
   ```
5. Generate TypeScript types from the live schema:
   ```bash
   pnpm db:types
   git add src/types/db.ts && git commit -m "Regen Supabase types"
   ```
6. **Storage buckets** — in Supabase → Storage:
   - `vehicles` (private)
   - `service-photos` (private)
   - `gallery` (public-read)
   - `gift-cards` (private)
   - Configure CORS for each: `Allowed origins: https://knbdetailing.com`.
7. **Promote the first admin** — after Krista creates her account at `/portal/signup`, run this SQL in the Supabase SQL editor:
   ```sql
   update profiles set role = 'admin' where email = 'krista@knbdetailing.com';
   ```
8. **Enable Point-in-Time Recovery** (Supabase Pro, $25/mo) — Settings → Database → PITR. Recommended after the first month of real bookings.

---

## F · Stripe production setup

After activation completes, **switch your dashboard to "Live mode"** (toggle top-left).

1. Get the **Live secret key**: Developers → API keys → Reveal `sk_live_...`. **Save in a password manager**.
2. Run the product/price provisioning script:
   ```bash
   STRIPE_SECRET_KEY=sk_live_...   \
   NEXT_PUBLIC_SUPABASE_URL=https://...supabase.co   \
   SUPABASE_SERVICE_ROLE_KEY=eyJh...   \
   pnpm stripe:setup
   ```
   This creates the 4 membership products + prices and writes `stripe_price_id` into the `packages` table.
3. **Webhook endpoint** — Developers → Webhooks → **+ Add endpoint**:
   - Endpoint URL: `https://knbdetailing.com/api/stripe/webhook`
   - Events to listen to: `checkout.session.completed`, `payment_intent.succeeded`, `payment_intent.payment_failed`, `customer.subscription.created`, `customer.subscription.updated`, `customer.subscription.deleted`, `invoice.paid`, `invoice.payment_failed`, `charge.refunded`.
   - After creation, click **Reveal signing secret**. Save this for `STRIPE_WEBHOOK_SECRET` in Section H.
4. **Customer Portal** — Settings → Billing → Customer portal:
   - **Functionality**: enable Update payment method, Cancel subscription, View invoices.
   - **Subscriptions**: disallow plan switching (we manage that ourselves).
   - **Business information**: name, terms link `https://knbdetailing.com/legal/terms`, privacy link `https://knbdetailing.com/legal/privacy`.
5. **Tax** — leave off unless your CPA (James Flecker, Beaconshire Advisory) directs otherwise.

---

## G · Resend + Twilio

### Resend (email)
1. Resend dashboard → **Domains** → **Add Domain**: enter `knbdetailing.com`.
2. Resend gives you DKIM TXT records. Add each in Cloudflare DNS exactly as shown.
3. Wait 5–10 minutes, click **Verify**.
4. Create an API key (**API Keys → Create**). Name it `prod`. Save the value for env vars below.
5. Send a test: `resend.emails.send({ from: 'hello@knbdetailing.com', to: 'your-personal-email', subject: 'Test', text: 'Hello' })`.

### Twilio (SMS)
1. Once A2P 10DLC registration is **approved**, you can send SMS.
2. Get your **Account SID** and **Auth Token** from Account → API Keys.
3. **Buy a number**: Phone Numbers → Buy a Number → US, 574 area code, ~$1.15/mo. SMS-enabled.
4. Save the number in E.164 format (e.g. `+15745551234`) for env vars.

---

## H · Vercel environment variables

In Vercel → Settings → Environment Variables, add each of these (mark all as Production scope):

```
# Site
NEXT_PUBLIC_SITE_URL=https://knbdetailing.com

# Supabase (Settings → API in your Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://<ref>.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJh...
SUPABASE_SERVICE_ROLE_KEY=eyJh...      # ← keep this server-only

# Stripe (LIVE — not test)
STRIPE_SECRET_KEY=sk_live_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Resend
RESEND_API_KEY=re_...
RESEND_FROM_EMAIL=KNB Detailing <hello@knbdetailing.com>
OWNER_NOTIFICATION_EMAIL=krista@knbdetailing.com

# Twilio
TWILIO_ACCOUNT_SID=AC...
TWILIO_AUTH_TOKEN=...
TWILIO_PHONE_NUMBER=+15745551234

# Cron (any 32+ char random string)
CRON_SECRET=<openssl rand -hex 32>

# Sentry (optional, after Section J)
SENTRY_DSN=
```

> **Never commit these to git.** `.env.example` is the only env file in the repo.

---

## I · Deploy

1. Push the repo to GitHub:
   ```bash
   cd ~/Desktop/knb-detailing
   gh repo create knb-detailing --private --source=. --remote=origin --push
   ```
   (or via the GitHub web UI — `Settings → Repositories → New`.)
2. In Vercel → **Add New → Project** → Import your GitHub repo.
3. Vercel auto-detects Next.js. Confirm framework, root directory `.`, build command `pnpm build`, install command `pnpm install`.
4. Paste the env vars from Section H (or use the **Bulk Edit** mode).
5. Click **Deploy**. First deploy takes ~3 minutes.
6. Visit the `<project>.vercel.app` preview URL. Verify the home page renders.
7. **Promote to production**: in Vercel, the latest deploy on `main` branch becomes the production deployment automatically.
8. Verify `https://knbdetailing.com` resolves.

---

## J · Post-launch checklist

1. **Sitemap submission**:
   - Google Search Console: <https://search.google.com/search-console> → Add property → URL prefix `https://knbdetailing.com` → verify via TXT record → Submit sitemap `/sitemap.xml`.
   - Bing Webmaster Tools: <https://www.bing.com/webmasters> → same flow.
2. **Google Business Profile**: claim, add photos (20+ before/after), set hours, mark Krista as owner and Benjamin as manager.
3. **Update Facebook**: bio "Now booking online at knbdetailing.com", "Book Now" button → `https://knbdetailing.com/book`.
4. **Chamber listings**: update Syracuse-Wawasee Chamber and Kosciusko Chamber listings with the new URL.
5. **Customer launch announcement**: email your top 20 customers from your phone contacts. Give them referral code `KNB-LAUNCH` for $25 off.
6. **Seasonal promo coupon**: in /admin/coupons, create `WAWASEE` for 15% off, expires Memorial Day.
7. **Schedule blog posts**: 3 are seeded. Aim for 1/week through summer (boat-care topics for May/June, ceramic-coating in July).
8. **Google Analytics 4**: create a property, copy the measurement ID, set `NEXT_PUBLIC_GA_MEASUREMENT_ID` in Vercel. (Analytics scripts are gated — they only load when this env var is set.)
9. **First real transaction**: book a $1 test detail with your own card, complete it, refund. Verify the email + SMS + portal flow end-to-end.
10. **Apple Maps Connect**: <https://mapsconnect.apple.com> — claim the listing (free).
11. **Sentry**: from your laptop in the project directory, run `pnpm dlx @sentry/wizard@latest -i nextjs`. Follow the prompts; it auto-edits the right config files. Set `SENTRY_DSN` in Vercel.

---

## K · Ongoing monthly costs (estimate)

| Service | Plan | Cost |
|---|---|---|
| Cloudflare (registrar) | At-cost | $10/yr |
| Vercel | Hobby | $0 (Pro $20/mo when commercial-use enforced) |
| Supabase | Free → Pro | $0 → $25/mo at scale |
| Stripe | Pay-as-you-go | 2.9% + 30¢ per transaction |
| Resend | Free | $0 (Pro $20/mo above 3k emails) |
| Twilio | Pay-as-you-go | ~$1.15/mo number + $0.0079/SMS |
| Google Workspace | Business Starter | $7/user/mo |
| Sentry | Free | $0 |
| **Floor** | | **~$10/mo + $10/yr first month** |

---

## When things go wrong

- **Site is up but `https://www.knbdetailing.com` shows a Vercel error**: DNS hasn't propagated yet. Wait another 10 minutes. Check `dig www.knbdetailing.com` resolves to `cname.vercel-dns.com`.
- **Stripe webhook is failing**: Stripe Dashboard → Developers → Webhooks → click your endpoint → see the failure log. Most common cause is the wrong webhook secret in Vercel env vars.
- **Emails not sending**: Resend dashboard → Emails. Look for delivery status. If domain is unverified, see Section G.
- **SMS not sending**: A2P 10DLC registration still pending — Twilio Console → Messaging → Senders → status. Typically 1–3 business days.
- **Build failing on Vercel**: check the build log. Most common: a new env var was added in the code but not in Vercel; or the Supabase types file is out of sync — run `pnpm db:types` locally and commit.

If something is stuck for more than 30 minutes, message me (your developer).
