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

type Props = {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  packageLabel: string;
  scheduledHuman: string;
  serviceAddress: string;
  totalCents: number;
  zip: string;
};

export function OwnerNewBookingEmail({
  customerName,
  customerEmail,
  customerPhone,
  packageLabel,
  scheduledHuman,
  serviceAddress,
  totalCents,
  zip,
}: Props) {
  return (
    <Html>
      <Head />
      <Preview>{`New booking from ${customerName}`}</Preview>
      <Body style={{ background: "#f4f6f8", fontFamily: "Inter, system-ui, sans-serif", margin: 0 }}>
        <Container style={{ maxWidth: 600, margin: "0 auto", padding: 24 }}>
          <Heading as="h2" style={{ color: "#1a1d21", margin: "0 0 16px" }}>
            New booking request 🎉
          </Heading>
          <Section style={{ background: "#fff", border: "1px solid #e4e7eb", borderRadius: 12, padding: 20 }}>
            <Text style={{ margin: "0 0 8px", fontSize: 14 }}>
              <strong>Customer:</strong> {customerName} ({customerEmail},{" "}
              {customerPhone})
            </Text>
            <Text style={{ margin: "0 0 8px", fontSize: 14 }}>
              <strong>Service:</strong> {packageLabel}
            </Text>
            <Text style={{ margin: "0 0 8px", fontSize: 14 }}>
              <strong>When:</strong> {scheduledHuman}
            </Text>
            <Text style={{ margin: "0 0 8px", fontSize: 14 }}>
              <strong>Where:</strong> {serviceAddress} (ZIP {zip})
            </Text>
            <Text style={{ margin: 0, fontSize: 14 }}>
              <strong>Total:</strong> ${(totalCents / 100).toFixed(2)}
            </Text>
          </Section>
          <Text style={{ color: "#5b6573", fontSize: 12, marginTop: 16 }}>
            Confirm in /admin/appointments.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}
