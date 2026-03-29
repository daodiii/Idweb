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

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return {
      success: false,
      message: "Vennligst oppgi en gyldig e-postadresse.",
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
        message: `DEBUG: ${error.message || JSON.stringify(error)}`,
      };
    }

    return {
      success: true,
      message: "Takk for meldingen! Vi tar kontakt innen 24 timer.",
    };
  } catch (err) {
    console.error("Send email failed:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return {
      success: false,
      message: `DEBUG CATCH: ${msg}`,
    };
  }
}
