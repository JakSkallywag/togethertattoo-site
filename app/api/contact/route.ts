import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      artistLabel,
      name,
      email,
      phone,
      pronouns,
      description,
      size,
      placement,
      availability,
      budget,
      budgetAmount,
      isCoverUp,
      referralSource,
      website, // honeypot
    } = body;

    if (website) {
      return NextResponse.json({ ok: true });
    }

    // Route to the right inbox based on artist selection
    const { artist } = body;
    const studioEmail =
      artist === "jak" ? "info@jakrapmund.com" : "togethertattoo@proton.me";

    const budgetLine =
      budget === "yes"
        ? `Budget: Yes${budgetAmount ? ` — ${budgetAmount}` : ""}`
        : `Budget: ${budget === "no" ? "No" : "Not sure"}`;

    const lines = [
      `Artist: ${artistLabel}`,
      `Name: ${name}`,
      pronouns ? `Pronouns: ${pronouns}` : null,
      `Email: ${email}`,
      phone ? `Phone: ${phone}` : null,
      ``,
      `Cover-up: ${isCoverUp ? "Yes" : "No"}`,
      `Size: ${size}`,
      `Placement: ${placement}`,
      ``,
      `Description:`,
      description,
      ``,
      `Availability: ${availability}`,
      budgetLine,
      referralSource ? `Referral: ${referralSource}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    await resend.emails.send({
      from: "Booking Form <noreply@togethertattoo.com>",
      to: studioEmail,
      replyTo: email,
      subject: `New booking enquiry from ${name}`,
      text: lines,
    });

    const confirmationText = [
      `Thanks for reaching out, ${name}!`,
      `-----------------------------`,
      ``,
      `We've received your enquiry and will get back to you within a few days. Thank you for your patience!`,
      ``,
      `WHAT YOU TOLD US`,
      ``,
      `Artist: ${artistLabel}`,
      `Size: ${size}`,
      `Placement: ${placement}`,
      `Cover-up: ${isCoverUp ? "Yes" : "No"}`,
      `Availability: ${availability}`,
      budgetLine,
      ``,
      `Your idea: ${description}`,
      ``,
      `NEXT STEPS`,
      ``,
      `Please reply to this email with any reference images you have for your tattoo idea. This helps us understand your vision.`,
      ``,
      `We'll send through available dates and times once we've reviewed your enquiry.`,
      ``,
      `Once we've locked in a date, a deposit will be taken to confirm your appointment, which comes off the final price of the tattoo.`,
      ``,
      `If you have any questions in the meantime, just reply to this email.`,
      ``,
      `Looking forward to creating something great with you!`,
      ``,
      `— Jak & Pip`,
      `togethertattoo.com`,
    ]
      .filter((l) => l !== null)
      .join("\n");

    resend.emails.send({
      from: "Together Tattoo <noreply@togethertattoo.com>",
      to: email,
      replyTo: studioEmail,
      subject: "We've received your enquiry",
      text: confirmationText,
    }).catch((err) => console.error("Confirmation email failed:", err));

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
