import { FindHero } from "@/components/find/find-hero";
import { TutorBrowser } from "@/components/find/tutor-browser";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { auth } from "@/auth";

export const metadata = {
  title: "Find a Tutor — TutorConnect",
};

export default async function FindATutorPage() {
  const [tutors, session] = await Promise.all([getApprovedTutorListings(), auth()]);
  const isAdmin = session?.user?.role === "ADMIN";

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <FindHero />
      <TutorBrowser tutors={tutors} isAdmin={isAdmin} />
    </div>
  );
}
