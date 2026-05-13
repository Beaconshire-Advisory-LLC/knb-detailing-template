import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { SITE } from "@/lib/constants";

type Props = {
  customerName: string;
  appointmentId: string;
  totalCharged: number;
};

export function ServiceCompleteEmail({
  customerName,
  appointmentId,
  totalCharged,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>Your KNB Detailing service is complete</Preview>
      <Body style={{ background: "#f4f6f8", fontFamily: "Inter, system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
          <Heading as="h1" style={{ color: "#0e4d7f", fontWeight: 900, fontSize: 22 }}>
            KNB • Detailing
          </Heading>
          <Heading as="h2" style={{ color: "#1a1d21", fontSize: 24, margin: "20px 0 8px" }}>
            All clean, {customerName}.
          </Heading>
          <Text style={{ color: "#3a414a", fontSize: 15, lineHeight: 1.55 }}>
            Your detail is done. We took before/after photos — they&apos;re in
            your portal whenever you want to see the difference.
          </Text>
          <Section style={{ background: "#fff", border: "1px solid #e4e7eb", borderRadius: 12, padding: 20, margin: "16px 0" }}>
            <Text style={{ margin: 0, fontSize: 15 }}>
              <strong>Balance charged:</strong> $
              {(totalCharged / 100).toFixed(2)}
            </Text>
          </Section>
          <Text style={{ fontSize: 14 }}>
            <Link href={`${SITE.url}/portal/appointments/${appointmentId}`}>
              See photos &amp; receipt in your portal
            </Link>
          </Text>
          <Text style={{ color: "#3a414a", fontSize: 14, lineHeight: 1.5, marginTop: 16 }}>
            If we did a good job, a quick Google review goes a long way for a
            small family business. Thanks for choosing us.
          </Text>
          <Text style={{ color: "#3a414a", fontSize: 14, fontStyle: "italic" }}>
            — Krista &amp; Benjamin
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
