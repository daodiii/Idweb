import {
  Html,
  Head,
  Preview,
  Body,
  Container,
  Section,
  Text,
  Heading,
  Hr,
} from "@react-email/components";

interface ContactFormEmailProps {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
}

export function ContactFormEmail({
  name,
  email,
  phone,
  company,
  message,
}: ContactFormEmailProps) {
  return (
    <Html lang="nb">
      <Head />
      <Preview>Ny henvendelse fra {name} via idweb.no</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Ny kontakthenvendelse</Heading>
          <Text style={styles.subheading}>
            Sendt fra kontaktskjemaet på idweb.no
          </Text>
          <Hr style={styles.hr} />

          <Section>
            <Text style={styles.label}>Navn</Text>
            <Text style={styles.value}>{name}</Text>
          </Section>

          <Section>
            <Text style={styles.label}>E-post</Text>
            <Text style={styles.value}>{email}</Text>
          </Section>

          {phone && (
            <Section>
              <Text style={styles.label}>Telefon</Text>
              <Text style={styles.value}>{phone}</Text>
            </Section>
          )}

          {company && (
            <Section>
              <Text style={styles.label}>Bedrift</Text>
              <Text style={styles.value}>{company}</Text>
            </Section>
          )}

          <Hr style={styles.hr} />

          <Section>
            <Text style={styles.label}>Melding</Text>
            <Text style={{ ...styles.value, whiteSpace: "pre-wrap" }}>
              {message}
            </Text>
          </Section>

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            Denne e-posten ble sendt automatisk fra kontaktskjemaet på idweb.no.
            Svar direkte til {email}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  },
  container: {
    maxWidth: "520px",
    margin: "0 auto",
    padding: "32px",
    backgroundColor: "#ffffff",
    borderRadius: "12px",
  },
  heading: {
    fontSize: "20px",
    fontWeight: "700" as const,
    color: "#18181b",
    margin: "0 0 4px 0",
  },
  subheading: {
    fontSize: "14px",
    color: "#71717a",
    margin: "0 0 16px 0",
  },
  hr: {
    borderColor: "#e4e4e7",
    margin: "16px 0",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600" as const,
    color: "#18181b",
    margin: "0 0 2px 0",
  },
  value: {
    fontSize: "14px",
    color: "#3f3f46",
    margin: "0 0 12px 0",
  },
  footer: {
    fontSize: "12px",
    color: "#a1a1aa",
    margin: "0",
  },
};
