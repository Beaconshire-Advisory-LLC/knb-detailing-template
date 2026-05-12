"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { getSupabaseServerClient } from "@/lib/supabase/server";
import { SITE } from "@/lib/constants";

export type AuthResult =
  | { ok: true; message: string }
  | { ok: false; message: string };

const emailSchema = z.string().email();

export async function requestMagicLink(
  _prev: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const parsed = emailSchema.safeParse(formData.get("email"));
  if (!parsed.success) {
    return { ok: false, message: "Please enter a valid email address." };
  }
  const supabase = await getSupabaseServerClient();
  const { error } = await supabase.auth.signInWithOtp({
    email: parsed.data,
    options: {
      emailRedirectTo: `${SITE.url}/portal/auth/callback`,
      shouldCreateUser: true,
    },
  });
  if (error) {
    console.error("[auth] magic link failed", error);
    return {
      ok: false,
      message: "Couldn't send the link. Check the email and try again.",
    };
  }
  return {
    ok: true,
    message:
      "Check your email — we sent a sign-in link. It expires in 60 minutes.",
  };
}

export async function signInWithGoogle() {
  const supabase = await getSupabaseServerClient();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "google",
    options: { redirectTo: `${SITE.url}/portal/auth/callback` },
  });
  if (error || !data.url) {
    console.error("[auth] google oauth failed", error);
    redirect("/portal/login?error=oauth");
  }
  redirect(data.url);
}

export async function signOut() {
  const supabase = await getSupabaseServerClient();
  await supabase.auth.signOut();
  redirect("/");
}

export async function updateProfile(
  _prev: AuthResult | null,
  formData: FormData,
): Promise<AuthResult> {
  const supabase = await getSupabaseServerClient();
  const { data: userResult } = await supabase.auth.getUser();
  const user = userResult.user;
  if (!user) return { ok: false, message: "Not signed in." };

  const full_name = (formData.get("full_name") as string | null)?.trim() ?? null;
  const phone = (formData.get("phone") as string | null)?.trim() ?? null;
  const sms_opt_in = formData.get("sms_opt_in") === "on";
  const marketing_opt_in = formData.get("marketing_opt_in") === "on";

  const { error } = await supabase
    .from("profiles")
    .update({
      full_name,
      phone,
      sms_opt_in,
      marketing_opt_in,
    })
    .eq("id", user.id);

  if (error) {
    console.error("[profile] update failed", error);
    return { ok: false, message: "Couldn't save changes — please try again." };
  }
  return { ok: true, message: "Profile saved." };
}
