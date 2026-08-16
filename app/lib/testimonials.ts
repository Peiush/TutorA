import "server-only";
import { unstable_cache } from "next/cache";
import { prisma } from "@/lib/prisma";
import { auth } from "@/auth";

export type TestimonialRole = "PARENT" | "STUDENT" | "TUTOR";

export interface TestimonialItem {
  id: string;
  name: string;
  role: TestimonialRole;
  quote: string;
  rating: number | null;
  createdAt: string;
}

async function fetchApprovedTestimonials(): Promise<TestimonialItem[]> {
  const rows = await prisma.testimonial.findMany({
    where: { approved: true },
    orderBy: { createdAt: "desc" },
    include: { user: { select: { name: true } } },
  });

  return rows.map((t) => ({
    id: t.id,
    name: t.user.name ?? "TutorA member",
    role: t.role,
    quote: t.quote,
    rating: t.rating,
    createdAt: t.createdAt.toISOString(),
  }));
}

const getCachedApprovedTestimonials = unstable_cache(fetchApprovedTestimonials, ["testimonials-approved"], {
  tags: ["testimonials"],
  revalidate: 60,
});

export async function getHomepageTestimonials(limit = 6): Promise<TestimonialItem[]> {
  const all = await getCachedApprovedTestimonials();
  return all.slice(0, limit);
}

export async function getAllApprovedTestimonials(): Promise<TestimonialItem[]> {
  return getCachedApprovedTestimonials();
}

export interface MyTestimonial {
  id: string;
  role: TestimonialRole;
  quote: string;
  rating: number | null;
  approved: boolean;
}

export async function getMyTestimonial(): Promise<MyTestimonial | null> {
  const session = await auth();
  if (!session?.user?.id) return null;

  const row = await prisma.testimonial.findUnique({
    where: { userId: session.user.id },
    select: { id: true, role: true, quote: true, rating: true, approved: true },
  });

  return row;
}
