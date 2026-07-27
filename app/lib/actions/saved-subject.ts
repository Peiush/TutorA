"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendAdminWhatsApp } from "@/lib/notify/whatsapp";
import { rateLimit } from "@/lib/rate-limit";

const ToggleSavedSubjectSchema = z.object({
  subjectId: z.string().trim().min(1),
});

export type ToggleSavedSubjectState = { ok: boolean; saved?: boolean; message?: string; requiresAuth?: boolean };

export async function toggleSavedSubject(subjectId: string): Promise<ToggleSavedSubjectState> {
  const validated = ToggleSavedSubjectSchema.safeParse({ subjectId });
  if (!validated.success) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in to save subjects." };
  }

  const limited = rateLimit(`saved-subject:${session.user.id}`, 30, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return { ok: false, requiresAuth: true, message: "Please sign in to save subjects." };
  }

  const existing = await prisma.savedSubject.findUnique({
    where: { userId_subjectId: { userId: user.id, subjectId: validated.data.subjectId } },
  });

  if (existing) {
    await prisma.savedSubject.delete({ where: { id: existing.id } });
    revalidatePath("/courses");
    revalidatePath("/dashboard");
    return { ok: true, saved: false };
  }

  await prisma.savedSubject.create({
    data: { userId: user.id, subjectId: validated.data.subjectId },
  });

  const subject = await prisma.subject.findUnique({ where: { id: validated.data.subjectId } });
  void sendAdminWhatsApp(
    [
      "Subject saved:",
      `Student: ${user.name ?? "N/A"}`,
      `Email: ${user.email}`,
      `Phone: ${user.phone || "N/A"}`,
      `Subject: ${subject?.title ?? subject?.name ?? "Unknown"}`,
      `Grade level: ${subject?.gradeLevel || "N/A"}`,
    ].join("\n")
  );

  revalidatePath("/courses");
  revalidatePath("/dashboard");
  return { ok: true, saved: true };
}
