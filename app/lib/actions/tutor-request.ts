"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";
import { sendCustomTutorRequestAdminAlert, sendListedTutorRequestAdminAlert, formatMode } from "@/lib/notify/whatsapp";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

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
  const ip = await getClientIp();
  const limited = rateLimit(`tutor-request:ip:${ip}`, 5, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
  }

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

  const d = validated.data;
  void sendCustomTutorRequestAdminAlert({
    name: d.name,
    email: d.email,
    phone: d.phone || "N/A",
    subject: d.subject,
    level: d.level || "N/A",
    mode: formatMode(d.mode),
    goals: d.goals || "N/A",
    sessionsPerWeek: d.sessionsPerWeek || "N/A",
    timezone: d.timezone || "N/A",
    budget: d.budgetPerHour ? `${d.budgetPerHour}${d.currency ? ` ${d.currency}` : ""}/hr` : "N/A",
    notes: d.notes || "N/A",
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
  tutorRate: z.string().trim().optional(),
  tutorProfileId: z.string().trim().optional(),
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

  const limited = rateLimit(`tutor-request-specific:${session.user.id}`, 20, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return { ok: false, requiresAuth: true, message: "Please sign in to request a tutor." };
  }

  const { tutorName, subject, mode, tutorRate, tutorProfileId } = validated.data;

  if (tutorProfileId) {
    const existing = await prisma.tutorRequest.findFirst({
      where: {
        userId: user.id,
        requestedTutorProfileId: tutorProfileId,
        status: { in: ["OPEN", "MATCHED"] },
      },
    });
    if (existing) {
      return { ok: false, message: `You've already sent a request to ${tutorName}.` };
    }
  }

  await prisma.tutorRequest.create({
    data: {
      userId: user.id,
      name: user.name ?? "",
      email: user.email,
      subject,
      mode,
      notes: `Directly requested tutor: ${tutorName}`,
      status: "OPEN",
      requestedTutorName: tutorName,
      requestedTutorRate: tutorRate,
      requestedTutorProfileId: tutorProfileId,
    },
  });

  void sendListedTutorRequestAdminAlert({
    name: user.name ?? "N/A",
    email: user.email,
    phone: user.phone || "N/A",
    tutorName,
    subject,
    price: tutorRate || "N/A",
  });

  revalidatePath("/dashboard");
  revalidatePath("/find-a-tutor");
  revalidatePath("/");
  return { ok: true, message: `Your request for ${tutorName} has been sent.` };
}
