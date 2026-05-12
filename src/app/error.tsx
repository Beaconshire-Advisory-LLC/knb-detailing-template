"use client";

import Link from "next/link";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("[error.tsx]", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center bg-secondary/30">
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
          Something broke
        </p>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
          That wasn&apos;t supposed to happen.
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          We&apos;ve been notified and we&apos;ll fix it. In the meantime —
          you can try again, or just call us.
        </p>
        {error.digest && (
          <p className="mt-2 font-mono text-xs text-muted-foreground">
            Reference: {error.digest}
          </p>
        )}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button onClick={reset}>Try again</Button>
          <Button variant="outline" render={<Link href="/" />}>
            Back home
          </Button>
        </div>
      </div>
    </div>
  );
}
