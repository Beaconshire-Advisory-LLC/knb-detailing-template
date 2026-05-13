import Image from "next/image";
import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

type Props = {
  className?: string;
  href?: string;
  /** Optional override for the rendered logo height (Tailwind class). */
  heightClass?: string;
};

export function Logo({
  className,
  href = "/",
  heightClass = "h-9 sm:h-10",
}: Props) {
  return (
    <Link
      href={href}
      aria-label={`${BUSINESS.shortName} home`}
      className={className}
    >
      {/* Real KNB Detailing logo — cyan "KNB" + black "Detailing" wordmark
          with car silhouette. Sourced from the owner's brand assets. */}
      <Image
        src="/photos/logo.jpg"
        alt={`${BUSINESS.shortName} — ${BUSINESS.tagline}`}
        width={200}
        height={92}
        priority
        className={`w-auto ${heightClass}`}
      />
    </Link>
  );
}
