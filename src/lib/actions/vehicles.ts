"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";

const vehicleSchema = z.object({
  kind: z.enum(["car", "truck", "suv", "boat", "rv", "motorcycle"]),
  size_category: z.enum(["compact", "midsize", "large", "xl", "xxl"]),
  year: z.coerce.number().int().min(1900).max(2030).optional().nullable(),
  make: z.string().max(50).optional().nullable(),
  model: z.string().max(50).optional().nullable(),
  color: z.string().max(30).optional().nullable(),
  vin_or_hin: z.string().max(20).optional().nullable(),
  notes: z.string().max(500).optional().nullable(),
});

export type VehicleResult =
  | { ok: true; id?: string }
  | { ok: false; message: string };

export async function createVehicle(
  _prev: VehicleResult | null,
  formData: FormData,
): Promise<VehicleResult> {
  const supabase = await getSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();
  if (!userResult.user) return { ok: false, message: "Not signed in." };

  const parsed = vehicleSchema.safeParse({
    kind: formData.get("kind"),
    size_category: formData.get("size_category"),
    year: formData.get("year") || null,
    make: formData.get("make") || null,
    model: formData.get("model") || null,
    color: formData.get("color") || null,
    vin_or_hin: formData.get("vin_or_hin") || null,
    notes: formData.get("notes") || null,
  });
  if (!parsed.success) {
    return {
      ok: false,
      message: "Please check the form — some fields are invalid.",
    };
  }
  const data = parsed.data;

  const { data: created, error } = await supabase
    .from("vehicles")
    .insert({
      owner_id: userResult.user.id,
      kind: data.kind,
      size_category: data.size_category,
      year: data.year ?? null,
      make: data.make ?? null,
      model: data.model ?? null,
      color: data.color ?? null,
      vin_or_hin: data.vin_or_hin ?? null,
      notes: data.notes ?? null,
    })
    .select("id")
    .single();

  if (error) {
    console.error("[vehicles] create failed", error);
    return { ok: false, message: "Couldn't save — please try again." };
  }

  revalidatePath("/portal/vehicles");
  revalidatePath("/portal/dashboard");
  redirect(`/portal/vehicles/${created.id}`);
}

export async function deleteVehicle(formData: FormData) {
  const supabase = await getSupabaseServerClient();
  const id = formData.get("id") as string;
  if (!id) return;
  await supabase.from("vehicles").delete().eq("id", id);
  revalidatePath("/portal/vehicles");
}
