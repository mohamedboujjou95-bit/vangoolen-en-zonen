import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, serviceLabel, urgency, city, address, houseNumber, notes } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mohamedboujjou95@gmail.com"],
      subject: `Nieuwe Boeking: ${serviceLabel} — ${firstName} ${lastName}`,
      html: `
        <h2>Nieuwe Boeking Ontvangen</h2>
        <p><strong>Service:</strong> ${serviceLabel}</p>
        <p><strong>Urgentie:</strong> ${urgency}</p>
        <p><strong>Naam:</strong> ${firstName} ${lastName}</p>
        <p><strong>Telefoon:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Adres:</strong> ${address} ${houseNumber}, ${city}</p>
        ${notes ? `<p><strong>Opmerkingen:</strong> ${notes}</p>` : ""}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
