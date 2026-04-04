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
      budget === "yes"
        ? `Budget: Yes${budgetAmount ? ` — ${budgetAmount}` : ""}`
        : `Budget: ${budget === "no" ? "No" : "Not sure"}`,
      referralSource ? `Referral: ${referralSource}` : null,
    ]
      .filter((l) => l !== null)
      .join("\n");

    await resend.emails.send({
      from: "Booking Form <noreply@togethertattoo.com>",
      to: "togethertattoo@proton.me",
      replyTo: email,
      subject: `New booking enquiry from ${name}`,
      text: lines,
    });

    await resend.emails.send({
      from: "Together Tattoo <noreply@togethertattoo.com>",
      to: email,
      subject: "We've received your enquiry",
      text: `Hi ${name},\n\nThanks for reaching out — we've got your enquiry and will be in touch within a few days to discuss your idea and arrange a time.\n\nIn the meantime, feel free to browse our work at togethertattoo.com.\n\nTalk soon,\nJak & Pip\nTogether Tattoo`,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact API error:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 500 });
  }
}
