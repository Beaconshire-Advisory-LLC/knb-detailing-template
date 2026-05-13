# Owner guide — running the business

Plain-English reference for Krista &amp; Benjamin. No tech jargon.

## 1 · Signing in

- Go to <https://knbdetailing.com/portal/login>.
- Either click **Continue with Google** (easiest if you use Gmail), or enter your email and click the sign-in link in your inbox.
- Your owner permissions let you see the **/admin** section — bookmark it: <https://knbdetailing.com/admin/appointments>.

## 2 · Today's schedule

- Open <https://knbdetailing.com/admin/appointments>.
- The **Today** tab shows everything booked for today, grouped by ZIP code so you can plan your route.
- Click **Manage** on any appointment for details.

## 3 · Marking a job complete

- On the appointment page, change **Status** to **Completed** and click **Save**.
- Once marked complete, the customer gets a "your detail is done" email and (if they opted in to SMS) a text.

## 4 · Uploading before/after photos

For now, photo upload is manual:

- Open Supabase Studio (<https://app.supabase.com>) → your `knb-detailing-prod` project → **Storage** → `service-photos` bucket.
- Drag-drop your photos into a folder named after the appointment ID (`appointmentid_uuid/before-1.jpg`).
- The customer sees them automatically in their portal.

A drag-drop UI in /admin is on the roadmap (Phase 5b).

## 5 · Charging the balance

- Open the appointment page. After you mark it **Completed**, a **Pay balance** button appears for customers in their portal — they can pay there.
- Auto-charging the balance off-session (without the customer's action) requires the Stripe webhook to be set up correctly (DEPLOYMENT.md §F). When wired, the charge happens automatically when status flips to Completed.

## 6 · Handling cancellations and refunds

Your cancellation policy is encoded in the system:

| When customer cancels | Refund |
|---|---|
| More than 48 hours before service | Full refund of deposit |
| 24–48 hours before service | 50% of deposit |
| Within 24 hours | No refund |

Weather and emergencies — you can always refund 100% manually in Stripe → Payments → the relevant payment → Refund.

## 7 · Editing a service or changing a price

For Phase 5, the catalog is in code (`src/lib/` and `supabase/seed.sql`). To change a price:

1. Tell your developer the service slug + size + new price.
2. They update the seed file + re-deploy.

Phase 5b will add inline edit in /admin/services.

## 8 · Blocking a vacation day

For Phase 5, availability is a manual process: customers can request any date, you confirm only the ones you can fulfill. If you go on vacation:

- Update your social media bio.
- Manually reject any pending bookings in /admin/appointments for those dates.

Phase 5b adds proper vacation blocking.

## 9 · Approving a customer review

- A customer leaves a review through their portal.
- You see it in <https://knbdetailing.com/admin/reviews> under **Pending**.
- Click **Approve** or **Approve + Feature** (featured reviews show on the homepage).
- Click **Reject** to silently delete inappropriate reviews.

## 10 · Creating a coupon

- Go to <https://knbdetailing.com/admin/coupons>.
- Fill the form: code (uppercase, like `WAWASEE`), type (% or $), value, optional max uses, optional expiry date.
- Click **Save coupon**. The code is now active.

## 11 · Adding a blog post

For now, blog posts are added via your developer:

- Email your developer the post (plain text or Word doc).
- They convert it to MDX, commit to the repo, and the post appears at <https://knbdetailing.com/blog>.

(Phase 5b will add an in-browser editor.)

## 12 · When Stripe sends a dispute notification

A "dispute" is when a customer's credit card bank reverses a charge. It's rare. When it happens:

- Stripe emails you and you'll see it in your Stripe dashboard.
- You typically have 7 days to respond.
- Send Stripe **evidence**: the before/after photos, the customer's signed acknowledgment (if you have one), the appointment time and address, your cancellation policy.
- Most disputes for legitimate detail work are won by the merchant when you have photos.

If the amount is &lt;$50, sometimes it's cheaper to just refund and move on.

## 13 · When a customer says they never got their confirmation

- Check their email address in /admin/customers — typos happen.
- Check Resend dashboard (<https://resend.com>) → **Emails** → search their address. You'll see whether the email was delivered, bounced, or marked as spam.
- Most common cause: email went to their spam folder. Have them whitelist `hello@knbdetailing.com`.
- Resend a confirmation manually from Stripe → Payments → the relevant payment → **Send receipt**.

## 14 · Monthly checklist

First Monday of each month:

- [ ] Review last month's revenue in /admin/reports.
- [ ] Approve any pending reviews in /admin/reviews.
- [ ] Add 2–3 new before/after photos to Google Business Profile.
- [ ] Check the Stripe dashboard for failed payments and follow up.
- [ ] Review and respond to any new Google reviews.
- [ ] Pay your card processing fees automatically deducted from Stripe.

## 15 · Annual checklist

In December:

- [ ] Renew domain at Cloudflare (auto-renewal recommended; verify it actually renewed).
- [ ] Renew chamber memberships.
- [ ] Review pricing — last increase date, competitor prices, your costs.
- [ ] Indiana Business Entity Report — biennial, due in your formation month. **About $50.** Indiana SOS sends a reminder; don't miss this or your LLC gets administratively dissolved.

## 16 · Who to contact

- **Site or portal is down:** your developer.
- **Payment / billing issue with a customer:** Stripe support (chat in dashboard).
- **Email not arriving:** Resend support.
- **SMS not arriving:** Twilio support.
- **Domain / DNS issue:** Cloudflare support.
- **Customer asking for legal documents (W-9, COI):** James Flecker, Beaconshire Advisory.

---

You don't need to know how any of this is built to run the business. The site is set up to handle the boring parts — confirmations, reminders, photo storage, payment flow — so you can focus on detailing.
