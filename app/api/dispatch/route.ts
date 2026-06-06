import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { partnerNaam, partnerEmail, partnerTelefoon, klantNaam, klantTelefoon, adres, stad, service, urgentie, opmerkingen } = body;

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mohamedboujjou95@gmail.com"],
      subject: `🔧 Nieuwe Klus Toegewezen: ${service} — ${stad}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0e1f42;padding:24px;border-radius:8px 8px 0 0">
            <h1 style="color:#C5A059;font-size:20px;margin:0">Nieuwe Klus Toegewezen</h1>
            <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:14px">Van Goolen & Zonen — Gilde Dispatch</p>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #e3d2ae;border-top:none;border-radius:0 0 8px 8px">
            <p style="font-size:16px;color:#0e1f42">Beste ${partnerNaam},</p>
            <p style="color:#6e6257">Er is een nieuwe klus aan u toegewezen. Neem zo snel mogelijk contact op met de klant.</p>
            <table style="width:100%;border-collapse:collapse;font-size:14px;margin:16px 0">
              <tr style="border-bottom:1px solid #e3d2ae"><td style="padding:8px 0;color:#6e6257;width:40%">Service</td><td style="padding:8px 0;font-weight:600;color:#0e1f42">${service}</td></tr>
              <tr style="border-bottom:1px solid #e3d2ae"><td style="padding:8px 0;color:#6e6257">Urgentie</td><td style="padding:8px 0;font-weight:600;color:#0e1f42">${urgentie}</td></tr>
              <tr style="border-bottom:1px solid #e3d2ae"><td style="padding:8px 0;color:#6e6257">Klant</td><td style="padding:8px 0;font-weight:600;color:#0e1f42">${klantNaam}</td></tr>
              <tr style="border-bottom:1px solid #e3d2ae"><td style="padding:8px 0;color:#6e6257">Telefoon klant</td><td style="padding:8px 0;font-weight:700;color:#C5A059;font-size:16px">${klantTelefoon}</td></tr>
              <tr style="border-bottom:1px solid #e3d2ae"><td style="padding:8px 0;color:#6e6257">Adres</td><td style="padding:8px 0;font-weight:600;color:#0e1f42">${adres}, ${stad}</td></tr>
              ${opmerkingen ? `<tr><td style="padding:8px 0;color:#6e6257">Opmerkingen</td><td style="padding:8px 0;color:#0e1f42">${opmerkingen}</td></tr>` : ""}
            </table>
            <div style="background:#f7f1e4;border-radius:6px;padding:14px;border-left:3px solid #C5A059;margin-top:16px">
              <p style="margin:0;font-size:13px;color:#6e6257">Bel de klant zo snel mogelijk op <strong style="color:#0e1f42">${klantTelefoon}</strong> en bevestig de afspraak.</p>
            </div>
          </div>
        </div>
      `,
    });

    await resend.emails.send({
      from: "onboarding@resend.dev",
      to: ["mohamedboujjou95@gmail.com"],
      subject: `✅ Klus Toegewezen aan ${partnerNaam}`,
      html: `<p>Klus <strong>${service}</strong> in ${stad} is toegewezen aan <strong>${partnerNaam}</strong> (${partnerTelefoon}).</p>`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
