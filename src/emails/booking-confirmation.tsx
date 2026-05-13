import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { BUSINESS, SITE } from "@/lib/constants";

type Props = {
  customerName: string;
  packageLabel: string;
  scheduledHuman: string;
  serviceAddress: string;
  depositCents: number;
  totalCents: number;
  appointmentId: string;
};

export function BookingConfirmationEmail({
  customerName,
  packageLabel,
  scheduledHuman,
  serviceAddress,
  depositCents,
  totalCents,
  appointmentId,
}: Props) {
  const fmt = (c: number) => `$${(c / 100).toFixed(2)}`;
  return (
    <Html>
      <Head />
      <Preview>{`Your KNB Detailing appointment is confirmed for ${scheduledHuman}`}</Preview>
      <Body style={body}>
        <Container style={container}>
          <Section style={brand}>
            <Heading as="h1" style={brandWord}>
              KNB <span style={dot}>•</span> Detailing
            </Heading>
          </Section>

          <Heading as="h2" style={h2}>
            You&apos;re on the schedule, {customerName}!
          </Heading>
          <Text style={p}>
            Thanks for booking with us. Here are your details — keep this
            email for reference.
          </Text>

          <Section style={card}>
            <Row label="Service" value={packageLabel} />
            <Row label="When" value={scheduledHuman} />
            <Row label="Where" value={serviceAddress} />
            <Hr style={hr} />
            <Row label="Deposit paid" value={fmt(depositCents)} />
            <Row label="Total" value={fmt(totalCents)} bold />
          </Section>

          <Text style={p}>
            On the day of service, we&apos;ll text you when we&apos;re on the
            way. The balance ({fmt(totalCents - depositCents)}) is charged to
            your card on file once we finish.
          </Text>

          <Text style={p}>
            Need to reschedule? Free more than 48 hours out — just reply or{" "}
            <Link href={`${SITE.url}/portal/appointments/${appointmentId}`}>
              manage in your portal
            </Link>
            .
          </Text>

          <Hr style={hr} />
          <Text style={footer}>
            {BUSINESS.legalName} · {BUSINESS.address.city}, IN ·{" "}
            <Link href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phone}</Link>
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

function Row({ label, value, bold }: { label: string; value: string; bold?: boolean }) {
  return (
    <table style={{ width: "100%", marginBottom: 8 }} role="presentation">
      <tbody>
        <tr>
          <td style={rowLabel}>{label}</td>
          <td style={{ ...rowValue, fontWeight: bold ? 700 : 500 }}>{value}</td>
        </tr>
      </tbody>
    </table>
  );
}

const body = { background: "#f4f6f8", fontFamily: "Inter, system-ui, sans-serif", margin: 0, padding: 0 } as const;
const container = { maxWidth: 600, margin: "0 auto", padding: 24 } as const;
const brand = { padding: "16px 0" } as const;
const brandWord = { color: "#0e4d7f", fontWeight: 900, fontSize: 22, margin: 0, letterSpacing: "-0.02em" } as const;
const dot = { color: "#1f8fa8" } as const;
const h2 = { color: "#1a1d21", fontSize: 24, margin: "16px 0 8px" } as const;
const p = { color: "#3a414a", fontSize: 15, lineHeight: 1.55, margin: "12px 0" } as const;
const card = { background: "#ffffff", border: "1px solid #e4e7eb", borderRadius: 12, padding: 20, margin: "16px 0" } as const;
const rowLabel = { color: "#5b6573", fontSize: 13, width: "40%", padding: "4px 0" } as const;
const rowValue = { color: "#1a1d21", fontSize: 14, padding: "4px 0", textAlign: "right" as const };
const hr = { borderColor: "#e4e7eb", margin: "16px 0" } as const;
const footer = { color: "#5b6573", fontSize: 12, marginTop: 16 } as const;
