import "server-only";
import { render } from "@react-email/components";
import {
  getResend,
  getTwilio,
  RESEND_FROM,
  TWILIO_FROM,
  OWNER_EMAIL,
} from "@/lib/notifications/clients";
import { BookingConfirmationEmail } from "@/emails/booking-confirmation";
import { BookingReminderEmail } from "@/emails/booking-reminder";
import { OwnerNewBookingEmail } from "@/emails/owner-new-booking";
import { ServiceCompleteEmail } from "@/emails/service-complete";

type BookingPayload = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageLabel: string;
  scheduledHuman: string;
  serviceAddress: string;
  appointmentId: string;
  depositCents: number;
  totalCents: number;
  zip: string;
  smsOptIn?: boolean;
};

/** Send the customer confirmation email + SMS (if opted in). Idempotent. */
export async function sendBookingConfirmation(p: BookingPayload) {
  const resend = getResend();
  if (resend) {
    const html = await render(BookingConfirmationEmail(p));
    await resend.emails
      .send({
        from: RESEND_FROM,
        to: p.customerEmail,
        subject: `Booking confirmed — ${p.scheduledHuman}`,
        html,
      })
      .catch((e) => console.error("[email] booking-confirm", e));
  }
  if (p.smsOptIn) {
    const twilio = getTwilio();
    if (twilio && TWILIO_FROM) {
      await twilio.messages
        .create({
          from: TWILIO_FROM,
          to: normalizePhone(p.customerPhone),
          body: `KNB Detailing: you're booked for ${p.scheduledHuman} at ${p.serviceAddress}. We'll text when we're on the way. Reply STOP to opt out.`,
        })
        .catch((e) => console.error("[sms] booking-confirm", e));
    }
  }
}

/** Notify owner of new booking. */
export async function sendOwnerNewBooking(p: BookingPayload) {
  const resend = getResend();
  if (!resend || !OWNER_EMAIL) return;
  const html = await render(OwnerNewBookingEmail(p));
  await resend.emails
    .send({
      from: RESEND_FROM,
      to: OWNER_EMAIL,
      subject: `New booking — ${p.customerName} · ${p.packageLabel}`,
      html,
    })
    .catch((e) => console.error("[email] owner-new-booking", e));
}

/** 24-hour reminder email + SMS. */
export async function sendBookingReminder(p: BookingPayload) {
  const resend = getResend();
  if (resend) {
    const html = await render(BookingReminderEmail(p));
    await resend.emails
      .send({
        from: RESEND_FROM,
        to: p.customerEmail,
        subject: `See you tomorrow — ${p.scheduledHuman}`,
        html,
      })
      .catch((e) => console.error("[email] reminder", e));
  }
  if (p.smsOptIn) {
    const twilio = getTwilio();
    if (twilio && TWILIO_FROM) {
      await twilio.messages
        .create({
          from: TWILIO_FROM,
          to: normalizePhone(p.customerPhone),
          body: `KNB Detailing reminder: see you tomorrow at ${p.scheduledHuman} for ${p.packageLabel}. ${p.serviceAddress}.`,
        })
        .catch((e) => console.error("[sms] reminder", e));
    }
  }
}

/** Service complete — sent after admin marks the appointment complete. */
export async function sendServiceComplete(args: {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  appointmentId: string;
  totalCharged: number;
  smsOptIn?: boolean;
}) {
  const resend = getResend();
  if (resend) {
    const html = await render(
      ServiceCompleteEmail({
        customerName: args.customerName,
        appointmentId: args.appointmentId,
        totalCharged: args.totalCharged,
      }),
    );
    await resend.emails
      .send({
        from: RESEND_FROM,
        to: args.customerEmail,
        subject: "Your detail is complete",
        html,
      })
      .catch((e) => console.error("[email] service-complete", e));
  }
  if (args.smsOptIn) {
    const twilio = getTwilio();
    if (twilio && TWILIO_FROM) {
      await twilio.messages
        .create({
          from: TWILIO_FROM,
          to: normalizePhone(args.customerPhone),
          body: `KNB Detailing: all done! Before/after photos are in your portal. Thanks for choosing us.`,
        })
        .catch((e) => console.error("[sms] complete", e));
    }
  }
}

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\D/g, "");
  if (digits.length === 10) return `+1${digits}`;
  if (digits.length === 11 && digits.startsWith("1")) return `+${digits}`;
  return raw.startsWith("+") ? raw : `+${digits}`;
}
