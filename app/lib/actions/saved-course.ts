"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendSavedCourseAdminAlert } from "@/lib/notify/whatsapp";
import { rateLimit } from "@/lib/rate-limit";

const ToggleSavedCourseSchema = z.object({
  courseId: z.string().trim().min(1),
});

export type ToggleSavedCourseState = { ok: boolean; saved?: boolean; message?: string; requiresAuth?: boolean };

export async function toggleSavedCourse(courseId: string): Promise<ToggleSavedCourseState> {
  const validated = ToggleSavedCourseSchema.safeParse({ courseId });
  if (!validated.success) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in to save courses." };
  }

  const limited = rateLimit(`saved-course:${session.user.id}`, 30, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return { ok: false, requiresAuth: true, message: "Please sign in to save courses." };
  }

  const existing = await prisma.savedCourse.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: validated.data.courseId } },
  });

  if (existing) {
    await prisma.savedCourse.delete({ where: { id: existing.id } });
    revalidatePath("/dashboard");
    revalidatePath("/courses");
    return { ok: true, saved: false };
  }

  await prisma.savedCourse.create({
    data: { userId: user.id, courseId: validated.data.courseId },
  });

  const course = await prisma.course.findUnique({
    where: { id: validated.data.courseId },
    include: { instructor: { include: { user: true } } },
  });
  void sendSavedCourseAdminAlert({
    name: user.name ?? "N/A",
    email: user.email,
    phone: user.phone || "N/A",
    courseTitle: course?.title ?? "Unknown",
  });

  revalidatePath("/dashboard");
  revalidatePath("/courses");
  return { ok: true, saved: true };
}
