# Beaconshire Local Business Website Package — internal runbook

**Confidential — for Beaconshire Advisory operators only.** Repeatable playbook for delivering a turnkey website to any local business in **one email** with **zero follow-up required**. KNB Detailing was the first; this doc captures the pattern so the second, fifth, and twentieth are smooth.

## The delivery model

**One email, total no-touch.** Each engagement ends when you hit send on the delivery email. The customer either launches the site themselves following the handoff docs, or doesn't — either way you don't have to schedule anything, jump on calls, or chase them down.

This is not "consultative." It's "here's a complete package; click this button if you want it." More like dropping off a gift than running a service business.

---

## The offer

**"A complete website for your local business, owned outright, set up white-glove in a week."**

What the customer gets:

- Production-grade Next.js website + customer portal + admin
- Their real photos + brand throughout
- Online payments, SMS + email automation, blog, gallery, legal pages
- 17 image slots filled with their actual photography
- 4 handoff docs walking them through ownership
- A 1–2 session screen-share setup

What the customer never gets:

- A subscription
- A revenue share
- A vendor lock-in
- Beaconshire as a single point of failure

## Pricing model (recommended)

**One-time setup fee: $2,500–$5,000** depending on customization.

Breakdown:
- **Base package (template + minor customization)**: $2,500
- **Heavy customization (new service categories, custom domain logic, complex booking rules)**: $4,000–$5,000
- **Photo retouching, blog post writing, GBP optimization**: $500 add-on each
- **Post-launch tweaks**: $100/hour, prepaid in 4-hour blocks

**Their ongoing cost (not yours):** ~$10/month + Stripe/Twilio per-transaction fees. They pay these directly.

You make money on the project, not on residuals. Each engagement is a complete, scoped sale.

## The pipeline

### Lead → delivered (typical 1 week, mostly on your side)

1. **(Optional) Discovery touchpoint** — chat at a chamber event, DM on Facebook, a tax-prep conversation. Confirm fit (see industry list below) and ask for their photos + business details. **No call required.**

2. **Customize the template** (4–24 hours of your work, depending on tier — see "Per-engagement customization").

3. **Push to a public GitHub repo** under your Beaconshire account.

4. **Deploy a preview to your Vercel** — gives them a clickable demo URL.

5. **Send the delivery email** (use `handoff/EMAIL_TO_OWNERS.md` as the template). Plug in:
   - Their preview URL
   - Their GitHub template URL
   - Links to the handoff docs

6. **You're done.** No follow-up call to schedule. They either launch using the handoff guide or they don't. The email itself is the delivery.

### What you charge

**$X — paid up-front before you start customizing, OR billed after delivery on net-30 terms with an invoice attached to the delivery email.** Pick one and be consistent.

If you bill after delivery, accept that some won't pay — price the package so even a 60% collection rate is profitable. ~$1,500 to ~$3,500 net is a healthy range for the customization work involved.

### What the customer does (you never see it)

Following `handoff/02-setup-walkthrough.md`:

- **Part 1** (60 min, day 1): create 8 accounts in their name
- **Part 2** (15 min): click the Vercel Deploy Button → site is live
- **Part 3** (15 min): DNS records
- **Part 4** (10 min): paste SQL into Supabase web editor
- **Part 5** (1–3 days, async): wait for Stripe + Twilio approval
- **Part 6** (10 min): switch to live keys + webhook
- **Part 7** (1 min): SQL one-liner to promote themselves to admin
- **Part 8** (15 min): $1 test booking + refund

Total active time: ~2 hours. Zero of which involves you.

## Per-engagement customization

Each new client requires swapping these files. Keep a checklist per engagement.

### Tier 1 — must change

- [ ] `src/lib/constants.ts` → `BUSINESS` object (name, owners, phone, email, address, geo, hours, social URLs, chambers, SOS info)
- [ ] `src/lib/constants.ts` → `SERVICE_AREA` (primary, secondary, tertiary cities; local lakes)
- [ ] `src/lib/constants.ts` → `SITE.url`
- [ ] `src/lib/constants.ts` → `BEACONSHIRE.url` (your firm URL once you have one)
- [ ] `src/content/services-data.ts` → service page content (per their offerings)
- [ ] `src/lib/placeholders.ts` → home FAQs, placeholder reviews tagged for owner confirm
- [ ] `supabase/seed.sql` → service catalog, prices, service ZIPs
- [ ] `public/photos/` → their real photos with kebab-case names
- [ ] `src/lib/images.ts` → photo registry pointing to their files
- [ ] `src/content/blog/*.mdx` → 3 starter blog posts in their voice
- [ ] `src/app/globals.css` → brand colors (`--primary`, `--accent`, `--color-brand-*` tokens)
- [ ] `src/components/layout/logo.tsx` → swap logo image path

### Tier 2 — usually change

- [ ] `src/app/(marketing)/about/page.tsx` → owner story
- [ ] `src/app/(marketing)/legal/{privacy,terms,accessibility}/page.tsx` → entity name + state references
- [ ] `package.json` → `name`, `version`
- [ ] `next.config.ts` → `redirects` source/destination hostnames
- [ ] `vercel.json` → cron schedule timezone if not Indiana

### Tier 3 — case-by-case

- [ ] Customer portal route names (some businesses don't need "vehicles" — could be "properties," "pets," "projects")
- [ ] Admin dashboard sections (if they don't take SMS, hide opt-in)
- [ ] Membership page (skip if they don't offer recurring)
- [ ] Gift cards (skip if not applicable)

### Customization commands

```bash
# Clone the template
gh repo clone Beaconshire-Advisory-LLC/local-business-template <client-slug>
cd <client-slug>

# Customize
$EDITOR src/lib/constants.ts          # business identity
$EDITOR src/lib/images.ts             # photo registry
$EDITOR src/content/services-data.ts  # service pages
$EDITOR supabase/seed.sql             # catalog + pricing

# Copy their photos
cp -r ~/Downloads/<client>-photos/* public/photos/

# Verify
pnpm install
pnpm typecheck
pnpm build
pnpm test:run

# Push to a new repo
gh repo create <client-org>/<client-slug> --private --source=. --remote=origin --push
```

### Time estimates (per customization tier)

- **Tier 1 only** (similar service business, just swap names + photos): 4–6 hours
- **Tier 1 + Tier 2** (different industry, e.g. lawn care vs. detailing): 8–12 hours
- **Tier 1 + Tier 2 + Tier 3** (pet groomer, dog walker, real estate stager): 16–24 hours

## Industries this template fits

Pattern: local service business, mobile or location-based, customers book by appointment, single-owner or small partnership.

**Strong fit:**
- Auto/boat/RV detailing
- Lawn care, landscaping
- Mobile pet grooming
- House cleaning (residential + Airbnb turnover)
- Window cleaning, gutter cleaning
- Pressure washing
- Handyman / small contractor
- Garage door repair
- HVAC service company
- Plumber, electrician (small shop, not Roto-Rooter scale)
- Massage therapist, mobile spa
- Personal trainer (in-home or studio)
- Photographer (events, portraits)
- Music teacher / tutor (private practice)

**Mediocre fit (might need restructuring):**
- Restaurant (needs menu + online ordering — different stack)
- Real estate agent (needs IDX integration)
- Salon (needs multi-stylist scheduling)
- Daycare (needs parent communication portal)

**Bad fit:**
- E-commerce / product-heavy retail
- SaaS / digital products
- Businesses with > 5 employees doing bookings
- Multi-location franchises

## Customer profile to target

**Beaconshire's edge: existing tax/advisory client relationships.** Your tax clients already trust you with their money. Selling them a website is a natural cross-sell — they don't have to vet a new vendor.

**Ideal customer:**
- Existing Beaconshire client (tax or advisory)
- Annual revenue: $50K–$1M
- Has a Facebook page but no website (or a 10-year-old GoDaddy template)
- 1–3 employees / owners
- Takes appointments
- Located in Indiana or adjacent states (lower legal/tax review friction)

**Outreach** (for non-existing clients): Indiana small business chambers, Facebook business pages with no link in bio, Google Maps listings for service businesses with no website link.

## Operational checklist per engagement (your side only)

### Before you start customizing

- [ ] Confirm fit (see industry list below — this template is wrong for some)
- [ ] Get their photos (Facebook downloads work fine), logo, and business basics (name, owners, phone, hours, service area)
- [ ] Get their preferred tagline if they have one — otherwise pick one yourself

### Customization session (your work, 4–24 hours depending on tier)

- [ ] Tier 1: business identity, photos, services, blog posts, brand colors, logo
- [ ] Tier 2: legal entity references, package metadata, redirects
- [ ] Tier 3 (only if industry differs significantly): portal route names, admin sections, membership flow

### Push and deploy (15 min, your side)

- [ ] `gh repo create Beaconshire-Advisory-LLC/<client-slug>-template --public --source=. --remote=origin --push`
- [ ] `pnpm dlx vercel --prod` — get a `*.vercel.app` preview URL
- [ ] Open the preview URL yourself and click through. Look for anything obviously wrong (typos, broken images, wrong copy).

### Send the delivery email

- [ ] Open `handoff/EMAIL_TO_OWNERS.md`
- [ ] Fill in the 6 placeholders (preview URL + 5 doc URLs)
- [ ] Send from your Beaconshire email
- [ ] Send invoice as attachment if billing after delivery
- [ ] **Engagement complete.** No follow-up required from you.

### What happens next (not your responsibility)

The owner reads the email, clicks the preview, decides if they want to launch. If they do, they follow `02-setup-walkthrough.md` and the site goes live within a week.

You may occasionally get a "stuck on launch day" question via DM or email. These are 5-minute answers and a good way to build goodwill — but they should be rare with a well-written walkthrough.

### When to follow up (limited cases)

- **Never proactively.** No "checking in" emails, no "how's it going" Zooms.
- **Only when they reach out.** Treat each ping as a 5-15 minute support touch. Bill if it crosses 30 minutes.
- **Bigger asks** (new feature, new service, photo retouching) — quote separately at $X/hour or as a fixed scope.

## Risks and how to handle them

### Risk: Client tries to drag you into hosting

**Don't do it.** The model only works if they own everything. Holding their Stripe keys is legally messy. If they insist on you managing it: politely decline, or quote a recurring price that reflects the risk (~$300/mo minimum).

### Risk: Client expects ongoing development for free

The package is a one-time delivery. Anything past launch is a separate scope. Example responses:
- "That's a great idea — quote forthcoming. Probably $X for a Saturday morning of work."
- "That's outside what we delivered. Want me to put together a proposal?"

### Risk: Client emails 6 months later confused about something

Treat one-off questions as goodwill. **15 minutes free, anything beyond billed.** A 5-minute answer to a launch-day question buys you a referral.

### Risk: Stripe account gets flagged for fraud

If a client gets a high refund rate or dispute rate, Stripe holds funds. Make sure clients:
- Use clear statement descriptors (`KNB DETAILING`)
- Document each service with photos
- Have a written cancellation policy on the site (we ship this)
- Don't try to refund "weird" stuff months later

### Risk: Client doesn't pay second invoice

Mitigate with the deposit structure (50% up-front means you've covered cost even if final invoice slips).

If they refuse: you have access to their codebase via git history. They have a working site. Don't sabotage. Send a friendly reminder. After 30 days, send a final notice. After 60, you might consider the deal closed at half-price. Reputation matters more than $2,500.

### Risk: A future Beaconshire engagement runs into the "I tried it myself and broke it" situation

Have a cleanup-fee tier: $300 to fix what they broke, $1,000 if they made structural changes you have to undo.

## Marketing your local-business website service

### Positioning

**"Local websites for local businesses. Owned by you."** Emphasize:
- One-time fee (not subscription)
- They own the code
- Beaconshire is a tax + advisory firm too — same firm helping with their books
- "Indiana-based, working with Indiana businesses"

### Sources of leads

1. **Existing tax/advisory clients** (highest conversion)
2. **Local chamber networks** — Syracuse-Wawasee, Kosciusko, surrounding
3. **Facebook business page searches** — Indiana businesses with no website link in their bio
4. **Word of mouth** from completed projects (offer KNB Detailing a $250 referral credit for sending another business)

### Testimonial collection

After each project's 30-day check-in, ask:
> "If you're happy, would you mind writing a short testimonial? Doesn't need to be more than 2–3 sentences. We use them to find other small businesses in Indiana who could use the same thing."

## When to retire this template

Re-evaluate every 18 months. The web platform moves fast. Specifically:
- Next.js major version (16 → 17, etc.) — re-test, refresh
- Tailwind major version
- Stripe Checkout / Customer Portal API changes
- New Vercel pricing/quotas
- shadcn/ui evolution

When you make a template refresh, **don't force existing clients to migrate.** Their sites keep working. Migrations are optional, billed separately.

---

*Maintained by James Flecker, Beaconshire Advisory. Last refreshed 2026-05-12.*
