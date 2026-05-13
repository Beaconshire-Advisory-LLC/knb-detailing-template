# Troubleshooting — when something doesn't work

**Beaconshire Advisory · KNB Detailing turnkey package**

Self-serve reference. Most issues are solved in 5 minutes by checking the relevant service dashboard. Read the section that matches your symptom; the fix is almost always in the dashboard of the service that owns the problem.

---

## Site issues

### "The site won't load"

1. Try a different browser or incognito window. Sometimes it's a stale cache.
2. Go to `downforeveryoneorjustme.com` and type `knbdetailing.com`. If the site is "up for everyone," it's just you — clear your browser cache or reboot Wi-Fi.
3. If the site is truly down: open `vercel.com` → sign in → click your project. Look at the most recent deployment.
   - If it says **"Error"**: click into it, scroll down to the build logs. Usually a missing environment variable. Compare against your `.env.example` file. Add anything missing in **Settings → Environment Variables** and redeploy.
   - If it says **"Ready"** but the site still doesn't load: the issue is DNS. Open `cloudflare.com` → your domain → **DNS**. Confirm the A record on `@` is `76.76.21.21` and proxy status is **DNS only** (gray cloud, not orange).

### "I'm seeing an old version of the site"

Vercel deploys take ~3 minutes. Hard-refresh your browser (Cmd+Shift+R on Mac, Ctrl+F5 on Windows). If still old after 5 minutes, in Vercel → Deployments → see if the latest is **"Ready"**.

### "Search engines aren't finding us"

Google takes 1–4 weeks to index a new site. Speed it up:

1. `search.google.com/search-console` → your property → **Sitemaps** → make sure `sitemap.xml` is submitted and shows "Success."
2. **URL Inspection** tool (top of Search Console) → paste your homepage URL → **"Request indexing."**
3. Make sure `robots.txt` allows crawling. Open `https://knbdetailing.com/robots.txt`. You should see `Allow: /`.

---

## Payment issues

### "A customer says their card was declined"

1. Open `dashboard.stripe.com` → **Payments**.
2. Find the failed payment. Click in. The "Decline reason" tells you what happened.
3. Common reasons:
   - `card_declined` (no further detail): customer's bank blocked it. They should try a different card or call their bank.
   - `insufficient_funds`: self-explanatory.
   - `expired_card`: ask them to update.
4. You can manually send them a new payment link from Stripe → click into the customer → **"Send invoice"**.

### "Stripe says my webhook is failing"

1. Stripe Dashboard → Developers → **Webhooks** → click the endpoint.
2. Scroll to the failure log.
3. Common cause: webhook signing secret in Vercel doesn't match what Stripe shows. Click **"Reveal signing secret"** in Stripe, copy, paste into Vercel env vars as `STRIPE_WEBHOOK_SECRET`, redeploy.
4. Click **"Send test webhook"** on the endpoint page to verify it works after redeployment.

### "Stripe disputed a charge"

A dispute is when a customer's bank reverses the charge. Rare, but it happens.

1. Stripe emails you within minutes of a dispute being filed.
2. Dashboard → **Disputes** → click the dispute.
3. You have 7 days to respond. Click **"Submit evidence"** and upload:
   - Before/after photos from the appointment
   - The customer's booking confirmation (Stripe shows this automatically)
   - Your cancellation policy (copy from `https://knbdetailing.com/legal/terms`)
   - A short written summary: "Service was performed on [date] at [address]. Customer confirmed completion via email/SMS. Before/after photos attached. No refund was requested within our cancellation policy window."
4. Stripe reviews. ~80% of disputes for legitimate small-business service are won when you have photos and a clear policy.

If amount < $50, sometimes refunding is cheaper than disputing. Your call.

---

## Email issues

### "Customers say they never got their confirmation"

1. Check Resend dashboard → **Emails** → search the customer's email address.
2. Status:
   - **Delivered**: it went through. They should check spam.
   - **Bounced**: the email address is bad. Typo when they booked? Have them update.
   - **Complained**: they marked an earlier email as spam. Your domain reputation takes a hit. Reach out and apologize.
3. To resend a confirmation: Stripe → **Payments** → find their payment → **"Send receipt."**

### "My business email (`hello@knbdetailing.com`) isn't getting messages"

1. Open Gmail → search your inbox for "spam" or "junk" folders.
2. Workspace Admin → Apps → Gmail → **Search Logs** → look for the missing email.
3. Common: DNS records were modified. Open Cloudflare DNS, confirm MX, SPF, DKIM are all present from Section 2.3.

---

## SMS issues

### "Texts aren't sending"

1. Open `console.twilio.com` → **Monitor** → **Logs** → **Messaging**.
2. Filter by your number. Recent messages show their status.
3. Common reasons:
   - **A2P 10DLC not approved yet**: regulatory hold. Wait 1–3 business days.
   - **Carrier filtered**: your message triggered spam filters. Reword (avoid all-caps, urgency words, dollar signs).
   - **Invalid number**: customer's phone number was mistyped. Confirm format.
4. Twilio Console → **Phone Numbers** → your number → make sure **Voice & Messaging** are both enabled.

---

## Database / portal issues

### "I can't log into /admin"

1. Confirm you're signing in with `krista@knbdetailing.com` (or whatever email is the admin).
2. Open Supabase → **Authentication** → **Users**. Find your row. Check it exists.
3. SQL Editor → run:
   ```sql
   select id, email, role from profiles where email = 'krista@knbdetailing.com';
   ```
   `role` should be `admin`.
4. If `role` is `customer`:
   ```sql
   update profiles set role = 'admin' where email = 'krista@knbdetailing.com';
   ```

### "A customer reports they can't sign in"

1. Supabase → **Authentication** → **Users** → search their email.
2. If they don't exist: have them sign up at `/portal/signup`.
3. If they exist: have them request a new magic link from `/portal/login`. Make sure they check spam.
4. If they used Google OAuth originally and now use magic link, the system creates two separate accounts. We can merge them — call Beaconshire.

### "I deleted something by accident in the admin"

1. Supabase has automatic backups. Settings → Database → **Backups**.
2. If you're on the free plan: 24 hours of backups available. Pro plan: 7 days.
3. Restore is destructive (overwrites everything since the backup point). Call Beaconshire before you click restore.

---

## "I want to change something on the site"

Some changes are easy (you can do them yourself from `/admin`):

| Change | Where |
|---|---|
| Add/edit a coupon | `/admin/coupons` |
| Approve a customer review | `/admin/reviews` |
| Block a vacation date | `/admin/availability` (coming Phase 5b) |
| See revenue | `/admin/reports` |
| Mark an appointment complete | `/admin/appointments/[id]` |

Some changes require a developer touch (Beaconshire can do these in 15-min sessions):

| Change | Why it needs code |
|---|---|
| Change a service price permanently | Lives in `src/lib/seed.sql` + DB; pricing model is code-first by design so you can rebuild from source |
| Add a new service | Lives in `src/content/services-data.ts` |
| Edit homepage copy | Code |
| Add a blog post | Code (an MDX file) |
| Swap a photo | Code (`src/lib/images.ts` references) |
| Change brand colors | Code (`src/app/globals.css`) |
| Add a new admin user | Single line of SQL — call Beaconshire |

These take 15–30 minutes each. Beaconshire's a Zoom call away.

---

## Where to look for each kind of issue

| Symptom | Dashboard to open |
|---|---|
| Site is down | Vercel → your project → Deployments → click the latest |
| Payment / billing issue with a customer | Stripe → Payments → search by customer email |
| Email not arriving | Resend → Emails → search recipient address |
| SMS not arriving | Twilio Console → Monitor → Logs → Messaging |
| Domain / DNS issue | Cloudflare → DNS → Records |
| Database, login, or portal issue | Supabase → SQL Editor or Authentication tab |

Each dashboard has built-in support docs and a chat or email contact if their service is what's broken. **You don't need to contact me** — these are professional platforms with their own support teams.

If after 30 minutes of working through the docs above you still can't solve it and want a second pair of eyes, you can reach Beaconshire Advisory through whatever channel you used originally (email or Facebook). I don't charge for "stuck on launch day" questions — but the goal is that you never need that.

---

## Common myths

> "If Beaconshire goes away, I lose my site."

No. Every account is in your name. Beaconshire has no credentials. Your code is on your GitHub. Your customer data is in your Supabase. You can take this to any developer on earth and they can pick up where we left off.

> "If I forget my passwords, I'm locked out."

Each service has account recovery (email-based reset). Worst case: Stripe support can verify your business identity and restore access. The single point of failure is your **email account** — protect that one with 2FA.

> "I have to pay Beaconshire forever."

No. The package was a one-time delivery. You owe nothing ongoing.

---

*Built by Beaconshire Advisory. You own this site outright.*
