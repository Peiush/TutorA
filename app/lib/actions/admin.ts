"use server";

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
