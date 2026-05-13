# Setup walkthrough — every keystroke

**Beaconshire Advisory · KNB Detailing turnkey package**

This document walks you through every click required to take your website from "code on a hard drive" to "live with real bookings." Beaconshire will be on a video call with you for the technical steps. You do all the account creation and KYC yourself, so every account is in your name from minute one.

---

## Table of contents

- [Session 1 — Account creation (~90 min, together)](#session-1)
  - [1.1 · Cloudflare (domain + DNS)](#11--cloudflare)
  - [1.2 · Buy the domain](#12--buy-the-domain)
  - [1.3 · Vercel (hosting)](#13--vercel)
  - [1.4 · GitHub (your code repository)](#14--github)
  - [1.5 · Supabase (database)](#15--supabase)
  - [1.6 · Resend (email)](#16--resend)
  - [1.7 · Twilio (SMS) — start the slow part now](#17--twilio)
  - [1.8 · Google Workspace (your business email)](#18--google-workspace)
  - [1.9 · Stripe (payments) — start activation now](#19--stripe)
- [Session 2 — DNS records (~20 min, together)](#session-2)
- [Async wait — 1 to 3 business days](#async-wait)
- [Session 3 — Deploy + final wiring (~60 min, together)](#session-3)
- [Session 4 — End-to-end test (~30 min, together)](#session-4)
- [You're live](#youre-live)

---

## Session 1 — Account creation

**Setting:** You and Beaconshire are on a Zoom or Google Meet. You share your screen. Beaconshire watches and guides.

**Why we do it this way:** every account is in YOUR name, with YOUR email, on YOUR credit card. Beaconshire never has a credential. The moment you finish each step, you own it.

### 1.1 · Cloudflare

Cloudflare is where you'll register your domain and manage DNS. They charge at-cost ($10/year) and include free privacy.

**Keystrokes:**

1. Open a new browser tab.
2. Type `cloudflare.com` and press Enter.
3. Top-right corner — click **"Sign Up"**.
4. Email: type the email address you'll use everywhere for the business (we recommend `krista@gmail.com` or similar).
5. Password: click **"Generate Strong Password"** (or use your password manager). **Save this password.**
6. Click **"Create Account"**.
7. Check your email. Click the **"Verify email address"** link Cloudflare just sent.
8. Back in Cloudflare: skip the "Add a website" wizard for now — click the **"X"** to dismiss it.
9. You're done. You'll come back here in 1.2 to buy the domain.

### 1.2 · Buy the domain

**Keystrokes:**

1. In Cloudflare (still signed in), look at the left sidebar.
2. Click **"Domain Registration"** → **"Register Domain"**.
3. Search box: type `knbdetailing.com` and press Enter.
4. If available (it should be): click **"Purchase"** next to `knbdetailing.com`.
5. Optional: also add `knbdetailing.net` and `knbdetailingllc.com` defensively (~$10/yr each). Click **"Add to cart"** on each.
6. Click **"Continue"**.
7. WHOIS contact info: Cloudflare prefills this. Make sure your name and address are correct. **Privacy is automatically included free.**
8. Payment: enter your credit card number, expiration, CVC, billing address.
9. **Auto-renewal: leave ON.** This costs $10/yr and forgetting it is how websites die.
10. Click **"Complete Purchase"**.
11. You'll see "Domain registered successfully." Check your email for a verification link from Cloudflare — **click it within 15 days** or the domain gets locked.

**You now own `knbdetailing.com`.** It takes about 30 minutes to fully register; we'll come back to add DNS records in Session 2.

### 1.3 · Vercel

Vercel hosts the actual website. The free tier covers everything you'll need for years.

**Keystrokes:**

1. Open a new tab. Go to `vercel.com`.
2. Top-right — click **"Sign Up"**.
3. **Important: pick "Continue with GitHub"** (we'll connect them in step 1.4). If you don't have GitHub yet, skip ahead to step 1.4 first, then come back here.
4. Authorize Vercel to read your GitHub account when prompted.
5. Vercel asks "What's your name?" — your name.
6. "Which best describes you?" — pick **"Building products / Doing my own thing"**.
7. Plan: **Hobby** ($0). You can upgrade later if Vercel ever enforces commercial-use rules — most small business sites stay free forever.
8. Click **"Continue"**. You're in. We'll come back to deploy in Session 3.

### 1.4 · GitHub

GitHub stores your code. The repository will be in your name.

**Keystrokes:**

1. New tab → `github.com`.
2. Top-right — **"Sign up"**.
3. Email: same business email you've used so far.
4. Password: strong, save it.
5. Username: pick something simple — `krista-hohman` or `knb-detailing` work. **Lowercase, no spaces.**
6. Solve the puzzle / verify email.
7. Plan: **Free**. Skip any "personalize your experience" wizards.
8. **Back to Vercel** (other tab) — refresh the page. Vercel should now show your GitHub connected.

**Beaconshire's job here:** push the code to your GitHub. Beaconshire will ask you to add their account as a **temporary collaborator** so they can do the initial push, then they remove themselves. The repo lives in your account from minute one.

To add Beaconshire as collaborator:

1. After Beaconshire creates the empty repo at `github.com/your-username/knb-detailing`, go to that page.
2. Click **"Settings"** (top right of the repo page).
3. Left sidebar — **"Collaborators"**.
4. Click **"Add people"**.
5. Type the GitHub username Beaconshire gives you on the call. Click **"Add to repository"**.
6. Beaconshire pushes the code, then says "done."
7. Back in Settings → Collaborators, click the **"Remove"** button next to Beaconshire's name. Confirm.

**You now have the code in a repository you fully own.**

### 1.5 · Supabase

Supabase is your database — customer info, vehicles, appointments, photos.

**Keystrokes:**

1. New tab → `supabase.com`.
2. Top-right — **"Start your project"**.
3. **"Continue with GitHub"** — authorize.
4. Inside Supabase: **"New Project"**.
5. Organization: if none exists, click **"New organization"**. Name: `KNB Detailing`. Type: **Personal**. Plan: **Free**.
6. Project name: `knb-detailing-prod`.
7. Database password: click the **dice icon** to generate one. **Save this password in your password manager immediately** — you only see it once.
8. Region: **East US (North Virginia)** — closest to Indiana.
9. Plan: **Free**. Click **"Create new project"**.
10. Wait ~2 minutes. Supabase provisions your database.
11. Once the dashboard loads, look at the left sidebar → **"Settings"** (gear icon) → **"API"**.
12. **Copy three values into a notes document** (Apple Notes, etc.):
    - **Project URL** (looks like `https://abcdefg.supabase.co`) — label it `NEXT_PUBLIC_SUPABASE_URL`
    - **anon public key** (long string starting with `eyJ`) — label it `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    - **service_role secret key** (also `eyJ...`, found below the anon key — click "reveal") — label it `SUPABASE_SERVICE_ROLE_KEY`
13. **DO NOT share the service_role key.** It bypasses all security.

You'll paste these into Vercel in Session 3.

### 1.6 · Resend

Resend sends every email your site sends — booking confirmations, reminders, owner notifications.

**Keystrokes:**

1. New tab → `resend.com`.
2. Top-right — **"Sign Up"**.
3. Same business email + new password.
4. Once in: left sidebar → **"API Keys"** → **"Create API Key"**.
5. Name: `production`. Permission: **"Full access"**.
6. Click **"Add"**.
7. **Copy the key** (starts with `re_...`). Save it labeled `RESEND_API_KEY` in your notes.
8. You'll add your domain to Resend in Session 2.

### 1.7 · Twilio — start the slow part now

Twilio sends every text message. Sending US SMS for a business requires a one-time registration ("A2P 10DLC") that takes 1–3 business days. **Start it now** so it's running while you do everything else.

**Keystrokes:**

1. New tab → `twilio.com`.
2. **"Sign up"** → email + password.
3. Verify your phone number (Twilio texts you).
4. Account info — type your name, business name (`KNB Detailing LLC`).
5. "What do you want to build?" — pick **"SMS"**.
6. Skip any code samples.
7. You're in the Twilio Console. From the left sidebar, click **"Phone Numbers"** → **"Manage"** → **"Buy a number"**.
8. Country: **United States**. Capabilities: check **SMS**. Number type: **Local**. Area code: **574**.
9. Click **"Search"**. Pick any number that looks reasonable. Click **"Buy"** ($1.15/month).
10. Confirm the purchase.
11. **Copy three values** into your notes:
    - **Account SID** (visible at the top of the Twilio console)
    - **Auth Token** (click "show" — top of the console)
    - **The phone number** you just bought, in E.164 format like `+15745551234`
    - Label them `TWILIO_ACCOUNT_SID`, `TWILIO_AUTH_TOKEN`, `TWILIO_PHONE_NUMBER`
12. Now the slow part. Left sidebar → **"Messaging"** → **"Regulatory Compliance"** → **"A2P 10DLC"**.
13. Click **"Get started"**.
14. **Business profile**: legal name `KNB Detailing LLC`, type **LLC**, EIN: yours, address: yours, website: `knbdetailing.com`, regions of operation: **US**.
15. Submit. Twilio reviews this within hours.
16. After business profile is approved, return to A2P 10DLC. Register a **brand** (use the same business info), then a **campaign** — pick "Mixed" or "Low Volume Mixed" use case, sample messages: paste these:
    - `Booking confirmed for {date} at {address}. Reply STOP to opt out.`
    - `KNB Detailing reminder: see you tomorrow at {time}. Reply STOP to opt out.`
    - `Your detail is complete. Photos are in your portal.`
17. Submit. **This takes 1–3 business days.** You'll get an email when it's approved.

**Move on without waiting.**

### 1.8 · Google Workspace

This gives you `hello@knbdetailing.com` (or `krista@knbdetailing.com`) — the email customers see in confirmation emails and the footer.

**Keystrokes:**

1. New tab → `workspace.google.com`.
2. Click **"Get started"**.
3. Business name: `KNB Detailing LLC`. Employees: **1–10**.
4. Region: **United States**.
5. Contact info: your current personal email.
6. "Does your business have a domain?" — **Yes**. Type `knbdetailing.com`.
7. Plan: **Business Starter** ($7/user/month). 14-day free trial.
8. Create your sign-in: username `hello` → so your email is `hello@knbdetailing.com`. Strong password.
9. Payment info.
10. Click **"Next"**.
11. Google asks you to verify the domain. Pick the **"TXT record"** verification method. **Copy the TXT record value** Google shows you. We'll add it in Session 2.

### 1.9 · Stripe — start activation now

Stripe handles all payments. Activation requires KYC and takes a few hours to a couple business days. **Start it now.**

**Keystrokes:**

1. New tab → `stripe.com`.
2. **"Start now"** → email + password.
3. Verify your email.
4. In the Stripe dashboard, you'll see a prompt: **"Activate your account"**. Click it.
5. **Business details**: legal business name `KNB Detailing LLC`, business type **LLC, single-member** (or multi-member if both Krista and Benjamin are members), EIN: yours.
6. **Business address**: your actual address.
7. **Phone**: business phone.
8. **Industry**: **Automotive → Auto wash and detail services**.
9. **Business website**: `https://knbdetailing.com`.
10. **Product description**: "Mobile auto, boat, RV, and motorcycle detailing services. Customers book online and pay deposits; balance is charged after service is complete."
11. **Bank account**: routing + account numbers where deposits go. Use the business account if you have one.
12. **Statement descriptor** (shows on customer credit card statements): `KNB DETAILING`.
13. **Personal verification**: Stripe needs to verify Krista as the business owner.
    - Legal name, date of birth, SSN (last 4), home address.
    - **ID upload**: take a clear photo of the front and back of Krista's driver's license.
14. Click **"Submit"**.
15. Stripe reviews this. Usually approved within a few hours. You'll get an email.
16. While waiting: in the Stripe dashboard, look at the top of the screen. Make sure you're in **Test mode** (toggle in top-right). Left sidebar → **"Developers"** → **"API keys"**.
17. **Copy two values**:
    - **Publishable key** (starts with `pk_test_...` for now; later `pk_live_...`) — label `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
    - **Secret key** (click "Reveal", starts with `sk_test_...` for now) — label `STRIPE_SECRET_KEY`
18. We'll come back to add the webhook secret and switch to live keys after activation.

---

**Session 1 done.** You now own:

- A domain
- A Cloudflare account
- A Vercel account
- A GitHub account with your code in it
- A Supabase project with your database
- A Resend account
- A Twilio account (waiting on SMS approval)
- A Google Workspace account (waiting on DNS verification)
- A Stripe account (waiting on KYC approval)

Take a break. Next session is DNS records.

---

## Session 2 — DNS records

**Setting:** Another short call, ~20 minutes. We point your domain at Vercel and verify your email.

### 2.1 · Vercel — claim the domain

1. Open `vercel.com` and sign in.
2. Top-left, click **"Add new..."** → **"Project"**.
3. From your GitHub repos, pick `knb-detailing`. Click **"Import"**.
4. Vercel auto-detects Next.js. Don't change anything.
5. **Environment Variables** — this is where we paste everything from your notes. Click **"Add"** for each:

| Name | Value (from notes) |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://knbdetailing.com` |
| `NEXT_PUBLIC_SUPABASE_URL` | your Supabase Project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | your Supabase anon key |
| `SUPABASE_SERVICE_ROLE_KEY` | your Supabase service_role key |
| `STRIPE_SECRET_KEY` | your Stripe secret key (test for now) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | your Stripe publishable key |
| `RESEND_API_KEY` | your Resend API key |
| `RESEND_FROM_EMAIL` | `KNB Detailing <hello@knbdetailing.com>` |
| `OWNER_NOTIFICATION_EMAIL` | `krista@knbdetailing.com` |
| `TWILIO_ACCOUNT_SID` | your Twilio Account SID |
| `TWILIO_AUTH_TOKEN` | your Twilio Auth Token |
| `TWILIO_PHONE_NUMBER` | your Twilio number (E.164) |
| `CRON_SECRET` | a random 32-character string (Beaconshire generates this on the call) |

6. Click **"Deploy"**. Wait ~3 minutes. The first deploy finishes; you'll get a `xxxx.vercel.app` URL.
7. In Vercel → **"Settings"** → **"Domains"** → type `knbdetailing.com` → **"Add"**.
8. Add `www.knbdetailing.com` as a second domain.
9. Vercel shows you the DNS records to add. **Keep this tab open**.

### 2.2 · Cloudflare — add the DNS records

1. In another tab, open `cloudflare.com` → sign in → click your domain.
2. Left sidebar → **"DNS"** → **"Records"**.
3. **Delete any existing A or CNAME records on `@` or `www`** if present.
4. Click **"Add record"**:
   - Type: **A** · Name: **@** · IPv4 address: **76.76.21.21** · Proxy status: **DNS only** (gray cloud — VERY important).
   - Click **"Save"**.
5. Click **"Add record"** again:
   - Type: **CNAME** · Name: **www** · Target: **cname.vercel-dns.com** · Proxy status: **DNS only**.
   - Click **"Save"**.

### 2.3 · Google Workspace verification record

Still in Cloudflare DNS → **"Add record"**:

- Type: **TXT** · Name: **@** · Content: paste the `google-site-verification=...` string Google gave you in 1.8 · Proxy status: **DNS only**.
- Save.

Go back to Google Workspace setup, click **"Verify"**. Once verified, Google walks you through adding **MX records** and an **SPF record**. Add each in Cloudflare DNS the same way (Beaconshire helps you on the call):

- **MX** record · Name `@` · Priority 1 · Content `smtp.google.com`
- **TXT** record · Name `@` · Content `v=spf1 include:_spf.google.com include:resend.com ~all`
- **TXT** record · Name `_dmarc` · Content `v=DMARC1; p=quarantine; rua=mailto:dmarc@knbdetailing.com`

Wait 5–10 minutes. Refresh.

### 2.4 · Resend domain verification

1. Resend dashboard → **"Domains"** → **"Add Domain"** → type `knbdetailing.com`.
2. Resend shows DKIM TXT records.
3. Add each one in Cloudflare DNS:
   - Type: **TXT** · Name + Content: exactly as Resend shows · Proxy: **DNS only**.
4. Wait 5 minutes. Click **"Verify"** in Resend. Should turn green.

### 2.5 · Verify the site works

1. Back to Vercel. Settings → Domains. Both `knbdetailing.com` and `www.knbdetailing.com` should now show **"Valid configuration"** with green checkmarks.
2. Open a private browser window. Go to `https://knbdetailing.com`. It loads. HTTPS lock icon is present.
3. Try `https://www.knbdetailing.com`. It redirects to apex. Good.

**Session 2 done. The site is technically live, but doesn't yet have a database loaded or Stripe in live mode. That's Session 3.**

---

## Async wait — 1 to 3 business days

Nothing for you to do during this period. You're waiting on:

- **Stripe approval** — usually within 24 hours. You'll get an email when activated.
- **Twilio A2P 10DLC approval** — 1 to 3 business days.

Beaconshire will check in once both come through. Then we schedule Session 3.

---

## Session 3 — Deploy + final wiring

**Setting:** ~60 minutes, screen-share.

### 3.1 · Apply the database schema

Beaconshire runs three commands from their terminal (you watch):

```
supabase link --project-ref <your-project-ref>
pnpm db:push
psql "<your-connection-string>" -f supabase/seed.sql
```

This creates all 17 tables and seeds the service catalog with placeholder pricing. (You can edit pricing later from `/admin/services`.)

### 3.2 · Switch Stripe to live mode

1. In Stripe dashboard, top-left toggle: **switch from "Test mode" to "Live mode"**.
2. **Important**: live mode has different API keys than test mode.
3. Developers → API keys → reveal the live secret key (`sk_live_...`).
4. **Copy the live publishable key + live secret key**.
5. Back in Vercel → Settings → Environment Variables → update `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` with the live values.

### 3.3 · Add the Stripe webhook

1. In Stripe (Live mode), Developers → **"Webhooks"** → **"Add endpoint"**.
2. Endpoint URL: `https://knbdetailing.com/api/stripe/webhook`.
3. Select events: 
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `charge.refunded`
4. Click **"Add endpoint"**.
5. On the endpoint detail page, **"Reveal signing secret"**. Copy the value (starts with `whsec_...`).
6. Vercel → environment variables → add `STRIPE_WEBHOOK_SECRET` with that value.
7. Vercel → Deployments → click the latest → **"Redeploy"** (to pick up the new env var).

### 3.4 · Provision Stripe products + prices

Beaconshire runs from their terminal:

```
STRIPE_SECRET_KEY=sk_live_... \
NEXT_PUBLIC_SUPABASE_URL=https://your.supabase.co \
SUPABASE_SERVICE_ROLE_KEY=eyJh... \
pnpm stripe:setup
```

Creates the 4 membership products in Stripe and links them to your database.

### 3.5 · Promote yourself to admin

1. Open `https://knbdetailing.com/portal/signup`.
2. Sign up with Krista's email. Check your email for the magic link, click it.
3. Krista is now a regular customer. We need to upgrade her to admin.
4. In Supabase dashboard → **"SQL Editor"** → paste:
   ```sql
   update profiles set role = 'admin' where email = 'krista@knbdetailing.com';
   ```
5. Click **"Run"**. Returns "Success."
6. Sign out and sign back in. Visit `https://knbdetailing.com/admin`. You should see the admin dashboard.

### 3.6 · Add Krista as Stripe Customer Portal billing manager (optional)

If you want to view invoices from inside the customer portal, Stripe → Settings → Billing → Customer portal → Configure:

- Toggle ON: **"Update payment method"**, **"Cancel subscription"**, **"Invoice history"**.
- Toggle OFF: **"Upgrade/downgrade plans"** (we manage that ourselves).

---

## Session 4 — End-to-end test

**Setting:** ~30 minutes, together.

### 4.1 · The $1 test booking

1. Open `https://knbdetailing.com/book` in a private browser window (pretend to be a customer).
2. Fill in everything. Pick the cheapest service.
3. Submit. You're redirected to Stripe Checkout.
4. **Use a real card** with a small amount. Or use Stripe test card `4242 4242 4242 4242` if Beaconshire pre-configured a $1 test product.
5. Complete checkout. You're redirected to `/book/success`.

**Verify:**

- [ ] Confirmation email arrived (check your inbox)
- [ ] SMS arrived (if you opted in)
- [ ] Booking appears in `/admin/appointments`
- [ ] Booking appears in the test customer's `/portal/appointments`

### 4.2 · Mark complete + charge balance

1. In `/admin/appointments` → click the test booking.
2. Change status to **"Completed"**, click Save.
3. The customer gets a "service complete" email and SMS.

### 4.3 · Refund

1. In Stripe Dashboard → **Payments** → click the test payment → **"Refund"**.
2. Refund the full amount.

---

## You're live

Your site is live. Real bookings can come in starting now.

Two short todos remain. They're both in the post-launch doc:

- **Submit your sitemap to Google** so people find you in search results.
- **Claim your Google Business Profile** so you show up in Google Maps.

Both take about 15 minutes. Walk through them in **`03-after-launch.md`**.

Day-to-day operations after you're live → **`OWNER_GUIDE.md`**.

If anything breaks → **`04-troubleshooting.md`**.

---

*Built by Beaconshire Advisory. We never hold your credentials, never take a cut of revenue, and never come back asking for a subscription. You own this site outright.*
