# KNB Detailing — knbdetailing.com

Production website + customer portal for **KNB Detailing LLC** (Syracuse, IN).

- Mobile auto / boat / RV / motorcycle detailing for Lake Wawasee and Kosciusko County.
- Owners: Krista & Benjamin Hohman.
- Stack: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · shadcn/ui · Supabase · Stripe · Resend · Twilio · Vercel.

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
| 1 — Scaffolding | ✅ | Next.js 16 + Tailwind v4 + shadcn/ui, brand tokens, root layout, marketing route group with header / footer / mobile CTA, placeholder home, all handoff docs. |
| 2 — Database schema (Supabase) | ⏳ | — |
| 3 — Marketing site | ⏳ | — |
| 4 — Auth & customer portal | ⏳ | — |
| 5 — Admin panel | ⏳ | — |
| 6 — Payments (Stripe) | ⏳ | — |
| 7 — Notifications (Resend + Twilio) | ⏳ | — |
| 8 — Testing & hardening | ⏳ | — |
| 9 — Deployment & DNS | ⏳ | — |
| 10 — Owner training | ⏳ | — |

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
