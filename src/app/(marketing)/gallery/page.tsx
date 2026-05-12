import { Badge } from "@/components/ui/badge";
import { BeforeAfterCard } from "@/components/marketing/before-after";
import { pageMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gallery",
  description:
    "Before/after photos of recent detailing work — auto, boat, RV, motorcycle, ceramic coatings.",
  path: "/gallery",
});

type GalleryItem = {
  title: string;
  kind: "car" | "truck" | "suv" | "boat" | "rv" | "motorcycle";
  imageUrl?: string;
};

// Placeholder gallery — real photos populate Supabase Storage `gallery/` bucket.
const GALLERY: GalleryItem[] = [
  { title: "2020 F-150 — Full + ceramic", kind: "truck" },
  { title: "Bennington 22' pontoon — gel-coat restoration", kind: "boat" },
  { title: "Mastercraft X22 — show prep", kind: "boat" },
  { title: "Class C Winnebago — oxidation removal", kind: "rv" },
  { title: "Harley Road King — show prep", kind: "motorcycle" },
  { title: "Tesla Model Y — paint correction", kind: "car" },
  { title: "Yamaha 242X — vinyl + carpet", kind: "boat" },
  { title: "Chevy Tahoe — full interior detail", kind: "suv" },
  { title: "Ducati Monster — chrome + leather", kind: "motorcycle" },
  { title: "Toyota Tundra — ceramic 5-year", kind: "truck" },
  { title: "Sea Ray 230 — hull oxidation removal", kind: "boat" },
  { title: "BMW X5 — paint correction + wax", kind: "suv" },
];

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
            Real photos arrive as we complete jobs through the spring and summer
            season. Anything you see now is a placeholder card — we don&apos;t
            fake before/after shots.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {GALLERY.map((item) => (
              <BeforeAfterCard
                key={item.title}
                title={item.title}
                kind={item.kind}
                imageUrl={item.imageUrl}
              />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
