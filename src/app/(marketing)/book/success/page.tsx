import Link from "next/link";
import { CheckCircle2, Calendar, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Booking confirmed",
  description: "",
  path: "/book/success",
  noIndex: true,
});

export default function BookSuccessPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Booking confirmed!
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          Your deposit is paid and your detail is on our schedule. Look for a
          confirmation email and text within the next few minutes.
        </p>
        <Card className="mt-8 text-left">
          <CardContent className="space-y-3 p-6 text-sm">
            <div className="flex items-start gap-2">
              <Mail className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <p>
                <strong>You&apos;ll get an email</strong> with the date, time
                window, and your detail summary.
              </p>
            </div>
            <div className="flex items-start gap-2">
              <Calendar className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden />
              <p>
                <strong>A reminder text</strong> goes out 24 hours before
                service.
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Button render={<Link href="/portal/dashboard" />}>
            Go to portal
          </Button>
          <Button variant="outline" render={<Link href="/" />}>
            Back home
          </Button>
        </div>
      </div>
    </section>
  );
}
