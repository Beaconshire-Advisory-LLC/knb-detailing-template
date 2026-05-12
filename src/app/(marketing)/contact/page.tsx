import Link from "next/link";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ContactForm } from "@/components/marketing/contact-form";
import { BUSINESS } from "@/lib/constants";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact",
  description:
    "Contact KNB Detailing — call (574) 265-7278, email hello@knbdetailing.com, or fill out the form.",
  path: "/contact",
});

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Contact", path: "/contact" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Contact
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Let&apos;s talk about your detail.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            Phone, email, or message us below. We try to respond same-day during
            business hours.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 px-4 py-16 sm:px-6 lg:grid-cols-5 lg:px-8">
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Phone className="mt-1 size-5 text-primary" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold">Call or text</p>
                    <a
                      href={`tel:${BUSINESS.phoneE164}`}
                      className="text-lg font-bold text-foreground hover:underline tabular-nums"
                    >
                      {BUSINESS.phone}
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Mail className="mt-1 size-5 text-primary" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold">Email</p>
                    <p className="text-sm text-muted-foreground break-all">
                      {BUSINESS.email}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <MapPin className="mt-1 size-5 text-primary" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold">Based in</p>
                    <p className="text-sm text-muted-foreground">
                      {BUSINESS.address.street}
                      <br />
                      {BUSINESS.address.city}, {BUSINESS.address.state}{" "}
                      {BUSINESS.address.zip}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      Mobile only — we don&apos;t take drop-offs.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <Clock className="mt-1 size-5 text-primary" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold">Hours</p>
                    <ul className="mt-1 text-sm text-muted-foreground">
                      <li>Mon–Sat: 8:00 AM – 6:00 PM</li>
                      <li>Sun: By appointment</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          <div className="lg:col-span-3">
            <h2 className="text-2xl font-bold">Send us a message</h2>
            <p className="mt-2 text-sm text-muted-foreground">
              For an exact price quote,{" "}
              <Link
                href="/quote"
                className="font-medium text-primary hover:underline"
              >
                use the quote wizard
              </Link>{" "}
              instead — it asks the right questions to give you a real estimate.
            </p>
            <div className="mt-6">
              <ContactForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
