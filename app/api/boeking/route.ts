import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { firstName, lastName, phone, email, serviceLabel, urgency, city, address, houseNumber, notes } = body;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
  const supabaseKey = process.env.SUPABASE_SERVICE_KEY!;
  
  console.log("URL:", supabaseUrl ? "SET" : "MISSING");
  console.log("KEY:", supabaseKey ? supabaseKey.substring(0,10) : "MISSING");

  const supabase = createClient(supabaseUrl, supabaseKey);

  // Stap 1: sla boeking op
  const boekingResult = await supabase.from("boekingen").insert({
    service: serviceLabel,
    urgentie: urgency,
    klant_naam: `${firstName} ${lastName}`,
    klant_telefoon: phone,
    klant_email: email,
    adres: `${address} ${houseNumber}`,
    stad: city,
    opmerkingen: notes,
    status: "nieuw",
  }).select().single();

  console.log("Boeking:", boekingResult.error ? boekingResult.error.message : "OK");

  // Stap 2: zoek partner
  const partnerResult = await supabase.from("partners").select("*").eq("actief", true).eq("beschikbaar", true).limit(1);
  
  console.log("Partners:", JSON.stringify(partnerResult.data), "Error:", partnerResult.error?.message);

  const partner = partnerResult.data?.[0];
  const boeking = boekingResult.data;

  // Stap 3: wijs toe of stuur melding
  if (partner && boeking) {
    await supabase.from("boekingen").update({ partner_id: partner.id, status: "toegewezen" }).eq("id", boeking.id);
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mohamedboujjou95@gmail.com"],
      subject: `✅ DOORSTUREN naar ${partner.naam} (${partner.email}): ${serviceLabel} in ${city}`,
      html: `<h2>Klus Automatisch Toegewezen</h2><p>Stuur door naar: <strong>${partner.naam}</strong> — ${partner.email} — ${partner.telefoon}</p><hr/><p><strong>Klant:</strong> ${firstName} ${lastName}</p><p><strong>Telefoon:</strong> ${phone}</p><p><strong>Adres:</strong> ${address} ${houseNumber}, ${city}</p><p><strong>Service:</strong> ${serviceLabel}</p><p><strong>Urgentie:</strong> ${urgency}</p>${notes?`<p><strong>Opmerkingen:</strong> ${notes}</p>`:""}<br/><p><a href="https://vangoolen-en-zonen.vercel.app/admin">Open Dashboard →</a></p>`,
    });
  } else {
    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mohamedboujjou95@gmail.com"],
      subject: `⚠️ Handmatig Toewijzen: ${serviceLabel} in ${city}`,
      html: `<h2>Geen Beschikbare Partner</h2><p><strong>Klant:</strong> ${firstName} ${lastName}</p><p><strong>Telefoon:</strong> ${phone}</p><p><strong>Adres:</strong> ${address} ${houseNumber}, ${city}</p><p><strong>Service:</strong> ${serviceLabel}</p><br/><p><a href="https://vangoolen-en-zonen.vercel.app/admin">Wijs handmatig toe →</a></p>`,
    });
  }

  return NextResponse.json({ success: true, autoAssigned: !!partner });
}
