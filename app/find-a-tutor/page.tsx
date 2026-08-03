import { FindHero } from "@/components/find/find-hero";
import { TutorBrowser } from "@/components/find/tutor-browser";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";

export const metadata = {
  title: "Find a Tutor",
  description:
    "Browse personally verified tutors across subjects and languages. Every listing is reviewed by our team before it's matched with a student.",
  alternates: { canonical: "/find-a-tutor" },
};

export default async function FindATutorPage() {
  const tutors = await getApprovedTutorListings();

  const subjectCount = new Set(tutors.flatMap((t) => t.subjects)).size;
  const tutorCount = new Set(tutors.filter((t) => !t.onDemand).map((t) => t.id)).size;

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <FindHero tutorCount={tutorCount} subjectCount={subjectCount} />
      <TutorBrowser tutors={tutors} />
    </div>
  );
}
