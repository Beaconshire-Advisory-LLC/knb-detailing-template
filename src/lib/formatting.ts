/**
 * Display-layer formatters. All amounts are cents in DB → format on render.
 */

export function formatCurrency(cents: number, opts: { showCents?: boolean } = {}) {
  const dollars = cents / 100;
  return dollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: opts.showCents === false ? 0 : 2,
    maximumFractionDigits: opts.showCents === false ? 0 : 2,
  });
}

export function formatPriceRange(min: number, max: number) {
  if (min === max) return formatCurrency(min, { showCents: false });
  return `${formatCurrency(min, { showCents: false })}–${formatCurrency(max, { showCents: false })}`;
}

export function formatPhone(raw: string) {
  // Accepts (574) 265-7278, 5742657278, +15742657278 → returns (574) 265-7278
  const digits = raw.replace(/\D/g, "").slice(-10);
  if (digits.length !== 10) return raw;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function formatDate(date: Date | string, opts: Intl.DateTimeFormatOptions = {}) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
    ...opts,
  });
}

export function formatTime(date: Date | string) {
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });
}

export function formatDateTime(date: Date | string) {
  return `${formatDate(date)} at ${formatTime(date)}`;
}
