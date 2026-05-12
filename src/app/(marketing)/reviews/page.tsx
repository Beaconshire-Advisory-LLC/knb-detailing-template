import Link from "next/link";
import { Star } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { PLACEHOLDER_REVIEWS } from "@/lib/placeholders";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Reviews",
  description:
    "What customers say about KNB Detailing — Lake Wawasee neighbors, boat owners, lake-house families.",
  path: "/reviews",
});

export default function ReviewsPage() {
  // Real reviews from `reviews` table where approved=true fill in once Supabase
  // is wired and the owner approves submissions. Placeholders surface here
  // until then.
  const reviews = PLACEHOLDER_REVIEWS;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Reviews", path: "/reviews" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Reviews
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            What lake folks say
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            Reviews from neighbors, boat owners, and lake-house families
            we&apos;ve detailed for. Want to leave one?{" "}
            <Link
              href="/contact"
              className="font-medium text-primary hover:underline"
            >
              Send it our way
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            {reviews.map((r, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div
                    className="flex items-center gap-0.5 text-primary"
                    aria-label={`${r.rating} out of 5 stars`}
                  >
                    {Array.from({ length: r.rating }).map((_, k) => (
                      <Star
                        key={k}
                        className="size-4 fill-current"
                        aria-hidden
                      />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-pretty text-sm text-foreground">
                    &ldquo;{r.body}&rdquo;
                  </blockquote>
                  <footer className="mt-4 text-sm font-medium text-muted-foreground">
                    {r.display_name}
                    {r.city ? ` · ${r.city}` : null}
                  </footer>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-10 rounded-xl border border-border bg-muted/30 p-6 text-center">
            <p className="text-sm text-muted-foreground">
              Worked with us recently?
            </p>
            <p className="mt-1 text-lg font-semibold">
              We&apos;d love a Google review.
            </p>
            <div className="mt-4 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Button variant="outline" render={<Link href="/contact" />}>
                Send us feedback directly
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
