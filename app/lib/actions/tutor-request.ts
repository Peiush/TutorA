"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

const TutorRequestSchema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  email: z.string().trim().email("Please enter a valid email."),
  phone: z.string().trim().optional(),
  subject: z.string().trim().min(1, "Subject is required."),
  level: z.string().trim().optional(),
  goals: z.string().trim().optional(),
  mode: z.string().trim().optional(),
  sessionsPerWeek: z.string().trim().optional(),
  timezone: z.string().trim().optional(),
  currency: z.string().trim().optional(),
  budgetPerHour: z.coerce.number().int().optional(),
  notes: z.string().trim().optional(),
});

export type TutorRequestInput = z.infer<typeof TutorRequestSchema>;

export type TutorRequestState = { ok: boolean; message?: string };

export async function submitTutorRequest(input: TutorRequestInput): Promise<TutorRequestState> {
  const validated = TutorRequestSchema.safeParse(input);
  if (!validated.success) {
    return { ok: false, message: "Please check the details you entered." };
  }

  const session = await auth();

  await prisma.tutorRequest.create({
    data: {
      ...validated.data,
      userId: session?.user?.id,
    },
  });

  return { ok: true };
}

const UpdateTutorRequestSchema = z.object({
  subject: z.string().trim().min(1, "Subject is required."),
  level: z.string().trim().optional(),
  mode: z.string().trim().optional(),
  sessionsPerWeek: z.string().trim().optional(),
  currency: z.string().trim().optional(),
  budgetPerHour: z.coerce.number().int().optional(),
  notes: z.string().trim().optional(),
});

export type UpdateTutorRequestInput = z.infer<typeof UpdateTutorRequestSchema>;
export type TutorRequestActionState = { ok: boolean; message?: string };

async function assertOwnedOpenRequest(id: string) {
  const session = await auth();
  if (!session?.user?.id) {
    return { error: { ok: false as const, message: "You must be signed in." } };
  }

  const existing = await prisma.tutorRequest.findUnique({ where: { id } });
  if (!existing || existing.userId !== session.user.id) {
    return { error: { ok: false as const, message: "Request not found." } };
  }
  if (existing.status !== "OPEN") {
    return { error: { ok: false as const, message: "Only open requests can be changed." } };
  }

  return { existing };
}

export async function updateTutorRequest(
  id: string,
  input: UpdateTutorRequestInput
): Promise<TutorRequestActionState> {
  const validated = UpdateTutorRequestSchema.safeParse(input);
  if (!validated.success) {
    return { ok: false, message: "Please check the details you entered." };
  }

  const { error } = await assertOwnedOpenRequest(id);
  if (error) return error;

  await prisma.tutorRequest.update({ where: { id }, data: validated.data });
  revalidatePath("/dashboard");
  return { ok: true };
}

export async function deleteTutorRequest(id: string): Promise<TutorRequestActionState> {
  const { error } = await assertOwnedOpenRequest(id);
  if (error) return error;

  await prisma.tutorRequest.delete({ where: { id } });
  revalidatePath("/dashboard");
  return { ok: true };
}

const RequestSpecificTutorSchema = z.object({
  tutorName: z.string().trim().min(1),
  subject: z.string().trim().min(1),
  mode: z.string().trim().optional(),
});

export type RequestSpecificTutorInput = z.infer<typeof RequestSpecificTutorSchema>;
export type RequestSpecificTutorState = { ok: boolean; message?: string; requiresAuth?: boolean };

export async function requestSpecificTutor(
  input: RequestSpecificTutorInput
): Promise<RequestSpecificTutorState> {
  const validated = RequestSpecificTutorSchema.safeParse(input);
  if (!validated.success) {
    return { ok: false, message: "Something went wrong. Please try again." };
  }

  const session = await auth();
  if (!session?.user?.id) {
    return { ok: false, requiresAuth: true, message: "Please sign in to request a tutor." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return { ok: false, requiresAuth: true, message: "Please sign in to request a tutor." };
  }

  const { tutorName, subject, mode } = validated.data;

  await prisma.tutorRequest.create({
    data: {
      userId: user.id,
      name: user.name ?? "",
      email: user.email,
      subject,
      mode,
      notes: `Directly requested tutor: ${tutorName}`,
      status: "OPEN",
    },
  });

  revalidatePath("/dashboard");
  return { ok: true, message: `Your request for ${tutorName} has been sent.` };
}
