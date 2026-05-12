"use client";

import { useActionState } from "react";
import { Loader2, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  requestMagicLink,
  signInWithGoogle,
  type AuthResult,
} from "@/lib/actions/auth";
import { GoogleIcon } from "@/components/icons/social";

export function LoginForm({ mode = "login" }: { mode?: "login" | "signup" }) {
  const [state, formAction, isPending] = useActionState<AuthResult | null, FormData>(
    requestMagicLink,
    null,
  );

  if (state?.ok) {
    return (
      <div className="rounded-xl border border-primary/30 bg-primary/5 p-8 text-center">
        <Mail className="mx-auto size-10 text-primary" aria-hidden />
        <p className="mt-4 text-lg font-bold">Check your email.</p>
        <p className="mt-2 text-sm text-muted-foreground">{state.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <form action={signInWithGoogle}>
        <Button
          type="submit"
          variant="outline"
          className="h-11 w-full text-base font-medium"
        >
          <GoogleIcon className="mr-2 size-5" />
          Continue with Google
        </Button>
      </form>

      <div className="relative">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-2 text-muted-foreground">or</span>
        </div>
      </div>

      <form action={formAction} className="space-y-4">
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="h-11"
          />
        </div>
        {state && !state.ok && (
          <p className="text-xs text-destructive">{state.message}</p>
        )}
        <Button
          type="submit"
          disabled={isPending}
          className="h-11 w-full text-base font-semibold"
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" aria-hidden />
              Sending link…
            </>
          ) : (
            <>
              {mode === "signup" ? "Send sign-up link" : "Send sign-in link"}
            </>
          )}
        </Button>
      </form>

      <p className="text-center text-xs text-muted-foreground">
        We&apos;ll email you a single-use link — no password to remember.
      </p>
    </div>
  );
}
