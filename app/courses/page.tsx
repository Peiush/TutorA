import { CoursesHero } from "@/components/courses/courses-hero";
import { CourseBrowser } from "@/components/courses/course-browser";
import { CoursesSummary } from "@/components/courses/courses-summary";
import { CoursesFaq } from "@/components/courses/courses-faq";
import { getPublishedCourses } from "@/app/lib/course-listings";
import { getSubjects } from "@/app/lib/subject-listings";
import { courseCategories } from "@/lib/mock-courses";
import { COURSE_FAQS } from "@/lib/course-faqs";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.tutora.it.com";

export const metadata = {
  title: "Online Courses: Programming, Test Prep & More",
  description:
    "Browse verified courses in programming, test prep, languages, music, and creative skills — every course is reviewed by our team before it goes live.",
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
    itemListElement: courseCategories.map((category, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Course",
        name: category,
        provider: { "@type": "Organization", name: "TutorA", url: BASE_URL },
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

export default async function CoursesPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const [{ category }, courses, subjects, session] = await Promise.all([
    searchParams,
    getPublishedCourses(),
    getSubjects(),
    auth(),
  ]);

  const userId = session?.user?.id;
  const [savedCourses, openRequests, savedSubjects, openSubjectRequests] = userId
    ? await Promise.all([
        prisma.savedCourse.findMany({ where: { userId }, select: { courseId: true } }),
        prisma.courseRequest.findMany({ where: { userId, status: "OPEN" }, select: { courseId: true } }),
        prisma.savedSubject.findMany({ where: { userId }, select: { subjectId: true } }),
        prisma.subjectRequest.findMany({ where: { userId, status: "OPEN" }, select: { subjectId: true } }),
      ])
    : [[], [], [], []];

  const savedCourseIds = savedCourses.map((s) => s.courseId);
  const requestedCourseIds = openRequests.map((r) => r.courseId);
  const savedSubjectIds = savedSubjects.map((s) => s.subjectId);
  const requestedSubjectIds = openSubjectRequests.map((r) => r.subjectId);

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <CoursesHero />
      <CoursesSummary />
      <CourseBrowser
        courses={courses}
        subjects={subjects}
        savedCourseIds={savedCourseIds}
        requestedCourseIds={requestedCourseIds}
        savedSubjectIds={savedSubjectIds}
        requestedSubjectIds={requestedSubjectIds}
        initialCategory={category}
      />
      <CoursesFaq />
    </div>
  );
}
