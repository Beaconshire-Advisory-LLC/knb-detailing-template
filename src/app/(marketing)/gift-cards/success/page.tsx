import Link from "next/link";
import { Gift, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Gift card sent",
  description: "",
  path: "/gift-cards/success",
  noIndex: true,
});

export default function GiftSuccessPage() {
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
        <CheckCircle2 className="mx-auto size-12 text-primary" aria-hidden />
        <h1 className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl">
          Gift card on its way!
        </h1>
        <p className="mt-4 text-pretty text-muted-foreground">
          We&apos;ve emailed the recipient their unique redemption code, plus
          you&apos;ll get a receipt for your records.
        </p>
        <Card className="mt-8">
          <CardContent className="p-6 text-left text-sm">
            <Gift className="size-6 text-primary" aria-hidden />
            <p className="mt-3">
              Codes never expire on amounts of $50 or more, and they can be
              redeemed against any of our services.
            </p>
          </CardContent>
        </Card>
        <div className="mt-8">
          <Button render={<Link href="/" />}>Back home</Button>
        </div>
      </div>
    </section>
  );
}
