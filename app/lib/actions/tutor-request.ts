"use server";

import { z } from "zod";
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
