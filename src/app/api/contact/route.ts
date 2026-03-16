import { NextResponse } from "next/server";

interface ContactPayload {
  name: string;
  email: string;
  message?: string;
  phone?: string;
  company?: string;
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as ContactPayload;

    // Validate required fields
    if (!body.name?.trim() || !body.email?.trim()) {
      return NextResponse.json(
        { error: "Navn og e-post er påkrevd." },
        { status: 400 },
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json(
        { error: "Ugyldig e-postadresse." },
        { status: 400 },
      );
    }

    // TODO: Integrate with Resend or similar email service
    // For now, log the submission (replace with actual email sending)
    console.log("Contact form submission:", {
      name: body.name,
      email: body.email,
      message: body.message ?? "",
      phone: body.phone ?? "",
      company: body.company ?? "",
    });

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json(
      { error: "Noe gikk galt. Prøv igjen senere." },
      { status: 500 },
    );
  }
}
