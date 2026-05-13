# KNB Detailing — knbdetailing.com

Production website + customer portal for **KNB Detailing LLC** (Syracuse, IN).

- Mobile auto / boat / RV / motorcycle detailing for Lake Wawasee and Kosciusko County.
- Owners: Krista & Benjamin Hohman.
- Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui · Supabase · Stripe · Resend · Twilio · Vercel.

---

## 👉 Are you Krista or Benjamin?

Welcome. This is your website. **Click the button below to deploy it into accounts you own.**

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fbeaconshire-advisory%2Fknb-detailing-template&project-name=knb-detailing&repository-name=knb-detailing&env=NEXT_PUBLIC_SITE_URL,NEXT_PUBLIC_SUPABASE_URL,NEXT_PUBLIC_SUPABASE_ANON_KEY,SUPABASE_SERVICE_ROLE_KEY,STRIPE_SECRET_KEY,NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY,RESEND_API_KEY,RESEND_FROM_EMAIL,OWNER_NOTIFICATION_EMAIL,TWILIO_ACCOUNT_SID,TWILIO_AUTH_TOKEN,TWILIO_PHONE_NUMBER,CRON_SECRET&envDescription=All%20values%20live%20in%20the%20notes%20doc%20you%20created%20in%20Part%201%20of%20the%20Setup%20Walkthrough)

**Read this in order — about 2 hours of clicking, plus 1–3 days waiting on Stripe and the SMS carrier:**

1. **[Welcome — what you're getting](handoff/01-welcome.md)** (3 min read)
2. **[Setup walkthrough — every step](handoff/02-setup-walkthrough.md)** (the main guide — ~2 hours of doing)
3. **[After launch — get found on Google](handoff/03-after-launch.md)** (45 min)
4. **[Troubleshooting — if something breaks](handoff/04-troubleshooting.md)** (reference)

For day-to-day operations once you're live: **[OWNER_GUIDE.md](OWNER_GUIDE.md)**.

This site is yours, free and clear — no subscription, no fees to Beaconshire Advisory, no follow-up calls required. Every account is in your name.

---

*Built by [Beaconshire Advisory](#) — local business websites, owned by you.*

---

## Quick start

```bash
pnpm install
cp .env.example .env.local   # fill in keys as you have them
pnpm dev
```

Open <http://localhost:3000>.

Requires **Node ≥ 20.9** (Next.js 16 minimum) and **pnpm ≥ 9**.

---

## Project layout

```
src/
  app/
    (marketing)/       Public marketing pages (uses SiteHeader + SiteFooter)
    (portal)/          Customer portal — auth-gated         [Phase 4]
    (admin)/           Owner admin — role=admin             [Phase 5]
    api/               Route handlers (Stripe webhook, etc.) [Phase 6+]
    layout.tsx         Root layout — fonts, theme, JSON-LD
    globals.css        Tailwind v4 + brand tokens
  components/
    ui/                shadcn/ui primitives
    layout/            SiteHeader, SiteFooter, MobileNav, MobileCtaBar
    marketing/         Hero, package cards, gallery         [Phase 3]
    portal/, admin/    Per-route component groups            [Phase 4–5]
    booking/           Multi-step booking + quote wizards    [Phase 3]
  content/
    blog/              MDX blog posts                        [Phase 3]
    services/          Service detail MDX overrides          [Phase 3]
  emails/              React Email templates                 [Phase 7]
  lib/
    constants.ts       Business identity (single source of truth)
    seo.ts             Metadata + JSON-LD builders
    supabase/          Server + browser Supabase clients     [Phase 2]
    stripe/            Stripe client + webhook helpers       [Phase 6]
    notifications/     Resend + Twilio abstraction           [Phase 7]
    utils.ts           cn() helper (shadcn)
  types/
    db.ts              Generated Supabase types              [Phase 2]
    domain.ts          App-level domain types
supabase/
  migrations/          SQL migrations                        [Phase 2]
  seed.sql             Service catalog placeholder data      [Phase 2]
scripts/
  stripe-setup.ts      One-time Stripe product/price seed    [Phase 6]
```

---

## Phase status

| Phase | Status | What's in |
|-------|--------|-----------|
| 1 — Scaffolding | ✅ | Next.js 16 + Tailwind v4 + shadcn/ui (base-ui), brand tokens, root layout, marketing route group with header / footer / mobile CTA. |
| 2 — Database schema (Supabase) | ✅ | 17 tables, RLS on every one, auto-profile-on-signup trigger, seed catalog with 15 services + 11 packages + 14 service ZIPs. |
| 3 — Marketing site | ✅ | All public routes, MDX blog with 3 starter posts, contact + quote + booking forms with server actions, legal pages, dynamic sitemap, OG image generator. |
| 4 — Auth & customer portal | ✅ | Supabase auth (magic-link + Google OAuth), `src/proxy.ts` gate, dashboard, vehicles, appointments, membership, billing, referrals, profile. |
| 5 — Admin panel | ✅ | Appointments (today/week/all with ZIP grouping), customers, vehicles, services, reviews queue, coupons CRUD, reports, blog/settings/availability views. |
| 6 — Payments (Stripe) | ✅ | Booking deposit checkout, balance off-session charge, refund per policy, subscriptions, customer portal, webhook with idempotency, gift cards. |
| 7 — Notifications (Resend + Twilio) | ✅ | React Email templates, unified notify(), Twilio SMS with opt-in, Vercel cron at 9am Indiana time for 24-hour reminders. |
| 8 — Testing & hardening | ✅ | 28 Vitest unit tests, Playwright + axe e2e, pino logger with PII redaction, in-memory rate limiter. |
| 9 — Deployment & DNS | ✅ | DEPLOYMENT.md covers every step from "owner has nothing" to "live with real payments". |
| 10 — Owner training | ✅ | OWNER_GUIDE.md + LAUNCH_CHECKLIST.md + final MISSING_DATA.md punch list. |

See `MISSING_DATA.md` for everything still flagged `{{OWNER_CONFIRM_*}}`.

---

## Stack notes — Next.js 16 specifics

This is **Next.js 16**, which differs from training-data defaults in a few places worth knowing:

- **Auth middleware is `src/proxy.ts`**, not `middleware.ts`. Edge runtime is **not** supported in `proxy` — runs on Node.
- **`cookies()`, `headers()`, `params`, `searchParams` are async-only**. Always `await`.
- **`revalidateTag(tag, profile)`** requires a `cacheLife` profile as the second argument.
- **Image config**: `images.domains` is deprecated. We use `images.remotePatterns` in `next.config.ts`.
- **`next lint` removed** — `pnpm lint` runs ESLint directly. `next build` no longer lints.
- **Brand tokens live in `src/app/globals.css` (Tailwind v4)**, not `tailwind.config.ts`.

When in doubt, the in-repo authoritative docs are in `node_modules/next/dist/docs/`.

---

## Scripts

```bash
pnpm dev          # next dev (port 3000)
pnpm build        # next build
pnpm start        # next start
pnpm lint         # eslint .
pnpm typecheck    # tsc --noEmit
```

Add later (per phase):
- `pnpm db:types` — regenerate Supabase types (Phase 2)
- `pnpm stripe:setup` — provision Stripe products/prices (Phase 6)
- `pnpm test` / `pnpm test:e2e` — Vitest / Playwright (Phase 8)

---

## Where to look next

- **Deployment** (domains, DNS, account setup, env wiring) → `DEPLOYMENT.md`
- **What still needs owner input** → `MISSING_DATA.md`
- **Day-to-day owner operations** → `OWNER_GUIDE.md` (Phase 10)
- **Pre-launch checklist** → `LAUNCH_CHECKLIST.md` (Phase 10)
