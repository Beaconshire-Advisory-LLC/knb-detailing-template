# Beaconshire Local Business Website Package — internal runbook

**Confidential — for Beaconshire Advisory operators only.** This is the repeatable playbook for delivering a turnkey website to any local business. KNB Detailing was the first; this doc captures the pattern so the second, fifth, and twentieth are smooth.

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

### Lead → close (typical 2 weeks)

1. **Discovery call** (30 min, free).
   - Look at their existing online presence (Facebook, Google Business Profile, any website).
   - Confirm the business is a fit: services like detailing, mobile, real-estate-adjacent, lawn care, HVAC, contractors. Avoid e-commerce / heavy inventory; this template doesn't fit.
   - Pitch: "We build you a complete site, you own it outright, no monthly fees to us. $X. Want to see a demo?"

2. **Demo + proposal** (within 48 hours of discovery).
   - Spin up a Vercel preview of the KNB site with their tagline + photos substituted (use the customization script — see "Per-engagement customization" below).
   - Send the URL.
   - Attach a 1-page proposal with scope + price.

3. **Signed agreement + 50% deposit**.

4. **Build / customize** (3–7 business days).

5. **Schedule Session 1** (Account creation call).

### Build → live (typical 5–10 business days)

The 4-session sequence from `02-setup-walkthrough.md`:

- **Session 1** (90 min): account creation.
- **Async wait**: 1–3 days for Stripe + Twilio.
- **Session 2** (20 min): DNS records.
- **Session 3** (60 min): deploy + final wiring.
- **Session 4** (30 min): end-to-end test + final invoice.

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
gh repo clone beaconshire-advisory/local-business-template <client-slug>
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

## Operational checklist per engagement

### Pre-Session 1

- [ ] Signed agreement + 50% deposit received
- [ ] Customization completed (Tier 1 + Tier 2 as needed)
- [ ] Test deploy spun up at `<client-slug>.vercel.app` (Beaconshire account; will be moved to client account in Session 3)
- [ ] All assets (photos, logo, copy) in place
- [ ] `MISSING_DATA.md` reviewed — anything still needing owner confirmation is documented
- [ ] Zoom / Google Meet scheduled with client
- [ ] Pre-session email sent with the "Before our call" checklist from `01-welcome-from-beaconshire.md`

### During Session 1

- [ ] Both owners (or all decision-makers) on the call
- [ ] Walk through accounts in order (Cloudflare → Vercel → GitHub → Supabase → Resend → Twilio → Google Workspace → Stripe)
- [ ] **Critical: every credential is the client's, not yours.** Confirm verbally for each.
- [ ] Client copies all env vars into a notes doc, not into chat
- [ ] Schedule Session 2 before ending (DNS records, 24h out)
- [ ] Send a thank-you email + a screenshot of their account dashboard tabs

### During Async wait

- [ ] Day 1 morning: confirm Stripe activation email arrived
- [ ] Day 2: nudge them to check Twilio A2P approval inbox
- [ ] Send a "Hey, just waiting on the carrier — should be ready by Tuesday" check-in

### During Session 3

- [ ] Switch Stripe to live keys
- [ ] Run `pnpm db:push` + seed
- [ ] Run `pnpm stripe:setup` against live keys
- [ ] Verify webhook signing secret in Vercel
- [ ] Promote client to admin via SQL
- [ ] Sign client out of all admin areas, sign back in as them, verify

### During Session 4 (End-to-end test)

- [ ] $1 test booking with real card
- [ ] Confirmation email + SMS received
- [ ] Appointment appears in admin
- [ ] Mark complete, charge balance test
- [ ] Refund the test payment

### Post-launch

- [ ] **Remove yourself from GitHub repo** (Settings → Collaborators → leave)
- [ ] Send invoice for remaining 50%
- [ ] Send the post-launch handoff doc (`03-after-launch.md`) with a 1-week follow-up scheduled
- [ ] Add to your "previously delivered" list for case study / testimonial

### 30 days after launch

- [ ] Check-in call (15 min): how's it going, any issues, any features they want to add
- [ ] Ask for a Google review / testimonial — they're more likely to give one when it's still fresh
- [ ] Pitch optional add-on services (photo retouching, blog writing, GBP optimization)

## Risks and how to handle them

### Risk: Client wants you to host on their behalf

**Don't do it on your accounts.** Either:
1. Their accounts, you have temporary access for ops → bill hourly when used
2. They take ownership; you're available on a per-call basis

Holding their Stripe keys is legally hairy. Don't.

### Risk: Client wants major customization mid-build

Push back early. The template is the deal. Major customization is a separate proposal.

Example responses:
- "That's a great idea — I'd want to do that right. Can we ship the base site and add this as a Phase 2 in 4 weeks?"
- "That's outside the package. Let me put together a proposal for it as an add-on — about $X."

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
