"use client";

import { useState } from "react";
import { Copy, Check, Mail, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

export function ReferralShare({
  code,
  siteUrl,
}: {
  code: string;
  siteUrl: string;
}) {
  const referralUrl = `${siteUrl}/?ref=${encodeURIComponent(code)}`;
  const [copied, setCopied] = useState(false);

  async function copy(value: string) {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      toast.success("Copied to clipboard");
      setTimeout(() => setCopied(false), 1500);
    } catch {
      toast.error("Couldn't copy — long-press the input to copy manually.");
    }
  }

  const smsBody = encodeURIComponent(
    `I've been using KNB Detailing for our cars/boat — they're great. Get $25 off your first detail with my code: ${code}. ${referralUrl}`,
  );
  const emailBody = encodeURIComponent(
    `Hey — I've been using KNB Detailing for our cars (and the boat). Highly recommend them.\n\nUse my code ${code} for $25 off your first detail.\n\n${referralUrl}`,
  );

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="ref-code" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Your code
        </label>
        <div className="mt-1 flex gap-2">
          <Input id="ref-code" readOnly value={code} className="font-mono" />
          <Button onClick={() => copy(code)} variant="outline">
            {copied ? <Check className="size-4" aria-hidden /> : <Copy className="size-4" aria-hidden />}
          </Button>
        </div>
      </div>
      <div>
        <label htmlFor="ref-link" className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Share link
        </label>
        <div className="mt-1 flex gap-2">
          <Input id="ref-link" readOnly value={referralUrl} className="text-xs" />
          <Button onClick={() => copy(referralUrl)} variant="outline">
            <Copy className="size-4" aria-hidden />
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 sm:flex-row">
        <Button render={<a href={`sms:?body=${smsBody}`} />}>
          <Phone className="mr-2 size-4" aria-hidden />
          Share via text
        </Button>
        <Button
          variant="outline"
          render={<a href={`mailto:?subject=KNB Detailing&body=${emailBody}`} />}
        >
          <Mail className="mr-2 size-4" aria-hidden />
          Share via email
        </Button>
      </div>
    </div>
  );
}
