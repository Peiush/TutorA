"use server";

import { z } from "zod";
import { revalidatePath, updateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { rateLimit } from "@/lib/rate-limit";
import { requireAdmin } from "@/app/lib/actions/admin";
import { logAdminAction } from "@/lib/audit-log";

const TestimonialSchema = z.object({
  role: z.enum(["PARENT", "STUDENT", "TUTOR"]),
  quote: z
    .string()
    .trim()
    .min(20, "Please write at least 20 characters.")
    .max(500, "Testimonials are limited to 500 characters."),
  rating: z.coerce.number().int().min(1).max(5).optional().or(z.literal(0).transform(() => undefined)),
});

export type TestimonialState = {
  ok: boolean;
  message?: string;
  requiresAuth?: boolean;
  errors?: Record<string, string[]>;
};

function revalidateTestimonials() {
  revalidatePath("/");
  revalidatePath("/testimonials");
  updateTag("testimonials");
}

export async function submitTestimonial(input: {
  role: "PARENT" | "STUDENT" | "TUTOR";
  quote: string;
  rating?: number;
}): Promise<TestimonialState> {
  const validated = TestimonialSchema.safeParse(input);
  if (!validated.success) {
    return { ok: false, errors: validated.error.flatten().fieldErrors, message: "Please check your testimonial and try again." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in to share your story." };
  }
  const userId = session.user.id;

  const limited = rateLimit(`testimonial:${userId}`, 5, 24 * 60 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again later." };
  }

  const { role, quote, rating } = validated.data;

  await prisma.testimonial.upsert({
    where: { userId },
    create: { userId, role, quote, rating, approved: false },
    update: { role, quote, rating, approved: false },
  });

  revalidateTestimonials();

  return { ok: true, message: "Thanks — your testimonial has been submitted and is awaiting review." };
}

export async function deleteTestimonial(): Promise<TestimonialState> {
  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in." };
  }
  const userId = session.user.id;

  const limited = rateLimit(`testimonial-delete:${userId}`, 10, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
  }

  const existing = await prisma.testimonial.findUnique({ where: { userId }, select: { id: true } });
  if (!existing) {
    return { ok: false, message: "Testimonial not found." };
  }

  await prisma.testimonial.delete({ where: { userId } });

  revalidateTestimonials();

  return { ok: true, message: "Your testimonial has been removed." };
}

export type TestimonialAdminActionState = { ok: boolean; message?: string };

export async function setTestimonialApproval(id: string, approved: boolean): Promise<TestimonialAdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  const validated = z.string().trim().min(1).safeParse(id);
  if (!validated.success) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  await prisma.testimonial.update({ where: { id: validated.data }, data: { approved } });
  await logAdminAction(admin!, "testimonial.set_approval", "Testimonial", validated.data, { approved });

  revalidateTestimonials();
  revalidatePath("/admin");

  return { ok: true, message: approved ? "Testimonial approved and now live." : "Testimonial hidden." };
}

export async function deleteTestimonialByAdmin(id: string): Promise<TestimonialAdminActionState> {
  const { error, admin } = await requireAdmin();
  if (error) return error;

  const validated = z.string().trim().min(1).safeParse(id);
  if (!validated.success) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  await prisma.testimonial.delete({ where: { id: validated.data } });
  await logAdminAction(admin!, "testimonial.delete", "Testimonial", validated.data);

  revalidateTestimonials();
  revalidatePath("/admin");

  return { ok: true, message: "Testimonial deleted." };
}
