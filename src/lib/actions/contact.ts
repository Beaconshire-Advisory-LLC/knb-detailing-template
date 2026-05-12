"use server";

import { contactFormSchema, quoteFormSchema } from "@/lib/validators";
import { getSupabaseAdminClient } from "@/lib/supabase/admin";
import { notifyOwnerLead } from "@/lib/notifications/owner";

export type ActionResult =
  | { ok: true; message: string }
  | { ok: false; errors: Record<string, string[]> };

export async function submitContactForm(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  // Honeypot: real users never fill the hidden "website" field
  if ((formData.get("website") as string | null)?.trim()) {
    return { ok: true, message: "Thanks — we'll be in touch." };
  }

  const parsed = contactFormSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone") ?? "",
    message: formData.get("message"),
    website: formData.get("website") ?? "",
  });
  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    // Phase 3 dev mode — log only. Supabase wires up in Phase 9.
    console.info("[contact] (no DB)", data);
    return { ok: true, message: "Thanks — we'll be in touch shortly." };
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("contact_submissions").insert({
    kind: "contact",
    name: data.name,
    email: data.email,
    phone: data.phone || null,
    message: data.message,
  });

  if (error) {
    console.error("[contact] insert failed", error);
    return {
      ok: false,
      errors: { _form: ["Sorry — something broke on our end. Please call us."] },
    };
  }

  await notifyOwnerLead("contact", data).catch((e) =>
    console.error("[contact] owner notify failed", e),
  );

  return { ok: true, message: "Thanks — we'll be in touch shortly." };
}

export async function submitQuoteForm(
  _prev: ActionResult | null,
  formData: FormData,
): Promise<ActionResult> {
  if ((formData.get("website") as string | null)?.trim()) {
    return { ok: true, message: "Quote received — we'll be in touch." };
  }

  const parsed = quoteFormSchema.safeParse({
    vehicle_type: formData.get("vehicle_type"),
    vehicle_size: formData.get("vehicle_size"),
    condition: formData.get("condition"),
    package_interest: formData.get("package_interest"),
    zip: formData.get("zip"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    notes: formData.get("notes") ?? "",
    website: formData.get("website") ?? "",
  });

  if (!parsed.success) {
    return { ok: false, errors: parsed.error.flatten().fieldErrors };
  }
  const data = parsed.data;

  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    console.info("[quote] (no DB)", data);
    return { ok: true, message: "Quote received — we'll email an estimate shortly." };
  }

  const supabase = getSupabaseAdminClient();
  const { error } = await supabase.from("contact_submissions").insert({
    kind: "quote",
    name: data.name,
    email: data.email,
    phone: data.phone,
    vehicle_type: data.vehicle_type,
    vehicle_size: data.vehicle_size,
    zip: data.zip,
    package_interest: data.package_interest,
    message: data.notes ?? null,
  });

  if (error) {
    console.error("[quote] insert failed", error);
    return {
      ok: false,
      errors: { _form: ["Sorry — something broke on our end. Please call us."] },
    };
  }

  await notifyOwnerLead("quote", data).catch((e) =>
    console.error("[quote] owner notify failed", e),
  );

  return { ok: true, message: "Quote received — we'll email an estimate shortly." };
}
