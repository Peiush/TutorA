import { LegalHero } from "@/components/legal/legal-hero";
import { LegalContent } from "@/components/legal/legal-content";
import { PRIVACY_SECTIONS } from "@/components/legal/privacy-sections";

// Bump when this page's content changes materially — reused as the sitemap's lastmod
// (app/sitemap.ts), same convention as HOMEPAGE_LAST_UPDATED in app/page.tsx.
export const PRIVACY_LAST_UPDATED = "2026-07-23";

export const metadata = {
  title: "Privacy Policy",
  description:
    "TutorA's Privacy Policy — what personal information we collect, how we use it to review requests and propose matches, and your choices.",
  alternates: { canonical: "/privacy" },
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
