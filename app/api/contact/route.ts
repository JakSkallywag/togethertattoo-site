import { Resend } from "resend";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY);

    const body = await request.json();
    const { name, email, message } = body;

    // Notification to the studio
    await resend.emails.send({
      from: "Together Tattoo <inquiries@togethertattoo.com>",
      to: "togethertattoo@proton.me",
      subject: `New Tattoo Inquiry from ${name}`,
      html: `
        <h2>New Tattoo Inquiry (via Pip's contact form)</h2>

        <h3>Contact Details</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>

        <h3>Their Message</h3>
        <p>${message}</p>
      `,
    });

    // Auto-reply to the client
    await resend.emails.send({
      from: "Together Tattoo <hello@togethertattoo.com>",
      to: email,
      subject: "Thanks for your tattoo inquiry!",
      html: `
        <h2>Thanks for reaching out, ${name.split(" ")[0]}!</h2>
        <p>We've received your message and Pip will get back to you as soon as possible.</p>

        <h3>What you told us</h3>
        <p>${message}</p>

        <h3>Next Steps</h3>
        <p>Feel free to reply to this email with any reference images you have for your tattoo idea.</p>
        <p>If you have any questions in the meantime, don't hesitate to reach out on Instagram <a href="https://instagram.com/pip.irene">@pip.irene</a>.</p>

        <p>— Together Tattoo</p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Email error:", error);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
