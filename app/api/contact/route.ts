import { Resend } from "resend";
import { NextResponse } from "next/server";

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
    } = body;

    const config = artistConfig[artist] || artistConfig["not-sure"];

    // Notification email(s) to artist(s)
    for (const recipient of config.notifyTo) {
      await resend.emails.send({
        from: `Together Tattoo <inquiries@togethertattoo.com>`,
        to: recipient,
        subject: `New Tattoo Inquiry from ${name}`,
        html: `
          <h2>New Tattoo Inquiry</h2>

          <h3>Artist Requested</h3>
          <p><strong>${artistLabel}</strong></p>

          <h3>Contact Details</h3>
          <p><strong>Name:</strong> ${name} (${pronouns})</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
          <p><strong>Availability:</strong> ${availability}</p>

          <h3>Tattoo Details</h3>
          <p><strong>Size:</strong> ${size}</p>
          <p><strong>Placement:</strong> ${placement}</p>
          <p><strong>Cover-up:</strong> ${isCoverUp ? "Yes" : "No"}</p>

          <h3>Their Description</h3>
          <p>${description}</p>
        `,
      });
    }

    // Auto-reply to the client
    await resend.emails.send({
      from: `${config.fromName} <${config.fromEmail}>`,
      to: email,
      subject: "Thanks for your tattoo inquiry!",
      html: `
        <h2>Thanks for reaching out, ${name.split(" ")[0]}!</h2>
        <p>We've received your inquiry and will get back to you as soon as we can. Thank you for your patience!</p>

        <h3>What You Told Us</h3>
        <ul>
          <li><strong>Artist:</strong> ${artistLabel}</li>
          <li><strong>Size:</strong> ${size}</li>
          <li><strong>Placement:</strong> ${placement}</li>
          <li><strong>Cover-up:</strong> ${isCoverUp ? "Yes" : "No"}</li>
          <li><strong>Availability:</strong> ${availability}</li>
        </ul>
        <p><strong>Your idea:</strong> ${description}</p>

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
