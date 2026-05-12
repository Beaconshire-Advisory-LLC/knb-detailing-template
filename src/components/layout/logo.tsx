import Link from "next/link";
import { BUSINESS } from "@/lib/constants";

type Props = {
  className?: string;
  href?: string;
};

export function Logo({ className, href = "/" }: Props) {
  return (
    <Link
      href={href}
      aria-label={`${BUSINESS.shortName} home`}
      className={className}
    >
      <svg
        viewBox="0 0 200 48"
        role="img"
        aria-label={BUSINESS.shortName}
        className="h-9 w-auto"
      >
        <text
          x="0"
          y="36"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontWeight="900"
          fontSize="36"
          fill="currentColor"
          letterSpacing="-0.04em"
          className="text-primary"
        >
          KNB
        </text>
        <circle cx="80" cy="12" r="3.5" className="fill-[color:var(--color-brand-teal,#1F8FA8)]" />
        <text
          x="90"
          y="34"
          fontFamily="var(--font-inter), system-ui, sans-serif"
          fontWeight="500"
          fontSize="14"
          fill="currentColor"
          letterSpacing="0.12em"
          className="text-foreground"
        >
          DETAILING
        </text>
      </svg>
    </Link>
  );
}
