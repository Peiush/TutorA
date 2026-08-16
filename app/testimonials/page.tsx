import type { Metadata } from "next";
import { auth } from "@/auth";
import { getAllApprovedTestimonials, getMyTestimonial } from "@/app/lib/testimonials";
import { TestimonialsHero } from "@/components/testimonials/testimonials-hero";
import { TestimonialForm } from "@/components/testimonials/testimonial-form";
import { TestimonialsGrid } from "@/components/testimonials/testimonials-grid";

export const metadata: Metadata = {
  title: "Testimonials",
  description:
    "Real stories from parents, students and tutors who've used TutorA — and the place to share your own, reviewed by our team before it goes live.",
  alternates: { canonical: "/testimonials" },
};

export default async function TestimonialsPage() {
  const [session, testimonials, myTestimonial] = await Promise.all([
    auth(),
    getAllApprovedTestimonials(),
    getMyTestimonial(),
  ]);

  return (
    <main>
      <TestimonialsHero count={testimonials.length} />

      <section className="max-w-[720px] mx-auto px-[clamp(20px,5vw,64px)] pb-[clamp(32px,6vw,64px)]">
        <TestimonialForm isAuthenticated={!!session?.user?.id} existing={myTestimonial} />
      </section>

      <section style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,6vw,84px)]">
          <TestimonialsGrid testimonials={testimonials} />
        </div>
      </section>
    </main>
  );
}
