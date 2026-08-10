import type { Metadata } from "next";
import Link from "next/link";
import { getSubjects } from "@/app/lib/subject-listings";
import type { SubjectListing } from "@/app/lib/subject-listings";

const BASE_URL = "https://www.tutora.it.com";
const DESCRIPTION =
  "Every subject TutorA tutors teach, organized by exam board and curriculum — from SAT, ACT, AP, IB, A-Level, and GCSE prep to general academic and coding subjects.";

export const metadata: Metadata = {
  title: "Browse All Subjects — Grade & Curriculum-Specific Tutoring",
  description: DESCRIPTION,
  alternates: { canonical: "/subjects" },
  openGraph: { type: "website", title: "Browse All Subjects — TutorA", description: DESCRIPTION, url: `${BASE_URL}/subjects` },
  twitter: { card: "summary_large_image", title: "Browse All Subjects — TutorA", description: DESCRIPTION },
};

// Curricula ordered so exam/test-prep families (the site's highest-priority, most competitive
// keyword targets per the Phase 3 SXO/cluster audits) surface first, with general subjects
// bucketed last. Anything not listed here (data drift, a new curriculum added later) still
// renders — just sorted after this list — so nothing silently disappears from the page.
const CURRICULUM_ORDER = [
  "SAT",
  "ACT",
  "AP",
  "IB",
  "A-Level",
  "GCSE",
  "Cambridge",
  "UK Entrance",
  "American",
  "USA",
  "UK",
  "Singapore",
  "International",
];

function curriculumRank(curriculum: string): number {
  const i = CURRICULUM_ORDER.indexOf(curriculum);
  return i === -1 ? CURRICULUM_ORDER.length : i;
}

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Subjects", item: `${BASE_URL}/subjects` },
  ],
};

export default async function SubjectsIndexPage() {
  const subjects = await getSubjects();

  const groups = new Map<string, SubjectListing[]>();
  for (const s of subjects) {
    const key = s.curriculum ?? "General Subjects";
    const list = groups.get(key) ?? [];
    list.push(s);
    groups.set(key, list);
  }

  const sortedGroups = Array.from(groups.entries()).sort(
    ([a], [b]) => curriculumRank(a) - curriculumRank(b) || a.localeCompare(b)
  );

  // CollectionPage + plain ItemList (not typed as individual Course entities) mirrors the
  // fix already applied on /courses for the same schema.org type-mismatch reason.
  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Subjects",
    description: DESCRIPTION,
    url: `${BASE_URL}/subjects`,
    isPartOf: { "@type": "WebSite", name: "TutorA", url: BASE_URL },
    about: { "@type": "Organization", name: "TutorA", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      itemListElement: subjects.map((s, i) => ({
        "@type": "ListItem",
        position: i + 1,
        url: `${BASE_URL}/subjects/${s.slug}`,
      })),
    },
  };

  return (
    <div className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />

      <nav aria-label="Breadcrumb" className="text-[13px] mb-5" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
        <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>Subjects</li>
        </ol>
      </nav>

      <h1 className="text-[clamp(26px,3.4vw,34px)] leading-snug m-0 mb-2">All subjects</h1>
      <p className="text-[15px] mb-8" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
        {subjects.length} subjects across exam boards, grade levels, and general topics — each matched with a
        personally vetted tutor.
      </p>

      <div className="flex flex-col gap-10">
        {sortedGroups.map(([curriculum, list]) => (
          <section key={curriculum}>
            <h2 className="text-[18px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
              {curriculum}
            </h2>
            <div className="grid gap-x-4 gap-y-2.5 [grid-template-columns:repeat(auto-fill,minmax(200px,1fr))]">
              {[...list]
                .sort((a, b) => (a.title ?? a.name).localeCompare(b.title ?? b.name))
                .map((s) => (
                  <Link
                    key={s.slug}
                    href={`/subjects/${s.slug}`}
                    className="text-[13.5px] hover:underline"
                    style={{ color: "var(--color-text)" }}
                  >
                    {s.title ?? s.name}
                    {s.gradeLevel ? ` (${s.gradeLevel})` : ""}
                  </Link>
                ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
