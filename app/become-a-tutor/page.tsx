import { tutorPerks, tutorTestimonials } from "@/lib/mock-data";
import { BecomeForm } from "@/components/become/become-form";
import { BecomeHero } from "@/components/become/become-hero";
import { BecomeTestimonials } from "@/components/become/become-testimonials";

export const metadata = {
  title: "Become a Tutor — TutorConnect",
};

export default function BecomeATutorPage() {
  return (
    <div>
      <section style={{ background: "var(--color-surface)" }}>
        <BecomeHero perks={tutorPerks} form={<BecomeForm />} />
      </section>

      <BecomeTestimonials testimonials={tutorTestimonials} />
    </div>
  );
}
