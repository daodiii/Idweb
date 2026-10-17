"use server";

import { Resend } from "resend";
import { ContactFormEmail } from "@/lib/emails/contact-form-email";
import { NEED_OPTIONS } from "@/lib/home/contact";
import { QuoteRequestEmail } from "@/lib/emails/quote-request-email";
import { checkQuote, quoteFromForm, quoteRows, type QuoteErrors } from "@/lib/home/quote";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  message: string;
} | null;

const MIN_FILL_TIME_MS = 3000;
const SUCCESS_MESSAGE = "Takk for meldingen! Vi tar kontakt innen 24 timer.";

// Spam phrase patterns common in form-spam (link injection, SEO/casino spam).
// Matches case-insensitively. Reject silently — no need to tell spammers what tripped them.
const SPAM_PATTERNS = [
  /\bhttps?:\/\//i,                      // any URL in name/company fields
  /\b(viagra|cialis|casino|crypto|bitcoin|forex|loan|seo services?)\b/i,
  /\bclick here\b/i,
  /[а-яА-Я]/,                            // Cyrillic in a Norwegian site = spam
  /<\/?[a-z][^>]*>/i,                    // any HTML tags
];

function looksLikeSpam(value: string): boolean {
  return SPAM_PATTERNS.some((re) => re.test(value));
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
  const loadedAtRaw = formData.get("loaded_at") as string | null;
  const loadedAt = loadedAtRaw ? Number.parseInt(loadedAtRaw, 10) : 0;
  if (!loadedAt || Date.now() - loadedAt < MIN_FILL_TIME_MS) {
    // Silently accept — same fake-success response as honeypot
    return { success: true, message: SUCCESS_MESSAGE };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || undefined;
  const company = (formData.get("company") as string)?.trim() || undefined;
  const message = (formData.get("message") as string)?.trim();

  // Spam content checks — silently accept on match
  if (
    looksLikeSpam(name ?? "") ||
    looksLikeSpam(message ?? "") ||
    looksLikeSpam(company ?? "")
  ) {
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
    const { error } = await resend.emails.send({
      from: "IDweb Kontakt <kontakt@kontakt.idweb.no>",
      to: [process.env.CONTACT_EMAIL || "hei@idweb.no"],
      replyTo: email,
      subject: `Ny henvendelse fra ${name}`,
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
  if ((formData.get("fax_number") as string | null)?.trim()) return true;
  const loadedAt = Number.parseInt((formData.get("loaded_at") as string | null) ?? "", 10);
  return !loadedAt || Date.now() - loadedAt < MIN_FILL_TIME_MS;
}

/**
 * The homepage quote request («Få et pristilbud»). The wizard collects what the visitor needs and who to send the
 * offer to; IDweb gets it as one e-mail and replies with a price offer. Same bot and spam handling as the contact
 * form. The website address is left out of the spam check, since an address is exactly what that field asks for.
 */
export async function sendQuoteRequest(
  _prev: QuoteFormState,
  formData: FormData,
): Promise<QuoteFormState> {
  if (looksLikeBot(formData)) return { success: true, message: QUOTE_SUCCESS };

  const quote = quoteFromForm(formData);
  if ([quote.name, quote.company, quote.industry, quote.message].some(looksLikeSpam)) {
    return { success: true, message: QUOTE_SUCCESS };
  }

  const errors = checkQuote(quote);
  const first = Object.values(errors)[0];
  if (first) return { success: false, message: first, errors };

  const rows = quoteRows(quote, { contact: false });
  try {
    const { error } = await resend.emails.send({
      from: "IDweb Kontakt <kontakt@kontakt.idweb.no>",
      to: [process.env.CONTACT_EMAIL || "hei@idweb.no"],
      replyTo: quote.email,
      subject: `Tilbudsforespørsel fra ${quote.company}`,
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
