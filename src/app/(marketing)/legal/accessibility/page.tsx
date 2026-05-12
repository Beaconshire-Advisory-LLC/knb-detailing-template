import { Badge } from "@/components/ui/badge";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { BUSINESS } from "@/lib/constants";

export const metadata = pageMetadata({
  title: "Accessibility statement",
  description: "KNB Detailing's commitment to digital and physical service accessibility.",
  path: "/legal/accessibility",
});

const LAST_UPDATED = "May 12, 2026";

export default function AccessibilityPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Accessibility", path: "/legal/accessibility" },
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
            Accessibility statement
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">Last updated {LAST_UPDATED}</p>
        </div>
      </section>
      <article className="bg-background">
        <div className="prose prose-neutral mx-auto max-w-3xl px-4 py-12 prose-headings:tracking-tight prose-h2:mt-12 prose-h2:text-xl prose-h2:font-bold sm:px-6 lg:px-8">
          <p>
            {BUSINESS.legalName} is committed to making both our website and
            our in-person services accessible to people of all abilities.
          </p>

          <h2>Our standard</h2>
          <p>
            We target conformance with the{" "}
            <a
              href="https://www.w3.org/WAI/WCAG21/quickref/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Web Content Accessibility Guidelines (WCAG) 2.1 at level AA
            </a>
            . This applies to our website at knbdetailing.com and our customer
            portal.
          </p>

          <h2>What we&apos;ve built in</h2>
          <ul>
            <li>Semantic HTML and proper heading hierarchy.</li>
            <li>Keyboard navigation for every interactive element.</li>
            <li>
              Focus indicators on all links, buttons, and form fields.
            </li>
            <li>
              Color contrast meeting or exceeding WCAG AA on body text, form
              fields, and UI controls.
            </li>
            <li>Alt text on meaningful images.</li>
            <li>
              Form labels that are programmatically associated with their
              inputs.
            </li>
            <li>Skip-to-content link on every page.</li>
            <li>
              Reduced-motion preference respected — animations are minimized
              when prefers-reduced-motion is set.
            </li>
          </ul>

          <h2>Known limitations</h2>
          <p>
            We&apos;re working to improve coverage in these areas:
          </p>
          <ul>
            <li>
              Some third-party widgets (map embeds, payment widgets) may not
              meet our AA target. We are evaluating alternatives.
            </li>
            <li>
              Video content, if added in the future, will need transcripts and
              captions — we will add those at the same time as the video.
            </li>
          </ul>

          <h2>Physical service accessibility</h2>
          <p>
            Our service is mobile — we come to you. We can accommodate most
            access requirements; please let us know in the booking notes
            (e.g., specific entrance, lift access, ground-level only, quiet
            arrival). If our standard process doesn&apos;t work for your
            situation, call us and we&apos;ll figure it out.
          </p>

          <h2>Reporting a problem</h2>
          <p>
            If something on this site is hard to use or doesn&apos;t work with
            your assistive technology, please tell us — we&apos;ll fix it.
          </p>
          <ul>
            <li>Email: {BUSINESS.email}</li>
            <li>Phone: {BUSINESS.phone}</li>
          </ul>
          <p>We aim to respond within two business days.</p>
        </div>
      </article>
    </>
  );
}
