import { getResend, RESEND_FROM, OWNER_EMAIL } from "@/lib/notifications/clients";

type LeadKind = "contact" | "quote" | "booking";

/**
 * Owner-facing notifications — sends a plain-text-ish email to the owner
 * inbox when a quote, contact, or booking lead arrives. Falls back to log
 * when Resend isn't configured.
 */
export async function notifyOwnerLead(
  kind: LeadKind,
  payload: Record<string, unknown>,
): Promise<void> {
  const resend = getResend();
  if (!resend || !OWNER_EMAIL) {
    console.info(`[owner-notify:${kind}]`, JSON.stringify(payload));
    return;
  }
  const subject = `New ${kind} — KNB site`;
  const lines = Object.entries(payload).map(
    ([k, v]) => `${k}: ${typeof v === "object" ? JSON.stringify(v) : String(v)}`,
  );
  await resend.emails
    .send({
      from: RESEND_FROM,
      to: OWNER_EMAIL,
      subject,
      text: lines.join("\n"),
    })
    .catch((e) => console.error(`[owner-notify:${kind}] resend failed`, e));
}
