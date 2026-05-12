/**
 * Owner-facing notifications — used when a quote, contact form, or booking
 * comes in. Stubbed in Phase 3 (logs only) and wired to Resend + Twilio in
 * Phase 7. The function signatures stay stable across phases.
 */

type LeadKind = "contact" | "quote" | "booking";

export async function notifyOwnerLead(
  kind: LeadKind,
  payload: Record<string, unknown>,
): Promise<void> {
  // Phase 7 will read RESEND_API_KEY / OWNER_NOTIFICATION_EMAIL and
  // send a branded React-Email message. Until then, structured log.
  console.info(`[owner-notify:${kind}]`, JSON.stringify(payload));
}
