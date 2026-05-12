# Deployment — repo to live site

This is the turnkey handoff. Follow it top-to-bottom and your site is live with real bookings.

> **Phase 1 status**: this file is the **skeleton**. The full step-by-step (with screenshots-style instructions) is written in Phase 9 of the build. The skeleton below outlines what each section will cover so you can preview the scope.

---

## A · Accounts to create (with expected monthly cost)

| Service | Plan | Floor cost | Notes |
|---------|------|-----------|-------|
| Cloudflare (registrar + DNS) | At-cost | ~$10/yr | Free WHOIS privacy; recommended over GoDaddy |
| Vercel (hosting) | Hobby | $0 | Upgrade to Pro ($20/mo) if commercial-use enforcement applies |
| Supabase (DB / auth / storage) | Free → Pro | $0 → $25/mo at scale | Free is enough to launch |
| Stripe (payments) | Pay-as-you-go | 2.9% + 30¢ per txn | Activation requires EIN + bank info |
| Resend (email) | Free → Pro | $0 → $20/mo above 3k emails | Free is enough to launch |
| Twilio (SMS) | Pay-as-you-go | ~$1.15/mo number + $0.0079/SMS | A2P 10DLC registration takes 1–3 days |
| Google Workspace | Business Starter | $7/user/mo | For `hello@knbdetailing.com` |
| Sentry (optional) | Free | $0 | Error monitoring |

**Estimated launch cost: ~$10/mo + $10/yr.** Variable thereafter with usage.

## B · Domain registration

Step-by-step Cloudflare flow for buying `knbdetailing.com`. Optional defensive `.net` and `knbdetailingllc.com`.

## C · DNS setup (Cloudflare → Vercel)

A record `@` → `76.76.21.21`, CNAME `www` → `cname.vercel-dns.com`, both unproxied (gray cloud).

## D · Email DNS (`hello@knbdetailing.com`)

MX records, SPF, DKIM (Google + Resend), DMARC. Mailbox creation.

## E · Supabase production setup

Project creation, migrations push, storage bucket setup, first admin promotion, PITR enablement.

## F · Stripe production setup

Activation, `scripts/stripe-setup.ts` against live keys, webhook endpoint registration, Customer Portal configuration.

## G · Resend + Twilio

Domain verification, A2P 10DLC registration, API keys.

## H · Vercel env vars

One-to-one with `.env.example`.

## I · Deploy

Push repo → Vercel project import → env vars → deploy → verify HTTPS on apex + www.

## J · Post-launch checklist

Search Console, GBP optimization, Facebook update, chamber listing updates, customer launch announcement, test $1 transaction.

## K · Monthly cost table

See `OWNER_GUIDE.md` for the ongoing operational cost summary.

---

> **Reminder for the developer**: Phase 9 expands every section above with the exact clicks, screens, and copy-paste values. Until Phase 9 is written, the owner should treat this file as an outline only.
