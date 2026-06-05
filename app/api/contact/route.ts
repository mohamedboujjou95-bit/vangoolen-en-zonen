import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, subject, message } = body;

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, error: "Naam, e-mail en bericht zijn verplicht" },
        { status: 400 }
      );
    }

    // In production: send via Brevo/SendGrid/etc.
    console.log("Contact form submission:", { name, email, phone, subject, message });

    return NextResponse.json({
      success: true,
      message: "Uw bericht is ontvangen. Wij nemen spoedig contact op.",
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Er is een fout opgetreden" },
      { status: 500 }
    );
  }
}
