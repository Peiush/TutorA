"use server";

import { z } from "zod";
import { revalidatePath, updateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { logAdminAction } from "@/lib/audit-log";
import { logSecurityEvent } from "@/lib/security-log";
import { generateOtpCode, hashOtpCode, OTP_TTL_MS } from "@/lib/otp";
import { sendPhoneOtpWhatsApp } from "@/lib/notify/whatsapp";

export type AdminActionState = { ok: boolean; message?: string };
export type AdminSession = { id: string; email: string };

/**
 * Re-checks the caller's role against the database rather than trusting the
 * JWT's role claim, which is only refreshed at login. Without this, demoting
 * or rejecting an admin doesn't take effect until their session expires.
 */
export async function requireAdmin(): Promise<{ error?: AdminActionState; admin?: AdminSession }> {
  const session = await auth();
  if (!session?.user?.id) {
    logSecurityEvent("admin.rejected", { reason: "unauthenticated" });
    return { error: { ok: false, message: "Admins only." } };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id }, select: { role: true, email: true } });
  if (user?.role !== "ADMIN") {
    logSecurityEvent("admin.rejected", { reason: "not_admin", userId: session.user.id, role: user?.role ?? null });
    return { error: { ok: false, message: "Admins only." } };
  }

  return { admin: { id: session.user.id, email: user.email } };
}

export async function deleteTutorProfile(id: string): Promise<AdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  await prisma.tutorProfile.delete({ where: { id } });
  await logAdminAction(admin!, "tutor_profile.delete", "TutorProfile", id);
  revalidatePath("/admin");
  revalidatePath("/find-a-tutor");
  updateTag("tutor-listings");
  return { ok: true };
}

const EditTutorSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  country: z.string().trim().min(2, "Country is required."),
  subjects: z.string().trim().min(2, "List at least one subject."),
  yearsExperience: z.coerce.number().int().min(0).optional().or(z.literal("").transform(() => undefined)),
  hourlyRate: z.string().trim().optional(),
  bio: z.string().trim().optional(),
});

export type EditTutorState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
    }
  | undefined;

export async function updateTutorProfileByAdmin(
  _state: EditTutorState,
  formData: FormData
): Promise<EditTutorState> {
  const { error, admin } = await requireAdmin();
  if (error) return { message: error.message };

  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { message: "Missing tutor listing." };
  }

  const validated = EditTutorSchema.safeParse({
    name: formData.get("name"),
    country: formData.get("country"),
    subjects: formData.get("subjects"),
    yearsExperience: formData.get("yearsExperience"),
    hourlyRate: formData.get("hourlyRate"),
    bio: formData.get("bio"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, country, subjects, yearsExperience, hourlyRate, bio } = validated.data;
  const hourlyRateCents = hourlyRate
    ? Math.round(parseFloat(hourlyRate.replace(/[^0-9.]/g, "")) * 100) || null
    : null;

  const profile = await prisma.tutorProfile.findUnique({ where: { id }, select: { userId: true } });
  if (!profile) {
    return { message: "Tutor listing not found." };
  }

  await prisma.$transaction([
    prisma.user.update({ where: { id: profile.userId }, data: { name } }),
    prisma.tutorProfile.update({
      where: { id },
      data: { country, subjects, yearsExperience, hourlyRateCents, bio },
    }),
  ]);
  await logAdminAction(admin!, "tutor_profile.update", "TutorProfile", id);

  revalidatePath("/admin");
  revalidatePath("/find-a-tutor");
  updateTag("tutor-listings");
  return { message: "success" };
}

export async function setTutorProfileStatus(
  id: string,
  status: "APPROVED" | "REJECTED"
): Promise<AdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  await prisma.tutorProfile.update({ where: { id }, data: { status } });
  await logAdminAction(admin!, "tutor_profile.set_status", "TutorProfile", id, { status });
  revalidatePath("/admin");
  revalidatePath("/find-a-tutor");
  updateTag("tutor-listings");
  return { ok: true };
}

export async function setTutorRequestStatus(
  id: string,
  status: "OPEN" | "MATCHED" | "CLOSED"
): Promise<AdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  await prisma.tutorRequest.update({ where: { id }, data: { status } });
  await logAdminAction(admin!, "tutor_request.set_status", "TutorRequest", id, { status });
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/tutor");
  return { ok: true };
}

export async function matchTutorRequest(id: string, tutorUserId: string): Promise<AdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  const tutorProfile = await prisma.tutorProfile.findUnique({ where: { userId: tutorUserId } });
  if (!tutorProfile || tutorProfile.status !== "APPROVED") {
    return { ok: false, message: "Selected tutor is not an approved listing." };
  }

  await prisma.tutorRequest.update({
    where: { id },
    data: { status: "MATCHED", matchedTutorId: tutorUserId },
  });
  await logAdminAction(admin!, "tutor_request.match", "TutorRequest", id, { tutorUserId });
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/tutor");
  return { ok: true };
}

export async function setCourseRequestStatus(
  id: string,
  status: "OPEN" | "CLOSED"
): Promise<AdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  await prisma.courseRequest.update({ where: { id }, data: { status } });
  await logAdminAction(admin!, "course_request.set_status", "CourseRequest", id, { status });
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function setSubjectRequestStatus(
  id: string,
  status: "OPEN" | "CLOSED"
): Promise<AdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  await prisma.subjectRequest.update({ where: { id }, data: { status } });
  await logAdminAction(admin!, "subject_request.set_status", "SubjectRequest", id, { status });
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  return { ok: true };
}

const NewEmailSchema = z.string().trim().toLowerCase().email("Enter a valid email address.");

// Admins can't set a user's email directly — it's the login identifier, so a
// silent admin-side write would let anyone with admin access take over an
// account. Instead this proposes the change and texts the target user a code
// via WhatsApp; the change only lands once they enter it (confirmEmailChange
// in app/lib/actions/email-change.ts).
export async function requestEmailChange(userId: string, newEmailRaw: string): Promise<AdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  const parsed = NewEmailSchema.safeParse(newEmailRaw);
  if (!parsed.success) {
    return { ok: false, message: parsed.error.issues[0]?.message ?? "Enter a valid email address." };
  }
  const newEmail = parsed.data;

  const target = await prisma.user.findUnique({ where: { id: userId }, select: { id: true, email: true, phone: true } });
  if (!target) return { ok: false, message: "User not found." };
  if (target.email.toLowerCase() === newEmail) {
    return { ok: false, message: "That's already their current email." };
  }
  if (!target.phone) {
    return { ok: false, message: "This user has no phone on file — confirmation is sent via WhatsApp, so add a phone number first." };
  }

  const emailTaken = await prisma.user.findUnique({ where: { email: newEmail } });
  if (emailTaken) return { ok: false, message: "Another account already uses that email." };

  const code = generateOtpCode();
  const codeHash = await hashOtpCode(code);
  const expiresAt = new Date(Date.now() + OTP_TTL_MS);

  await prisma.emailChangeRequest.upsert({
    where: { userId: target.id },
    update: { newEmail, codeHash, attempts: 0, expiresAt },
    create: { userId: target.id, newEmail, codeHash, attempts: 0, expiresAt },
  });
  await logAdminAction(admin!, "user.request_email_change", "User", target.id, { newEmail });
  revalidatePath("/admin");

  const sendResult = await sendPhoneOtpWhatsApp(target.phone, code);
  if (!sendResult.ok) {
    return {
      ok: true,
      message: `Request saved, but the WhatsApp message to ${target.phone} may not have sent — check delivery before relying on it.`,
    };
  }
  return { ok: true, message: `Verification code sent to ${target.phone}.` };
}

export async function cancelEmailChangeRequest(userId: string): Promise<AdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  await prisma.emailChangeRequest.deleteMany({ where: { userId } });
  await logAdminAction(admin!, "user.cancel_email_change", "User", userId);
  revalidatePath("/admin");
  return { ok: true };
}
