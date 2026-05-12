# Missing data — owner input still required

Every line below is a placeholder that the codebase ships with `{{OWNER_CONFIRM_*}}` text. Replace the values, then delete the row. Items are grouped by topic, not by phase.

**As of Phase 1 — scaffolding complete.**

---

## 1 · Business identity

| Item | Where | Status | Recommended |
|------|-------|--------|-------------|
| Business email | `src/lib/constants.ts` → `BUSINESS.email` | Placeholder `{{OWNER_CONFIRM_EMAIL}}` | `hello@knbdetailing.com` (set up via Google Workspace or Fastmail — see DEPLOYMENT.md §D) |
| Hours of operation | `src/lib/constants.ts` → `BUSINESS.hours` | Default placeholder Mon–Sat 8a–6p, Sun by appt | Confirm or correct |
| Indiana SOS entity number | `src/lib/constants.ts` → `BUSINESS.indianaSosEntityId` | Placeholder | Retrieve at <https://bsd.sos.in.gov/PublicBusinessSearch> |
| Indiana SOS formation date | `src/lib/constants.ts` → `BUSINESS.indianaSosFormationDate` | Placeholder | Same as above |
| Indiana SOS registered agent | `src/lib/constants.ts` → `BUSINESS.indianaSosRegisteredAgent` | Placeholder | Same as above |

## 2 · Online presence

| Item | Where | Status |
|------|-------|--------|
| Instagram handle / URL | `src/lib/constants.ts` → `BUSINESS.social.instagram` | Placeholder |
| Google Business Profile URL | `src/lib/constants.ts` → `BUSINESS.social.google` | Placeholder — needs to be claimed |
| Twitter / X handle (optional) | `src/lib/constants.ts` → `SITE.twitterHandle` | Placeholder |
| Kosciusko Chamber listing URL | `src/lib/constants.ts` → `BUSINESS.chambers[1].url` | Placeholder |

## 3 · Brand assets

| Item | Where | Status |
|------|-------|--------|
| Final logo (SVG + transparent PNG @1x/2x) | `public/logo.svg`, `public/logo.png` | **Using placeholder wordmark** at `public/logo-placeholder.svg` |
| Default OG / Twitter share image (1200×630) | `public/og-default.png` | **Not yet created** — referenced by `lib/seo.ts` but file is missing |
| Favicon set | `src/app/favicon.ico`, `icon.png`, `apple-icon.png` | Next.js default favicon — replace with branded |
| Owner headshots (Krista, Benjamin) | `public/team/krista.jpg`, `public/team/benjamin.jpg` | Not provided |
| Before / after gallery photos (20+, categorized) | Supabase Storage `gallery/` bucket | Not provided — Phase 2 setup |
| Chamber logo files | `public/chambers/*.png` | Not provided — text links used in footer for now |
| Insurance carrier / policy info for trust badges | (not yet wired) | Not provided |

## 4 · Service catalog (Phase 2 seed)

Owner must confirm before the catalog goes live:
- Which **recommended additions** to actually offer: ceramic coating, paint correction, headlight restoration, engine-bay, interior shampoo, pet hair, ozone deodorizing, gel-coat oxidation removal, wax/sealant programs, boat winterization.
- **Final pricing** for each tier (Express / Full / Premium / Ceramic) × vehicle size (Compact / Midsize / Large / XL / XXL).
- **Deposit percentage** (default 25%).
- **Cancellation policy** wording (default: >48h full refund, 24–48h 50%, <24h none).

## 5 · Legal / compliance

| Item | Status |
|------|--------|
| Privacy policy reviewed by counsel | Will be drafted in Phase 3 — owner should have reviewed before launch |
| Terms of service reviewed by counsel | Same |
| Accessibility statement | Same |
| Indiana sales tax stance on ceramic coating products | Default 0% in admin — confirm with CPA (James Flecker, Beaconshire Advisory) before charging customers |

## 6 · Tagline / brand voice

- Default tagline used: **"Lake-ready. Showroom-clean."** — confirm or override (`BUSINESS.tagline`).
- Default self-description draws from the Syracuse-Wawasee Chamber listing — confirm voice.

## 7 · Accounts not yet provisioned (Phase 9)

These are *not* the codebase's problem to solve but the owner needs to create them:

- Cloudflare (domain registrar + DNS)
- Vercel (hosting)
- Supabase project (`knb-detailing-prod`)
- Stripe (LIVE mode after business activation — needs EIN + bank info)
- Resend (sender domain verification)
- Twilio (A2P 10DLC registration takes 1–3 days)
- Google Workspace or Fastmail (for `hello@knbdetailing.com`)
- Google Business Profile (claim)
- Apple Developer (only if Apple OAuth is desired — Phase 4 will gracefully degrade without)
- Sentry (optional error monitoring — Phase 8)

Full step-by-step in `DEPLOYMENT.md`.
