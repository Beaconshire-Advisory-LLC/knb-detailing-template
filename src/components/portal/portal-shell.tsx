"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Car,
  Calendar,
  CreditCard,
  Sparkles,
  Gift,
  User,
  Menu,
  LogOut,
  Plus,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Logo } from "@/components/layout/logo";
import { signOut } from "@/lib/actions/auth";
import { cn } from "@/lib/utils";

const NAV = [
  { href: "/portal/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/portal/vehicles", label: "Vehicles", icon: Car },
  { href: "/portal/appointments", label: "Appointments", icon: Calendar },
  { href: "/portal/membership", label: "Membership", icon: Sparkles },
  { href: "/portal/billing", label: "Billing", icon: CreditCard },
  { href: "/portal/referrals", label: "Refer a friend", icon: Gift },
  { href: "/portal/profile", label: "Profile", icon: User },
];

function NavLinks({
  currentPath,
  onNavigate,
}: {
  currentPath: string;
  onNavigate?: () => void;
}) {
  return (
    <nav aria-label="Customer portal" className="flex flex-col gap-1">
      {NAV.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === currentPath || currentPath.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors",
              active
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:bg-muted hover:text-foreground",
            )}
          >
            <Icon className="size-4" aria-hidden />
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function PortalShell({
  children,
  userEmail,
  userName,
}: {
  children: React.ReactNode;
  userEmail: string;
  userName?: string | null;
}) {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-secondary/20">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background">
        <div className="flex h-14 items-center justify-between px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
              <SheetTrigger
                render={
                  <Button
                    variant="ghost"
                    size="icon-lg"
                    aria-label="Open navigation"
                    className="md:hidden h-11 w-11"
                  />
                }
              >
                <Menu className="size-5" aria-hidden />
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <SheetHeader className="px-4 pt-4">
                  <SheetTitle className="text-left">
                    <Logo />
                  </SheetTitle>
                </SheetHeader>
                <div className="px-3 py-4">
                  <NavLinks
                    currentPath={pathname}
                    onNavigate={() => setSheetOpen(false)}
                  />
                </div>
              </SheetContent>
            </Sheet>
            <Logo />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm" render={<Link href="/portal/book" />}>
              <Plus className="mr-1.5 size-4" aria-hidden />
              Book service
            </Button>
            <div className="hidden flex-col items-end sm:flex">
              <span className="text-xs font-medium text-foreground">
                {userName ?? "Welcome"}
              </span>
              <span className="text-[11px] text-muted-foreground">
                {userEmail}
              </span>
            </div>
            <form action={signOut}>
              <Button
                type="submit"
                variant="ghost"
                size="icon-lg"
                aria-label="Sign out"
                className="h-10 w-10"
              >
                <LogOut className="size-4" aria-hidden />
              </Button>
            </form>
          </div>
        </div>
      </header>

      <div className="mx-auto flex w-full max-w-7xl flex-1 gap-8 px-4 py-6 sm:px-6 lg:px-8">
        {/* Sidebar (desktop) */}
        <aside className="hidden w-56 shrink-0 md:block">
          <NavLinks currentPath={pathname} />
        </aside>
        {/* Main */}
        <main className="min-w-0 flex-1">{children}</main>
      </div>
    </div>
  );
}
