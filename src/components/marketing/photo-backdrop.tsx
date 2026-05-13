import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  src: string;
  alt: string;
  /** Tailwind opacity utility on the gradient overlay (e.g. "from-primary/70"). */
  overlayFrom?: string;
  overlayTo?: string;
  priority?: boolean;
  className?: string;
  children?: React.ReactNode;
};

/**
 * Photographic section backdrop with a brand-tinted gradient overlay.
 * Use for hero areas. Place absolute-positioned content via `children`.
 */
export function PhotoBackdrop({
  src,
  alt,
  overlayFrom = "from-primary/85",
  overlayTo = "to-brand-graphite/40",
  priority = false,
  className,
  children,
}: Props) {
  return (
    <div className={cn("relative isolate overflow-hidden", className)}>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="100vw"
        className="absolute inset-0 -z-10 object-cover"
      />
      <div
        aria-hidden
        className={cn(
          "absolute inset-0 -z-10 bg-gradient-to-br",
          overlayFrom,
          overlayTo,
        )}
      />
      {children}
    </div>
  );
}
