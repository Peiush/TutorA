"use server";

import { z } from "zod";
import { revalidatePath, updateTag } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/app/lib/actions/admin";
import { logAdminAction } from "@/lib/audit-log";
import { makeSlug } from "@/lib/slug";

const TeacherSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z
    .string()
    .trim()
    .min(7, "Please enter a valid phone number.")
    .regex(/^[+\d][\d\s-]*$/, "Please enter a valid phone number."),
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
  const { error, admin } = await requireAdmin();
  if (error) return { message: error.message };

  const validated = TeacherSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    country: formData.get("country"),
    subjects: formData.get("subjects"),
    yearsExperience: formData.get("yearsExperience"),
    hourlyRate: formData.get("hourlyRate"),
    bio: formData.get("bio"),
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const { name, email, phone, country, subjects, yearsExperience, hourlyRate, bio } = validated.data;

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { message: "A user with that email already exists." };
  }

  const hourlyRateCents = hourlyRate
    ? Math.round(parseFloat(hourlyRate.replace(/[^0-9.]/g, "")) * 100) || null
    : null;

  const certificate = formData.get("certificate");
  const certificateUrl = certificate instanceof File && certificate.size > 0 ? certificate.name : null;

  const created = await prisma.user.create({
    data: {
      name,
      email,
      phone,
      role: "TUTOR",
      tutorProfile: {
        create: {
          slug: makeSlug(name),
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
  await logAdminAction(admin!, "tutor_profile.create", "User", created.id);

  revalidatePath("/admin");
  revalidatePath("/find-a-tutor");
  updateTag("tutor-listings");
  return { message: "success" };
}
