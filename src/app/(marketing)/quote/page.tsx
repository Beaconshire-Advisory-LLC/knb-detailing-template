import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { QuoteForm } from "@/components/marketing/quote-form";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Instant quote",
  description:
    "Get an instant estimate for your detail. Quick form, live estimate range, no obligation.",
  path: "/quote",
});

export default async function QuotePage(props: PageProps<"/quote">) {
  const sp = await props.searchParams;
  const initialService = (sp?.service as string | undefined) ?? undefined;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Quote", path: "/quote" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Instant quote
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Get an estimate in under two minutes.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            Tell us about your vehicle and we&apos;ll show you a live estimate
            range. No obligation — book if it works for you.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <QuoteForm initialService={initialService} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
