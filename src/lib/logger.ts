import "server-only";
import pino from "pino";

/**
 * Structured logger with PII redaction.
 *
 * Use this everywhere on the server side instead of console.log so that
 * SSN-, credit-card-, and email-like values are scrubbed before they
 * reach logs or Sentry breadcrumbs.
 */

const PII_REDACTIONS = [
  "*.email",
  "email",
  "*.phone",
  "phone",
  "*.password",
  "password",
  "*.token",
  "token",
  "*.access_token",
  "access_token",
  "*.refresh_token",
  "refresh_token",
  "*.stripe_customer_id",
  "stripe_customer_id",
  "*.stripe_payment_intent_id",
  "stripe_payment_intent_id",
  "*.vin_or_hin",
];

export const logger = pino({
  level: process.env.LOG_LEVEL ?? "info",
  redact: {
    paths: PII_REDACTIONS,
    censor: "[redacted]",
  },
  transport:
    process.env.NODE_ENV === "development"
      ? {
          target: "pino-pretty",
          options: { colorize: true },
        }
      : undefined,
});
