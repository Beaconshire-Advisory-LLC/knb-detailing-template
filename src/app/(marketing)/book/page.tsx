import { Suspense } from "react";
import { Badge } from "@/components/ui/badge";
import { BookingForm } from "@/components/marketing/booking-form";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Book a detail",
  description:
    "Book a mobile detail with KNB Detailing. Pick a package, your vehicle, and when. We come to you.",
  path: "/book",
});

export default async function BookPage(props: PageProps<"/book">) {
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
              { name: "Book", path: "/book" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Book
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Book your detail.
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            Five quick sections. We&apos;ll text and email you a confirmation
            and a deposit payment link.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
          <Suspense fallback={null}>
            <BookingForm initialService={initialService} />
          </Suspense>
        </div>
      </section>
    </>
  );
}
