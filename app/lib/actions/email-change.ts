"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { generateOtpCode, hashOtpCode, verifyOtpCode, OTP_TTL_MS, MAX_OTP_ATTEMPTS } from "@/lib/otp";
import { sendEmailOtp } from "@/lib/notify/email";
import { rateLimit } from "@/lib/rate-limit";

const NewEmailSchema = z.string().trim().toLowerCase().email("Enter a valid email address.");

export type RequestEmailChangeState =
  | { status: "error"; message: string }
  | { status: "success"; newEmail: string }
  | undefined;

// Self-service email change: the user proposes their own new address and we
// email a code to that NEW address (proves they control it) before it
// replaces User.email. No admin involvement — anyone who can read the code
// sent to the new inbox can confirm it via confirmEmailChange below.
export async function requestSelfEmailChange(
  _state: RequestEmailChangeState,
  formData: FormData
): Promise<RequestEmailChangeState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { status: "error", message: "Your session expired. Please log in again." };
  }

  const parsed = NewEmailSchema.safeParse(formData.get("newEmail"));
  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Enter a valid email address." };
  }
  const newEmail = parsed.data;

  const limited = rateLimit(`email-change:${session.user.id}`, 3, 15 * 60 * 1000);
  if (!limited.ok) {
    return { status: "error", message: "Too many requests. Please wait a few minutes and try again." };
  }

  const current = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, password: true },
  });
  if (current?.email.toLowerCase() === newEmail) {
    return { status: "error", message: "That's already your current email." };
  }

  // Google links to this account by its own internal account ID, not by
  // email, so changing User.email here wouldn't change which Google account
  // can sign in — it would just let the stored email drift away from the
  // identity that actually owns the login. Worse, if the user later signs in
  // with a second Google account that happens to match the new address,
  // allowDangerousEmailAccountLinking (auth.ts) would silently attach it to
  // this same profile. Accounts with a password aren't affected — email IS
  // their login identity, so changing it is safe and expected.
  if (!current?.password) {
    return {
      status: "error",
      message: "Your email is managed by your Google account and can't be changed here.",
    };
  }

  const emailTaken = await prisma.user.findUnique({ where: { email: newEmail } });
  if (emailTaken) {
    return { status: "error", message: "Another account already uses that email." };
  }

  const code = generateOtpCode();
  const codeHash = await hashOtpCode(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await prisma.emailChangeRequest.upsert({
    where: { userId: session.user.id },
    update: { newEmail, codeHash, attempts: 0, expiresAt },
    create: { userId: session.user.id, newEmail, codeHash, attempts: 0, expiresAt },
  });
  revalidatePath("/dashboard");
  revalidatePath("/tutor");

  const sendResult = await sendEmailOtp(newEmail, code);
  if (!sendResult.ok) {
    await prisma.emailChangeRequest.deleteMany({ where: { userId: session.user.id } });
    revalidatePath("/dashboard");
    revalidatePath("/tutor");
    return { status: "error", message: "Couldn't send the verification email. Please try again in a moment." };
  }

  return { status: "success", newEmail };
}

export type EmailChangeConfirmState =
  | { status: "error"; message: string }
  | { status: "success"; email: string }
  | undefined;

export async function getPendingEmailChange() {
  const session = await auth();
  if (!session?.user?.id) return null;

  const req = await prisma.emailChangeRequest.findUnique({ where: { userId: session.user.id } });
  if (!req) return null;

  if (req.expiresAt < new Date()) {
    await prisma.emailChangeRequest.delete({ where: { userId: session.user.id } }).catch(() => {});
    return null;
  }

  return { newEmail: req.newEmail, expiresAt: req.expiresAt };
}

export async function confirmEmailChange(
  _state: EmailChangeConfirmState,
  formData: FormData
): Promise<EmailChangeConfirmState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { status: "error", message: "Your session expired. Please log in again." };
  }

  const code = String(formData.get("code") ?? "").trim();
  if (!code) return { status: "error", message: "Enter the code we sent you." };

  const req = await prisma.emailChangeRequest.findUnique({ where: { userId: session.user.id } });
  if (!req || req.expiresAt < new Date()) {
    await prisma.emailChangeRequest.deleteMany({ where: { userId: session.user.id } });
    return { status: "error", message: "This request has expired. Please start over." };
  }

  if (req.attempts >= MAX_OTP_ATTEMPTS) {
    await prisma.emailChangeRequest.delete({ where: { userId: session.user.id } });
    return { status: "error", message: "Too many incorrect attempts. Please start over." };
  }

  const valid = await verifyOtpCode(code, req.codeHash);
  if (!valid) {
    await prisma.emailChangeRequest.update({ where: { userId: session.user.id }, data: { attempts: { increment: 1 } } });
    return { status: "error", message: "That code isn't right. Please try again." };
  }

  const emailTaken = await prisma.user.findUnique({ where: { email: req.newEmail } });
  if (emailTaken && emailTaken.id !== session.user.id) {
    await prisma.emailChangeRequest.delete({ where: { userId: session.user.id } });
    return { status: "error", message: "That email is no longer available. Please start over." };
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: session.user.id }, data: { email: req.newEmail, emailVerified: new Date() } }),
    prisma.emailChangeRequest.delete({ where: { userId: session.user.id } }),
  ]);

  revalidatePath("/dashboard");
  revalidatePath("/tutor");
  revalidatePath("/admin");
  return { status: "success", email: req.newEmail };
}

export async function dismissEmailChangeRequest(): Promise<{ ok: boolean }> {
  const session = await auth();
  if (!session?.user?.id) return { ok: false };

  await prisma.emailChangeRequest.deleteMany({ where: { userId: session.user.id } });
  revalidatePath("/dashboard");
  revalidatePath("/tutor");
  return { ok: true };
}
