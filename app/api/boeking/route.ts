import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);
const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_KEY!);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, serviceLabel, urgency, city, address, houseNumber, notes } = body;

    // Sla boeking op
    const { data: boeking, error: boekingError } = await supabase.from("boekingen").insert({
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

    if (boekingError) throw boekingError;

    // Zoek beschikbare partner in dezelfde stad
    const { data: partners } = await supabase
      .from("partners")
      .select("*")
      .eq("actief", true)
      .eq("beschikbaar", true)
      .ilike("stad", `%${city}%`)
      .order("klussen_voltooid", { ascending: false })
      .limit(1);

    const partner = partners?.[0];

    if (partner && boeking) {
      // Automatisch toewijzen
      await supabase.from("boekingen")
        .update({ partner_id: partner.id, status: "toegewezen" })
        .eq("id", boeking.id);

      // Email naar partner
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["mohamedboujjou95@gmail.com"],
        subject: `🔧 DOORSTUREN naar ${partner.naam} (${partner.email}): Klus — ${serviceLabel} in ${city}`,
        html: `
          <h2>Automatisch Toegewezen Klus</h2>
          <p><strong>Stuur deze email door naar:</strong> ${partner.naam} — ${partner.email}</p>
          <hr/>
          <p><strong>Service:</strong> ${serviceLabel}</p>
          <p><strong>Urgentie:</strong> ${urgency}</p>
          <p><strong>Klant:</strong> ${firstName} ${lastName}</p>
          <p><strong>Telefoon:</strong> ${phone}</p>
          <p><strong>Adres:</strong> ${address} ${houseNumber}, ${city}</p>
          ${notes?`<p><strong>Opmerkingen:</strong> ${notes}</p>`:""}
          <hr/>
          <p><a href="https://vangoolen-en-zonen.vercel.app/admin">Open Dispatch Dashboard →</a></p>
        `,
      });

      // Bevestiging naar jou
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["mohamedboujjou95@gmail.com"],
        subject: `✅ Automatisch Toegewezen: ${serviceLabel} → ${partner.naam}`,
        html: `<p>Boeking in <strong>${city}</strong> automatisch toegewezen aan <strong>${partner.naam}</strong>.</p><p><a href="https://vangoolen-en-zonen.vercel.app/admin">Bekijk in dashboard →</a></p>`,
      });

    } else {
      // Geen beschikbare partner — stuur melding naar jou
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["mohamedboujjou95@gmail.com"],
        subject: `⚠️ Handmatig Toewijzen: ${serviceLabel} in ${city} — Geen beschikbare partner`,
        html: `
          <h2>Nieuwe Boeking — Handmatige Toewijzing Nodig</h2>
          <p>Er is geen beschikbare partner gevonden in <strong>${city}</strong>.</p>
          <p><strong>Service:</strong> ${serviceLabel}</p>
          <p><strong>Urgentie:</strong> ${urgency}</p>
          <p><strong>Klant:</strong> ${firstName} ${lastName}</p>
          <p><strong>Telefoon:</strong> ${phone}</p>
          <p><strong>Adres:</strong> ${address} ${houseNumber}, ${city}</p>
          ${notes?`<p><strong>Opmerkingen:</strong> ${notes}</p>`:""}
          <br/>
          <p><a href="https://vangoolen-en-zonen.vercel.app/admin">Wijs handmatig toe in dashboard →</a></p>
        `,
      });
    }

    return NextResponse.json({ success: true, autoAssigned: !!partner });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
