import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  title: string;
  kind: "car" | "truck" | "suv" | "boat" | "rv" | "motorcycle";
  /** Real image URL (Unsplash stand-in or Supabase Storage). */
  imageUrl?: string | null;
  badge?: ReactNode;
};

const KIND_GRADIENT: Record<Props["kind"], string> = {
  car: "from-brand-wawasee via-brand-teal to-brand-graphite",
  truck: "from-brand-graphite via-brand-wawasee to-brand-teal",
  suv: "from-brand-teal via-brand-wawasee to-brand-graphite",
  boat: "from-brand-teal via-brand-wawasee to-sky-300",
  rv: "from-brand-wawasee via-brand-graphite to-brand-chrome",
  motorcycle: "from-brand-graphite via-brand-graphite to-brand-teal",
};

const KIND_LABEL: Record<Props["kind"], string> = {
  car: "Auto",
  truck: "Truck",
  suv: "SUV",
  boat: "Boat",
  rv: "RV",
  motorcycle: "Motorcycle",
};

export function BeforeAfterCard({ title, kind, imageUrl, badge }: Props) {
  return (
    <figure className="group overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-shadow hover:shadow-md">
      <div className="relative aspect-[4/3] w-full overflow-hidden">
        {imageUrl ? (
          <>
            <Image
              src={imageUrl}
              alt={title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-brand-graphite/40 via-transparent to-transparent" />
            <span className="absolute right-3 top-3 rounded-full bg-background/85 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
              {KIND_LABEL[kind]}
            </span>
          </>
        ) : (
          <div
            role="img"
            aria-label={`${KIND_LABEL[kind]} detail — placeholder image`}
            className={`flex h-full w-full items-end bg-gradient-to-br ${KIND_GRADIENT[kind]}`}
          >
            <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
              {KIND_LABEL[kind]}
            </span>
            <span className="m-4 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
              Real photo coming
            </span>
          </div>
        )}
      </div>
      <figcaption className="flex items-center justify-between gap-3 p-4">
        <span className="text-sm font-medium text-foreground">{title}</span>
        {badge}
      </figcaption>
    </figure>
  );
}
