import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, serviceLabel, urgency, city, address, houseNumber, notes } = body;

    await supabase.from("boekingen").insert({
      service: serviceLabel,
      urgentie: urgency,
      klant_naam: `${firstName} ${lastName}`,
      klant_telefoon: phone,
      klant_email: email,
      adres: `${address} ${houseNumber}`,
      stad: city,
      opmerkingen: notes,
      status: "nieuw",
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mohamedboujjou95@gmail.com"],
      subject: `🔧 Nieuwe Boeking: ${serviceLabel} — ${firstName} ${lastName}`,
      html: `<h2>Nieuwe Boeking</h2><p><strong>Service:</strong> ${serviceLabel}</p><p><strong>Naam:</strong> ${firstName} ${lastName}</p><p><strong>Telefoon:</strong> ${phone}</p><p><strong>Adres:</strong> ${address} ${houseNumber}, ${city}</p><p><strong>Urgentie:</strong> ${urgency}</p>${notes?`<p><strong>Opmerkingen:</strong> ${notes}</p>`:""}<br><p><a href="https://vangoolen-en-zonen.vercel.app/admin">Open Dispatch Dashboard →</a></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
