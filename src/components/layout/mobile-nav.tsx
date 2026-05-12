"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Phone } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BUSINESS, NAV_PRIMARY } from "@/lib/constants";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            variant="ghost"
            size="icon-lg"
            aria-label="Open navigation menu"
            className="md:hidden h-11 w-11"
          />
        }
      >
        <Menu className="size-6" aria-hidden />
      </SheetTrigger>
      <SheetContent side="right" className="w-[88%] max-w-sm p-0">
        <SheetHeader className="px-6 pt-6">
          <SheetTitle className="text-left text-xl font-bold tracking-tight">
            {BUSINESS.shortName}
          </SheetTitle>
        </SheetHeader>
        <nav aria-label="Primary" className="px-3 py-4">
          <ul className="flex flex-col">
            {NAV_PRIMARY.map((item) => (
              <li key={item.href}>
                <SheetClose
                  render={
                    <Link
                      href={item.href}
                      className="block rounded-lg px-3 py-3 text-base font-medium text-foreground hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                    />
                  }
                >
                  {item.label}
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>
        <Separator />
        <div className="flex flex-col gap-3 p-6">
          <Button
            size="lg"
            className="h-12 w-full text-base font-semibold"
            render={<Link href="/book" />}
          >
            Book now
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="h-12 w-full text-base font-semibold"
            render={<a href={`tel:${BUSINESS.phoneE164}`} />}
          >
            <Phone className="mr-2 size-5" aria-hidden />
            {BUSINESS.phone}
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
