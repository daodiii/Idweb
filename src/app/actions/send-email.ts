"use server";

import { Resend } from "resend";
import { ContactFormEmail } from "@/lib/emails/contact-form-email";

const resend = new Resend(process.env.RESEND_API_KEY);

export type ContactFormState = {
  success: boolean;
  message: string;
} | null;

export async function sendContactEmail(
  _prev: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // Honeypot — bots fill hidden fields, real users don't
  const honeypot = (formData.get("website") as string)?.trim();
  if (honeypot) {
    // Silently reject — don't reveal it's a bot trap
    return { success: true, message: "Takk for meldingen! Vi tar kontakt innen 24 timer." };
  }

  const name = (formData.get("name") as string)?.trim();
  const email = (formData.get("email") as string)?.trim();
  const phone = (formData.get("phone") as string)?.trim() || undefined;
  const company = (formData.get("company") as string)?.trim() || undefined;
  const message = (formData.get("message") as string)?.trim();

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
    const { error } = await resend.emails.send({
      from: "IDweb Kontakt <kontakt@kontakt.idweb.no>",
      to: [process.env.CONTACT_EMAIL || "hei@idweb.no"],
      replyTo: email,
      subject: `Ny henvendelse fra ${name}`,
      react: ContactFormEmail({ name, email, phone, company, message }),
    });

    if (error) {
      console.error("Resend error:", JSON.stringify(error));
      return {
        success: false,
        message:
          "Noe gikk galt. Vennligst prøv igjen eller send oss en e-post direkte.",
      };
    }

    return {
      success: true,
      message: "Takk for meldingen! Vi tar kontakt innen 24 timer.",
    };
  } catch (err) {
    console.error("Send email failed:", err);
    return {
      success: false,
      message:
        "Noe gikk galt. Vennligst prøv igjen eller send oss en e-post direkte.",
    };
  }
}
