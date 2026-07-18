"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const TutorProfileSchema = z.object({
  country: z.string().trim().min(2, "Country is required."),
  subjects: z.string().trim().min(2, "List at least one subject."),
  yearsExperience: z.coerce.number().int().min(0).optional().or(z.literal("").transform(() => undefined)),
  hourlyRate: z.string().trim().optional(),
  bio: z.string().trim().optional(),
});

export type TutorProfileState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
    }
  | undefined;

export async function submitTutorProfile(
  _state: TutorProfileState,
  formData: FormData
): Promise<TutorProfileState> {
  const validated = TutorProfileSchema.safeParse({
    country: formData.get("country"),
    subjects: formData.get("subjects"),
    yearsExperience: formData.get("yearsExperience"),
    hourlyRate: formData.get("hourlyRate"),
    bio: formData.get("bio"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const session = await auth();
  if (!session?.user) {
    return { message: "Create a tutor account first, then submit your listing." };
  }

  const { country, subjects, yearsExperience, hourlyRate, bio } = validated.data;

  const hourlyRateCents = hourlyRate
    ? Math.round(parseFloat(hourlyRate.replace(/[^0-9.]/g, "")) * 100) || null
    : null;

  const certificate = formData.get("certificate");
  const certificateUrl = certificate instanceof File && certificate.size > 0 ? certificate.name : null;

  await prisma.tutorProfile.upsert({
    where: { userId: session.user.id },
    update: { country, subjects, yearsExperience, hourlyRateCents, bio, certificateUrl, status: "PENDING" },
    create: {
      userId: session.user.id,
      country,
      subjects,
      yearsExperience,
      hourlyRateCents,
      bio,
      certificateUrl,
    },
  });

  return { message: "success" };
}
