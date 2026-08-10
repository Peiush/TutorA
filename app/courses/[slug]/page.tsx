import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/tag";
import { FaqAccordion } from "@/components/about/faq-accordion";
import { StarRating } from "@/components/ui/tutor-avatar";
import { CourseIllustration } from "@/components/courses/course-illustrations";
import { ClockIcon, LayersIcon, BarChartIcon, CheckIcon } from "@/components/courses/course-icons";
import { CourseDetailActions } from "@/components/courses/course-detail-actions";
import { getCourseBySlug, getPublishedCourses, getRelatedCourses } from "@/app/lib/course-listings";
import { getTutorsMatchingPrefixes } from "@/app/lib/tutor-listings";
import { priceLabel, priceLabelUSD, learningOutcomes, courseWorkloadISO8601, type CourseRaw } from "@/lib/mock-courses";
import { courseSubjectContent, TEST_PREP_TUTOR_MATCH } from "@/lib/course-subject-content";
import { COURSE_TO_SUBJECT_SLUGS } from "@/lib/subject-course-links";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.tutora.it.com";

function courseDescription(course: CourseRaw): string {
  if (course.subtitle) return course.subtitle;
  const outcomes = learningOutcomes(course);
  if (outcomes.length > 0) {
    return `Learn ${outcomes.slice(0, 3).join(", ")} — a ${course.level.toLowerCase()} course on TutorA.`;
  }
  const levelLower = course.level.toLowerCase();
  const article = /^[aeiou]/.test(levelLower) ? "An" : "A";
  return `${article} ${levelLower} course on TutorA, reviewed by our team before publishing.`;
}

// Synthesizes the page's real structured fields into readable prose — varies naturally by
// course since duration, lecture count, level, and outcomes differ per row, not hand-written.
function aboutCourseParagraph(course: CourseRaw): string {
  const sentences: string[] = [];

  const durationPart = course.durationHours ? `${course.durationHours} hours of` : "flexible, self-paced";
  // lectureCount is a clean number; lectureCountLabel is free text (e.g. "Depends on Requirement")
  // that can't be embedded mid-sentence, so it's only ever appended as its own trailing clause.
  const lecturePart = course.lectureCount ? `, across ${course.lectureCount} lectures` : "";
  sentences.push(
    `This ${course.level.toLowerCase()} ${course.category.toLowerCase()} course offers ${durationPart} instruction${lecturePart}${
      course.instructor ? `, taught by ${course.instructor}` : ""
    }.`
  );
  if (!course.lectureCount && course.lectureCountLabel) {
    sentences.push(`Course format: ${course.lectureCountLabel}.`);
  }

  const outcomes = learningOutcomes(course);
  if (outcomes.length > 0) {
    sentences.push(
      `By the end, you'll be able to ${outcomes
        .map((s) => s.charAt(0).toLowerCase() + s.slice(1))
        .join("; ")}.`
    );
  }

  sentences.push(
    "Every course on TutorA is reviewed by our team before it's published, and every request is matched by a person — not an open marketplace where anyone can pitch you."
  );

  return sentences.join(" ");
}

function whoThisIsFor(course: CourseRaw): string {
  switch (course.level) {
    case "Beginner":
      return `New to ${course.category.toLowerCase()}? This course assumes no prior experience and builds up from first principles.`;
    case "Intermediate":
      return `Best for learners who already have some grounding in ${course.category.toLowerCase()} and want to go further.`;
    default:
      return `Structured to work for both newcomers and learners with prior experience in ${course.category.toLowerCase()}.`;
  }
}

export async function generateStaticParams() {
  const courses = await getPublishedCourses();
  return courses.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const course = await getCourseBySlug(slug);
  if (!course) return {};

  const description = courseDescription(course);

  return {
    title: course.title,
    description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: {
      type: "website",
      title: course.title,
      description,
      url: `${BASE_URL}/courses/${course.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: course.title,
      description,
    },
  };
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [course, session] = await Promise.all([getCourseBySlug(slug), auth()]);
  if (!course) notFound();

  const userId = session?.user?.id;
  const [savedCourse, openRequest, relatedCourses] = userId
    ? await Promise.all([
        prisma.savedCourse.findUnique({ where: { userId_courseId: { userId, courseId: course.id } } }),
        prisma.courseRequest.findUnique({ where: { userId_courseId: { userId, courseId: course.id } } }),
        getRelatedCourses(course.id, course.category),
      ])
    : [null, null, await getRelatedCourses(course.id, course.category)];

  const hasDiscount = course.priceCents != null && course.originalPriceCents != null;
  const discountPct = hasDiscount
    ? Math.round((1 - course.priceCents! / course.originalPriceCents!) * 100)
    : 0;
  const primaryPrice =
    course.priceCents != null
      ? `${priceLabelUSD(course.priceCents)}/hr`
      : course.originalPriceCents != null
      ? `${priceLabelUSD(course.originalPriceCents)} full course`
      : "Price on request";

  const canonicalUrl = `${BASE_URL}/courses/${course.slug}`;
  const description = courseDescription(course);
  const subjectContent = courseSubjectContent[course.slug];
  const tutorMatch = TEST_PREP_TUTOR_MATCH[course.slug];
  const relatedSubjectSlugs = COURSE_TO_SUBJECT_SLUGS[course.slug] ?? [];
  const testPrepTutors = tutorMatch
    ? await getTutorsMatchingPrefixes(tutorMatch.include, tutorMatch.exclude)
    : [];
  const relatedSubjects =
    relatedSubjectSlugs.length > 0
      ? await prisma.subject.findMany({
          where: { slug: { in: relatedSubjectSlugs } },
          select: { slug: true, title: true, name: true, gradeLevel: true },
        })
      : [];

  const courseJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description,
    url: canonicalUrl,
    provider: { "@type": "Organization", name: "TutorA", sameAs: BASE_URL },
    ...(course.instructor && { instructor: { "@type": "Person", name: course.instructor } }),
    ...(course.durationHours != null && {
      hasCourseInstance: {
        "@type": "CourseInstance",
        courseMode: "Online",
        courseWorkload: courseWorkloadISO8601(course.durationHours),
      },
    }),
    ...(course.reviews > 0 && {
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: course.rating,
        reviewCount: course.reviews,
      },
    }),
    ...((course.priceCents != null || course.originalPriceCents != null) && {
      offers: {
        "@type": "Offer",
        price: ((course.priceCents ?? course.originalPriceCents)! / 100).toFixed(2),
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
        url: canonicalUrl,
      },
    }),
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Courses", item: `${BASE_URL}/courses` },
      { "@type": "ListItem", position: 3, name: course.title, item: canonicalUrl },
    ],
  };

  const faqJsonLd = subjectContent
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: subjectContent.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  return (
    <div className="max-w-[860px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <nav aria-label="Breadcrumb" className="text-[13px] mb-5" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
        <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/courses" className="hover:underline">Courses</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>{course.title}</li>
        </ol>
      </nav>

      <div className="card elev-sm p-0 overflow-hidden gap-0">
        <div className="relative h-[180px]" style={{ background: "var(--color-neutral-100)" }}>
          <CourseIllustration category={course.category} className="w-full h-full" />
        </div>

        <div className="flex flex-col gap-3 p-6">
          {(course.bestseller || course.premium || course.isNew) && (
            <div className="flex gap-1.5 flex-wrap">
              {course.bestseller && <Tag variant="accent" className="text-[10px] px-2 py-0.5 font-semibold">Bestseller</Tag>}
              {course.premium && <Tag variant="accent-2" className="text-[10px] px-2 py-0.5 font-semibold">Premium</Tag>}
              {course.isNew && <Tag variant="success" className="text-[10px] px-2 py-0.5 font-semibold">New</Tag>}
            </div>
          )}

          <h1 className="text-[clamp(24px,3.2vw,32px)] leading-snug m-0">{course.title}</h1>
          {course.subtitle && (
            <p className="text-[15px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
              {course.subtitle}
            </p>
          )}

          <div className="flex items-center gap-3 text-[13.5px] flex-wrap" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
            {course.instructor && (
              <span style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>By {course.instructor}</span>
            )}
            {course.reviews > 0 ? (
              <span className="inline-flex items-center gap-1">
                <span style={{ color: "var(--color-accent-700)", fontWeight: 700 }}>{course.rating.toFixed(1)}</span>
                <StarRating rating={course.rating} size={13} />
                <span>({course.reviews.toLocaleString()})</span>
              </span>
            ) : (
              <span>No reviews yet</span>
            )}
            {course.durationHours != null && (
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon width={14} height={14} />
                {course.durationHours}h
              </span>
            )}
            <span className="inline-flex items-center gap-1.5">
              <LayersIcon width={14} height={14} />
              {course.lectureCount != null ? `${course.lectureCount} lectures` : course.lectureCountLabel ?? "Flexible"}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <BarChartIcon width={14} height={14} />
              {course.level}
            </span>
          </div>

          <div>
            <h2 className="text-[15px] font-semibold mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
              About this course
            </h2>
            <p className="text-[14.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
              {aboutCourseParagraph(course)}
            </p>
            <p className="text-[13.5px] leading-relaxed mt-2 mb-0" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
              {whoThisIsFor(course)}
            </p>
          </div>

          {subjectContent && (
            <div>
              <h2 className="text-[15px] font-semibold mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                Why a TutorA tutor
              </h2>
              <p className="text-[14.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
                {subjectContent.differentiation}
              </p>
              {tutorMatch && (
                <Link
                  href="/guarantee"
                  className="inline-flex items-center gap-1 text-[13px] font-medium mt-2 hover:underline"
                  style={{ color: "var(--color-accent-700)" }}
                >
                  Backed by our Tutor Match Guarantee
                  <span aria-hidden>→</span>
                </Link>
              )}
            </div>
          )}

          {tutorMatch && (
            <div className="rounded-[var(--radius-md)] p-4" style={{ background: "var(--color-surface)" }}>
              <h2 className="text-[14px] font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                Tutors for {course.title}
              </h2>
              {testPrepTutors.length > 0 ? (
                <div className="flex flex-col gap-3">
                  {testPrepTutors.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/find-a-tutor/${t.slug}`}
                      className="flex flex-col gap-1 p-3 rounded-[var(--radius-sm)] border hover:shadow-[var(--shadow-sm)] transition-shadow duration-200"
                      style={{ borderColor: "var(--color-divider)", background: "var(--color-bg)" }}
                    >
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="text-[14px] font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                          {t.name}
                        </span>
                        <span className="text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
                          {t.country}
                          {t.yearsExperience != null && ` · ${t.yearsExperience} yrs experience`}
                        </span>
                      </div>
                      <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
                        Teaches {t.matchedSubjects.join(", ")}
                      </span>
                      {t.bio && (
                        <p className="text-[13px] leading-relaxed m-0 mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>
                          {t.bio}
                        </p>
                      )}
                    </Link>
                  ))}
                </div>
              ) : (
                <p className="text-[13.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
                  We don&rsquo;t have a tutor actively teaching {course.title} yet — send a request and we&rsquo;ll
                  match one for you.
                </p>
              )}
            </div>
          )}

          {learningOutcomes(course).length > 0 && (
            <div className="rounded-[var(--radius-md)] p-4" style={{ background: "var(--color-surface)" }}>
              <h2 className="text-[14px] font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                What you&rsquo;ll learn
              </h2>
              <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                {learningOutcomes(course).map((item) => (
                  <li key={item} className="flex items-start gap-1.5 text-[14px] leading-snug">
                    <CheckIcon width={15} height={15} className="flex-none mt-0.5" style={{ color: "var(--color-verified)" }} />
                    <span style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-baseline gap-2 font-[var(--font-heading)]">
              <span className="text-[28px]">{primaryPrice}</span>
              {hasDiscount && (
                <span className="text-[16px] font-[var(--font-body)] line-through" style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}>
                  {priceLabel(course.originalPriceCents!)}
                </span>
              )}
            </div>
            {hasDiscount && (
              <Tag variant="success" className="text-[11px] px-2.5 py-1">
                {discountPct}% off
              </Tag>
            )}
          </div>

          <CourseDetailActions
            courseId={course.id}
            initialSaved={Boolean(savedCourse)}
            initialRequested={Boolean(openRequest)}
          />

          <Link href={`/courses?category=${encodeURIComponent(course.category)}`} className="text-[13.5px] hover:underline mt-2">
            Browse more {course.category} courses →
          </Link>

          {relatedSubjects.length > 0 && (
            <div className="flex flex-col gap-1">
              <span className="text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
                Looking for grade-specific tutoring instead?
              </span>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {relatedSubjects.map((s) => (
                  <Link key={s.slug} href={`/subjects/${s.slug}`} className="text-[13px] hover:underline">
                    {s.title ?? s.name}
                    {s.gradeLevel ? ` (${s.gradeLevel})` : ""} →
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {relatedCourses.length > 0 && (
        <div className="mt-8">
          <h2 className="text-[16px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Related courses in {course.category}
          </h2>
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {relatedCourses.map((related) => (
              <Link
                key={related.slug}
                href={`/courses/${related.slug}`}
                className="card elev-sm p-4 flex flex-col gap-1.5 hover:shadow-[var(--shadow-md)] transition-shadow duration-200"
                style={{ borderColor: "var(--color-divider)" }}
              >
                <span className="text-[14px] font-semibold line-clamp-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {related.title}
                </span>
                <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
                  {related.level}
                  {related.reviews > 0 && ` · ${related.rating.toFixed(1)}★`}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {subjectContent && (
        <div className="mt-8">
          <h2 className="text-[16px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            {course.title} tutoring FAQ
          </h2>
          <FaqAccordion faqs={subjectContent.faqs} />
        </div>
      )}
    </div>
  );
}
