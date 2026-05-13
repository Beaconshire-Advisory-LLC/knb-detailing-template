import { NextResponse, type NextRequest } from "next/server";
import { addDays, startOfDay, endOfDay } from "date-fns";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { sendBookingReminder } from "@/lib/notifications/send";
import { formatDateTime } from "@/lib/formatting";

/**
 * Daily cron: send 24-hour reminders for tomorrow's confirmed appointments.
 *
 * Schedule via vercel.json (already configured to fire at 9am America/Indiana/Indianapolis).
 * Authenticated via CRON_SECRET to prevent public abuse.
 */
export async function GET(request: NextRequest) {
  const auth = request.headers.get("authorization");
  if (
    !process.env.CRON_SECRET ||
    auth !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }

  const supabase = getSupabaseAdminClient();
  const tomorrow = addDays(new Date(), 1);
  const start = startOfDay(tomorrow).toISOString();
  const end = endOfDay(tomorrow).toISOString();

  const { data: appts } = await supabase
    .from("appointments")
    .select(
      "id, customer_id, package_id, scheduled_start, service_address, service_zip, total_cents, deposit_cents",
    )
    .gte("scheduled_start", start)
    .lte("scheduled_start", end)
    .eq("status", "confirmed");

  if (!appts || appts.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  let sent = 0;
  for (const a of appts) {
    const { data: customer } = await supabase
      .from("profiles")
      .select("email, full_name, phone, sms_opt_in")
      .eq("id", a.customer_id)
      .maybeSingle();
    if (!customer?.email) continue;

    let packageLabel = "Your detail";
    if (a.package_id) {
      const { data: pkg } = await supabase
        .from("packages")
        .select("name")
        .eq("id", a.package_id)
        .maybeSingle();
      if (pkg?.name) packageLabel = pkg.name;
    }

    await sendBookingReminder({
      customerName: customer.full_name ?? "there",
      customerEmail: customer.email,
      customerPhone: customer.phone ?? "",
      packageLabel,
      scheduledHuman: formatDateTime(a.scheduled_start),
      serviceAddress: a.service_address,
      appointmentId: a.id,
      depositCents: a.deposit_cents,
      totalCents: a.total_cents,
      zip: a.service_zip ?? "",
      smsOptIn: customer.sms_opt_in ?? false,
    });
    sent++;
  }

  return NextResponse.json({ sent });
}
