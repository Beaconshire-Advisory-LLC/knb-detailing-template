import { Badge } from "@/components/ui/badge";
import { BeforeAfterCard } from "@/components/marketing/before-after";
import { GALLERY_PHOTOS } from "@/lib/images";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Before/after photos of recent detailing work — auto, boat, RV, motorcycle, ceramic coatings.",
  path: "/gallery",
});

export default function GalleryPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Gallery", path: "/gallery" },
            ]),
          ),
        }}
      />
      <section className="border-b border-border bg-secondary/30">
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
          <Badge variant="secondary" className="mb-3">
            Gallery
          </Badge>
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            Recent details
          </h1>
          <p className="mt-4 max-w-2xl text-pretty text-muted-foreground">
            Photos shown are stand-ins from royalty-free sources. Real KNB
            before/after shots replace these as we complete jobs this season.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {GALLERY_PHOTOS.map((item) => (
              <BeforeAfterCard
                key={item.title}
                title={item.title}
                kind={item.kind}
                imageUrl={item.url}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
