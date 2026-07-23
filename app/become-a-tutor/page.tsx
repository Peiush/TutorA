import { BecomeForm } from "@/components/become/become-form";
import { BecomeHero } from "@/components/become/become-hero";

export const metadata = {
  title: "Add a Teacher",
  robots: { index: false, follow: false },
};

const adminPerks = [
  "Teacher listings go live immediately — no separate review step.",
  "Every teacher is added by an admin; there is no self-service tutor signup.",
  "Once added, the teacher can be matched against open student requests.",
];

export default function BecomeATutorPage() {
  return (
    <section style={{ background: "var(--color-surface)" }}>
      <BecomeHero perks={adminPerks} form={<BecomeForm />} />
    </section>
  );
}
