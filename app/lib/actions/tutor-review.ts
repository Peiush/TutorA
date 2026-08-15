"use server";

import { z } from "zod";
import { revalidatePath, updateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { rateLimit } from "@/lib/rate-limit";

const ReviewSchema = z.object({
  tutorProfileId: z.string().trim().min(1),
  reviewId: z.string().trim().min(1).optional(),
  rating: z.coerce.number().int().min(1, "Pick a rating.").max(5, "Pick a rating."),
  comment: z
    .string()
    .trim()
    .min(10, "Please write at least 10 characters.")
    .max(1000, "Reviews are limited to 1000 characters."),
});

export type TutorReviewState = {
  ok: boolean;
  message?: string;
  requiresAuth?: boolean;
  errors?: Record<string, string[]>;
};

export async function submitTutorReview(input: {
  tutorProfileId: string;
  reviewId?: string;
  rating: number;
  comment: string;
}): Promise<TutorReviewState> {
  const validated = ReviewSchema.safeParse(input);
  if (!validated.success) {
    return { ok: false, errors: validated.error.flatten().fieldErrors, message: "Please check your review and try again." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in to write a review." };
  }
  const userId = session.user.id;

  const limited = rateLimit(`tutor-review:${userId}`, 10, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
  }

  const { tutorProfileId, reviewId, rating, comment } = validated.data;

  const tutorProfile = await prisma.tutorProfile.findUnique({
    where: { id: tutorProfileId },
    select: { id: true, userId: true, status: true, slug: true },
  });
  if (!tutorProfile || tutorProfile.status !== "APPROVED") {
    return { ok: false, message: "This tutor is not available for reviews." };
  }
  if (tutorProfile.userId === userId) {
    return { ok: false, message: "You can't review your own tutor listing." };
  }

  if (reviewId) {
    const existing = await prisma.tutorReview.findUnique({
      where: { id: reviewId },
      select: { userId: true, tutorProfileId: true },
    });
    if (!existing || existing.userId !== userId || existing.tutorProfileId !== tutorProfileId) {
      return { ok: false, message: "Review not found." };
    }
    await prisma.tutorReview.update({ where: { id: reviewId }, data: { rating, comment } });
  } else {
    await prisma.tutorReview.create({ data: { userId, tutorProfileId, rating, comment } });
  }

  revalidatePath("/find-a-tutor");
  revalidatePath(`/find-a-tutor/${tutorProfile.slug}`);
  revalidatePath("/");
  updateTag("tutor-listings");
  updateTag(`tutor-reviews:${tutorProfileId}`);

  return { ok: true, message: reviewId ? "Your review has been updated." : "Thanks — your review has been posted." };
}

export async function deleteTutorReview(reviewId: string): Promise<TutorReviewState> {
  const validated = z.string().trim().min(1).safeParse(reviewId);
  if (!validated.success) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in." };
  }
  const userId = session.user.id;

  const limited = rateLimit(`tutor-review-delete:${userId}`, 20, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
  }

  const existing = await prisma.tutorReview.findUnique({
    where: { id: validated.data },
    select: { id: true, userId: true, tutorProfileId: true, tutorProfile: { select: { slug: true } } },
  });
  if (!existing || existing.userId !== userId) {
    return { ok: false, message: "Review not found." };
  }

  await prisma.tutorReview.delete({ where: { id: existing.id } });

  revalidatePath("/find-a-tutor");
  revalidatePath(`/find-a-tutor/${existing.tutorProfile.slug}`);
  revalidatePath("/");
  updateTag("tutor-listings");
  updateTag(`tutor-reviews:${existing.tutorProfileId}`);

  return { ok: true, message: "Your review has been removed." };
}
