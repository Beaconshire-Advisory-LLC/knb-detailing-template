"use client";

import { useActionState, useEffect } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactForm, type ActionResult } from "@/lib/actions/contact";

const initial: ActionResult | null = null;

export function ContactForm() {
  const [state, formAction, isPending] = useActionState(
    submitContactForm,
    initial,
  );

  useEffect(() => {
    if (state?.ok) toast.success(state.message);
    else if (state && "errors" in state && state.errors._form) {
      toast.error(state.errors._form[0]);
    }
  }, [state]);

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-6 text-sm">
        <p className="font-semibold">Got it.</p>
        <p className="mt-2 text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  const fieldErrors = state && !state.ok ? state.errors : {};

  return (
    <form action={formAction} className="space-y-4" noValidate>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Krista Hohman"
            aria-invalid={!!fieldErrors.name}
            aria-describedby={fieldErrors.name ? "name-err" : undefined}
          />
          {fieldErrors.name && (
            <p id="name-err" className="mt-1 text-xs text-destructive">
              {fieldErrors.name[0]}
            </p>
          )}
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            aria-invalid={!!fieldErrors.email}
            aria-describedby={fieldErrors.email ? "email-err" : undefined}
          />
          {fieldErrors.email && (
            <p id="email-err" className="mt-1 text-xs text-destructive">
              {fieldErrors.email[0]}
            </p>
          )}
        </div>
      </div>
      <div>
        <Label htmlFor="phone">Phone (optional)</Label>
        <Input
          id="phone"
          name="phone"
          type="tel"
          inputMode="tel"
          autoComplete="tel"
          placeholder="(574) 265-7278"
          aria-invalid={!!fieldErrors.phone}
        />
      </div>
      <div>
        <Label htmlFor="message">What can we help with?</Label>
        <Textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Tell us about your vehicle and what you're hoping for. Lake-side jobs especially — note the dock or lift."
          aria-invalid={!!fieldErrors.message}
          aria-describedby={fieldErrors.message ? "msg-err" : undefined}
        />
        {fieldErrors.message && (
          <p id="msg-err" className="mt-1 text-xs text-destructive">
            {fieldErrors.message[0]}
          </p>
        )}
      </div>
      {/* Honeypot — visually hidden, tab-skipped */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="sr-only"
        aria-hidden="true"
      />
      <Button type="submit" disabled={isPending} className="w-full sm:w-auto">
        {isPending ? (
          <>
            <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
            Sending…
          </>
        ) : (
          "Send message"
        )}
      </Button>
      <p className="text-xs text-muted-foreground">
        We respond same-day during business hours, next business day otherwise.
      </p>
    </form>
  );
}
