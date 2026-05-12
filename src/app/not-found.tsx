import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-1 items-center justify-center bg-secondary/30">
        <div className="mx-auto max-w-xl px-4 py-20 text-center sm:px-6">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            404
          </p>
          <h1 className="mt-3 text-4xl font-extrabold tracking-tight sm:text-5xl">
            We can&apos;t find that page.
          </h1>
          <p className="mt-4 text-pretty text-muted-foreground">
            Maybe it moved, maybe it never existed. Either way — let&apos;s get
            you back on the road.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button render={<Link href="/" />}>Back home</Button>
            <Button variant="outline" render={<Link href="/services" />}>
              See services
            </Button>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
