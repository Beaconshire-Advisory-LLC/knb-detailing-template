import { Badge } from "@/components/ui/badge";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Privacy policy",
  description: "How KNB Detailing collects, uses, and protects your data.",
  path: "/legal/privacy",
});

const LAST_UPDATED = "May 12, 2026";

export default function PrivacyPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Legal", path: "/legal/privacy" },
              { name: "Privacy", path: "/legal/privacy" },
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
            Privacy policy
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            Last updated {LAST_UPDATED}
          </p>
        </div>
      </section>
      <article className="bg-background">
        <div className="prose prose-neutral mx-auto max-w-3xl px-4 py-12 prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-xl prose-h2:font-bold sm:px-6 lg:px-8">
          <p>
            {BUSINESS.legalName} (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or
            &ldquo;our&rdquo;) operates the website at knbdetailing.com and
            provides mobile detailing services in Indiana. This Privacy Policy
            explains what information we collect, how we use it, and the
            choices you have. By using our website or services, you agree to
            this policy.
          </p>

          <h2>Information we collect</h2>
          <h3>Information you give us</h3>
          <ul>
            <li>
              Contact information (name, email address, phone number) when you
              fill out our contact, quote, or booking forms.
            </li>
            <li>
              Vehicle information (make, model, year, VIN/HIN, photos, service
              history) for the vehicles you bring into our care.
            </li>
            <li>
              Payment information processed by Stripe — we do not store credit
              card numbers on our servers.
            </li>
            <li>
              Communication preferences for SMS and email.
            </li>
          </ul>

          <h3>Information collected automatically</h3>
          <ul>
            <li>
              Standard server log information (IP address, browser type, pages
              visited, referrer) retained for 30 days.
            </li>
            <li>
              Aggregated, non-identifying analytics if you have not opted out.
            </li>
            <li>
              Authentication cookies when you sign in to your customer portal.
            </li>
          </ul>

          <h2>How we use information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Schedule, deliver, and bill for detailing services you request.</li>
            <li>
              Send appointment confirmations, reminders, &ldquo;on-the-way&rdquo;
              notices, and service-complete notifications.
            </li>
            <li>
              Respond to your inquiries and provide customer support.
            </li>
            <li>
              Send promotional content (only if you have opted in to marketing).
            </li>
            <li>
              Improve our service quality and detect fraud.
            </li>
            <li>
              Comply with legal obligations (tax records, regulatory requests).
            </li>
          </ul>

          <h2>Sharing your information</h2>
          <p>
            We do not sell your personal information. We share data only with
            service providers who help us run our business:
          </p>
          <ul>
            <li>
              <strong>Stripe</strong> — payment processing.
            </li>
            <li>
              <strong>Supabase</strong> — database and authentication
              infrastructure.
            </li>
            <li>
              <strong>Resend</strong> — transactional email delivery.
            </li>
            <li>
              <strong>Twilio</strong> — SMS notifications (only if you have
              opted in).
            </li>
            <li>
              <strong>Vercel</strong> — website hosting.
            </li>
          </ul>
          <p>
            These providers may only use your information to provide their
            specific service to us. We may also disclose information when
            required by law, court order, or to protect the rights, property,
            or safety of others.
          </p>

          <h2>Photos taken during service</h2>
          <p>
            We take before/after photos as part of our standard service. These
            photos are private by default and appear only in your customer
            portal. With your written or in-portal consent, individual photos
            may be added to our public gallery or social media. You can ask us
            to remove any specific photo from the public gallery at any time.
          </p>

          <h2>Your rights and choices</h2>
          <ul>
            <li>
              <strong>Access and correction.</strong> You can view and edit
              your information at any time in your customer portal.
            </li>
            <li>
              <strong>SMS opt-out.</strong> Reply STOP to any SMS to unsubscribe.
            </li>
            <li>
              <strong>Email opt-out.</strong> Marketing emails include an
              unsubscribe link. Transactional emails (appointment
              confirmations) cannot be opted out of while you have active
              bookings.
            </li>
            <li>
              <strong>Account deletion.</strong> Request account deletion via
              the portal or by emailing us. We retain financial records as
              required by law (typically 7 years).
            </li>
          </ul>

          <h2>California residents (CCPA)</h2>
          <p>
            California residents have the right to know what personal
            information we collect, to request deletion, and to opt out of
            sale. We do not sell personal information.
          </p>

          <h2>European residents (GDPR)</h2>
          <p>
            We process personal data based on your consent, our contractual
            obligation to provide service, and our legitimate interest in
            running our business. You have the right to access, rectify, port,
            and erase your data; to restrict and object to processing; and to
            withdraw consent at any time. Email us to exercise these rights.
          </p>

          <h2>Children</h2>
          <p>
            Our services are not directed to children under 13, and we do not
            knowingly collect personal information from them.
          </p>

          <h2>Security</h2>
          <p>
            We use industry-standard security measures: encrypted connections
            (HTTPS), at-rest encryption for our database, and access controls
            limiting which staff can see customer data. No system is perfectly
            secure; if we ever experience a breach affecting your data, we
            will notify you within 72 hours as required by Indiana law.
          </p>

          <h2>Changes to this policy</h2>
          <p>
            We may update this policy from time to time. We will post the new
            policy on this page and update the &ldquo;Last updated&rdquo; date.
            Material changes will be communicated by email to active
            customers.
          </p>

          <h2>Contact</h2>
          <p>
            Questions about this policy? Email us at {BUSINESS.email}, call us
            at {BUSINESS.phone}, or write to: <br />
            {BUSINESS.legalName} <br />
            {BUSINESS.address.street} <br />
            {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
            {BUSINESS.address.zip}
          </p>

          <p className="not-prose mt-8 rounded-lg border border-border bg-muted/30 p-4 text-xs text-muted-foreground">
            This policy was drafted for a small Indiana service business and
            should be reviewed by counsel before launch. It is not legal
            advice.
          </p>
        </div>
      </article>
    </>
  );
}
