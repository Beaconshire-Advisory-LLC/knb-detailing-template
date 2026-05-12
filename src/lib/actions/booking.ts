"use server";

import { bookingDraftSchema } from "@/lib/validators";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { notifyOwnerLead } from "@/lib/notifications/owner";

export type BookingResult =
  | { ok: true; appointmentId?: string; message: string }
  | { ok: false; errors: Record<string, string[]> };

export async function submitBooking(
  _prev: BookingResult | null,
  formData: FormData,
): Promise<BookingResult> {
  // Build a structured draft from the flat form data
  const draft = {
    package_id:
      (formData.get("package_id") as string | null) ??
      "00000000-0000-0000-0000-000000000000",
    vehicle: {
      kind: formData.get("vehicle_kind") as string,
      size_category: formData.get("vehicle_size") as string,
      year: formData.get("vehicle_year") || undefined,
      make: (formData.get("vehicle_make") as string) || undefined,
      model: (formData.get("vehicle_model") as string) || undefined,
      color: (formData.get("vehicle_color") as string) || undefined,
      notes: (formData.get("vehicle_notes") as string) || undefined,
    },
    scheduled_start: formData.get("scheduled_start") as string,
    service_address: formData.get("service_address") as string,
    service_city: (formData.get("service_city") as string) || undefined,
    service_zip: formData.get("service_zip") as string,
    customer: {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      sms_opt_in: formData.get("sms_opt_in") === "on",
    },
    notes: (formData.get("notes") as string) || undefined,
  };

  // Validate everything except the requirement of a real UUID for package_id
  // (booking flow can use a slug pre-launch; Phase 6 maps slug → UUID after
  // Stripe products are provisioned).
  // For Phase 3, package_id can be a package slug (e.g., 'auto-full-pkg').
  // Phase 6 will resolve slug → UUID via Supabase before insert.
  const parsed = bookingDraftSchema
    .omit({ package_id: true })
    .extend({ package_id: bookingDraftSchema.shape.package_id.optional() })
    .safeParse(draft);

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }

  // Phase 3: log + notify only. Phase 6 will:
  //   1. Look up service prices, compute total
  //   2. Create Stripe Checkout session (deposit)
  //   3. Return the checkout URL for client-side redirect
  //   4. Insert appointment row on webhook completion
  console.info("[booking] (Phase 6 will create Stripe session)", draft);
  await notifyOwnerLead("booking", draft as unknown as Record<string, unknown>);

  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    const supabase = getSupabaseAdminClient();
    await supabase.from("contact_submissions").insert({
      kind: "quote",
      name: draft.customer.name,
      email: draft.customer.email,
      phone: draft.customer.phone,
      zip: draft.service_zip,
      vehicle_type: draft.vehicle.kind,
      vehicle_size: draft.vehicle.size_category,
      package_interest: draft.package_id,
      message: `BOOKING REQUEST\nAddress: ${draft.service_address}\nWhen: ${draft.scheduled_start}\nNotes: ${draft.notes ?? ""}`,
    });
  }

  return {
    ok: true,
    message:
      "Booking request received. We'll text and email a confirmation plus a deposit payment link within the hour.",
  };
}
