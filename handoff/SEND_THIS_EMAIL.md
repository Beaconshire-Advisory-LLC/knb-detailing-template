# Delivery checklist — what James does to ship this

**For James only.** ~30 minutes of work. Then send the email and you're done.

---

## Step 1 · Push the code to a public GitHub repo (5 min)

From `/Users/jrf/Desktop/knb-detailing/`:

```bash
gh repo create beaconshire-advisory/knb-detailing-template \
  --public \
  --source=. \
  --remote=origin \
  --push \
  --description "KNB Detailing — turnkey website package · Beaconshire Advisory"
```

Replace `beaconshire-advisory` with the GitHub username or organization you want this under. (If you don't have a `beaconshire-advisory` org yet, you can create one in GitHub for $0 — or just use your personal account.)

Verify: open `https://github.com/[your-username]/knb-detailing-template`. The repo exists; the Deploy to Vercel button in the README is now functional.

## Step 2 · Deploy a preview to your Vercel (10 min)

This is the live URL Krista clicks in the email.

```bash
cd /Users/jrf/Desktop/knb-detailing
pnpm dlx vercel --prod
```

Walks you through:

- **Set up and deploy?** → yes
- **Which scope?** → your personal Vercel account
- **Link to existing project?** → no
- **Project name?** → `knb-detailing-preview`
- **Directory?** → `./`
- **Override settings?** → no

After ~3 minutes, you get a URL like `https://knb-detailing-preview.vercel.app`.

**Open it yourself.** Click through:
- Home page (van photo at top, award callout below)
- `/services/boat` (real boat photo + dockside emphasis)
- `/about` (real owners photo)
- `/gallery` (all 13 vehicle photos)
- `/book` (the form works even without real Supabase — submissions just log)

If anything looks broken, fix it locally and run `pnpm dlx vercel --prod` again.

## Step 3 · Fill in the email template (5 min)

Open `handoff/EMAIL_TO_OWNERS.md`. Replace the 6 placeholders:

| Placeholder | What to paste |
|---|---|
| `[PREVIEW_URL_FROM_VERCEL]` | The URL from Step 2 |
| `[SETUP_WALKTHROUGH_URL]` | `https://github.com/[your-gh-username]/knb-detailing-template/blob/main/handoff/02-setup-walkthrough.md` |
| `[WELCOME_URL]` | `https://github.com/[your-gh-username]/knb-detailing-template/blob/main/handoff/01-welcome.md` |
| `[AFTER_LAUNCH_URL]` | `https://github.com/[your-gh-username]/knb-detailing-template/blob/main/handoff/03-after-launch.md` |
| `[TROUBLESHOOTING_URL]` | `https://github.com/[your-gh-username]/knb-detailing-template/blob/main/handoff/04-troubleshooting.md` |
| `[OWNER_GUIDE_URL]` | `https://github.com/[your-gh-username]/knb-detailing-template/blob/main/OWNER_GUIDE.md` |

## Step 4 · Send the email (5 min)

1. Open your email client.
2. To: Krista's and Benjamin's email.
3. Subject: `A website for KNB Detailing — preview it now, launch when you're ready`
4. Paste the email body from `EMAIL_TO_OWNERS.md` (with placeholders filled).
5. Send.

## Step 5 · You're done

Don't follow up. Don't check in. If they want it, they'll set it up. If they don't, no harm done.

The next time you do this for a different local business (HVAC, lawn care, pet grooming, etc.):

1. Fork the public template repo into a new branch
2. Run through Tier 1 + Tier 2 of the [per-engagement customization checklist](beaconshire-runbook.md#per-engagement-customization)
3. Push to a new repo
4. Deploy a preview
5. Send the email

The 30-minute delivery loop is the whole business model.

---

## Optional — make the template fully generic

If you want the public template at `github.com/beaconshire-advisory/local-business-template` to be reusable across industries (not KNB-specific), do this once:

1. `gh repo fork beaconshire-advisory/knb-detailing-template --clone=true --remote=true`
2. Strip out KNB-specific content:
   - `src/lib/constants.ts` → replace BUSINESS object with `{{TEMPLATE}}` placeholders
   - `src/lib/images.ts` → blank PHOTOS object pointing at placeholder paths
   - `src/content/services-data.ts` → minimal placeholder services
   - `src/content/blog/*.mdx` → delete (or replace with generic posts)
   - `public/photos/*.jpg` → replace with a single placeholder
   - `supabase/seed.sql` → comment out KNB-specific seed rows
3. Push to `beaconshire-advisory/local-business-template`.

Then each new engagement starts from there, not from KNB's customized version. Cleaner.

This is a 1-hour cleanup task you do **once**, not per-engagement.
