import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, serviceLabel, urgency, city, address, houseNumber, notes } = body;

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_KEY!
    );

    // Sla boeking op
    const { data: boeking, error: boekingError } = await supabase
      .from("boekingen")
      .insert({
        service: serviceLabel,
        urgentie: urgency,
        klant_naam: `${firstName} ${lastName}`,
        klant_telefoon: phone,
        klant_email: email,
        adres: `${address} ${houseNumber}`,
        stad: city,
        opmerkingen: notes,
        status: "nieuw",
      })
      .select()
      .single();

    if (boekingError) {
      console.error("Boeking error:", boekingError);
      throw boekingError;
    }

    // Zoek beschikbare partner
    const { data: partners, error: partnerError } = await supabase
      .from("partners")
      .select("*")
      .eq("actief", true)
      .eq("beschikbaar", true)
      .limit(1);

    console.log("Partner query result:", JSON.stringify(partners), "Error:", partnerError);

    const partner = partners?.[0];

    if (partner && boeking) {
      // Automatisch toewijzen
      await supabase
        .from("boekingen")
        .update({ partner_id: partner.id, status: "toegewezen" })
        .eq("id", boeking.id);

      // Email naar jou met instructie om door te sturen
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["mohamedboujjou95@gmail.com"],
        subject: `✅ Auto-Toegewezen: ${serviceLabel} → DOORSTUREN naar ${partner.naam}`,
        html: `
          <h2>Klus Automatisch Toegewezen!</h2>
          <p>Stuur dit door naar: <strong>${partner.naam}</strong> — <strong>${partner.email}</strong> — <strong>${partner.telefoon}</strong></p>
          <hr/>
          <h3>Klus Details:</h3>
          <p><strong>Service:</strong> ${serviceLabel}</p>
          <p><strong>Urgentie:</strong> ${urgency}</p>
          <p><strong>Klant:</strong> ${firstName} ${lastName}</p>
          <p><strong>Telefoon klant:</strong> <strong>${phone}</strong></p>
          <p><strong>Adres:</strong> ${address} ${houseNumber}, ${city}</p>
          ${notes ? `<p><strong>Opmerkingen:</strong> ${notes}</p>` : ""}
          <br/>
          <p><a href="https://vangoolen-en-zonen.vercel.app/admin">Open Dashboard →</a></p>
        `,
      });

    } else {
      // Geen beschikbare partner
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: ["mohamedboujjou95@gmail.com"],
        subject: `⚠️ Handmatig Toewijzen: ${serviceLabel} in ${city}`,
        html: `
          <h2>Nieuwe Boeking — Geen Beschikbare Partner</h2>
          <p><strong>Service:</strong> ${serviceLabel}</p>
          <p><strong>Klant:</strong> ${firstName} ${lastName}</p>
          <p><strong>Telefoon:</strong> ${phone}</p>
          <p><strong>Adres:</strong> ${address} ${houseNumber}, ${city}</p>
          ${notes ? `<p><strong>Opmerkingen:</strong> ${notes}</p>` : ""}
          <br/>
          <p><a href="https://vangoolen-en-zonen.vercel.app/admin">Wijs handmatig toe →</a></p>
        `,
      });
    }

    return NextResponse.json({ success: true, autoAssigned: !!partner });
  } catch (error) {
    console.error("Route error:", error);
    return NextResponse.json({ success: false, error: String(error) }, { status: 500 });
  }
}
