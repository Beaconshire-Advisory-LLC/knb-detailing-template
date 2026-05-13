import "server-only";

/**
 * Minimal in-memory rate limiter using a sliding window.
 *
 * Suitable for low-volume public endpoints (contact, quote, gift cards)
 * on a single-region Vercel deploy. For multi-region or higher volume,
 * swap the storage for Upstash Redis — the API surface stays identical.
 */

type Bucket = { count: number; resetAt: number };
const buckets = new Map<string, Bucket>();

export type RateLimitResult = {
  allowed: boolean;
  remaining: number;
  resetAt: number;
};

export function rateLimit(args: {
  key: string;
  windowMs: number;
  max: number;
}): RateLimitResult {
  const now = Date.now();
  const existing = buckets.get(args.key);
  if (!existing || existing.resetAt <= now) {
    const resetAt = now + args.windowMs;
    buckets.set(args.key, { count: 1, resetAt });
    return { allowed: true, remaining: args.max - 1, resetAt };
  }
  existing.count += 1;
  const allowed = existing.count <= args.max;
  return {
    allowed,
    remaining: Math.max(0, args.max - existing.count),
    resetAt: existing.resetAt,
  };
}

export function ipFromHeaders(headers: Headers): string {
  return (
    headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    headers.get("x-real-ip") ??
    "unknown"
  );
}
