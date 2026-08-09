import Link from "next/link";
import { CoursesIntro } from "@/components/courses/courses-intro";
import { CourseBrowser } from "@/components/courses/course-browser";
import { CoursesFaq } from "@/components/courses/courses-faq";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { getSubjects } from "@/app/lib/subject-listings";
import { courseCategories } from "@/lib/mock-courses";
import { COURSE_FAQS } from "@/lib/course-faqs";
import { GRADE_BANDS } from "@/lib/grade-bands";

const BASE_URL = "https://www.tutora.it.com";

export const metadata = {
  title: "Online Courses by Expert Indian Teachers | Programming, Test Prep & More",
  description:
    "Live 1-on-1 and small-group classes for Grades 6-12, SAT prep, coding, and more — taught by experienced, verified Indian tutors matched to your goals, wherever you are in the world.",
  alternates: { canonical: "/courses" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Courses", item: `${BASE_URL}/courses` },
  ],
};

const collectionPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  name: "Courses",
  description: metadata.description,
  url: `${BASE_URL}/courses`,
  dateModified: new Date().toISOString(),
  isPartOf: { "@type": "WebSite", name: "TutorA", url: BASE_URL },
  about: { "@type": "Organization", name: "TutorA", url: BASE_URL },
  mainEntity: {
    "@type": "ItemList",
    // These are category filter links (e.g. /courses?category=...), not individual
    // bookable courses — typing them as CollectionPage (not Course) avoids a schema.org
    // type mismatch. Course markup is reserved for the actual course-detail pages, which
    // already carry their own valid Course JSON-LD.
    itemListElement: courseCategories.map((category, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "CollectionPage",
        name: category,
        url: `${BASE_URL}/courses?category=${encodeURIComponent(category)}`,
      },
    })),
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: COURSE_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function CoursesPage() {
  const [courses, subjects] = await Promise.all([getPublishedCourses(), getSubjects()]);

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CoursesIntro />

      {/* Server-rendered, always-crawlable entry points into /courses?category=... and
          /subjects — the category filter chips and subject grid below are client-side
          state (no href), so this is the only static link path into most subject pages
          and into a dedicated Test Preparation destination. See the internal-linking
          audit (2026-08-09): ~91 of ~103 /subjects pages had zero inbound on-page link. */}
      <div className="flex flex-wrap gap-x-6 gap-y-2 mb-8 text-[13.5px]">
        <Link href="/courses?category=Test%20Preparation" className="hover:underline font-medium" style={{ color: "var(--color-accent-700)" }}>
          Preparing for SAT, ACT, AP, IB, A-Level, or GCSE? Browse Test Preparation courses →
        </Link>
        <Link href="/subjects" className="hover:underline" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
          Or browse all subjects by grade & curriculum →
        </Link>
      </div>

      {/* Same fix, applied to the grade-band views: the chips share the same `category`
          query-param state as the Test Preparation link above, but nothing previously
          linked to /courses?category=Grade+6-8 etc. either. */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mb-8 text-[13px]" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
        <span>Browse by grade:</span>
        {GRADE_BANDS.map((band) => (
          <Link key={band.key} href={`/courses?category=${encodeURIComponent(band.label)}`} className="hover:underline">
            {band.label}
          </Link>
        ))}
      </div>

      <div id="browse">
        <CourseBrowser courses={courses} subjects={subjects} />
      </div>
      <CoursesFaq />
    </div>
  );
}
