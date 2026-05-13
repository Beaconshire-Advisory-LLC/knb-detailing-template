# Missing data — owner input still required

Every line below is a placeholder that the codebase ships with `{{OWNER_CONFIRM_*}}` text. Replace the values, then delete the row. Items are grouped by topic.

**Final pass — all 10 phases complete.** Items below are the punch list for the owner to provide before launch.

---

## 1 · Business identity

| Item | Where | Recommended default |
|------|-------|---------------------|
| Business email | `src/lib/constants.ts` → `BUSINESS.email` | `hello@knbdetailing.com` (set up via Google Workspace in DEPLOYMENT.md §D) |
| Hours of operation | `src/lib/constants.ts` → `BUSINESS.hours` | Default Mon–Sat 8a–6p, Sun by appt — confirm or change |
| Indiana SOS entity number | `src/lib/constants.ts` → `BUSINESS.indianaSosEntityId` | Retrieve at <https://bsd.sos.in.gov/PublicBusinessSearch> |
| Indiana SOS formation date | `src/lib/constants.ts` → `BUSINESS.indianaSosFormationDate` | Same source |
| Indiana SOS registered agent | `src/lib/constants.ts` → `BUSINESS.indianaSosRegisteredAgent` | Same source |
| Tagline (optional override) | `src/lib/constants.ts` → `BUSINESS.tagline` | Default: "Lake-ready. Showroom-clean." |

## 2 · Online presence

| Item | Where |
|------|-------|
| Instagram URL | `src/lib/constants.ts` → `BUSINESS.social.instagram` |
| Google Business Profile URL (after claiming) | `src/lib/constants.ts` → `BUSINESS.social.google` |
| Twitter/X handle (optional) | `src/lib/constants.ts` → `SITE.twitterHandle` |
| Kosciusko Chamber listing URL | `src/lib/constants.ts` → `BUSINESS.chambers[1].url` |

## 3 · Brand assets

| Item | Where | Status |
|------|-------|--------|
| Final logo (SVG + transparent PNG) | `public/logo.svg`, `public/logo.png` | Placeholder wordmark at `public/logo-placeholder.svg` — used in header/footer |
| Owner headshots (Krista, Benjamin) | `public/team/krista.jpg`, `public/team/benjamin.jpg` | Not provided |
| Before / after gallery photos | Supabase Storage `gallery/` bucket | Not provided — gradient placeholder cards used until real photos exist |
| Chamber logo files | `public/chambers/*.png` | Text links only |
| Insurance carrier / policy info for footer | not yet wired | Optional, for trust display |
| Favicon + apple-icon set | `src/app/icon.png`, `src/app/apple-icon.png` | Next.js default in use — replace with branded |

## 4 · Service catalog confirmation (Phase 2 seed)

Owner must confirm in /admin/services or directly in `supabase/seed.sql` before going live:

- Which recommended add-ons to actually offer: ceramic, paint correction, headlight restoration, engine-bay, interior shampoo, pet hair, ozone, gel-coat oxidation, wax/sealant programs, boat winterization
- Final pricing for each tier × vehicle size (15 services × up to 5 sizes)
- Deposit percentage (default 25%)
- Cancellation policy wording (defaults are encoded in `lib/pricing.ts` and stated on Terms page)

## 5 · Legal / compliance

| Item | Status |
|------|--------|
| Privacy policy reviewed by counsel | Drafted — recommended counsel review before launch |
| Terms of service reviewed by counsel | Same |
| Accessibility statement | Same |
| Indiana sales tax on ceramic-coating products | Default 0% — confirm with James Flecker (CPA) |

## 6 · Reviews

- Placeholder reviews in `src/lib/placeholders.ts` are clearly flagged with `{{OWNER_CONFIRM}}` in the display names. They render until real reviews are approved through /admin/reviews.

## 7 · Accounts to provision (DEPLOYMENT.md §A)

Status tracker for owner:

- [ ] Cloudflare account + domain registered
- [ ] Vercel account
- [ ] Supabase project `knb-detailing-prod`
- [ ] Stripe activated for live payments
- [ ] Resend domain verified
- [ ] Twilio A2P 10DLC approved
- [ ] Google Workspace `hello@knbdetailing.com`
- [ ] Google Business Profile claimed
- [ ] Sentry (optional)

## 8 · First admin promotion

After Krista signs up at /portal/signup, run this once in Supabase SQL editor:

```sql
update profiles set role = 'admin' where email = 'krista@knbdetailing.com';
```

---

That's the full list. Everything else in the codebase is real, working code with production-ready copy.
