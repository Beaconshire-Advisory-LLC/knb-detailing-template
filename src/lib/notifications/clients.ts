import "server-only";
import { Resend } from "resend";
import Twilio from "twilio";

let cachedResend: Resend | null = null;
export function getResend(): Resend | null {
  if (!process.env.RESEND_API_KEY) return null;
  if (cachedResend) return cachedResend;
  cachedResend = new Resend(process.env.RESEND_API_KEY);
  return cachedResend;
}

let cachedTwilio: ReturnType<typeof Twilio> | null = null;
export function getTwilio() {
  if (
    !process.env.TWILIO_ACCOUNT_SID ||
    !process.env.TWILIO_AUTH_TOKEN ||
    !process.env.TWILIO_PHONE_NUMBER
  ) {
    return null;
  }
  if (cachedTwilio) return cachedTwilio;
  cachedTwilio = Twilio(
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN,
  );
  return cachedTwilio;
}

export const RESEND_FROM =
  process.env.RESEND_FROM_EMAIL ??
  "KNB Detailing <hello@knbdetailing.com>";
export const OWNER_EMAIL = process.env.OWNER_NOTIFICATION_EMAIL ?? "";
export const TWILIO_FROM = process.env.TWILIO_PHONE_NUMBER ?? "";
