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
  const ratedTestimonials = testimonials.filter((testimonial) => testimonial.rating);
  const averageRating = ratedTestimonials.length
    ? (ratedTestimonials.reduce((sum, testimonial) => sum + (testimonial.rating ?? 0), 0) / ratedTestimonials.length).toFixed(1)
    : "—";

  return (
    <main>
      <TestimonialsHero count={testimonials.length} averageRating={averageRating} />

      <section id="share-story" className="relative max-w-[760px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(36px,5vw,64px)]">
        <div className="pointer-events-none absolute -right-16 top-12 hidden h-40 w-40 rounded-full border border-dashed md:block" style={{ borderColor: "var(--color-accent-300)" }} aria-hidden />
        <TestimonialForm isAuthenticated={!!session?.user?.id} existing={myTestimonial} />
      </section>

      <section id="all-stories" style={{ background: "var(--color-surface)" }}>
        <div className="max-w-[1160px] mx-auto px-[clamp(20px,4vw,48px)] py-[clamp(32px,5vw,64px)]">
          <TestimonialsGrid testimonials={testimonials} />
        </div>
      </section>
    </main>
  );
}
