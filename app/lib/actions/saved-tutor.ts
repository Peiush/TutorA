"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const ToggleSavedTutorSchema = z.object({
  tutorProfileId: z.string().trim().min(1),
});

export type ToggleSavedTutorState = { ok: boolean; saved?: boolean; message?: string; requiresAuth?: boolean };

export async function toggleSavedTutor(tutorProfileId: string): Promise<ToggleSavedTutorState> {
  const validated = ToggleSavedTutorSchema.safeParse({ tutorProfileId });
  if (!validated.success) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in to save tutors." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return { ok: false, requiresAuth: true, message: "Please sign in to save tutors." };
  }

  const existing = await prisma.savedTutor.findUnique({
    where: { userId_tutorProfileId: { userId: user.id, tutorProfileId: validated.data.tutorProfileId } },
  });

  if (existing) {
    await prisma.savedTutor.delete({ where: { id: existing.id } });
    revalidatePath("/dashboard");
    return { ok: true, saved: false };
  }

  await prisma.savedTutor.create({
    data: { userId: user.id, tutorProfileId: validated.data.tutorProfileId },
  });
  revalidatePath("/dashboard");
  return { ok: true, saved: true };
}
