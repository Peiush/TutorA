import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/ui/reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { FaqAccordion } from "@/components/about/faq-accordion";
import { StarRating } from "@/components/ui/tutor-avatar";
import { CourseIllustration } from "@/components/courses/course-illustrations";
import { ClockIcon, LayersIcon, BarChartIcon, CheckIcon, GraduationCapIcon, UserCheckIcon } from "@/components/courses/course-icons";
import { DetailSection } from "@/components/courses/detail-section";
import { ExpandableDetail } from "@/components/courses/expandable-detail";
import { CourseDetailActions } from "@/components/courses/course-detail-actions";
import { getCourseBySlug, getPublishedCourses, getRelatedCourses } from "@/app/lib/course-listings";
import { getTutorsMatchingPrefixes, getTutorsForLinkedSubjects } from "@/app/lib/tutor-listings";
import { priceLabel, priceLabelUSD, learningOutcomes, courseWorkloadISO8601, type CourseRaw } from "@/lib/mock-courses";
import { courseSubjectContent, TEST_PREP_TUTOR_MATCH } from "@/lib/course-subject-content";
import { personalizeFaqs } from "@/lib/faq-personalize";
import { sanitizeDifferentiation } from "@/lib/differentiation-copy";
import { paragraphize } from "@/lib/format-prose";
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

// Price + CTA rendered twice: full-width right after the hero on mobile, sticky in the
// right rail on desktop — see the layout comment further down for why this isn't done
// with a single grid item (mobile needs it between the hero and the content sections,
// desktop needs it pinned beside all of them).
function PriceCard({
  course,
  primaryPrice,
  hasDiscount,
  discountPct,
  initialSaved,
  initialRequested,
  showTutorSection,
}: {
  course: CourseRaw;
  primaryPrice: string;
  hasDiscount: boolean;
  discountPct: number;
  initialSaved: boolean;
  initialRequested: boolean;
  showTutorSection: boolean;
}) {
  return (
    <div className="card elev-md p-4 sm:p-5 gap-3 sm:gap-4 flex flex-col" style={{ borderColor: "var(--color-divider)" }}>
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-baseline gap-2 font-[var(--font-heading)]">
          <span className="text-[26px] sm:text-[30px] font-bold leading-none">{primaryPrice}</span>
          {hasDiscount && (
            <span className="text-[15px] font-[var(--font-body)] line-through" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
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

      <CourseDetailActions courseId={course.id} initialSaved={initialSaved} initialRequested={initialRequested} />

      {showTutorSection && (
        <Link
          href="/guarantee"
          className="inline-flex items-center gap-1 text-[13px] font-medium hover:underline"
          style={{ color: "var(--color-accent-700)" }}
        >
          Backed by our Tutor Match Guarantee
          <span aria-hidden>→</span>
        </Link>
      )}

      <div className="flex flex-col gap-1.5 pt-3" style={{ borderTop: "1px solid var(--color-divider)" }}>
        {course.durationHours != null && (
          <span className="inline-flex items-center gap-1.5 text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
            <ClockIcon width={14} height={14} />
            {course.durationHours}h of instruction
          </span>
        )}
        <span className="inline-flex items-center gap-1.5 text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
          <LayersIcon width={14} height={14} />
          {course.lectureCount != null ? `${course.lectureCount} lectures` : course.lectureCountLabel ?? "Flexible format"}
        </span>
        <span className="inline-flex items-center gap-1.5 text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
          <BarChartIcon width={14} height={14} />
          {course.level}
        </span>
      </div>
    </div>
  );
}

// Lives in the sidebar rail now, directly under the PriceCard — same card treatment/width,
// rather than a full-width block in the main content column.
function WhatYoullLearnCard({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <Reveal y={20}>
      <div className="card elev-md p-4 sm:p-5 flex flex-col gap-2.5 sm:gap-3" style={{ borderColor: "var(--color-divider)" }}>
        <h2 className="text-[14px] font-semibold m-0" style={{ fontFamily: "var(--font-heading)" }}>
          What you&rsquo;ll learn
        </h2>
        <StaggerReveal className="flex flex-col gap-2" childSelector="li" y={10} stagger={0.06}>
          {items.map((item) => (
            <li key={item} className="flex items-start gap-1.5 text-[13.5px] leading-snug list-none">
              <CheckIcon width={14} height={14} className="flex-none mt-0.5" style={{ color: "var(--color-verified)" }} />
              <span style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>{item}</span>
            </li>
          ))}
        </StaggerReveal>
      </div>
    </Reveal>
  );
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
  const keywords = courseSubjectContent[course.slug]?.keywords;

  return {
    title: course.title,
    description,
    ...(keywords && { keywords }),
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
  const relatedSubjects =
    relatedSubjectSlugs.length > 0
      ? await prisma.subject.findMany({
          where: { slug: { in: relatedSubjectSlugs } },
          select: { id: true, slug: true, title: true, name: true, gradeLevel: true },
        })
      : [];
  // Test-prep courses use the hand-curated prefix table (SAT/ACT/GCSE/etc. naming is reliable
  // to prefix-match); every other course with a linked subject page (e.g. Python) falls back
  // to a direct Subject<->TutorSubject lookup via its real linked subject IDs, so it gets the
  // same live tutor cards its subject page already shows instead of silently showing none.
  const showTutorSection = Boolean(tutorMatch) || relatedSubjects.length > 0;
  const testPrepTutors = tutorMatch
    ? await getTutorsMatchingPrefixes(tutorMatch.include, tutorMatch.exclude)
    : await getTutorsForLinkedSubjects(relatedSubjects);

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

  const personalizedFaqs = subjectContent ? personalizeFaqs(subjectContent.faqs, course.title) : [];
  const faqJsonLd = subjectContent
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${canonicalUrl}#faq`,
        mainEntity: personalizedFaqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const priceCardProps = {
    course,
    primaryPrice,
    hasDiscount,
    discountPct,
    initialSaved: Boolean(savedCourse),
    initialRequested: Boolean(openRequest),
    showTutorSection,
  };

  return (
    <div className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
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

      {/* Hero: always plain/unanimated — no scroll-triggered fade-in on the H1/price, since
          hiding above-the-fold text behind a reveal was already tried sitewide and reverted
          for hurting LCP (see RE-AUDIT-REPORT-2026-08-10-POSTFIX.md, "autoAlpha:0 hero-hiding
          pattern"). Only content *below* the fold gets the scroll-reveal treatment. */}
      <div className="card elev-sm p-0 overflow-hidden gap-0">
        <div className="relative h-[130px] sm:h-[200px]" style={{ background: "var(--color-neutral-100)" }}>
          <CourseIllustration category={course.category} className="w-full h-full" />
        </div>

        <div className="flex flex-col gap-2.5 sm:gap-3 p-4 sm:p-6">
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
        </div>
      </div>

      {/* Two-column layout, scoped to just the core content block: content sections on the
          left, a sticky price/CTA rail on the right (desktop only — a duplicate, non-sticky
          PriceCard renders inline on mobile instead, right after the hero). Deliberately
          NOT wrapping the whole page (Tutors/Related/FAQ, which run much longer than the
          price card) — that stretched the aside's grid cell to the full page height, so the
          card un-stuck near the top and left a long empty column beneath it. Scoping the
          grid to a shorter, comparably-sized content block keeps the sidebar visually
          "with" the content it's attached to instead of floating over a lot of nothing. */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-6 lg:gap-10 mt-6 lg:mt-8">
        <div className="lg:hidden flex flex-col gap-4 sm:gap-6">
          <PriceCard {...priceCardProps} />
          <WhatYoullLearnCard items={learningOutcomes(course)} />
        </div>

        <div className="flex flex-col gap-6 sm:gap-8">
          <DetailSection icon={<GraduationCapIcon width={17} height={17} />} tint="accent-2" title="About this course">
            <p className="text-[14.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
              {aboutCourseParagraph(course)}
            </p>
            <p className="text-[13.5px] leading-relaxed mt-2 mb-0" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
              {whoThisIsFor(course)}
            </p>
          </DetailSection>

          {subjectContent?.courseDetail && (
            <DetailSection icon={<LayersIcon width={17} height={17} />} tint="accent" title="What this course covers">
              <ExpandableDetail
                highlights={subjectContent.courseDetailHighlights ?? []}
                paragraphs={paragraphize(subjectContent.courseDetail)}
              />
            </DetailSection>
          )}

          {subjectContent && (
            <DetailSection icon={<UserCheckIcon width={17} height={17} />} tint="verified" title="Why a TutorA tutor">
              <p className="text-[14.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
                {sanitizeDifferentiation(subjectContent.differentiation, testPrepTutors.length > 0)}
              </p>
            </DetailSection>
          )}

          <div className="flex flex-col gap-2">
            <Link href={`/courses?category=${encodeURIComponent(course.category)}`} className="text-[13.5px] hover:underline">
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

        <aside className="hidden lg:flex lg:flex-col lg:gap-6 lg:sticky lg:top-24">
          <PriceCard {...priceCardProps} />
          <WhatYoullLearnCard items={learningOutcomes(course)} />
        </aside>
      </div>

      {/* Full-width below the two-column zone: these sections (Tutors, Related, FAQ) run
          much longer than the price card, which is why they're outside the sticky grid —
          see the comment above it. */}
      <div className="flex flex-col gap-6 sm:gap-8 mt-6 sm:mt-8">
        {showTutorSection && (
          <Reveal y={20}>
            <div className="rounded-[var(--radius-md)] p-4 sm:p-5" style={{ background: "var(--color-surface)" }}>
              <h2 className="text-[14px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Tutors for {course.title}
              </h2>
              {testPrepTutors.length > 0 ? (
                <StaggerReveal className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]" y={14}>
                  {testPrepTutors.map((t) => (
                    <Link
                      key={t.slug}
                      href={`/find-a-tutor/${t.slug}`}
                      className="flex flex-col gap-1 p-3 rounded-[var(--radius-sm)] border transition-shadow duration-200 hover:shadow-[var(--shadow-sm)]"
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
                      <span
                        className="text-[12.5px] line-clamp-1 sm:line-clamp-none"
                        style={{ color: "color-mix(in srgb, var(--color-text) 65%, transparent)" }}
                      >
                        Teaches {t.matchedSubjects.join(", ")}
                      </span>
                      {t.bio && (
                        <p
                          className="text-[12.5px] sm:text-[13px] leading-relaxed m-0 mt-0.5 line-clamp-2 sm:line-clamp-none"
                          style={{ color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}
                        >
                          {t.bio}
                        </p>
                      )}
                    </Link>
                  ))}
                </StaggerReveal>
              ) : (
                <p className="text-[13.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
                  {`We don’t have a tutor actively teaching ${course.title} yet — send a request and we’ll match one for you.`}
                </p>
              )}
            </div>
          </Reveal>
        )}

        {relatedCourses.length > 0 && (
          <Reveal y={20}>
            <div>
              <h2 className="text-[16px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Related courses in {course.category}
              </h2>
              <StaggerReveal className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]" y={16}>
                {relatedCourses.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/courses/${related.slug}`}
                    className="card elev-sm p-3.5 sm:p-4 rounded-[18px] sm:rounded-[var(--radius-lg)] gap-1 sm:gap-1.5 flex flex-col transition-shadow duration-200 hover:shadow-[var(--shadow-md)]"
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
              </StaggerReveal>
            </div>
          </Reveal>
        )}

        {personalizedFaqs.length > 0 && (
          <Reveal y={20}>
            <div>
              <h2 className="text-[16px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                {course.title} tutoring FAQ
              </h2>
              <FaqAccordion faqs={personalizedFaqs} />
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
