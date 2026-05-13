# Setup walkthrough — launch your KNB Detailing website

**A complete, self-serve guide. Read top to bottom; do the steps as you go.**

You'll do this alone in front of your computer. No technical experience required. **Total active time: about 2 hours.** Plus 1–3 business days of waiting for Stripe and the SMS carrier to verify your business — they work in the background while you do other things.

> **Where to do this**: a desk with a stable internet connection, a notes app open (Apple Notes works), a password manager, your credit card, your EIN, your bank account info, and Krista's driver's license (Stripe will need a photo).

---

## Table of contents

1. [Part 1 — Create your accounts (60 min)](#part-1)
2. [Part 2 — Deploy your site with one click (15 min)](#part-2)
3. [Part 3 — Connect your custom domain (15 min)](#part-3)
4. [Part 4 — Load your database (10 min)](#part-4)
5. [Part 5 — Wait for Stripe + Twilio approval (1–3 days)](#part-5)
6. [Part 6 — Switch to live payments (10 min)](#part-6)
7. [Part 7 — Promote yourself to admin (1 min)](#part-7)
8. [Part 8 — Send a $1 test booking (15 min)](#part-8)
9. [You're live](#youre-live)

---

<a id="part-1"></a>
## Part 1 · Create your accounts

You'll create **8 free or low-cost accounts**. Each one takes 5–10 minutes. Use the **same email address for all of them** (a Gmail address works fine). Put every password in a password manager — or write them in your notes app.

> **Why so many accounts?** Each service does one thing well. Hosting (Vercel), database (Supabase), payments (Stripe), email (Resend), text messages (Twilio), domain (Cloudflare), and your business email (Google Workspace). It's the modern "rent each piece" model — much cheaper than paying one all-in-one provider $100+ per month.

### 1.1 · Cloudflare — your domain registrar

**Why**: To buy `knbdetailing.com` (or your chosen domain) at the cheapest possible price ($10/year, free privacy).

1. Go to **cloudflare.com**.
2. Top-right → **Sign Up**.
3. Email + strong password. Save the password.
4. Verify your email (click the link Cloudflare emails you).
5. Skip the "Add a website" wizard for now — click the X.
6. Left sidebar → **Domain Registration** → **Register Domain**.
7. Search `knbdetailing.com` → if available, click **Purchase**.
8. Optional: also register `knbdetailing.net` and `knbdetailingllc.com` (~$10/yr each, defensive).
9. Checkout: name, address, credit card. **Privacy is free and automatic.**
10. **Leave auto-renewal ON.** (Costs $10/yr; forgetting to renew is how websites die.)
11. **Click the verification email Cloudflare sends within 15 days** or your domain gets locked.

### 1.2 · GitHub — where your code will live

**Why**: GitHub stores the source code. Your version will be in your account — owned by you.

1. Go to **github.com**.
2. **Sign up** with the same email.
3. Username: pick simple, lowercase, no spaces. Examples: `knb-detailing`, `krista-hohman`, `khohman`.
4. Solve the puzzle. Verify email.
5. Plan: **Free**. Skip personalization wizards.

### 1.3 · Vercel — your website's hosting

**Why**: Vercel is built by the same team that made the framework this site uses. Free for personal/small-business use. Sites load fast everywhere in the world.

1. Go to **vercel.com**.
2. **Sign Up** → **Continue with GitHub**. Authorize Vercel.
3. "What's your name?" → your name.
4. "Which best describes you?" → **Building products / Doing my own thing**.
5. Plan: **Hobby** ($0).

### 1.4 · Supabase — your database

**Why**: Stores customer info, vehicles, appointments, photos. Has a generous free tier you'll never outgrow as a small business.

1. Go to **supabase.com** → **Start your project** → **Continue with GitHub**.
2. **New Project**:
   - Organization: create one named `KNB Detailing` (type: Personal, plan: Free).
   - Project name: `knb-detailing-prod`.
   - Database password: click the **dice icon** to generate one. **Save it in your password manager immediately. You only see it once.**
   - Region: **East US (us-east-2)**.
   - Plan: **Free**.
3. Wait ~2 minutes for setup.
4. Once the dashboard loads, left sidebar → **Settings (gear icon)** → **API**.
5. **Copy three values into your notes file**, labeled:
   - **`NEXT_PUBLIC_SUPABASE_URL`** = the URL at top (looks like `https://abcde.supabase.co`)
   - **`NEXT_PUBLIC_SUPABASE_ANON_KEY`** = the `anon public` key (long string starting `eyJ`)
   - **`SUPABASE_SERVICE_ROLE_KEY`** = the `service_role` key (click "Reveal" — also starts `eyJ`)

> ⚠️ **Treat the `service_role` key like a password.** Anyone with it has full access to your database.

### 1.5 · Resend — your email sender

**Why**: Sends booking confirmations, reminders, and owner notifications. Free up to 3,000 emails/month.

1. Go to **resend.com** → **Sign Up**.
2. Once in: left sidebar → **API Keys** → **Create API Key**.
3. Name: `production`. Permission: **Full access**. Click **Add**.
4. **Copy the key** (starts with `re_...`) into your notes labeled **`RESEND_API_KEY`**.

### 1.6 · Twilio — your text-message sender (start now; it takes 1–3 days)

**Why**: Sends SMS to customers (booking confirms, "on the way" texts). Sending US business SMS requires a one-time registration that takes 1–3 days — **start it now so it's running in the background**.

1. Go to **twilio.com** → **Sign up**.
2. Verify your phone number.
3. "What do you want to build?" → **SMS**.
4. Left sidebar → **Phone Numbers** → **Manage** → **Buy a number**.
5. Country: **United States**. Capabilities: ✓ **SMS**. Number type: **Local**. Area code: **574** (or your area).
6. Pick a number. Click **Buy** ($1.15/month).
7. Top of the Twilio Console — **copy three values into your notes**:
   - **`TWILIO_ACCOUNT_SID`** (visible at top, starts with AC)
   - **`TWILIO_AUTH_TOKEN`** (click "show" to reveal)
   - **`TWILIO_PHONE_NUMBER`** = your new number, in the form `+15745551234`
8. Left sidebar → **Messaging** → **Regulatory Compliance** → **A2P 10DLC** → **Get started**.
9. **Business profile**: legal name `KNB Detailing LLC`, type **LLC**, EIN: yours, address: yours, website: `knbdetailing.com`.
10. Submit and wait. After approval (a few hours), come back and **register a brand** (same info), then **register a campaign** with these sample messages:
    - `Booking confirmed for {date} at {address}. Reply STOP to opt out.`
    - `KNB Detailing reminder: see you tomorrow at {time}. Reply STOP to opt out.`
    - `Your detail is complete. Photos are in your portal.`
11. Submit. **You'll get an email when fully approved — usually 1–3 business days.** Move on without waiting.

### 1.7 · Google Workspace — your business email

**Why**: To set up `hello@knbdetailing.com` (or `krista@knbdetailing.com`). Customers see this email in confirmations.

1. Go to **workspace.google.com** → **Get started**.
2. Business name: `KNB Detailing LLC`. Employees: 1–10. Region: US.
3. Domain: `knbdetailing.com`.
4. Plan: **Business Starter** ($7/user/month, 14-day free trial).
5. Username: `hello` → so the email becomes `hello@knbdetailing.com`. Strong password.
6. Payment info.
7. Google asks to verify the domain. Pick the **TXT record** method. **Copy the verification TXT value** Google shows you — you'll paste it into Cloudflare in Part 3.

### 1.8 · Stripe — your payment processor (start now; KYC takes a few hours)

**Why**: All customer payments go through Stripe → directly into your bank account. **You** own this account, not me. Activation requires verifying your business and identity (Stripe is regulated; this can't be skipped).

1. Go to **stripe.com** → **Start now**.
2. Email + password. Verify email.
3. In the dashboard, you'll see "Activate your account." Click it.
4. **Business details**: legal name `KNB Detailing LLC`, business type **LLC**, EIN: yours.
5. **Business address**: yours.
6. **Industry**: **Automotive → Auto wash and detail services**.
7. **Business website**: `https://knbdetailing.com`.
8. **Product description**: "Mobile auto, boat, RV, and motorcycle detailing. Customers book online and pay a deposit; balance is charged after service is complete."
9. **Bank account**: routing + account numbers (this is where deposits go).
10. **Statement descriptor**: `KNB DETAILING`.
11. **Personal verification** (Krista as business owner): name, DOB, SSN last 4, home address.
12. **ID upload**: clear photo of front + back of Krista's driver's license.
13. **Submit**. Stripe reviews this. **Usually approved in a few hours.** You'll get an email.
14. While waiting: top of dashboard, make sure you're in **Test mode**. Left sidebar → **Developers** → **API keys**.
15. **Copy two values** into your notes:
    - **`STRIPE_SECRET_KEY`** = the secret key (starts `sk_test_...` for now; click "Reveal" — you'll switch to live keys in Part 6)
    - **`NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`** = the publishable key (starts `pk_test_...`)

**Part 1 done.** You now own 8 accounts. Take a break.

---

<a id="part-2"></a>
## Part 2 · Deploy your site with one click

This is the magic part. One click clones the entire site into your accounts and deploys it.

### 2.1 · Click the deploy button

1. Open the email I sent you.
2. Find **"👉 Live preview"** at the top — click it. Click around the preview site for 5 minutes. Make sure you like it.
3. Now find the **Setup Walkthrough URL** in the email and open this doc (you're reading it).
4. Click this button:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FBeaconshire-Advisory-LLC%2Fknb-detailing-template&project-name=knb-detailing&repository-name=knb-detailing&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,STRIPE_SECRET_KEY,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,RESEND_API_KEY,RESEND_FROM_EMAIL,OWNER_NOTIFICATION_EMAIL,TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER,CRON_SECRET&envDescription=Find%20each%20value%20in%20your%20notes%20doc%20from%20Part%201)

> If the button link doesn't render in your viewer, the equivalent URL is:
> `https://vercel.com/new/clone?repository-url=https://github.com/Beaconshire-Advisory-LLC/knb-detailing-template`

### 2.2 · Vercel walks you through it

1. Vercel asks: **Create a new Git Repository.** Pick your GitHub account. Accept the default repo name `knb-detailing`. Click **Create**.
2. Vercel then asks for the **environment variables**. Paste each value from your notes:

| Variable | Where to find it in your notes |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Type `https://knbdetailing.com` (or whatever your domain is) |
| `NEXT_PUBLIC_SUPABASE_URL` | From Part 1.4 |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | From Part 1.4 |
| `SUPABASE_SERVICE_ROLE_KEY` | From Part 1.4 |
| `STRIPE_SECRET_KEY` | From Part 1.8 (test key for now) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | From Part 1.8 |
| `RESEND_API_KEY` | From Part 1.5 |
| `RESEND_FROM_EMAIL` | Type `KNB Detailing <hello@knbdetailing.com>` |
| `OWNER_NOTIFICATION_EMAIL` | Type `krista@knbdetailing.com` (or wherever you want bookings emailed) |
| `TWILIO_ACCOUNT_SID` | From Part 1.6 |
| `TWILIO_AUTH_TOKEN` | From Part 1.6 |
| `TWILIO_PHONE_NUMBER` | From Part 1.6 |
| `CRON_SECRET` | A random 32+ character string. [Generate one here](https://www.uuidgenerator.net/) (concatenate two UUIDs). Save it. |

3. Click **Deploy**.
4. Wait ~3 minutes. Vercel builds the site.
5. You'll see "Your project has been deployed!" with a URL like `https://knb-detailing-xyz.vercel.app`.
6. Click the URL. **You should see your site.**

**Part 2 done.** Your site is live on the internet. It's at a `.vercel.app` URL for now; we connect your `.com` domain in Part 3.

---

<a id="part-3"></a>
## Part 3 · Connect your custom domain

### 3.1 · Add the domain in Vercel

1. In Vercel, click your project (`knb-detailing`).
2. **Settings** → **Domains** → **Add Domain**.
3. Type `knbdetailing.com`. Click **Add**.
4. Add `www.knbdetailing.com` as a second domain.
5. Vercel shows the DNS records to add. **Keep this tab open.**

### 3.2 · Add the DNS records in Cloudflare

1. Open Cloudflare in another tab → click your domain.
2. Left sidebar → **DNS** → **Records**.
3. Delete any existing A or CNAME records on `@` or `www` (if present).
4. **Add record**:
   - Type: **A** · Name: `@` · IPv4: `76.76.21.21` · **Proxy status: DNS only** (gray cloud, NOT orange).
   - Save.
5. **Add record**:
   - Type: **CNAME** · Name: `www` · Target: `cname.vercel-dns.com` · **Proxy status: DNS only**.
   - Save.

### 3.3 · Add the Google Workspace TXT record

While you're in Cloudflare DNS, add the verification TXT you copied from Google Workspace in Part 1.7:

- **Add record** → Type: **TXT** · Name: `@` · Content: paste the `google-site-verification=...` string.

Then go back to Google Workspace and click **Verify**. Google then walks you through adding MX, SPF, DKIM records. Add each in Cloudflare DNS the same way — Google gives you exact values:

| What | Type | Name | Content |
|---|---|---|---|
| MX | MX | `@` | Priority 1, `smtp.google.com` |
| SPF | TXT | `@` | `v=spf1 include:_spf.google.com include:resend.com ~all` |
| DMARC | TXT | `_dmarc` | `v=DMARC1; p=quarantine; rua=mailto:dmarc@knbdetailing.com` |
| DKIM | TXT | `google._domainkey` | (Google generates this — copy exact value) |

### 3.4 · Add the Resend DKIM records

1. Open Resend → **Domains** → **Add Domain** → `knbdetailing.com`.
2. Resend shows 2-3 DKIM TXT records. **Add each in Cloudflare DNS** (same way as above).
3. Wait 5 minutes. Click **Verify** in Resend. Should turn green.

### 3.5 · Verify everything works

1. Wait 5–10 minutes for DNS to propagate.
2. Back in Vercel → Settings → Domains. Both domains should show **Valid Configuration** with green checks.
3. Open a private browser window. Go to `https://knbdetailing.com`. Site loads. Lock icon shows. Good.

**Part 3 done.** Your site is live at your custom domain.

---

<a id="part-4"></a>
## Part 4 · Load your database

The database tables and starter data need to be created. You'll do this by pasting SQL into Supabase's web editor.

### 4.1 · Get the SQL files

You need two SQL files from your GitHub repo:

1. **`supabase/migrations/0001_init.sql`** — creates all the tables
2. **`supabase/seed.sql`** — fills in starter services + pricing

Open these in GitHub:

- Schema: **github.com/[your-github-username]/knb-detailing/blob/main/supabase/migrations/0001_init.sql**
- Seed: **github.com/[your-github-username]/knb-detailing/blob/main/supabase/seed.sql**

On each page, click **"Raw"** in the top-right. The full contents appear as plain text. Select all (Cmd+A) and copy (Cmd+C).

### 4.2 · Apply the schema

1. Open Supabase → your project → **SQL Editor** (left sidebar).
2. Click **New query**.
3. Paste the contents of `0001_init.sql`.
4. Click **Run** (bottom-right).
5. You should see "Success. No rows returned."

### 4.3 · Apply the seed

1. **New query** again.
2. Paste the contents of `seed.sql`.
3. Click **Run**.
4. Success.

### 4.4 · Create your Storage buckets

1. Left sidebar → **Storage** → **New bucket**.
2. Create **four buckets**:

| Name | Public? |
|---|---|
| `vehicles` | Private |
| `service-photos` | Private |
| `gallery` | **Public** |
| `gift-cards` | Private |

3. For the `gallery` bucket, click into it → **Policies** tab → **New policy** → pick the public read template → save.

**Part 4 done.** Your database is ready to accept bookings.

---

<a id="part-5"></a>
## Part 5 · Wait for Stripe + Twilio approval

Nothing for you to do here. You're waiting on:

- **Stripe account activation** — usually a few hours, occasionally up to 2 business days. You'll get an email when activated.
- **Twilio A2P 10DLC approval** — 1 to 3 business days. You'll get an email when approved.

Walk away. Come back when both approval emails are in your inbox.

---

<a id="part-6"></a>
## Part 6 · Switch to live payments

Stripe is approved. Now switch from test mode to live mode and add the webhook.

### 6.1 · Get your live keys

1. In Stripe Dashboard, toggle top-left: switch from **Test mode** to **Live mode**.
2. **Developers** → **API keys**.
3. Copy **two live values** (they replace the test ones in your notes):
   - **Live publishable key** (`pk_live_...`) — replaces `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
   - **Live secret key** (click "Reveal", `sk_live_...`) — replaces `STRIPE_SECRET_KEY`

### 6.2 · Update Vercel with live keys

1. Vercel → your project → **Settings** → **Environment Variables**.
2. Find `STRIPE_SECRET_KEY` → click ✏️ → paste the live secret key → Save.
3. Find `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` → click ✏️ → paste the live publishable key → Save.

### 6.3 · Add the Stripe webhook

This is what tells your site when a payment succeeds.

1. Stripe (in live mode) → **Developers** → **Webhooks** → **Add endpoint**.
2. Endpoint URL: `https://knbdetailing.com/api/stripe/webhook`.
3. Listen to events — select these:
   - `checkout.session.completed`
   - `payment_intent.succeeded`
   - `payment_intent.payment_failed`
   - `customer.subscription.created`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
   - `invoice.paid`
   - `invoice.payment_failed`
   - `charge.refunded`
4. Click **Add endpoint**.
5. On the new endpoint's detail page → **Signing secret** → **Reveal**.
6. **Copy the signing secret** (starts `whsec_...`).
7. Vercel → Settings → Environment Variables → **Add new** → name `STRIPE_WEBHOOK_SECRET`, value: paste the signing secret. Save.

### 6.4 · Configure the Stripe Customer Portal

1. Stripe → **Settings** → **Billing** → **Customer portal**.
2. Toggle ON: **Update payment method**, **Cancel subscription**, **Invoice history**.
3. Toggle OFF: **Upgrade/downgrade plans**.
4. Save.

### 6.5 · Trigger a redeploy

1. Vercel → **Deployments** → click the latest deployment → top-right menu (`...`) → **Redeploy**.
2. Wait ~3 minutes. Site rebuilds with the live keys.

**Part 6 done.** Your site can now take real payments.

---

<a id="part-7"></a>
## Part 7 · Promote yourself to admin

You're a customer right now. You need to be an admin to access the management dashboard.

### 7.1 · Sign yourself up first

1. Go to `https://knbdetailing.com/portal/signup`.
2. Type `krista@knbdetailing.com` (or whatever email you use).
3. Check your inbox. Click the magic link Resend sent.
4. You're signed in to your customer portal — but as a regular customer.

### 7.2 · Promote to admin via SQL

1. Open Supabase → **SQL Editor** → **New query**.
2. Paste exactly this (replace `krista@knbdetailing.com` with the email you signed up with):

   ```sql
   update profiles set role = 'admin' where email = 'krista@knbdetailing.com';
   ```

3. Click **Run**. You should see "Success."
4. Sign out of your KNB site. Sign back in.
5. Go to `https://knbdetailing.com/admin`. You should see the admin dashboard.

**Part 7 done.** You're an admin. You can now do the same for Benjamin if you want him to have admin access — repeat 7.2 with his email.

---

<a id="part-8"></a>
## Part 8 · Send a $1 test booking

The last sanity check before announcing to the world.

### 8.1 · Book yourself as a customer

1. Open a **private/incognito browser window** (so you're not logged in as admin).
2. Go to `https://knbdetailing.com/book`.
3. Fill in the form. Pick a cheap package. Use your real phone number + email.
4. Click submit.
5. You're redirected to Stripe Checkout. **Enter a real card** with whatever the deposit amount is (a few dollars — you'll refund it).
6. Complete checkout. You're redirected to `/book/success`.

### 8.2 · Verify the booking landed everywhere

Check these in order — they should all happen within 60 seconds:

- [ ] Confirmation email arrives in your inbox (from `hello@knbdetailing.com`).
- [ ] Confirmation SMS arrives on your phone.
- [ ] An owner notification email arrives at the `OWNER_NOTIFICATION_EMAIL` address.
- [ ] In `https://knbdetailing.com/admin/appointments`, the booking appears under "Today" or "This week."
- [ ] In your customer portal (`/portal/appointments`), the booking appears.

If any one of those fails, see `04-troubleshooting.md`.

### 8.3 · Mark complete + service-complete email

1. In `/admin/appointments`, click your test booking.
2. Change status to **Completed**. Click Save.
3. You should get a "your detail is complete" email.

### 8.4 · Refund the test charge

1. Stripe Dashboard → **Payments**.
2. Find your test payment. Click into it.
3. Top-right → **Refund**.
4. Refund the full amount. Reason: "test transaction."

**Part 8 done.** The system works end-to-end.

---

<a id="youre-live"></a>
## You're live 🎉

Your website is now real, your domain is connected, payments work, emails and SMS go out, customers can book themselves, and you can manage everything from `/admin`.

### Two more 30-minute tasks

Don't skip these — they're what bring you customers.

1. **Get found on Google.** Open `03-after-launch.md` and follow the Google Search Console + Google Business Profile steps. (15 min)
2. **Tell your existing customers.** The "Customer launch announcement" section of `03-after-launch.md` has a copy-paste message you can send to your top 20 customers. (15 min)

### Day-to-day operations

`OWNER_GUIDE.md` in your repo covers managing appointments, marking jobs complete, charging balances, approving customer reviews, creating coupons, and the monthly + annual checklists.

### If something breaks

`04-troubleshooting.md` covers the common stuff. Most issues are solved in 5 minutes by checking the relevant service dashboard (Vercel, Stripe, Resend, Twilio, Supabase, Cloudflare).

---

*You own this website outright. No subscriptions, no fees to Beaconshire Advisory, no follow-up calls required. Congratulations on going live.*
