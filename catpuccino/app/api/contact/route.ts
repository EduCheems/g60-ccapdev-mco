import { connectDB } from "@/lib/mongodb";
import ContactMessage from "@/models/ContactMessage";
import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

const SUPPORT_EMAIL = "catpuccinosupport@gmail.com";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { name, email, message } = await req.json();

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { message: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const contact = await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
    });

    // Send email to support if SMTP is configured
    const smtpUser = process.env.GMAIL_USER ?? process.env.SMTP_USER;
    const smtpPass = process.env.GMAIL_APP_PASSWORD ?? process.env.SMTP_PASS;
    let emailSent = false;

    if (!smtpUser || !smtpPass) {
      console.warn(
        "[Contact] Email NOT sent: set GMAIL_USER and GMAIL_APP_PASSWORD in .env (restart dev server after changing .env)"
      );
    } else {
      try {
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: { user: smtpUser, pass: smtpPass },
        });
        await transporter.sendMail({
          from: `"Catpuccino Contact" <${smtpUser}>`,
          to: SUPPORT_EMAIL,
          replyTo: email.trim(),
          subject: `Contact form: ${name.trim()}`,
          text: `From: ${name.trim()} <${email.trim()}>\n\n${message.trim()}`,
          html: `<p><strong>From:</strong> ${name.trim()} &lt;${email.trim()}&gt;</p><p><strong>Message:</strong></p><p>${message.trim().replace(/\n/g, "<br>")}</p>`,
        });
        emailSent = true;
        console.log("[Contact] Email sent to", SUPPORT_EMAIL);
      } catch (mailError) {
        console.error("[Contact] Email failed (use Gmail App Password, not normal password):", mailError);
        // Don't fail the request - message is still saved in DB
      }
    }

    return NextResponse.json(
      { message: "Message sent! We'll get back to you soon.", id: contact._id, emailSent },
      { status: 201 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { message: "Failed to send message. Please try again." },
      { status: 500 }
    );
  }
}
