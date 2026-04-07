import { Resend } from "resend";
import { NextResponse } from "next/server";

const AUDIENCE_ID = "7e90a212-b979-4054-9ee7-9dfbe3c1c8bb";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function safe(v: unknown, max = 500): string {
  if (typeof v !== "string") return "";
  return escapeHtml(v.slice(0, max));
}

function yesNo(v: unknown): string {
  return v === "yes" ? "Yes" : v === "no" ? "No" : "—";
}

function tick(v: unknown): string {
  return v === true ? "&#10003; Agreed" : "&#10007; Not agreed";
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const VALID_ARTISTS = ["jak", "pip"];

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {
      artist,
      firstName, lastName, pronouns, dob, phone, email,
      emergencyName, emergencyPhone,
      eaten, sober, pregnant, bloodborne, skinConditions, skinConditionDetails,
      consentPermanent, consentRisks, consentAftercare, consentHealth,
      consentFading, consentQuestions, consentPhotography, consentLiability,
      consentIndemnity, consentAccuracy,
      newsletter,
      signature, idPhoto, submittedAt,
    } = body;

    // Validate required fields
    if (!firstName || !lastName || !email || !EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid form data" }, { status: 400 });
    }
    if (!artist || !VALID_ARTISTS.includes(artist)) {
      return NextResponse.json({ error: "Invalid artist selection" }, { status: 400 });
    }

    const artistLabel = artist === "jak" ? "Jak Rapmund" : "Pip";
    const fullName = `${safe(firstName)} ${safe(lastName)}`;
    const dateStr = new Date(submittedAt).toLocaleString("en-AU", {
      timeZone: "Australia/Melbourne",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
    const dateShort = new Date(submittedAt).toLocaleDateString("en-AU");

    const resend = new Resend(process.env.RESEND_API_KEY);

    // Build attachments
    const attachments: { filename: string; content: string }[] = [];
    if (signature && typeof signature === "string") {
      attachments.push({
        filename: `signature-${safe(lastName)}-${safe(firstName)}.png`,
        content: signature.replace(/^data:image\/\w+;base64,/, ""),
      });
    }
    if (idPhoto && typeof idPhoto === "string") {
      attachments.push({
        filename: `id-${safe(lastName)}-${safe(firstName)}.jpg`,
        content: idPhoto.replace(/^data:image\/\w+;base64,/, ""),
      });
    }

    // ── Email to Together Tattoo ───────────────────────────────────────────────

    const studioHtml = `
      <div style="font-family: sans-serif; max-width: 640px; color: #222; line-height: 1.5;">
        <h2 style="margin-bottom: 4px;">Tattoo Consent Form</h2>
        <p style="color: #888; font-size: 13px; margin-top: 0;">Submitted: ${dateStr}</p>
        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

        <h3 style="margin-bottom: 8px;">Artist</h3>
        <p style="font-size: 14px; margin: 0;">${escapeHtml(artistLabel)}</p>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

        <h3 style="margin-bottom: 8px;">Client Information</h3>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr><td style="padding: 4px 0; color: #888; width: 42%;">Name</td><td>${fullName}${pronouns ? ` (${safe(pronouns)})` : ""}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Date of birth</td><td>${safe(dob)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Phone</td><td>${safe(phone)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Email</td><td>${safe(email)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Emergency contact</td><td>${safe(emergencyName)} &mdash; ${safe(emergencyPhone)}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

        <h3 style="margin-bottom: 8px;">Pre-Appointment Check</h3>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr><td style="padding: 4px 0; color: #888; width: 60%;">Eaten in past 4 hours</td><td>${yesNo(eaten)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Free from alcohol / drugs</td><td>${yesNo(sober)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Pregnant or nursing</td><td>${yesNo(pregnant)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Blood-borne / communicable conditions</td><td>${yesNo(bloodborne)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Skin conditions at site</td><td>${yesNo(skinConditions)}</td></tr>
          ${skinConditions === "yes" && skinConditionDetails
            ? `<tr><td style="padding: 4px 0; color: #888;">Skin condition details</td><td>${safe(skinConditionDetails, 1000)}</td></tr>`
            : ""}
        </table>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />

        <h3 style="margin-bottom: 8px;">Consent Statements</h3>
        <table style="width: 100%; font-size: 14px; border-collapse: collapse;">
          <tr><td style="padding: 4px 0; color: #888; width: 60%;">Permanent procedure</td><td>${tick(consentPermanent)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Risks acknowledged</td><td>${tick(consentRisks)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Aftercare &amp; healing</td><td>${tick(consentAftercare)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Health declaration</td><td>${tick(consentHealth)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Fading &amp; variation</td><td>${tick(consentFading)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Informed consent</td><td>${tick(consentQuestions)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Release of liability</td><td>${tick(consentLiability)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Indemnification</td><td>${tick(consentIndemnity)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Accuracy of information</td><td>${tick(consentAccuracy)}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Photography consent</td><td>${consentPhotography ? "&#10003; Agreed" : "&#10007; Declined"}</td></tr>
          <tr><td style="padding: 4px 0; color: #888;">Newsletter sign-up</td><td>${newsletter ? "Yes" : "No"}</td></tr>
        </table>

        <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
        <p style="font-size: 13px; color: #888;">
          Signature${attachments.length > 1 ? " and ID photo" : ""} attached.
        </p>
      </div>
    `;

    await resend.emails.send({
      from: "Consent Forms <jak@togethertattoo.com>",
      to: "togethertattoo@pm.me",
      subject: `Consent Form — ${fullName} — ${artistLabel} — ${dateShort}`,
      html: studioHtml,
      attachments,
    });

    // ── Confirmation to client ─────────────────────────────────────────────────

    await resend.emails.send({
      from: "Together Tattoo <jak@togethertattoo.com>",
      replyTo: "togethertattoo@pm.me",
      to: email,
      subject: "Your consent form has been received",
      html: `
        <div style="font-family: sans-serif; max-width: 600px; color: #222; line-height: 1.6;">
          <h2>Consent form received</h2>
          <p>Hi ${safe(firstName)},</p>
          <p>Your tattoo consent form has been received — thank you for completing it ahead of your appointment with ${escapeHtml(artistLabel)}.</p>
          <p>
            <strong>Name:</strong> ${fullName}<br/>
            <strong>Artist:</strong> ${escapeHtml(artistLabel)}<br/>
            <strong>Date submitted:</strong> ${dateStr}
          </p>
          <p>If you have any questions before we meet, feel free to reply to this email.</p>
          <p>See you soon,<br/>Together Tattoo</p>
        </div>
      `,
    });

    // ── Newsletter opt-in ──────────────────────────────────────────────────────

    if (newsletter && email) {
      const contactRes = await fetch(`https://api.resend.com/audiences/${AUDIENCE_ID}/contacts`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          first_name: firstName || undefined,
          last_name: lastName || undefined,
          unsubscribed: false,
          properties: { source: "tattoo" },
        }),
      });
      const contactData = await contactRes.json();
      if (contactData.id) {
        await fetch(`https://api.resend.com/contacts/${contactData.id}/segments/7bbc9add-2616-4405-8305-08250517a0cc`, {
          method: "POST",
          headers: { Authorization: `Bearer ${process.env.RESEND_API_KEY}` },
        });
      }

      await resend.emails.send({
        from: "Jak Rapmund <jak@togethertattoo.com>",
        replyTo: "info@jakrapmund.com",
        to: email,
        subject: "You're on the list",
        html: `
          <div style="font-family: Georgia, serif; max-width: 560px; color: #222; line-height: 1.7; font-size: 16px;">
            <p>Hi ${safe(firstName)},</p>
            <p>You're on the list. I'll send occasional updates — new tattoo work, flash days, availability windows, and anything else worth sharing.</p>
            <p>If you have any questions before your appointment, feel free to reply to this email.</p>
            <p>I also write about other things beyond tattooing — if that sounds interesting, you can sign up at <a href="https://www.jakrapmund.com" style="color: #222;">jakrapmund.com</a>.</p>
            <p>— Jak</p>
            <p style="margin-top: 32px; font-size: 13px; color: #888;"><a href="{{{RESEND_UNSUBSCRIBE_URL}}}" style="color: #888;">Unsubscribe</a></p>
          </div>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Consent form error:", error);
    return NextResponse.json({ error: "Failed to submit form" }, { status: 500 });
  }
}
