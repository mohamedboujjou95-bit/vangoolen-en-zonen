import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, city, diploma, experience, motivation } = body;

    await supabase.from("partners").insert({
      naam: `${firstName} ${lastName}`,
      email,
      telefoon: phone,
      stad: city,
      diploma,
      beschikbaar: false,
      actief: false,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mohamedboujjou95@gmail.com"],
      subject: `👷 Nieuwe Partner Aanmelding: ${firstName} ${lastName} — ${city}`,
      html: `<h2>Nieuwe Gilde-Partner Aanmelding</h2><p><strong>Naam:</strong> ${firstName} ${lastName}</p><p><strong>Telefoon:</strong> ${phone}</p><p><strong>Email:</strong> ${email}</p><p><strong>Stad:</strong> ${city}</p><p><strong>Diploma:</strong> ${diploma}</p><p><strong>Ervaring:</strong> ${experience||"Niet opgegeven"}</p>${motivation?`<p><strong>Motivatie:</strong> ${motivation}</p>`:""}<br><p><a href="https://vangoolen-en-zonen.vercel.app/admin">Open Dispatch Dashboard →</a></p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
