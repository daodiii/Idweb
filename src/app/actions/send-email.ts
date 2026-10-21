"use server";

import { Resend } from "resend";
import { ContactFormEmail } from "@/lib/emails/contact-form-email";
import { NEED_OPTIONS } from "@/lib/home/contact";
import { QuoteRequestEmail } from "@/lib/emails/quote-request-email";
import { checkQuote, quoteFromForm, quoteRows, type QuoteErrors } from "@/lib/home/quote";
import { withinRateLimit } from "@/lib/rate-limit";

export type ContactFormState = {
  success: boolean;
  message: string;
} | null;

const MIN_FILL_TIME_MS = 3000;
const SUCCESS_MESSAGE = "Takk for meldingen! Vi tar kontakt innen 24 timer.";
const RATE_LIMITED =
  "Du har sendt flere meldinger på kort tid. Vent litt og prøv igjen, eller send oss en e-post på hei@idweb.no.";

/**
 * Sent faster than a person could fill in the form. A missing timestamp is not proof of a bot: the homepage form
 * can be sent before the page's script has set it (slow connection, script blocked), so that is let through.
 */
function tooFast(formData: FormData): boolean {
  const loadedAt = Number.parseInt((formData.get("loaded_at") as string | null) ?? "", 10);
  return loadedAt > 0 && Date.now() - loadedAt < MIN_FILL_TIME_MS;
}

// Only obvious bot payloads in the name field are silently discarded.
const NAME_FIELD_SPAM = [/\bhttps?:\/\//i, /<\/?[a-z][^>]*>/i];

// These can occur in real enquiries. Deliver them with a subject prefix.
const SPAM_SIGNALS = [
  /\b(viagra|cialis|casino|crypto|bitcoin|forex|loan|seo services?)\b/i,
  /\bclick here\b/i,
  /[а-яА-Я]/,                            // Cyrillic
  /<\/?[a-z][^>]*>/i,                    // any HTML tags
];

function possibleSpam(company: string, ...values: string[]): boolean {
  return /\bhttps?:\/\//i.test(company) ||
    SPAM_SIGNALS.some((re) => re.test([company, ...values].join("\n")));
}

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — bots fill hidden fields, real users don't
  const honeypot = (formData.get("fax_number") as string)?.trim();
  if (honeypot) {
    // Silently pretend success — don't reveal it's a bot trap
    return { success: true, message: SUCCESS_MESSAGE };
  }

  // Timing check — bots fill and submit in milliseconds
  if (tooFast(formData)) {
    // Silently accept — same fake-success response as honeypot
    return { success: true, message: SUCCESS_MESSAGE };
  }

  if (!(await withinRateLimit())) return { success: false, message: RATE_LIMITED };

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || undefined;
  const company = (formData.get("company") as string)?.trim() || undefined;
  const message = (formData.get("message") as string)?.trim();

  if (NAME_FIELD_SPAM.some((re) => re.test(name ?? ""))) {
    return { success: true, message: SUCCESS_MESSAGE };
  }

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Fyll ut navn, e-post og hva dere trenger.",
    };
  }

  if (name.length > 100) {
    return { success: false, message: "Navnet er for langt." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return {
      success: false,
      message: "Sjekk e-postadressen. Den ser ikke riktig ut.",
    };
  }

  if (phone && !/^[\d\s\-+()]{5,20}$/.test(phone)) {
    return { success: false, message: "Sjekk telefonnummeret. Det ser ikke riktig ut." };
  }

  if (company && company.length > 100) {
    return { success: false, message: "Bedriftsnavn er for langt." };
  }

  if (message.length < 2 || message.length > 5000) {
    return {
      success: false,
      message: "Skriv noen ord om hva dere trenger (maks 5000 tegn).",
    };
  }

  // Optional "Hva trenger du?" choices from the homepage form; only known values are kept.
  const needs = formData
    .getAll("needs")
    .filter((v): v is string => typeof v === "string" && NEED_OPTIONS.includes(v));
  const body = needs.length ? `Trenger: ${needs.join(", ")}\n\n${message}` : message;

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "IDweb Kontakt <kontakt@kontakt.idweb.no>",
      to: [process.env.CONTACT_EMAIL || "hei@idweb.no"],
      replyTo: email,
      subject: `${possibleSpam(company ?? "", name, message) ? "[Mulig spam] " : ""}Ny henvendelse fra ${name}`,
      react: ContactFormEmail({ name, email, phone, company, message: body }),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return {
        success: false,
        message:
          "Det gikk ikke å sende. Prøv igjen, eller send oss en e-post på hei@idweb.no.",
      };
    }

    return { success: true, message: SUCCESS_MESSAGE };
  } catch (err) {
    console.error("Send email failed:", err);
    return {
      success: false,
      message:
        "Det gikk ikke å sende. Prøv igjen, eller send oss en e-post på hei@idweb.no.",
    };
  }
}

export type QuoteFormState = {
  success: boolean;
  message: string;
  errors?: QuoteErrors;
} | null;

const QUOTE_SUCCESS = "Takk! Vi tar kontakt innen 24 timer.";

/** Honeypot filled in, or sent faster than a person could: answer as if it went through. */
function looksLikeBot(formData: FormData): boolean {
  return !!(formData.get("fax_number") as string | null)?.trim() || tooFast(formData);
}

/**
 * The homepage quote request («Få et pristilbud»). The wizard collects what the visitor needs and who to send the
 * offer to; IDweb gets it as one e-mail and replies with a price offer. Same bot and spam handling as the contact
 * form. Website links in the request are allowed; softer spam signals only flag the e-mail subject.
 */
export async function sendQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  if (looksLikeBot(formData)) return { success: true, message: QUOTE_SUCCESS };
  if (!(await withinRateLimit())) return { success: false, message: RATE_LIMITED };

  const quote = quoteFromForm(formData);
  if (NAME_FIELD_SPAM.some((re) => re.test(quote.name))) {
    return { success: true, message: QUOTE_SUCCESS };
  }

  const errors = checkQuote(quote);
  const first = Object.values(errors)[0];
  if (first) return { success: false, message: first, errors };

  const rows = quoteRows(quote, { contact: false });
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "IDweb Kontakt <kontakt@kontakt.idweb.no>",
      to: [process.env.CONTACT_EMAIL || "hei@idweb.no"],
      replyTo: quote.email,
      subject: `${possibleSpam(quote.company, quote.name, quote.industry, quote.message) ? "[Mulig spam] " : ""}Tilbudsforespørsel fra ${quote.company}`,
      react: QuoteRequestEmail({
        name: quote.name,
        company: quote.company,
        email: quote.email,
        phone: quote.phone || undefined,
        rows,
      }),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return {
        success: false,
        message: "Det gikk ikke å sende. Prøv igjen, eller send oss en e-post på hei@idweb.no.",
      };
    }
    return { success: true, message: QUOTE_SUCCESS };
  } catch (err) {
    console.error("Send quote request failed:", err);
    return {
      success: false,
      message: "Det gikk ikke å sende. Prøv igjen, eller send oss en e-post på hei@idweb.no.",
    };
  }
}
