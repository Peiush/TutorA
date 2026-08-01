"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendSavedTutorAdminAlert, formatMode } from "@/lib/notify/whatsapp";
import { rateLimit } from "@/lib/rate-limit";

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

  const limited = rateLimit(`saved-tutor:${session.user.id}`, 30, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
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

  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { id: validated.data.tutorProfileId },
    include: { user: true },
  });
  void sendSavedTutorAdminAlert({
    name: user.name ?? "N/A",
    email: user.email,
    phone: user.phone || "N/A",
    tutorName: tutorProfile?.user.name ?? "Unknown",
    tutorPhone: tutorProfile?.user.phone || "N/A",
    subject: tutorProfile?.subjects ?? "N/A",
    mode: formatMode("Both"),
    price: tutorProfile?.hourlyRateCents ? `$${Math.round(tutorProfile.hourlyRateCents / 100)}/hr` : "Rate on request",
  });

  revalidatePath("/dashboard");
  return { ok: true, saved: true };
}
