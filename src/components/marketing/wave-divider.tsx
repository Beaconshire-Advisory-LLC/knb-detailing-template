type Props = {
  /** Color of the wave — default Wawasee Blue at low alpha for subtle effect. */
  fill?: string;
  /** Flip the wave vertically (use at the top of a section vs. the bottom). */
  flip?: boolean;
  className?: string;
};

/**
 * Decorative SVG wave divider — on-brand for a lake business.
 * Sits between sections to break up flat color blocks.
 */
export function WaveDivider({
  fill = "currentColor",
  flip = false,
  className,
}: Props) {
  return (
    <svg
      viewBox="0 0 1440 64"
      preserveAspectRatio="none"
      aria-hidden="true"
      className={className}
      style={{ transform: flip ? "scaleY(-1)" : undefined }}
    >
      <path
        fill={fill}
        d="M0 32 C 240 64, 480 0, 720 32 C 960 64, 1200 0, 1440 32 L1440 64 L0 64 Z"
      />
    </svg>
  );
}
