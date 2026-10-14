"use server";

import { Resend } from "resend";
import { ContactFormEmail } from "@/lib/emails/contact-form-email";

export type ContactFormState = {
  success: boolean;
  message: string;
} | null;

const MIN_FILL_TIME_MS = 3000;
const SUCCESS_MESSAGE = "Takk for meldingen! Vi tar kontakt innen 24 timer.";
const ERROR_MESSAGE =
  "Noe gikk galt. Vennligst prøv igjen eller send oss en e-post direkte.";

// Link/markup injection in the name field is never a real enquiry —
// reject silently, no need to tell spammers what tripped them.
const NAME_FIELD_SPAM = [
  /\bhttps?:\/\//i,                      // URL in the name field
  /<\/?[a-z][^>]*>/i,                    // HTML tags
];

// Typical spam signals that a real prospect can still trigger (a message
// linking their current site, an English "SEO services" request, a
// Ukrainian-speaking client). These are delivered with a subject prefix
// instead of being dropped, so no genuine lead is lost.
const SPAM_SIGNALS = [
  /\b(viagra|cialis|casino|crypto|bitcoin|forex|loan|seo services?)\b/i,
  /\bclick here\b/i,
  /[а-яА-Я]/,                            // Cyrillic
  /<\/?[a-z][^>]*>/i,                    // HTML tags
];

function matchesAny(patterns: RegExp[], value: string): boolean {
  return patterns.some((re) => re.test(value));
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

  // Obvious bot payload in the name field — silently accept on match
  if (matchesAny(NAME_FIELD_SPAM, name ?? "")) {
    return { success: true, message: SUCCESS_MESSAGE };
  }

  // Softer signals are delivered but flagged, never dropped. A URL in the
  // company field is suspicious but may be a prospect's own website.
  const possibleSpam =
    matchesAny(SPAM_SIGNALS, `${name ?? ""}\n${company ?? ""}\n${message ?? ""}`) ||
    /\bhttps?:\/\//i.test(company ?? "");

  if (!name || !email || !message) {
    return {
      success: false,
      message: "Vennligst fyll ut alle obligatoriske felt.",
    };
  }

  if (name.length > 100) {
    return { success: false, message: "Navnet er for langt." };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) || email.length > 254) {
    return {
      success: false,
      message: "Vennligst oppgi en gyldig e-postadresse.",
    };
  }

  if (phone && !/^[\d\s\-+()]{5,20}$/.test(phone)) {
    return { success: false, message: "Vennligst oppgi et gyldig telefonnummer." };
  }

  if (company && company.length > 100) {
    return { success: false, message: "Bedriftsnavn er for langt." };
  }

  if (message.length < 10 || message.length > 5000) {
    return {
      success: false,
      message: "Meldingen må være mellom 10 og 5000 tegn.",
    };
  }

  try {
    // Created per request so a missing key surfaces as a handled error
    // (visitor sees the error message) instead of crashing the action.
    const resend = new Resend(process.env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: "IDweb Kontakt <kontakt@kontakt.idweb.no>",
      to: [process.env.CONTACT_EMAIL || "hei@idweb.no"],
      replyTo: email,
      subject: `${possibleSpam ? "[Mulig spam] " : ""}Ny henvendelse fra ${name}`,
      react: ContactFormEmail({ name, email, phone, company, message }),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return { success: false, message: ERROR_MESSAGE };
    }

    return { success: true, message: SUCCESS_MESSAGE };
  } catch (err) {
    console.error("Send email failed:", err);
    return { success: false, message: ERROR_MESSAGE };
  }
}
