"use server";

import { revalidatePath } from "next/cache";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

async function requireAdmin() {
  const supabase = await getSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();
  if (!userResult.user) return null;
  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", userResult.user.id)
    .maybeSingle();
  if (!profile || (profile.role !== "admin" && profile.role !== "staff")) {
    return null;
  }
  return { supabase, user: userResult.user };
}

const STATUS = ["pending", "confirmed", "in_progress", "completed", "cancelled", "no_show"] as const;

export async function updateAppointmentStatus(formData: FormData) {
  const ctx = await requireAdmin();
  if (!ctx) return;
  const id = formData.get("id") as string;
  const status = formData.get("status") as (typeof STATUS)[number];
  if (!STATUS.includes(status)) return;
  await ctx.supabase
    .from("appointments")
    .update({ status })
    .eq("id", id);
  revalidatePath("/admin/appointments");
  revalidatePath(`/admin/appointments/${id}`);
}

export async function addAppointmentNote(formData: FormData) {
  const ctx = await requireAdmin();
  if (!ctx) return;
  const id = formData.get("id") as string;
  const note = formData.get("internal_notes") as string;
  await ctx.supabase
    .from("appointments")
    .update({ internal_notes: note })
    .eq("id", id);
  revalidatePath(`/admin/appointments/${id}`);
}

/* Service catalog CRUD */

const serviceSchema = z.object({
  slug: z.string().min(2).max(60),
  name: z.string().min(2).max(80),
  category: z.enum(["auto", "boat", "rv", "motorcycle", "ceramic", "correction", "add_on"]),
  short_description: z.string().max(200).optional(),
  long_description: z.string().max(1000).optional(),
  base_duration_min: z.coerce.number().int().min(15).max(720),
  sort_order: z.coerce.number().int().min(0).max(999).default(0),
});

export async function upsertService(formData: FormData) {
  const ctx = await requireAdmin();
  if (!ctx) return;
  const id = formData.get("id") as string | null;
  const parsed = serviceSchema.safeParse({
    slug: formData.get("slug"),
    name: formData.get("name"),
    category: formData.get("category"),
    short_description: formData.get("short_description") || undefined,
    long_description: formData.get("long_description") || undefined,
    base_duration_min: formData.get("base_duration_min"),
    sort_order: formData.get("sort_order") || 0,
  });
  if (!parsed.success) return;
  if (id) {
    await ctx.supabase
      .from("services")
      .update(parsed.data)
      .eq("id", id);
  } else {
    await ctx.supabase.from("services").insert(parsed.data);
  }
  revalidatePath("/admin/services");
}

export async function deleteService(formData: FormData) {
  const ctx = await requireAdmin();
  if (!ctx) return;
  const id = formData.get("id") as string;
  await ctx.supabase.from("services").delete().eq("id", id);
  revalidatePath("/admin/services");
}

/* Reviews moderation */

export async function approveReview(formData: FormData) {
  const ctx = await requireAdmin();
  if (!ctx) return;
  const id = formData.get("id") as string;
  const featured = formData.get("featured") === "true";
  await ctx.supabase
    .from("reviews")
    .update({ approved: true, featured })
    .eq("id", id);
  revalidatePath("/admin/reviews");
}

export async function rejectReview(formData: FormData) {
  const ctx = await requireAdmin();
  if (!ctx) return;
  const id = formData.get("id") as string;
  await ctx.supabase.from("reviews").delete().eq("id", id);
  revalidatePath("/admin/reviews");
}

/* Coupons CRUD */

const couponSchema = z.object({
  code: z.string().min(3).max(20).regex(/^[A-Z0-9-]+$/i),
  description: z.string().max(200).optional(),
  discount_type: z.enum(["pct", "fixed"]),
  discount_value: z.coerce.number().int().positive(),
  max_uses: z.coerce.number().int().positive().optional().or(z.literal("")),
  expires_at: z.string().optional().or(z.literal("")),
  active: z.boolean().optional(),
});

export async function upsertCoupon(formData: FormData) {
  const ctx = await requireAdmin();
  if (!ctx) return;
  const id = formData.get("id") as string | null;
  const parsed = couponSchema.safeParse({
    code: formData.get("code"),
    description: formData.get("description") || undefined,
    discount_type: formData.get("discount_type"),
    discount_value: formData.get("discount_value"),
    max_uses: formData.get("max_uses") || "",
    expires_at: formData.get("expires_at") || "",
    active: formData.get("active") === "on",
  });
  if (!parsed.success) return;
  const payload = {
    code: parsed.data.code.toUpperCase(),
    description: parsed.data.description ?? null,
    discount_type: parsed.data.discount_type,
    discount_value: parsed.data.discount_value,
    max_uses:
      typeof parsed.data.max_uses === "number" && parsed.data.max_uses > 0
        ? parsed.data.max_uses
        : null,
    expires_at:
      parsed.data.expires_at && parsed.data.expires_at !== ""
        ? new Date(parsed.data.expires_at).toISOString()
        : null,
    active: parsed.data.active ?? true,
  };
  if (id) {
    await ctx.supabase.from("coupons").update(payload).eq("id", id);
  } else {
    await ctx.supabase.from("coupons").insert(payload);
  }
  revalidatePath("/admin/coupons");
}

export async function deleteCoupon(formData: FormData) {
  const ctx = await requireAdmin();
  if (!ctx) return;
  const id = formData.get("id") as string;
  await ctx.supabase.from("coupons").delete().eq("id", id);
  revalidatePath("/admin/coupons");
}

/* Photo upload for an appointment (records DB row; bytes go to Supabase Storage from the client) */

export async function recordServicePhoto(formData: FormData) {
  const ctx = await requireAdmin();
  if (!ctx) return;
  const appointment_id = formData.get("appointment_id") as string;
  const vehicle_id = formData.get("vehicle_id") as string;
  const storage_path = formData.get("storage_path") as string;
  const caption = (formData.get("caption") as string | null) ?? null;
  const is_before = formData.get("is_before") === "on";
  const is_after = formData.get("is_after") === "on";
  const display_on_public_gallery =
    formData.get("display_on_public_gallery") === "on";
  await ctx.supabase.from("service_photos").insert({
    appointment_id,
    vehicle_id,
    storage_path,
    caption,
    is_before,
    is_after,
    display_on_public_gallery,
  });
  revalidatePath(`/admin/appointments/${appointment_id}`);
}
