# After launch — marketing & discovery

**Beaconshire Advisory · KNB Detailing turnkey package**

Your site is live. These steps get you found in Google, Apple Maps, and Facebook. Plan for ~45 minutes total.

---

## 1 · Google Search Console (10 min)

Tells Google your site exists and to start indexing it.

1. Open `search.google.com/search-console` → **"Start now"**.
2. Sign in with your business Google account.
3. Pick **"URL prefix"** (not "Domain"). Enter `https://knbdetailing.com`. Click **"Continue"**.
4. Verify: pick **"HTML tag"** method. Copy the meta tag value (the `content=...` part).
5. Tell Beaconshire on the next call — they add it to the site code in one line. Or: pick the **TXT record** method instead and add it yourself in Cloudflare DNS.
6. Click **"Verify"**.
7. Left sidebar → **"Sitemaps"** → enter `sitemap.xml` → **"Submit"**.

Google starts indexing within hours. You'll see your site in search results within a few days to a week.

## 2 · Bing Webmaster Tools (5 min)

Same idea for Bing. Easier — import directly from Google Search Console.

1. `bing.com/webmasters` → sign in.
2. **"Import"** → pick Google Search Console → authorize.
3. All your settings carry over. Done.

## 3 · Google Business Profile (15 min) — the big one

This is what makes you appear in Google Maps and the local-business panel on the right side of search results. **Most local-business customers find you here.**

1. Go to `google.com/business`.
2. Sign in with the same business Google account.
3. **"Add your business"** → type `KNB Detailing LLC`.
4. If a listing already exists (someone may have created one), click **"Claim this business"**. Otherwise, **"Create new"**.
5. Category: **"Car detailing service"**.
6. **Do you want to add a location customers can visit?** — Pick **"No"** (you're mobile-only). 
7. **Service area**: add Syracuse, Warsaw, Winona Lake, Milford, North Webster, Pierceton, Leesburg, Cromwell, Goshen, Wakarusa, Nappanee, Ligonier, Albion. Type each one and pick from the dropdown.
8. **Contact**: phone `(574) 265-7278`, website `https://knbdetailing.com`.
9. **Verify**: Google will send a postcard to your address with a verification code (takes 5–10 days). Or, in some cases, video verification (faster — record a short walkthrough).
10. Once verified, optimize the listing:
    - **Description**: paste the description from your homepage hero.
    - **Hours**: same as your site.
    - **Photos**: upload at least 10 — the same photos already on your site work fine. Drag-drop them.
    - **Services**: add each one (Auto Detailing, Boat Detailing, RV Detailing, etc.). Google has dropdown options.
    - **Posts**: write a "Now booking online at knbdetailing.com" post.

## 4 · Update Facebook (5 min)

Your Facebook page already has lots of customers. Update it to point to the new site.

1. Open `facebook.com/p/KNB-detailing-LLC-100085547831233/`.
2. Click **"Edit"** at the top of the page.
3. **About** → **Page info**:
   - Website: `https://knbdetailing.com`.
   - Save.
4. Above your cover photo, find the **"Book Now"** button (or **"Send Message"** if there isn't one yet). Edit it → set to **"Book Now"** → URL `https://knbdetailing.com/book`.
5. Pin a post: "We've launched our website — book online at knbdetailing.com. Same Krista and Benjamin, faster booking."

## 5 · Apple Maps Connect (5 min)

Apple Maps is separate from Google. Lots of iPhone users start in Apple Maps.

1. Open `mapsconnect.apple.com`.
2. Sign in with an Apple ID.
3. **Add place** → search for KNB Detailing. Claim if it exists, add if it doesn't.
4. Fill in the same business info you used in Google Business Profile.
5. Verify (Apple sends a verification code via phone).

## 6 · Chamber listings (5 min)

You're already a member of two chambers. Update both.

1. **Syracuse-Wawasee Chamber** — log in or call them. Update your listing URL to `https://knbdetailing.com`.
2. **Kosciusko Chamber** — same.

## 7 · Customer launch announcement (15 min)

Your existing customers should know about the site so they start booking online.

1. Open your phone, go to **Contacts → Top 20–30 customers**.
2. Use a group text OR Facebook Messenger or email to send each of them:

> **Subject: We've gone digital + a thank you**
> 
> Hi [Name],
>
> Quick note — we just launched our website at **knbdetailing.com**. You can now:
>
> • Book any service in 2 minutes online
> • See before/after photos from your details in your portal
> • Set up a recurring plan (we'd save you ~20%)
>
> To thank you for being one of our first customers, use code **KNB-LAUNCH** for $25 off your next detail.
>
> Same Krista & Benjamin. Just easier to work with.

3. Send to everyone individually (not a group text — feels more personal).

## 8 · Seasonal promo coupon (3 min)

Drive bookings right after launch.

1. Go to `https://knbdetailing.com/admin/coupons`.
2. Create a coupon:
   - Code: `WAWASEE`
   - Type: **% off**
   - Value: **15**
   - Description: "Wawasee Season Opener"
   - Expires: Memorial Day weekend.
   - Active: yes.
3. Save. Post about it on Facebook.

## 9 · Google Analytics 4 (optional — 10 min)

Track who's visiting your site.

1. `analytics.google.com` → **"Start measuring"**.
2. Create an Account: name `KNB Detailing`.
3. Create a Property: name `knbdetailing.com`. Pick US timezone, USD.
4. Pick **"Web"** as the platform. URL: `https://knbdetailing.com`. Stream name: `Production`.
5. Copy the **Measurement ID** (`G-XXXXXXXXXX`).
6. In Vercel → Settings → Environment Variables → add `NEXT_PUBLIC_GA_MEASUREMENT_ID` = `G-XXXXXXXXXX`. Redeploy.

Analytics start collecting within 24 hours.

---

## What to do in the first month

**Week 1**: Watch your inbox + admin appointments page daily. Most local-business sites get their first booking within 5 days.

**Week 2**: Ask the first 3–5 customers to leave a Google review. Send them the link via SMS:
> "Hey [Name] — thanks for letting us detail [their vehicle]! If you have 30 seconds, a Google review would mean the world: https://g.page/r/...../review"

**Week 3**: Take real before/after photos on every job. Replace the stock photos in `src/lib/images.ts` (or have Beaconshire do it for you in a 30-min session).

**Month 1 end**: Review numbers in `/admin/reports`. Membership conversion typically lands at 5–10% of total bookings.

---

*Built by Beaconshire Advisory. Have questions or hit a wall? See `04-troubleshooting.md`.*
