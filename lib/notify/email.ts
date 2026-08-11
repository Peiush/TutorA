import nodemailer from "nodemailer";
import { rateLimit } from "@/lib/rate-limit";

// Hard backstop independent of the per-action rate limits upstream: caps
// total outbound mail so a burst (or a bug) can't run up sending volume or
// get the Gmail account flagged for abuse.
const SEND_CAP_PER_MINUTE = 20;

let cachedTransporter: ReturnType<typeof nodemailer.createTransport> | null = null;

function getTransporter() {
  const user = process.env.GMAIL_USER;
  const pass = process.env.GMAIL_APP_PASSWORD;
  if (!user || !pass) return null;

  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    });
  }
  return cachedTransporter;
}

type SendResult = { ok: boolean };

export async function sendEmailOtp(to: string, code: string): Promise<SendResult> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[email] Skipping OTP email: GMAIL_USER / GMAIL_APP_PASSWORD not configured.");
    return { ok: false };
  }

  const capped = rateLimit("email:send-cap", SEND_CAP_PER_MINUTE, 60 * 1000);
  if (!capped.ok) {
    console.warn(JSON.stringify({ event: "email.rate_capped", retryAfterMs: capped.retryAfterMs }));
    return { ok: false };
  }

  try {
    await transporter.sendMail({
      from: `TutorConnect <${process.env.GMAIL_USER}>`,
      to,
      subject: `${code} is your TutorConnect verification code`,
      text: `Your verification code is ${code}. It expires in 10 minutes. If you didn't request this, you can ignore this email.`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <p style="font-size: 15px;">Use this code to confirm your new email address on TutorConnect:</p>
          <p style="font-size: 32px; font-weight: 700; letter-spacing: 4px; margin: 20px 0;">${code}</p>
          <p style="font-size: 13px; color: #666;">This code expires in 10 minutes. If you didn't request this, you can safely ignore this email.</p>
        </div>
      `,
    });
    return { ok: true };
  } catch (err) {
    console.error("[email] Failed to send OTP email:", err);
    return { ok: false };
  }
}

export async function sendContactMessage(input: {
  name: string;
  email: string;
  message: string;
}): Promise<SendResult> {
  const transporter = getTransporter();
  if (!transporter) {
    console.warn("[email] Skipping contact message: GMAIL_USER / GMAIL_APP_PASSWORD not configured.");
    return { ok: false };
  }

  const capped = rateLimit("email:send-cap", SEND_CAP_PER_MINUTE, 60 * 1000);
  if (!capped.ok) {
    console.warn(JSON.stringify({ event: "email.rate_capped", retryAfterMs: capped.retryAfterMs }));
    return { ok: false };
  }

  const { name, email, message } = input;
  const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

  try {
    await transporter.sendMail({
      from: `TutorConnect <${process.env.GMAIL_USER}>`,
      to: "tutora.support@gmail.com",
      replyTo: email,
      subject: `New contact form message from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 480px; margin: 0 auto;">
          <p style="font-size: 15px;"><strong>Name:</strong> ${esc(name)}</p>
          <p style="font-size: 15px;"><strong>Email:</strong> ${esc(email)}</p>
          <p style="font-size: 15px;"><strong>Message:</strong></p>
          <p style="font-size: 14px; white-space: pre-wrap;">${esc(message)}</p>
        </div>
      `,
    });
    return { ok: true };
  } catch (err) {
    console.error("[email] Failed to send contact message:", err);
    return { ok: false };
  }
}
