import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { firstName, lastName, phone, email, city, diploma, experience, motivation } = body;

    await resend.emails.send({
      from: "Van Goolen & Zonen <onboarding@resend.dev>",
      to: ["gilde@vangoolen.nl"],
      subject: `👷 Nieuwe Partner Aanmelding: ${firstName} ${lastName} — ${city}`,
      html: `
        <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
          <div style="background:#0e1f42;padding:24px;border-radius:8px 8px 0 0">
            <h1 style="color:#C5A059;font-size:20px;margin:0">Nieuwe Gilde-Partner Aanmelding</h1>
            <p style="color:rgba(255,255,255,0.6);margin:4px 0 0;font-size:14px">Van Goolen & Zonen — ZZP Aanmelding</p>
          </div>
          <div style="background:#fff;padding:24px;border:1px solid #e3d2ae;border-top:none;border-radius:0 0 8px 8px">
            <table style="width:100%;border-collapse:collapse;font-size:14px">
              <tr><td style="padding:8px 0;color:#6e6257;width:40%">Naam</td><td style="padding:8px 0;font-weight:600;color:#0e1f42">${firstName} ${lastName}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6257">Telefoon</td><td style="padding:8px 0;font-weight:600;color:#C5A059;font-size:16px">${phone}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6257">Email</td><td style="padding:8px 0;color:#0e1f42">${email}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6257">Werkgebied</td><td style="padding:8px 0;font-weight:600;color:#0e1f42">${city}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6257">Vakdiploma</td><td style="padding:8px 0;color:#0e1f42">${diploma}</td></tr>
              <tr><td style="padding:8px 0;color:#6e6257">Ervaring</td><td style="padding:8px 0;color:#0e1f42">${experience || "Niet opgegeven"}</td></tr>
              ${motivation ? `<tr><td style="padding:8px 0;color:#6e6257">Motivatie</td><td style="padding:8px 0;color:#0e1f42">${motivation}</td></tr>` : ""}
            </table>
            <div style="margin-top:20px;padding:14px;background:#f7f1e4;border-radius:6px;border-left:3px solid #C5A059">
              <p style="margin:0;font-size:13px;color:#6e6257">Plan een intakegesprek in met <strong style="color:#0e1f42">${firstName}</strong> via <strong style="color:#0e1f42">${phone}</strong></p>
            </div>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
