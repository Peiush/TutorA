"use server";

import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/lib/actions/admin";
import { logAdminAction } from "@/lib/audit-log";
import {
  generateTotpSecret,
  generateTotpQrCodeDataUrl,
  verifyTotpCode,
  generateBackupCodes,
  hashBackupCodes,
} from "@/lib/mfa";

export type MfaStatusState = { enabled: boolean };

export async function getMfaStatus(): Promise<MfaStatusState> {
  const { error, admin } = await requireAdmin();
  if (error) return { enabled: false };

  const user = await prisma.user.findUnique({ where: { id: admin!.id }, select: { twoFactorEnabled: true } });
  return { enabled: user?.twoFactorEnabled ?? false };
}

export type StartMfaEnrollmentState = { ok: boolean; message?: string; qrCodeDataUrl?: string; secret?: string };

export async function startMfaEnrollment(): Promise<StartMfaEnrollmentState> {
  const { error, admin } = await requireAdmin();
  if (error) return { ok: false, message: error.message };

  const secret = generateTotpSecret();
  await prisma.user.update({ where: { id: admin!.id }, data: { twoFactorSecret: secret, twoFactorEnabled: false } });

  const qrCodeDataUrl = await generateTotpQrCodeDataUrl(admin!.email, secret);
  return { ok: true, qrCodeDataUrl, secret };
}

export type ConfirmMfaEnrollmentState = { ok: boolean; message?: string; backupCodes?: string[] };

export async function confirmMfaEnrollment(code: string): Promise<ConfirmMfaEnrollmentState> {
  const { error, admin } = await requireAdmin();
  if (error) return { ok: false, message: error.message };

  const user = await prisma.user.findUnique({ where: { id: admin!.id }, select: { twoFactorSecret: true } });
  if (!user?.twoFactorSecret) {
    return { ok: false, message: "Start enrollment first." };
  }

  if (!(await verifyTotpCode(user.twoFactorSecret, code))) {
    return { ok: false, message: "That code didn't match. Check your authenticator app and try again." };
  }

  const backupCodes = generateBackupCodes();
  const hashed = await hashBackupCodes(backupCodes);

  await prisma.user.update({
    where: { id: admin!.id },
    data: { twoFactorEnabled: true, twoFactorBackupCodes: hashed },
  });
  await logAdminAction(admin!, "mfa.enable", "User", admin!.id);

  return { ok: true, backupCodes };
}

export type DisableMfaState = { ok: boolean; message?: string };

export async function disableMfa(): Promise<DisableMfaState> {
  const { error, admin } = await requireAdmin();
  if (error) return { ok: false, message: error.message };

  await prisma.user.update({
    where: { id: admin!.id },
    data: { twoFactorEnabled: false, twoFactorSecret: null, twoFactorBackupCodes: [] },
  });
  await logAdminAction(admin!, "mfa.disable", "User", admin!.id);

  return { ok: true };
}
