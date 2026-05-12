import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { LoginForm } from "@/components/portal/login-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Sign in",
  description: "Sign in to your KNB Detailing customer portal.",
  path: "/portal/login",
  noIndex: true,
});

export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col bg-secondary/30">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center px-4 sm:px-6 lg:px-8">
          <Logo />
        </div>
      </header>
      <main className="flex flex-1 items-center justify-center px-4 py-12">
        <div className="w-full max-w-md">
          <div className="text-center">
            <h1 className="text-2xl font-bold tracking-tight">
              Welcome back
            </h1>
            <p className="mt-2 text-sm text-muted-foreground">
              Sign in to your customer portal.
            </p>
          </div>
          <div className="mt-8 rounded-xl border border-border bg-background p-6 shadow-sm">
            <LoginForm mode="login" />
          </div>
          <p className="mt-6 text-center text-sm text-muted-foreground">
            New here?{" "}
            <Link
              href="/portal/signup"
              className="font-medium text-primary hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </main>
    </div>
  );
}
