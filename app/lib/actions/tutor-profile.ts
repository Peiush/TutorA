"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const TeacherSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Please enter a valid email."),
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
  const session = await auth();
  if (session?.user?.role !== "ADMIN") {
    return { message: "Admins only." };
  }

  const validated = TeacherSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    country: formData.get("country"),
    subjects: formData.get("subjects"),
    yearsExperience: formData.get("yearsExperience"),
    hourlyRate: formData.get("hourlyRate"),
    bio: formData.get("bio"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, country, subjects, yearsExperience, hourlyRate, bio } = validated.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { message: "A user with that email already exists." };
  }

  const hourlyRateCents = hourlyRate
    ? Math.round(parseFloat(hourlyRate.replace(/[^0-9.]/g, "")) * 100) || null
    : null;

  const certificate = formData.get("certificate");
  const certificateUrl = certificate instanceof File && certificate.size > 0 ? certificate.name : null;

  await prisma.user.create({
    data: {
      name,
      email,
      role: "TUTOR",
      tutorProfile: {
        create: {
          country,
          subjects,
          yearsExperience,
          hourlyRateCents,
          bio,
          certificateUrl,
          status: "APPROVED",
        },
      },
    },
  });

  revalidatePath("/admin");
  revalidatePath("/find-a-tutor");
  return { message: "success" };
}
