import { Badge } from "@/components/ui/badge";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Terms of service",
  description: "Terms governing your use of KNB Detailing services and website.",
  path: "/legal/terms",
});

const LAST_UPDATED = "May 12, 2026";

export default function TermsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Terms", path: "/legal/terms" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Legal
          </Badge>
          <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Terms of service
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated {LAST_UPDATED}</p>
        </div>
      </section>
      <article className="bg-background">
        <div className="prose prose-neutral mx-auto max-w-3xl px-4 py-12 prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-xl prose-h2:font-bold sm:px-6 lg:px-8">
          <p>
            These Terms govern your use of the website at knbdetailing.com and
            services provided by {BUSINESS.legalName}. By booking a service,
            creating an account, or otherwise using our website, you agree to
            these Terms.
          </p>

          <h2>Services</h2>
          <p>
            We provide mobile detailing services for cars, trucks, SUVs, boats,
            RVs, and motorcycles in Indiana. All services are performed at the
            location you provide, subject to our service area and reasonable
            access. We may decline service for safety, environmental, or
            condition reasons.
          </p>

          <h2>Booking, deposits, and payment</h2>
          <ul>
            <li>
              Bookings made online require a 25% deposit at the time of
              booking, charged through Stripe.
            </li>
            <li>
              The balance is charged after service is complete. By saving a
              payment method during checkout, you authorize us to charge the
              balance on the day of service.
            </li>
            <li>
              Prices listed are starting points. The final price depends on
              vehicle size and condition. We confirm the total during the
              walkaround before any work begins.
            </li>
            <li>
              Travel fees apply to ZIP codes outside our primary service area
              and are shown at checkout.
            </li>
          </ul>

          <h2>Cancellation and refunds</h2>
          <ul>
            <li>
              <strong>More than 48 hours before service:</strong> full refund
              of deposit.
            </li>
            <li>
              <strong>24–48 hours before service:</strong> 50% refund of
              deposit.
            </li>
            <li>
              <strong>Less than 24 hours before service:</strong> no refund.
              The deposit is forfeit.
            </li>
            <li>
              <strong>Weather and emergencies:</strong> if we reschedule for
              weather, you can keep the deposit applied to a future date or
              request a full refund.
            </li>
          </ul>

          <h2>Your responsibilities</h2>
          <ul>
            <li>Provide accurate information when booking.</li>
            <li>
              Ensure we have safe access to the vehicle, including HOA, dock,
              or storage-lot permission.
            </li>
            <li>
              Remove valuables and personal items from the vehicle. We are not
              liable for damaged or missing items left inside.
            </li>
            <li>
              Disclose known mechanical problems (loose hardware, electrical
              issues, recent repairs) that could be affected by detailing
              chemicals or water exposure.
            </li>
          </ul>

          <h2>Our liability</h2>
          <p>
            We carry general liability and care, custody, and control insurance
            for the vehicles in our care. If we damage your vehicle while
            performing service, we will work with you and our insurer to make
            it right.
          </p>
          <p>
            We are not liable for: pre-existing damage that becomes more visible
            after cleaning; mechanical or electrical issues that exist before
            our service; clear-coat failure due to age, prior over-buffing, or
            poor paint adhesion; faded or thin paint that cannot be
            machine-polished without damage; damage resulting from your failure
            to disclose known issues.
          </p>
          <p>
            Our total liability for any claim arising from a service is limited
            to the amount paid for that service, except where a higher amount
            is required by Indiana law.
          </p>

          <h2>Memberships</h2>
          <p>
            Memberships bill monthly via Stripe Subscriptions. You can pause,
            skip, or cancel at any time from your customer portal. Annual
            membership commitments, if any, are disclosed at the point of
            purchase. We do not pro-rate refunds for partial periods.
          </p>

          <h2>Gift cards</h2>
          <ul>
            <li>
              Gift cards purchased online are delivered by email to the
              recipient with a unique redemption code.
            </li>
            <li>
              Gift cards do not expire on amounts of $50 or more. Smaller
              amounts may expire after 24 months as permitted by Indiana law.
            </li>
            <li>
              Gift cards are non-refundable, non-transferable except to the
              named recipient, and cannot be redeemed for cash.
            </li>
          </ul>

          <h2>Photos</h2>
          <p>
            We take photos during service for quality assurance and your
            records, which appear in your customer portal. We will not publish
            photos to our public gallery or social media without your consent,
            which you may grant or revoke at any time.
          </p>

          <h2>Acceptable use</h2>
          <p>
            You may not use our website to: violate any law; transmit malware
            or attempt to disrupt the service; impersonate another person;
            scrape, crawl, or otherwise harvest content for commercial use; or
            attempt to access portions of the service for which you do not
            have authorization.
          </p>

          <h2>Termination</h2>
          <p>
            We may suspend or terminate your account if you violate these
            Terms or engage in abusive behavior toward our team. You may
            delete your account at any time from the portal.
          </p>

          <h2>Governing law and disputes</h2>
          <p>
            These Terms are governed by the laws of the State of Indiana,
            without regard to conflict-of-laws principles. Disputes will be
            resolved in Kosciusko County, Indiana, except where prohibited by
            law.
          </p>

          <h2>Changes</h2>
          <p>
            We may update these Terms occasionally. Material changes will be
            communicated by email to active customers and posted on this page.
          </p>

          <h2>Contact</h2>
          <p>
            Questions? Email {BUSINESS.email} or call {BUSINESS.phone}.
          </p>

          <p className="not-prose mt-8 rounded-lg border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
            These Terms were drafted for a small Indiana service business and
            should be reviewed by counsel before launch. They are not legal
            advice.
          </p>
        </div>
      </article>
    </>
  );
}
