import { LegalHero } from "@/components/legal/legal-hero";
import { LegalContent } from "@/components/legal/legal-content";
import { TERMS_SECTIONS } from "@/components/legal/terms-sections";

// Bump when this page's content changes materially — reused as the sitemap's lastmod
// (app/sitemap.ts), same convention as HOMEPAGE_LAST_UPDATED in app/page.tsx.
export const TERMS_LAST_UPDATED = "2026-07-23";

export const metadata = {
  title: "Terms of Service",
  description:
    "TutorA's Terms of Service — how our admin-mediated tutoring marketplace works, fees, verification, and how matches happen.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <div>
      <LegalHero
        eyebrow="Legal"
        title="Terms of Service"
        description={
          <>
            These terms explain how TutorA&rsquo;s admin-mediated marketplace works for
            students and tutors, and what we each agree to by using it. Please read them
            carefully — the sections below cover fees, verification, and how matches happen.
          </>
        }
        updated="July 23, 2026"
      />
      <LegalContent sections={TERMS_SECTIONS} />
    </div>
  );
}
