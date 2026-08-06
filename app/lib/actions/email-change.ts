"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { verifyOtpCode, MAX_OTP_ATTEMPTS } from "@/lib/otp";

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
    return { status: "error", message: "This request has expired. Ask your admin to try again." };
  }

  if (req.attempts >= MAX_OTP_ATTEMPTS) {
    await prisma.emailChangeRequest.delete({ where: { userId: session.user.id } });
    return { status: "error", message: "Too many incorrect attempts. Ask your admin to try again." };
  }

  const valid = await verifyOtpCode(code, req.codeHash);
  if (!valid) {
    await prisma.emailChangeRequest.update({ where: { userId: session.user.id }, data: { attempts: { increment: 1 } } });
    return { status: "error", message: "That code isn't right. Please try again." };
  }

  const emailTaken = await prisma.user.findUnique({ where: { email: req.newEmail } });
  if (emailTaken && emailTaken.id !== session.user.id) {
    await prisma.emailChangeRequest.delete({ where: { userId: session.user.id } });
    return { status: "error", message: "That email is no longer available. Ask your admin to try again." };
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
