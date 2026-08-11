"use server";

import { z } from "zod";
import { sendContactMessage } from "@/lib/notify/email";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

const ContactMessageSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name."),
  email: z.string().trim().email("Please enter a valid email."),
  message: z.string().trim().min(5, "Please enter a message."),
});

export type ContactMessageInput = z.infer<typeof ContactMessageSchema>;
export type ContactMessageState = { ok: boolean; message?: string };

export async function submitContactMessage(input: ContactMessageInput): Promise<ContactMessageState> {
  const ip = await getClientIp();
  const limited = rateLimit(`contact-message:ip:${ip}`, 5, 10 * 60 * 1000);
  if (!limited.ok) {
    return { ok: false, message: "Too many requests. Please try again in a few minutes." };
  }

  const validated = ContactMessageSchema.safeParse(input);
  if (!validated.success) {
    return { ok: false, message: "Please check the details you entered." };
  }

  const result = await sendContactMessage(validated.data);
  if (!result.ok) {
    return { ok: false, message: "Something went wrong. Please try again later." };
  }

  return { ok: true };
}
