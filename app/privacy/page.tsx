import { LegalHero } from "@/components/legal/legal-hero";
import { LegalContent } from "@/components/legal/legal-content";
import { PRIVACY_SECTIONS } from "@/components/legal/privacy-sections";

export const metadata = {
  title: "Privacy Policy — TutorA",
};

export default function PrivacyPage() {
  return (
    <div>
      <LegalHero
        eyebrow="Legal"
        title="Privacy Policy"
        description={
          <>
            This policy covers what personal information TutorA collects, how we use it to
            review requests and propose matches, and the choices you have — including how
            data moves when we match with care across borders.
          </>
        }
        updated="July 23, 2026"
      />
      <LegalContent sections={PRIVACY_SECTIONS} />
    </div>
  );
}
