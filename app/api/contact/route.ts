import { NextRequest, NextResponse } from "next/server";

const CONTACT_EMAIL = "info@popupsu-shi.de";
const RESEND_FROM = "Push Up Sushi <onboarding@resend.dev>";
const BASE_URL = "https://www.popupsu-shi.de";

function buildConfirmationHtml(vorname: string, kundenEmail: string) {
  return `<!DOCTYPE html>
<html lang="de">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="margin:0;padding:0;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;background-color:#ffffff;color:#09090b;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background-color:#ffffff;padding:40px 16px;">
<tr><td align="center">
<table role="presentation" cellpadding="0" cellspacing="0" width="600" style="max-width:600px;background-color:#ffffff;border-radius:18px;overflow:hidden;box-shadow:0 18px 45px rgba(15,23,42,0.18);">

<tr><td style="background-color:#000000;padding:20px 32px 18px 32px;text-align:left;">
<table role="presentation" cellpadding="0" cellspacing="0" width="100%"><tr>
<td style="vertical-align:middle;">
<img src="${BASE_URL}/email-header.png" alt="POP UP SU-SHI" width="120" style="display:block;height:auto;">
</td>
<td style="text-align:right;vertical-align:middle;">
<span style="display:inline-block;padding:4px 10px;border-radius:999px;background-color:#111827;color:#e5e7eb;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">Anfrage bestätigt</span>
</td>
</tr></table>
</td></tr>

<tr><td style="padding:36px 40px 32px 40px;">
<h2 style="margin:0 0 14px 0;font-size:22px;font-weight:600;color:#111827;letter-spacing:0.04em;text-transform:uppercase;">Vielen Dank, ${vorname}!</h2>
<p style="margin:0 0 18px 0;font-size:15px;line-height:1.7;color:#4b5563;">Wir haben Ihre Anfrage erhalten und werden uns in Kürze bei Ihnen melden.</p>
<p style="margin:0 0 26px 0;font-size:14px;line-height:1.7;color:#6b7280;">Bis dahin: Haben Sie schon unseren Konfigurator ausprobiert? Dort können Sie Ihr individuelles Design hochladen und in 3D sehen.</p>
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 28px 0;"><tr><td>
<a href="${BASE_URL}/customizer" style="display:inline-block;padding:13px 26px;background-color:#f97316;color:#ffffff;font-size:14px;font-weight:600;text-decoration:none;border-radius:999px;letter-spacing:0.05em;text-transform:uppercase;">Jetzt Konfigurator öffnen</a>
</td></tr></table>
<p style="margin:0;font-size:13px;line-height:1.6;color:#6b7280;">Bei Fragen erreichen Sie uns unter <a href="mailto:info@popupsu-shi.de" style="color:#f97316;text-decoration:underline;">info@popupsu-shi.de</a>.</p>
</td></tr>

<tr><td style="background-color:#000000;padding:24px 40px;text-align:center;">
<p style="margin:0;font-size:13px;font-weight:600;color:#ffffff;letter-spacing:0.05em;">PUSH UP SU-SHI</p>
<p style="margin:8px 0 0 0;font-size:12px;color:rgba(255,255,255,0.6);">Die innovative Sushi To-Go Verpackung für Ihre Marke. Made for you.</p>
<p style="margin:16px 0 0 0;font-size:11px;color:rgba(255,255,255,0.4);"><a href="${BASE_URL}" style="color:rgba(255,255,255,0.6);text-decoration:underline;">www.popupsu-shi.de</a></p>
<p style="margin:12px 0 0 0;font-size:10px;color:rgba(255,255,255,0.3);"><a href="${BASE_URL}/abmelden?email=${encodeURIComponent(kundenEmail)}" style="color:rgba(255,255,255,0.35);text-decoration:underline;">Von E-Mails abmelden</a></p>
</td></tr>

</table>
</td></tr></table>
</body></html>`;
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      vorname,
      nachname,
      email,
      nachricht,
      firma,
      stueckzahl,
      designFile,
      screenshot,
    } = body;

    // Validate required fields
    if (!vorname || !nachname || !email || !nachricht) {
      return NextResponse.json(
        { error: "Pflichtfelder fehlen" },
        { status: 400 }
      );
    }

    // Build email content
    const emailContent = `
Neue Anfrage über Push Up Sushi Customizer

KONTAKTDATEN
────────────────────────────────
Vorname: ${vorname}
Nachname: ${nachname}
E-Mail: ${email}
${firma ? `Firma: ${firma}` : ""}
${stueckzahl ? `Geplante Stückzahl: ${stueckzahl}` : ""}

NACHRICHT
────────────────────────────────
${nachricht}

ANHÄNGE
────────────────────────────────
Design-Datei: ${designFile ? "Ja (siehe Anhang)" : "Keine"}
Screenshot: ${screenshot ? "Ja (siehe Anhang)" : "Keiner"}
    `.trim();

    // Prepare attachments array
    const attachments: { filename: string; content: string; encoding: string }[] = [];

    if (designFile && designFile.startsWith("data:")) {
      const matches = designFile.match(/^data:(.+);base64,(.+)$/);
      if (matches) {
        const extension = matches[1].includes("png") ? "png" : "jpg";
        attachments.push({
          filename: `design.${extension}`,
          content: matches[2],
          encoding: "base64",
        });
      }
    }

    if (screenshot && screenshot.startsWith("data:")) {
      const matches = screenshot.match(/^data:(.+);base64,(.+)$/);
      if (matches) {
        attachments.push({
          filename: "screenshot.png",
          content: matches[2],
          encoding: "base64",
        });
      }
    }

    // Send email using Resend or fallback to logging
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    
    if (RESEND_API_KEY) {
      // Use Resend API to send email
      const emailPayload: {
        from: string;
        to: string[];
        subject: string;
        text: string;
        reply_to: string;
        attachments?: { filename: string; content: string }[];
      } = {
        from: process.env.RESEND_FROM ?? RESEND_FROM,
        to: [CONTACT_EMAIL],
        subject: `Neue Anfrage von ${vorname} ${nachname}`,
        text: emailContent,
        reply_to: email,
      };

      if (attachments.length > 0) {
        emailPayload.attachments = attachments.map((att) => ({
          filename: att.filename,
          content: att.content,
        }));
      }

      const resendResponse = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify(emailPayload),
      });

      if (!resendResponse.ok) {
        let errorMessage = "E-Mail-Versand fehlgeschlagen.";
        try {
          const errorData = await resendResponse.json();
          console.error("Resend API error:", errorData);
          if (errorData?.message) errorMessage = errorData.message;
          if (errorData?.errors?.[0]?.message) errorMessage = errorData.errors[0].message;
        } catch {
          console.error("Resend response status:", resendResponse.status);
        }
        return NextResponse.json(
          { error: errorMessage },
          { status: 502 }
        );
      }

      // Bestätigungs-E-Mail an den Kunden
      try {
        const confirmResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: process.env.RESEND_FROM ?? RESEND_FROM,
            to: [email],
            subject: "Anfrage erhalten – Push Up Sushi",
            html: buildConfirmationHtml(vorname, email),
            reply_to: CONTACT_EMAIL,
            headers: {
              "List-Unsubscribe": `<${BASE_URL}/abmelden?email=${encodeURIComponent(email)}>`,
              "List-Unsubscribe-Post": "List-Unsubscribe=One-Click",
            },
          }),
        });
        if (!confirmResponse.ok) {
          const errData = await confirmResponse.json().catch(() => null);
          console.error("Bestätigungs-E-Mail Fehler:", confirmResponse.status, errData);
        } else {
          console.log("Bestätigungs-E-Mail gesendet an:", email);
        }
      } catch (confirmError) {
        console.error("Bestätigungs-E-Mail fehlgeschlagen:", confirmError);
      }

      return NextResponse.json({ success: true, message: "E-Mail erfolgreich gesendet" });
    } else {
      // Fallback: Log the email content (for development)
      console.log("=== EMAIL WOULD BE SENT ===");
      console.log("To:", CONTACT_EMAIL);
      console.log("Subject: Neue Anfrage von", vorname, nachname);
      console.log("Content:", emailContent);
      console.log("Attachments:", attachments.length);
      console.log("===========================");
      
      // For demo purposes, still return success
      return NextResponse.json({ 
        success: true, 
        message: "Anfrage erfolgreich übermittelt (Demo-Modus)" 
      });
    }
  } catch (error) {
    console.error("Contact form error:", error);
    const message = error instanceof Error ? error.message : "Fehler beim Verarbeiten der Anfrage";
    return NextResponse.json(
      { error: message },
      { status: 500 }
    );
  }
}
