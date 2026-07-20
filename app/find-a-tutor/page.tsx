import { FindHero } from "@/components/find/find-hero";
import { TutorBrowser } from "@/components/find/tutor-browser";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { tutorsRaw } from "@/lib/mock-data";

export const metadata = {
  title: "Find a Tutor — TutorConnect",
};

export default async function FindATutorPage() {
  const approvedTutors = await getApprovedTutorListings();
  const tutors = [...approvedTutors, ...tutorsRaw];

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <FindHero />
      <TutorBrowser tutors={tutors} />
    </div>
  );
}
