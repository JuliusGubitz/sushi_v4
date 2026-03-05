import { NextRequest, NextResponse } from "next/server";

const CONTACT_EMAIL = "info@popupsu-shi.de";
const RESEND_FROM = "Push Up Sushi <onboarding@resend.dev>";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json({ error: "Keine E-Mail angegeben" }, { status: 400 });
    }

    const RESEND_API_KEY = process.env.RESEND_API_KEY;

    if (RESEND_API_KEY) {
      await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        body: JSON.stringify({
          from: process.env.RESEND_FROM ?? RESEND_FROM,
          to: [CONTACT_EMAIL],
          subject: `Abmeldung: ${email}`,
          text: `Die E-Mail-Adresse ${email} hat sich von allen E-Mails abgemeldet.\n\nBitte aus dem Verteiler entfernen.`,
        }),
      });
    } else {
      console.log(`[Unsubscribe] ${email} hat sich abgemeldet`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Unsubscribe error:", error);
    return NextResponse.json({ error: "Fehler" }, { status: 500 });
  }
}
