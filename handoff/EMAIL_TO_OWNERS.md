# Email to the owners

The message James sends to Krista & Benjamin. Replace the bracketed placeholders before sending. **This is the only thing they need to receive.** Everything else they need is linked from this email.

---

## Subject line

> A website for KNB Detailing — preview it now, launch when you're ready

## Body

> Hi Krista &amp; Benjamin,
>
> I built a complete website for KNB Detailing and you can preview it right now — it uses your real logo, your van, the Best of BusinessRate 2025 plaque, and 16 photos from your Facebook page:
>
> **👉 Live preview: [PREVIEW_URL_FROM_VERCEL]**
>
> Take 5 minutes to click through. The home page, services, booking flow, customer portal, and admin section are all there. The forms work; they just won't write to a real database until you launch your own copy.
>
> **If you want to launch it as your own:**
>
> Everything you need is in the email below. The site is built to be **owned by you outright** — every account is in your name, every credential is yours, and there's no subscription or fee to me. The whole launch takes about 2 hours of clicking through web dashboards, plus 1–3 days of waiting on Stripe and the SMS carrier to verify your business.
>
> **Step-by-step instructions (everything you need):**
>
> [SETUP_WALKTHROUGH_URL]
>
> The instructions are written to be self-serve — you don't need to call me or schedule anything. Read top to bottom, click as you go. There's a one-click "Deploy to Vercel" button that handles the technical setup for you.
>
> **Quick links to all the docs:**
>
> - Welcome &amp; what you're getting: [WELCOME_URL]
> - Setup walkthrough (the main one): [SETUP_WALKTHROUGH_URL]
> - After launch (marketing): [AFTER_LAUNCH_URL]
> - If something goes wrong: [TROUBLESHOOTING_URL]
> - Day-to-day operations: [OWNER_GUIDE_URL]
>
> **The 17 photos and the award badge are already in the site.** The only thing flagged for your input is a final tagline confirmation and your preferred hours — both can be edited later from your admin panel.
>
> If you decide to launch, you'll create accounts at Cloudflare (domain registrar), Vercel (hosting), Supabase (database), Stripe (payments), Resend (email), Twilio (SMS), and Google Workspace (your business email). Each one is free or low-cost — about **$10/month total + $10/year for the domain**. Stripe takes their 2.9% per transaction; that's the only variable cost.
>
> If you decide not to launch, no hard feelings. The preview link above is yours to keep for reference.
>
> Either way — congratulations on the Best of BusinessRate 2025 win, and thanks for trusting me with this.
>
> — James
> Beaconshire Advisory · Indiana

---

## Optional follow-up signature

If you want the email to feel more official, add a footer block:

> **James Flecker** · Founder, Beaconshire Advisory
> Tax · Advisory · Local business websites
> [your.email@beaconshireadvisory.com] · [your phone]
> [beaconshireadvisory.com]

---

## What James needs to do before sending

Order of operations on James's side, ~30 minutes:

1. **Push the code to a public GitHub repo.** From `/Users/jrf/Desktop/knb-detailing/`:
   ```bash
   gh repo create beaconshire-advisory/knb-detailing-template \
     --public \
     --source=. \
     --remote=origin \
     --push \
     --description "KNB Detailing website — turnkey package from Beaconshire Advisory"
   ```
   (Replace `beaconshire-advisory` with whatever GitHub username/org you use.)

2. **Deploy a preview to your own Vercel** so they can click and see the site immediately:
   ```bash
   cd /Users/jrf/Desktop/knb-detailing
   pnpm dlx vercel --prod
   ```
   - Pick your Vercel account.
   - Project name: `knb-detailing-preview`.
   - Vercel returns a URL like `https://knb-detailing-preview.vercel.app`.

3. **Fill in the placeholders** in the email above:
   - `[PREVIEW_URL_FROM_VERCEL]` → the URL from step 2.
   - `[SETUP_WALKTHROUGH_URL]` → `https://github.com/beaconshire-advisory/knb-detailing-template/blob/main/handoff/02-setup-walkthrough.md`
   - `[WELCOME_URL]` → `https://github.com/beaconshire-advisory/knb-detailing-template/blob/main/handoff/01-welcome.md`
   - `[AFTER_LAUNCH_URL]` → `https://github.com/beaconshire-advisory/knb-detailing-template/blob/main/handoff/03-after-launch.md`
   - `[TROUBLESHOOTING_URL]` → `https://github.com/beaconshire-advisory/knb-detailing-template/blob/main/handoff/04-troubleshooting.md`
   - `[OWNER_GUIDE_URL]` → `https://github.com/beaconshire-advisory/knb-detailing-template/blob/main/OWNER_GUIDE.md`

4. **Send the email.** Plain text or formatted HTML — both work. Send from your business email so it lands cleanly (not in spam).

5. **You're done.** No follow-up required. If they want to launch, they will — using the docs.

---

## What this email accomplishes

- They preview the site **in one click** before deciding anything.
- They have **zero obligation** — looking costs them nothing.
- If they want it, the path forward is **fully documented and self-serve**.
- They **own the result outright** — no Beaconshire credentials, no subscription, no follow-up calls required.
- The whole interaction is **one email**. You never have to chase, sell, or schedule.

If they don't launch, you've spent ~30 minutes of your time on a goodwill gesture for an existing chamber neighbor. If they do launch, you've shown them what's possible with a small business website in 2026 and they own the result.
