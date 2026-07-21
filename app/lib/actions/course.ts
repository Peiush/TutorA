"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin, type AdminActionState } from "@/app/lib/actions/admin";
import { CATEGORY_LABEL_TO_DB, LEVEL_LABEL_TO_DB, courseCategories } from "@/lib/mock-courses";

const CourseSchema = z.object({
  title: z.string().trim().min(3, "Title is required."),
  subtitle: z.string().trim().optional(),
  instructorId: z.string().trim().min(1, "Choose an instructor."),
  category: z.enum(courseCategories as [string, ...string[]], { message: "Choose a category." }),
  level: z.enum(["Beginner", "Intermediate", "All Levels"], { message: "Choose a level." }),
  price: z.string().trim().min(1, "Price is required."),
  originalPrice: z.string().trim().min(1, "Original price is required."),
  durationHours: z.coerce.number().positive("Duration must be greater than 0."),
  lectureCount: z.coerce.number().int().positive("Lecture count must be greater than 0."),
  whatYoullLearn: z.string().trim().min(3, "Add at least one learning outcome."),
  bestseller: z.string().optional(),
  premium: z.string().optional(),
  isNew: z.string().optional(),
});

export type CourseFormState =
  | {
      errors?: Record<string, string[]>;
      message?: string;
    }
  | undefined;

function toCents(value: string) {
  const n = parseFloat(value.replace(/[^0-9.]/g, ""));
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

async function saveCourse(_state: CourseFormState, formData: FormData, existingId?: string): Promise<CourseFormState> {
  const session = await requireAdmin();
  if (session.error) return { message: session.error.message };

  const validated = CourseSchema.safeParse({
    title: formData.get("title"),
    subtitle: formData.get("subtitle") ?? undefined,
    instructorId: formData.get("instructorId"),
    category: formData.get("category"),
    level: formData.get("level"),
    price: formData.get("price"),
    originalPrice: formData.get("originalPrice"),
    durationHours: formData.get("durationHours"),
    lectureCount: formData.get("lectureCount"),
    whatYoullLearn: formData.get("whatYoullLearn"),
    bestseller: formData.get("bestseller") ?? undefined,
    premium: formData.get("premium") ?? undefined,
    isNew: formData.get("isNew") ?? undefined,
  });

  if (!validated.success) {
    return { errors: validated.error.flatten().fieldErrors };
  }

  const d = validated.data;
  const data = {
    title: d.title,
    subtitle: d.subtitle || null,
    instructorId: d.instructorId,
    category: CATEGORY_LABEL_TO_DB[d.category as keyof typeof CATEGORY_LABEL_TO_DB] as never,
    level: LEVEL_LABEL_TO_DB[d.level as keyof typeof LEVEL_LABEL_TO_DB] as never,
    priceCents: toCents(d.price),
    originalPriceCents: toCents(d.originalPrice),
    durationHours: d.durationHours,
    lectureCount: d.lectureCount,
    whatYoullLearn: d.whatYoullLearn
      .split("\n")
      .map((s) => s.trim())
      .filter(Boolean)
      .join("\n"),
    bestseller: d.bestseller === "on",
    premium: d.premium === "on",
    isNew: d.isNew === "on",
  };

  if (existingId) {
    await prisma.course.update({ where: { id: existingId }, data });
  } else {
    await prisma.course.create({ data });
  }

  revalidatePath("/admin");
  revalidatePath("/courses");
  return { message: "success" };
}

export async function createCourse(state: CourseFormState, formData: FormData): Promise<CourseFormState> {
  return saveCourse(state, formData);
}

export async function updateCourse(state: CourseFormState, formData: FormData): Promise<CourseFormState> {
  const id = formData.get("id");
  if (typeof id !== "string" || !id) {
    return { message: "Missing course." };
  }
  return saveCourse(state, formData, id);
}

export async function deleteCourse(id: string): Promise<AdminActionState> {
  const { error } = await requireAdmin();
  if (error) return error;

  await prisma.course.delete({ where: { id } });
  revalidatePath("/admin");
  revalidatePath("/courses");
  return { ok: true };
}
