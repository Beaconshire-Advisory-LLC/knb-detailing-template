import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut } from "@/lib/actions/auth";
import { getCurrentProfile } from "@/lib/supabase/server";
import { ProfileForm } from "@/components/portal/profile-form";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Profile",
  description: "",
  path: "/portal/profile",
  noIndex: true,
});

export default async function ProfilePage() {
  const profile = await getCurrentProfile();
  if (!profile) return null;

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your name, contact, and communication preferences.
        </p>
      </header>

      <Card>
        <CardContent className="p-6">
          <ProfileForm profile={profile} />
        </CardContent>
      </Card>

      <Card className="border-destructive/30">
        <CardContent className="flex flex-col items-start gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">Sign out</p>
            <p className="text-xs text-muted-foreground">
              Signs you out on this device.
            </p>
          </div>
          <form action={signOut}>
            <Button type="submit" variant="outline">
              Sign out
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
