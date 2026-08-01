"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendSubjectRequestAdminAlert } from "@/lib/notify/whatsapp";
import { priceLabel } from "@/lib/mock-courses";
import { rateLimit } from "@/lib/rate-limit";

const RequestSubjectSchema = z.object({
  subjectId: z.string().trim().min(1),
});

export type RequestSubjectState = { ok: boolean; message?: string; requiresAuth?: boolean; alreadyRequested?: boolean };

export async function requestSubject(subjectId: string): Promise<RequestSubjectState> {
  const validated = RequestSubjectSchema.safeParse({ subjectId });
  if (!validated.success) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in to request a subject." };
  }

  const limited = rateLimit(`subject-request:${session.user.id}`, 20, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return { ok: false, requiresAuth: true, message: "Please sign in to request a subject." };
  }

  const subject = await prisma.subject.findUnique({ where: { id: validated.data.subjectId } });
  if (!subject) {
    return { ok: false, message: "This subject could not be found." };
  }

  const label = subject.title ?? subject.name;

  const existing = await prisma.subjectRequest.findUnique({
    where: { userId_subjectId: { userId: user.id, subjectId: subject.id } },
  });

  if (existing) {
    if (existing.status !== "OPEN") {
      await prisma.subjectRequest.update({ where: { id: existing.id }, data: { status: "OPEN" } });
    }
    revalidatePath("/dashboard");
    revalidatePath("/courses");
    return { ok: true, alreadyRequested: true, message: `Your request for "${label}" has been sent.` };
  }

  await prisma.subjectRequest.create({
    data: { userId: user.id, subjectId: subject.id, status: "OPEN" },
  });

  void sendSubjectRequestAdminAlert({
    name: user.name ?? "N/A",
    email: user.email,
    phone: user.phone || "N/A",
    subject: label,
    gradeLevel: subject.gradeLevel || "N/A",
    price: subject.hourlyRateCents != null ? `${priceLabel(subject.hourlyRateCents)}/hr` : "N/A",
  });

  revalidatePath("/dashboard");
  revalidatePath("/courses");
  return { ok: true, message: `Your request for "${label}" has been sent.` };
}

export type SubjectRequestActionState = { ok: boolean; message?: string };

export async function cancelSubjectRequest(id: string): Promise<SubjectRequestActionState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, message: "You must be signed in." };
  }

  const existing = await prisma.subjectRequest.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return { ok: false, message: "Request not found." };
  }

  await prisma.subjectRequest.delete({ where: { id } });
  revalidatePath("/dashboard");
  revalidatePath("/courses");
  return { ok: true };
}
