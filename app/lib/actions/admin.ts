"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export type AdminActionState = { ok: boolean; message?: string };

async function requireAdmin(): Promise<{ error?: AdminActionState }> {
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { error: { ok: false, message: "Admins only." } };
  }
  return {};
}

export async function deleteTutorProfile(id: string): Promise<AdminActionState> {
  const { error } = await requireAdmin();
  if (error) return error;

  await prisma.tutorProfile.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/find-a-tutor");
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
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { message: "Admins only." };
  }

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

  revalidatePath("/admin");
  revalidatePath("/find-a-tutor");
  return { message: "success" };
}

export async function setTutorProfileStatus(
  id: string,
  status: "APPROVED" | "REJECTED"
): Promise<AdminActionState> {
  const { error } = await requireAdmin();
  if (error) return error;

  await prisma.tutorProfile.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
  return { ok: true };
}

export async function setTutorRequestStatus(
  id: string,
  status: "OPEN" | "MATCHED" | "CLOSED"
): Promise<AdminActionState> {
  const { error } = await requireAdmin();
  if (error) return error;

  await prisma.tutorRequest.update({ where: { id }, data: { status } });
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/tutor");
  return { ok: true };
}

export async function matchTutorRequest(id: string, tutorUserId: string): Promise<AdminActionState> {
  const { error } = await requireAdmin();
  if (error) return error;

  const tutorProfile = await prisma.tutorProfile.findUnique({ where: { userId: tutorUserId } });
  if (!tutorProfile || tutorProfile.status !== "APPROVED") {
    return { ok: false, message: "Selected tutor is not an approved listing." };
  }

  await prisma.tutorRequest.update({
    where: { id },
    data: { status: "MATCHED", matchedTutorId: tutorUserId },
  });
  revalidatePath("/admin");
  revalidatePath("/dashboard");
  revalidatePath("/tutor");
  return { ok: true };
}
