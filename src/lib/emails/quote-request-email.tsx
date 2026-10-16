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

interface QuoteRequestEmailProps {
  name: string;
  company: string;
  email: string;
  phone?: string;
  /** What the visitor chose in the wizard, as label/value rows (quoteRows in lib/home/quote.ts). */
  rows: [string, string][];
}

/** The e-mail IDweb gets when someone asks for a price offer on the homepage. */
export function QuoteRequestEmail({ name, company, email, phone, rows }: QuoteRequestEmailProps) {
  return (
    <Html lang="nb">
      <Head />
      <Preview>Tilbudsforespørsel fra {company} via idweb.no</Preview>
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Heading style={styles.heading}>Ny tilbudsforespørsel</Heading>
          <Text style={styles.subheading}>Sendt fra «Få et pristilbud» på forsiden av idweb.no</Text>
          <Hr style={styles.hr} />

          {rows.map(([label, value]) => (
            <Section key={label}>
              <Text style={styles.label}>{label}</Text>
              <Text style={{ ...styles.value, whiteSpace: "pre-wrap" }}>{value}</Text>
            </Section>
          ))}

          <Hr style={styles.hr} />

          <Section>
            <Text style={styles.label}>Navn</Text>
            <Text style={styles.value}>{name}</Text>
          </Section>
          <Section>
            <Text style={styles.label}>Bedrift</Text>
            <Text style={styles.value}>{company}</Text>
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

          <Hr style={styles.hr} />
          <Text style={styles.footer}>
            Denne e-posten ble sendt automatisk fra idweb.no. Svar direkte til {email}.
          </Text>
        </Container>
      </Body>
    </Html>
  );
}

const styles = {
  body: {
    backgroundColor: "#f4f4f5",
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
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
