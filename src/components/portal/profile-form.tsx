"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { updateProfile, type AuthResult } from "@/lib/actions/auth";
import type { Profile } from "@/types/domain";

export function ProfileForm({ profile }: { profile: Profile }) {
  const [state, action, isPending] = useActionState<AuthResult | null, FormData>(
    updateProfile,
    null,
  );

  useEffect(() => {
    if (state?.ok) toast.success(state.message);
    else if (state && !state.ok) toast.error(state.message);
  }, [state]);

  return (
    <form action={action} className="space-y-4">
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" type="email" value={profile.email} disabled />
        <p className="mt-1 text-[11px] text-muted-foreground">
          Email is your sign-in identifier and can&apos;t be changed here.
          Contact us to change it.
        </p>
      </div>
      <div>
        <Label htmlFor="full_name">Name</Label>
        <Input
          id="full_name"
          name="full_name"
          defaultValue={profile.full_name ?? ""}
          autoComplete="name"
        />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          defaultValue={profile.phone ?? ""}
          autoComplete="tel"
        />
      </div>
      <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4">
        <label className="flex items-start gap-3">
          <Checkbox
            name="sms_opt_in"
            defaultChecked={profile.sms_opt_in}
          />
          <span className="text-sm">
            <strong className="font-semibold text-foreground">SMS updates.</strong>{" "}
            Booking confirmations, reminders, &ldquo;on the way&rdquo;
            notifications. Reply STOP to opt out anytime.
          </span>
        </label>
        <label className="flex items-start gap-3">
          <Checkbox
            name="marketing_opt_in"
            defaultChecked={profile.marketing_opt_in}
          />
          <span className="text-sm">
            <strong className="font-semibold text-foreground">
              Promotional emails.
            </strong>{" "}
            Seasonal specials, new services, occasional updates.
          </span>
        </label>
      </div>
      <Button type="submit" disabled={isPending}>
        {isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            Saving…
          </>
        ) : (
          "Save changes"
        )}
      </Button>
    </form>
  );
}
