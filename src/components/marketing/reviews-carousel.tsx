"use client";

import { useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { PlaceholderReview } from "@/lib/placeholders";

export function ReviewsCarousel({ reviews }: { reviews: PlaceholderReview[] }) {
  const [emblaRef, embla] = useEmblaCarousel({
    align: "start",
    loop: false,
    skipSnaps: false,
  });
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  useEffect(() => {
    if (!embla) return;
    const update = () => {
      setCanPrev(embla.canScrollPrev());
      setCanNext(embla.canScrollNext());
    };
    update();
    embla.on("select", update);
    embla.on("reInit", update);
    return () => {
      embla.off("select", update);
      embla.off("reInit", update);
    };
  }, [embla]);

  return (
    <div className="relative">
      <div ref={emblaRef} className="overflow-hidden">
        <ul className="flex gap-4">
          {reviews.map((r, i) => (
            <li
              key={i}
              className="min-w-[85%] shrink-0 md:min-w-[48%] lg:min-w-[32%]"
            >
              <Card className="h-full">
                <CardContent className="p-6">
                  <div
                    className="flex items-center gap-0.5 text-primary"
                    aria-label={`${r.rating} out of 5 stars`}
                  >
                    {Array.from({ length: r.rating }).map((_, k) => (
                      <Star key={k} className="size-4 fill-current" aria-hidden />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-pretty text-sm leading-relaxed text-foreground">
                    &ldquo;{r.body}&rdquo;
                  </blockquote>
                  <footer className="mt-4 text-sm font-medium text-muted-foreground">
                    {r.display_name}
                    {r.city ? ` · ${r.city}` : null}
                  </footer>
                </CardContent>
              </Card>
            </li>
          ))}
        </ul>
      </div>
      {(canPrev || canNext) && (
        <div className="mt-6 flex items-center justify-end gap-2">
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Previous review"
            onClick={() => embla?.scrollPrev()}
            disabled={!canPrev}
          >
            <ChevronLeft className="size-5" aria-hidden />
          </Button>
          <Button
            variant="outline"
            size="icon-lg"
            aria-label="Next review"
            onClick={() => embla?.scrollNext()}
            disabled={!canNext}
          >
            <ChevronRight className="size-5" aria-hidden />
          </Button>
        </div>
      )}
    </div>
  );
}
