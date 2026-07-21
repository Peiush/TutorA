"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendAdminWhatsApp } from "@/lib/notify/whatsapp";

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
  void sendAdminWhatsApp(
    [
      "Course saved:",
      `Student: ${user.name ?? "N/A"}`,
      `Email: ${user.email}`,
      `Phone: ${user.phone || "N/A"}`,
      `Course: ${course?.title ?? "Unknown"}`,
      `Instructor: ${course?.instructor.user.name ?? "N/A"}`,
      `Instructor phone: ${course?.instructor.user.phone || "N/A"}`,
    ].join("\n")
  );

  revalidatePath("/dashboard");
  revalidatePath("/courses");
  return { ok: true, saved: true };
}
