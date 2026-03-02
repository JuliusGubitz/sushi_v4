import { NextRequest, NextResponse } from "next/server";

const CONTACT_EMAIL = "info@popupsu-shi.de";

// Resend Free Tier: Absender muss onboarding@resend.dev sein (noreply@resend.dev funktioniert nicht)
const RESEND_FROM = "Push Up Sushi <onboarding@resend.dev>";

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
