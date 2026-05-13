# Welcome — your website, ready to launch

**From Beaconshire Advisory** · Indiana · Small business growth, owned by you.

---

Hi Krista and Benjamin,

I built a complete website for KNB Detailing. It uses your real logo, your branded silver Transit Connect work van, the Best of BusinessRate 2025 plaque, and 16 photos from your Facebook page. You can preview the live demo right now (the link is in the email I sent).

This guide gets you from "preview link" to "real website taking real bookings." Everything you need is in this folder — no calls to schedule, no consultants to hire, no follow-up required from my end.

---

## What you're getting

Your package includes:

- A 51-route Next.js website at your domain of choice (e.g. `knbdetailing.com`)
- A customer portal where your customers manage vehicles, bookings, and memberships
- An admin panel for daily operations — today's schedule, customer history, photo uploads
- Stripe-powered payments — deposits, balances, gift cards, memberships
- Automated email (Resend) and SMS (Twilio) — confirmations, reminders, "on the way" notices
- The Best of BusinessRate 2025 award called out prominently
- 17 of your real photos (logo, owners, vehicles, award badge) wired throughout the site
- A complete legal package — Privacy, Terms, Accessibility (plain language; your attorney should glance through)
- Day-to-day operations guide
- Three pre-written blog posts to give you content from day one

## What "owned outright" means

Every account is in **your** name from the moment you create it:

- Your **GitHub repository** — the source code, owned by you.
- Your **Vercel account** — hosts the site.
- Your **domain** — registered through Cloudflare in your name.
- Your **Supabase project** — your database, your customer data.
- Your **Stripe account** — payments deposit directly to your bank.
- Your **Resend, Twilio, and Google Workspace accounts** — all yours.

**Beaconshire Advisory never holds credentials, never takes a cut of payments, never has access after launch.** You can take the code to another developer at any time. You can delete it. You can hand it to a family member. It's yours.

The site footer currently shows a small "Built by Beaconshire Advisory" credit. You can leave it or remove it — see step 7 of the setup walkthrough.

## What this costs to run after launch

**Floor: ~$10 / month plus $10 / year** for the domain renewal.

Variable: Stripe takes 2.9% + $0.30 per transaction (the customer pays you, Stripe takes their cut, you get the rest direct deposited). Twilio bills about a penny per text. Resend is free up to 3,000 emails / month.

You pay Beaconshire **nothing** ongoing. The package is a one-time delivery.

## How the next week looks

The whole launch is **~2 hours of clicking** plus **1–3 days of waiting** on Stripe and the SMS carrier to verify your business in the background.

| When | What | How long |
|------|------|----------|
| **Day 1** | Part 1: Create 8 accounts (Cloudflare, GitHub, Vercel, Supabase, Resend, Twilio, Google Workspace, Stripe). | ~60 min |
| **Day 1** | Part 2: Click the "Deploy to Vercel" button. Site goes live. | ~15 min |
| **Day 1** | Part 3: Add DNS records. Email starts working. | ~15 min |
| **Day 1** | Part 4: Load your database (paste SQL). | ~10 min |
| **Days 2–4** | Wait for Stripe + Twilio approval. Nothing to do. | Async |
| **Day 5** | Part 6: Switch to live payments + webhook. | ~10 min |
| **Day 5** | Part 7: Promote yourself to admin. | ~1 min |
| **Day 5** | Part 8: Test booking with a $1 charge, then refund. | ~15 min |
| **Day 5** | Part 9 (`03-after-launch.md`): Google Business Profile + customer announcement. | ~45 min |

## Before you start the setup walkthrough

Have these ready (you'll need them in Part 1):

- [ ] **An email address** for business signups — a fresh Gmail or your personal email both work fine
- [ ] **A credit card** for small monthly subscriptions (domain $10/yr, Google Workspace $7/mo, Twilio number ~$1.15/mo)
- [ ] **Your EIN** for KNB Detailing LLC (needed for Stripe activation)
- [ ] **Your bank account** routing + account number (where Stripe deposits go)
- [ ] **Krista's driver's license** photo (Stripe identity verification)
- [ ] **A password manager** or notes app — you'll create 8 new account passwords; save them
- [ ] **About 2 hours uninterrupted** in front of a computer with a stable connection

## How the documents are organized

1. **You're reading 01 — Welcome.** Context.
2. **`02-setup-walkthrough.md`** — every keystroke. The main thing you'll be reading.
3. **`03-after-launch.md`** — what to do once you're live (Google Business Profile, etc.).
4. **`04-troubleshooting.md`** — if something doesn't work as expected.

Plus, already in the repo:

- **`OWNER_GUIDE.md`** — day-to-day operations (managing appointments, charging balances, etc.)
- **`MISSING_DATA.md`** — a small list of items you may want to update later (exact hours, the favicon, etc. — none of these block launch).

---

Ready? Open **`02-setup-walkthrough.md`** and start at Part 1.

---

*Built by Beaconshire Advisory — small business growth, owned by you.*
