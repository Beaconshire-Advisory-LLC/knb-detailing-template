import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BUSINESS, SITE } from "@/lib/constants";

export default function AdminSettingsPage() {
  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Business information that drives the public site. Currently
          source-controlled — edit <code>src/lib/constants.ts</code> and
          deploy.
        </p>
      </header>

      <Card>
        <CardContent className="space-y-4 p-6 text-sm">
          <Row label="Legal name" value={BUSINESS.legalName} />
          <Row label="Short name" value={BUSINESS.shortName} />
          <Row label="Tagline" value={BUSINESS.tagline} />
          <Row label="Phone" value={BUSINESS.phone} />
          <Row
            label="Email"
            value={BUSINESS.email}
            flag={BUSINESS.email.includes("OWNER_CONFIRM")}
          />
          <Row
            label="Address"
            value={`${BUSINESS.address.street}, ${BUSINESS.address.city}, ${BUSINESS.address.state} ${BUSINESS.address.zip}`}
          />
          <Row label="Site URL" value={SITE.url} />
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold">Service ZIPs &amp; travel fees</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Service-area ZIPs are stored in the <code>service_zips</code>{" "}
            table. Inline ZIP CRUD is a Phase 5b enhancement — edit in
            Supabase Studio or via SQL.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-6">
          <h2 className="text-lg font-bold">Communications</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Email sender: configured by <code>RESEND_FROM_EMAIL</code> env var.
            SMS sender: <code>TWILIO_PHONE_NUMBER</code>. Owner notification
            inbox: <code>OWNER_NOTIFICATION_EMAIL</code>.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

function Row({
  label,
  value,
  flag,
}: {
  label: string;
  value: string;
  flag?: boolean;
}) {
  return (
    <div className="grid grid-cols-3 gap-3 border-b border-border pb-3 last:border-b-0 last:pb-0">
      <p className="font-semibold text-muted-foreground">{label}</p>
      <p className="col-span-2 break-all">
        {value}
        {flag && (
          <Badge className="ml-2 bg-amber-100 text-amber-900 hover:bg-amber-100">
            owner confirm
          </Badge>
        )}
      </p>
    </div>
  );
}
