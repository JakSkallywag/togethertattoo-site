import { Resend } from "resend";
import { NextResponse } from "next/server";

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_FIELD_LENGTH = 500;
const MAX_DESCRIPTION_LENGTH = 5000;
const VALID_ARTISTS = ["pip", "jak", "not-sure"];

const artistConfig: Record<string, { notifyTo: string[]; fromName: string; fromEmail: string }> = {
  pip: {
    notifyTo: ["togethertattoo@proton.me"],
    fromName: "Pip Tattoos",
    fromEmail: "pip@togethertattoo.com",
  },
  jak: {
    notifyTo: ["info@jakrapmund.com"],
    fromName: "Jak Rapmund Tattoo",
    fromEmail: "jak@togethertattoo.com",
  },
  "not-sure": {
    notifyTo: ["togethertattoo@proton.me", "info@jakrapmund.com"],
    fromName: "Together Tattoo",
    fromEmail: "hello@togethertattoo.com",
  },
};

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const {
      artist,
      artistLabel,
      name,
      email,
      phone,
      pronouns,
      description,
      size,
      placement,
      availability,
      isCoverUp,
      website,
    } = body;

    // Honeypot check — bots fill this in, humans don't see it
    if (website) {
      return NextResponse.json({ success: true });
    }

    // Validate required fields exist and are strings
    if (!name || !email || !description || !placement || !availability || !artist) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Validate artist is a known value
    if (!VALID_ARTISTS.includes(artist)) {
      return NextResponse.json({ error: "Invalid artist selection" }, { status: 400 });
    }

    // Validate email format
    if (!EMAIL_REGEX.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    // Enforce field length limits
    if (
      name.length > MAX_FIELD_LENGTH ||
      email.length > MAX_FIELD_LENGTH ||
      (phone && phone.length > MAX_FIELD_LENGTH) ||
      (pronouns && pronouns.length > MAX_FIELD_LENGTH) ||
      description.length > MAX_DESCRIPTION_LENGTH ||
      (artistLabel && artistLabel.length > MAX_FIELD_LENGTH) ||
      (size && size.length > MAX_FIELD_LENGTH) ||
      placement.length > MAX_FIELD_LENGTH ||
      availability.length > MAX_FIELD_LENGTH
    ) {
      return NextResponse.json({ error: "Field too long" }, { status: 400 });
    }

    const config = artistConfig[artist] || artistConfig["not-sure"];

    // Escape all user input for HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safePhone = escapeHtml(phone || "Not provided");
    const safePronouns = escapeHtml(pronouns || "");
    const safeDescription = escapeHtml(description);
    const safeArtistLabel = escapeHtml(artistLabel || "");
    const safeSize = escapeHtml(size || "");
    const safePlacement = escapeHtml(placement);
    const safeAvailability = escapeHtml(availability);

    // Notification email(s) to artist(s)
    for (const recipient of config.notifyTo) {
      await resend.emails.send({
        from: `Together Tattoo <inquiries@togethertattoo.com>`,
        to: recipient,
        subject: `New Tattoo Inquiry from ${safeName}`,
        html: `
          <h2>New Tattoo Inquiry</h2>

          <h3>Artist Requested</h3>
          <p><strong>${safeArtistLabel}</strong></p>

          <h3>Contact Details</h3>
          <p><strong>Name:</strong> ${safeName} (${safePronouns})</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Phone:</strong> ${safePhone}</p>
          <p><strong>Availability:</strong> ${safeAvailability}</p>

          <h3>Tattoo Details</h3>
          <p><strong>Size:</strong> ${safeSize}</p>
          <p><strong>Placement:</strong> ${safePlacement}</p>
          <p><strong>Cover-up:</strong> ${isCoverUp ? "Yes" : "No"}</p>

          <h3>Their Description</h3>
          <p>${safeDescription}</p>
        `,
      });
    }

    // Auto-reply to the client
    await resend.emails.send({
      from: `${config.fromName} <${config.fromEmail}>`,
      to: email,
      subject: "Thanks for your tattoo inquiry!",
      html: `
        <h2>Thanks for reaching out, ${escapeHtml(name.split(" ")[0])}!</h2>
        <p>We've received your inquiry and will get back to you as soon as we can. Thank you for your patience!</p>

        <h3>What You Told Us</h3>
        <ul>
          <li><strong>Artist:</strong> ${safeArtistLabel}</li>
          <li><strong>Size:</strong> ${safeSize}</li>
          <li><strong>Placement:</strong> ${safePlacement}</li>
          <li><strong>Cover-up:</strong> ${isCoverUp ? "Yes" : "No"}</li>
          <li><strong>Availability:</strong> ${safeAvailability}</li>
        </ul>
        <p><strong>Your idea:</strong> ${safeDescription}</p>

        <h3>Next Steps</h3>
        <p>Please reply to this email with any reference images you have for your tattoo idea. This helps us understand your vision.</p>
        <p>We'll send through available dates and times once we've had a chance to review your inquiry.</p>
        <p>Once we've locked in a date, a deposit will be taken to confirm your appointment, which comes off the final price of the tattoo.</p>
        <p>If you have any further questions, please don't hesitate to ask!</p>

        <p>Looking forward to creating something great with you!</p>
        <p>— Together Tattoo</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
