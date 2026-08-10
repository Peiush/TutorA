import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/tag";
import { FaqAccordion } from "@/components/about/faq-accordion";
import { SubjectIllustration } from "@/components/courses/subject-illustration";
import { ClockIcon, CheckIcon } from "@/components/courses/course-icons";
import { SubjectDetailActions } from "@/components/courses/subject-detail-actions";
import {
  getSubjectBySlug,
  getSubjects,
  getRelatedSubjects,
  getTutorsForSubject,
  type SubjectListing,
} from "@/app/lib/subject-listings";
import { priceLabelUSD } from "@/lib/mock-courses";
import { GRADE_BANDS, GRADE_BAND_COLORS, matchesGradeBand } from "@/lib/grade-bands";
import { SUBJECT_TO_COURSE_SLUG } from "@/lib/subject-course-links";
import { subjectPageContent } from "@/lib/subject-content";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.tutora.it.com";

function resolveBand(gradeLevel: string | null) {
  return GRADE_BANDS.find((b) => matchesGradeBand(gradeLevel, b)) ?? GRADE_BANDS[GRADE_BANDS.length - 1];
}

// Grade/curriculum-aware title so this page doesn't read as a duplicate of a same-topic
// course page (e.g. "Python Basics" subject vs. "Python Programming for Beginners" course)
// — see docs on the Grade 6-12 technical SEO audit's cannibalization finding.
function subjectMetaTitle(subject: SubjectListing): string {
  const base = subject.title ?? subject.name;
  const qualifier = subject.gradeLevel && subject.gradeLevel !== "All Levels" ? subject.gradeLevel : subject.curriculum;
  return qualifier ? `${base} Tutor — ${qualifier}` : `${base} Tutor`;
}

function subjectDescription(subject: SubjectListing): string {
  if (subject.subtitle) return subject.subtitle;
  const qualifier = subject.gradeLevel && subject.gradeLevel !== "All Levels" ? ` for ${subject.gradeLevel}` : "";
  return `1:1 ${subject.title ?? subject.name} tutoring${qualifier} on TutorA, personally matched and reviewed by our team.`;
}

export async function generateStaticParams() {
  const subjects = await getSubjects();
  return subjects.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const subject = await getSubjectBySlug(slug);
  if (!subject) return {};

  const content = subjectPageContent[subject.slug];
  const title = content?.metaTitleOverride ?? subjectMetaTitle(subject);
  const description = content?.metaDescriptionOverride ?? subjectDescription(subject);

  return {
    title,
    description,
    alternates: { canonical: `/subjects/${subject.slug}` },
    openGraph: { type: "website", title, description, url: `${BASE_URL}/subjects/${subject.slug}` },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function SubjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [subject, session] = await Promise.all([getSubjectBySlug(slug), auth()]);
  if (!subject) notFound();

  const content = subjectPageContent[subject.slug];
  const isChooser = content?.template === "chooser";

  const userId = session?.user?.id;
  const [savedSubject, openRequest, relatedSubjects, subjectTutors] = userId
    ? await Promise.all([
        prisma.savedSubject.findUnique({ where: { userId_subjectId: { userId, subjectId: subject.id } } }),
        prisma.subjectRequest.findUnique({ where: { userId_subjectId: { userId, subjectId: subject.id } } }),
        getRelatedSubjects(subject.id, subject.curriculum),
        isChooser ? Promise.resolve([]) : getTutorsForSubject(subject.id),
      ])
    : [
        null,
        null,
        await getRelatedSubjects(subject.id, subject.curriculum),
        isChooser ? [] : await getTutorsForSubject(subject.id),
      ];

  const band = resolveBand(subject.gradeLevel);
  const colors = GRADE_BAND_COLORS[band.key];
  const canonicalUrl = `${BASE_URL}/subjects/${subject.slug}`;
  const title = content?.metaTitleOverride ?? subject.title ?? subject.name;
  const description = content?.metaDescriptionOverride ?? subjectDescription(subject);
  const price = subject.hourlyRateCents != null ? `${priceLabelUSD(subject.hourlyRateCents)}/hr` : "Price on request";
  const relatedCourseSlug = SUBJECT_TO_COURSE_SLUG[subject.slug];

  const subjectJsonLd = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: title,
    description,
    url: canonicalUrl,
    provider: { "@type": "Organization", name: "TutorA", sameAs: BASE_URL },
    ...(subject.gradeLevel && { educationalLevel: subject.gradeLevel }),
    ...(subject.hourlyRateCents != null && {
      offers: {
        "@type": "Offer",
        price: (subject.hourlyRateCents / 100).toFixed(2),
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
      { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
    ],
  };

  const faqJsonLd =
    content && content.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${canonicalUrl}#faq`,
          mainEntity: content.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <div className="max-w-[860px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(subjectJsonLd) }} />
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
          <li aria-current="page" style={{ color: "var(--color-text)" }}>{title}</li>
        </ol>
      </nav>

      <div className="card elev-sm p-0 overflow-hidden gap-0">
        <div className="relative h-[180px]" style={{ background: "var(--color-neutral-100)" }}>
          <SubjectIllustration tone={colors} className="w-full h-full" />
        </div>

        <div className="flex flex-col gap-3 p-6">
          <div className="flex gap-1.5 flex-wrap">
            {subject.curriculum && <Tag variant="accent" className="text-[10px] px-2 py-0.5 font-semibold">{subject.curriculum}</Tag>}
            {subject.gradeLevel && <Tag variant="accent-2" className="text-[10px] px-2 py-0.5 font-semibold">{subject.gradeLevel}</Tag>}
          </div>

          <h1 className="text-[clamp(24px,3.2vw,32px)] leading-snug m-0">{title}</h1>
          {subject.subtitle && (
            <p className="text-[15px] m-0" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
              {subject.subtitle}
            </p>
          )}

          {subject.durationLabel && (
            <div className="flex items-center gap-3 text-[13.5px] flex-wrap" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
              <span className="inline-flex items-center gap-1.5">
                <ClockIcon width={14} height={14} />
                {subject.durationLabel}
              </span>
            </div>
          )}

          {isChooser && content?.chooserSiblings && (
            <div className="rounded-[var(--radius-md)] p-4" style={{ background: "var(--color-surface)" }}>
              {content.chooserIntro && (
                <p className="text-[14px] leading-relaxed mb-3" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
                  {content.chooserIntro}
                </p>
              )}
              <div className="flex flex-col gap-2">
                {content.chooserSiblings.map((sibling) => (
                  <Link
                    key={sibling.slug}
                    href={`/subjects/${sibling.slug}`}
                    className="btn btn-primary justify-between"
                  >
                    {sibling.label}
                    <span aria-hidden>→</span>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {!isChooser && content?.differentiation && (
            <div>
              <h2 className="text-[15px] font-semibold mb-1.5" style={{ fontFamily: "var(--font-heading)" }}>
                Why a TutorA tutor
              </h2>
              <p className="text-[14.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
                {content.differentiation}
              </p>
              {content.showGuaranteeLink && (
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

          {subject.whatYoullLearn.length > 0 && (
            <div className="rounded-[var(--radius-md)] p-4" style={{ background: "var(--color-surface)" }}>
              <h2 className="text-[14px] font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
                What you&rsquo;ll learn
              </h2>
              <ul className="flex flex-col gap-2 m-0 p-0 list-none">
                {subject.whatYoullLearn.map((item) => (
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
              <span className="text-[28px]">{price}</span>
            </div>
          </div>

          <SubjectDetailActions
            subjectId={subject.id}
            initialSaved={Boolean(savedSubject)}
            initialRequested={Boolean(openRequest)}
          />

          {relatedCourseSlug && (
            <Link href={`/courses/${relatedCourseSlug}`} className="text-[13.5px] hover:underline mt-2">
              Looking for the full {title} course instead? →
            </Link>
          )}
        </div>
      </div>

      {!isChooser && content && (
        <div className="mt-8 rounded-[var(--radius-md)] p-4" style={{ background: "var(--color-surface)" }}>
          <h2 className="text-[14px] font-semibold mb-2" style={{ fontFamily: "var(--font-heading)" }}>
            Tutors for {title}
          </h2>
          {subjectTutors.length > 0 ? (
            <div className="flex flex-col gap-3">
              {subjectTutors.map((t) => (
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
              We don&rsquo;t have a tutor actively teaching {title} yet — send a request and we&rsquo;ll match one
              for you.
            </p>
          )}
        </div>
      )}

      {relatedSubjects.length > 0 && (
        <div className="mt-8">
          <h2 className="text-[16px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            More {subject.curriculum} subjects
          </h2>
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {relatedSubjects.map((related) => (
              <Link
                key={related.slug}
                href={`/subjects/${related.slug}`}
                className="card elev-sm p-4 flex flex-col gap-1.5 hover:shadow-[var(--shadow-md)] transition-shadow duration-200"
                style={{ borderColor: "var(--color-divider)" }}
              >
                <span className="text-[14px] font-semibold line-clamp-2" style={{ fontFamily: "var(--font-heading)" }}>
                  {related.title ?? related.name}
                </span>
                <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
                  {related.gradeLevel ?? related.curriculum}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}

      {content && content.faqs.length > 0 && (
        <div className="mt-8">
          <h2 className="text-[16px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            {title} FAQ
          </h2>
          <FaqAccordion faqs={content.faqs} />
        </div>
      )}
    </div>
  );
}
