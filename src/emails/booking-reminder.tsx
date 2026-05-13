import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { BUSINESS } from "@/lib/constants";

type Props = {
  customerName: string;
  packageLabel: string;
  scheduledHuman: string;
  serviceAddress: string;
};

export function BookingReminderEmail({
  customerName,
  packageLabel,
  scheduledHuman,
  serviceAddress,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>{`See you tomorrow — KNB Detailing reminder`}</Preview>
      <Body style={{ background: "#f4f6f8", fontFamily: "Inter, system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
          <Heading as="h1" style={{ color: "#0e4d7f", fontWeight: 900, fontSize: 22, letterSpacing: "-0.02em" }}>
            KNB • Detailing
          </Heading>
          <Heading as="h2" style={{ color: "#1a1d21", fontSize: 24, margin: "20px 0 8px" }}>
            See you tomorrow, {customerName}.
          </Heading>
          <Section style={{ background: "#fff", border: "1px solid #e4e7eb", borderRadius: 12, padding: 20, margin: "16px 0" }}>
            <Text style={{ color: "#1a1d21", fontSize: 15, lineHeight: 1.5, margin: 0 }}>
              <strong>{packageLabel}</strong>
              <br />
              {scheduledHuman}
              <br />
              {serviceAddress}
            </Text>
          </Section>
          <Text style={{ color: "#3a414a", fontSize: 14, lineHeight: 1.55 }}>
            We&apos;ll text when we&apos;re on the way. Please move other
            vehicles out of the work area if you can, and let us know about
            gate codes or lift access.
          </Text>
          <Text style={{ color: "#3a414a", fontSize: 14 }}>
            Need to change anything? Call {BUSINESS.phone}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
