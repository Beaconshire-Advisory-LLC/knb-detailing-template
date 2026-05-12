import type { ReactNode } from "react";

type Props = {
  title: string;
  kind: "car" | "truck" | "suv" | "boat" | "rv" | "motorcycle";
  /** Optional real image URL — when null, render the branded gradient placeholder. */
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
    <figure className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
      {imageUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={imageUrl}
          alt={title}
          className="aspect-[4/3] w-full object-cover"
        />
      ) : (
        <div
          role="img"
          aria-label={`${KIND_LABEL[kind]} detail — placeholder image`}
          className={`relative flex aspect-[4/3] w-full items-end bg-gradient-to-br ${KIND_GRADIENT[kind]}`}
        >
          <span className="absolute right-3 top-3 rounded-full bg-background/80 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wider text-foreground backdrop-blur">
            {KIND_LABEL[kind]}
          </span>
          <span className="m-4 rounded-md bg-background/80 px-2 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
            Real before/after photo coming
          </span>
        </div>
      )}
      <figcaption className="flex items-center justify-between gap-3 p-4">
        <span className="text-sm font-medium text-foreground">{title}</span>
        {badge}
      </figcaption>
    </figure>
  );
}
