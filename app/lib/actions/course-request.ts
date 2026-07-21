"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const RequestCourseSchema = z.object({
  courseId: z.string().trim().min(1),
});

export type RequestCourseState = { ok: boolean; message?: string; requiresAuth?: boolean; alreadyRequested?: boolean };

export async function requestCourse(courseId: string): Promise<RequestCourseState> {
  const validated = RequestCourseSchema.safeParse({ courseId });
  if (!validated.success) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in to request a course." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return { ok: false, requiresAuth: true, message: "Please sign in to request a course." };
  }

  const course = await prisma.course.findUnique({ where: { id: validated.data.courseId } });
  if (!course) {
    return { ok: false, message: "This course could not be found." };
  }

  const existing = await prisma.courseRequest.findUnique({
    where: { userId_courseId: { userId: user.id, courseId: course.id } },
  });

  if (existing) {
    if (existing.status !== "OPEN") {
      await prisma.courseRequest.update({ where: { id: existing.id }, data: { status: "OPEN" } });
    }
    revalidatePath("/dashboard");
    revalidatePath("/courses");
    return { ok: true, alreadyRequested: true, message: `Your request for "${course.title}" has been sent.` };
  }

  await prisma.courseRequest.create({
    data: { userId: user.id, courseId: course.id, status: "OPEN" },
  });

  revalidatePath("/dashboard");
  revalidatePath("/courses");
  return { ok: true, message: `Your request for "${course.title}" has been sent.` };
}

export type CourseRequestActionState = { ok: boolean; message?: string };

export async function cancelCourseRequest(id: string): Promise<CourseRequestActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "You must be signed in." };
  }

  const existing = await prisma.courseRequest.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return { ok: false, message: "Request not found." };
  }

  await prisma.courseRequest.delete({ where: { id } });
  revalidatePath("/dashboard");
  revalidatePath("/courses");
  return { ok: true };
}
