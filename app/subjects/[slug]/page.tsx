import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/tag";
import { Reveal } from "@/components/ui/reveal";
import { StaggerReveal } from "@/components/ui/stagger-reveal";
import { FaqAccordion } from "@/components/about/faq-accordion";
import { SubjectIllustration } from "@/components/courses/subject-illustration";
import { ClockIcon, CheckIcon, GraduationCapIcon, LayersIcon, UserCheckIcon } from "@/components/courses/course-icons";
import { DetailSection } from "@/components/courses/detail-section";
import { ExpandableDetail } from "@/components/courses/expandable-detail";
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
import { subjectPageContent, type SubjectPageContent } from "@/lib/subject-content";
import { paragraphize } from "@/lib/format-prose";
import { personalizeFaqs } from "@/lib/faq-personalize";
import { sanitizeDifferentiation } from "@/lib/differentiation-copy";
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

// Mirrors app/courses/[slug]/page.tsx's aboutCourseParagraph() — synthesizes the page's real
// structured fields (grade level, curriculum, session length, learning outcomes) into a
// paragraph that varies naturally per subject since those fields differ per row, rather than
// relying solely on the hand-written "Why a TutorA tutor" block for page-specific content.
// Subject pages never had an equivalent of the course-page function; see
// docs/seo-audit-tutora/findings/content-depth-audit-2026-08-10.md, section 4.
function aboutSubjectParagraph(subject: SubjectListing): string {
  const sentences: string[] = [];
  const title = subject.title ?? subject.name;
  const levelPart = subject.gradeLevel && subject.gradeLevel !== "All Levels" ? ` for ${subject.gradeLevel}` : "";
  const curriculumPart = subject.curriculum ? ` following the ${subject.curriculum} curriculum` : "";
  const cadencePart = subject.durationLabel ? `, held in ${subject.durationLabel.toLowerCase()}` : "";
  sentences.push(`${title} tutoring on TutorA is live and 1:1${levelPart}${curriculumPart}${cadencePart}.`);

  if (subject.whatYoullLearn.length > 0) {
    sentences.push(
      `Sessions build toward ${subject.whatYoullLearn
        .map((s) => s.charAt(0).toLowerCase() + s.slice(1))
        .join("; ")}.`
    );
  }

  sentences.push(
    "Every tutor is reviewed by TutorA's team before being matched, and sessions are paced to where a student is actually starting from rather than a fixed group syllabus."
  );

  return sentences.join(" ");
}

// Price + CTA rendered twice — see the identical comment in app/courses/[slug]/page.tsx's
// PriceCard for why (mobile needs it right after the hero, desktop needs it pinned in a
// sticky rail beside the long content column).
function PriceCard({
  subject,
  price,
  initialSaved,
  initialRequested,
  content,
  relatedCourseSlug,
  title,
}: {
  subject: SubjectListing;
  price: string;
  initialSaved: boolean;
  initialRequested: boolean;
  content: SubjectPageContent | undefined;
  relatedCourseSlug: string | undefined;
  title: string;
}) {
  return (
    <div className="card elev-md p-5 flex flex-col gap-4" style={{ borderColor: "var(--color-divider)" }}>
      <span className="text-[30px] font-bold leading-none font-[var(--font-heading)]">{price}</span>

      <SubjectDetailActions subjectId={subject.id} initialSaved={initialSaved} initialRequested={initialRequested} />

      {content?.showGuaranteeLink && (
        <Link
          href="/guarantee"
          className="inline-flex items-center gap-1 text-[13px] font-medium hover:underline"
          style={{ color: "var(--color-accent-700)" }}
        >
          Backed by our Tutor Match Guarantee
          <span aria-hidden>→</span>
        </Link>
      )}

      {relatedCourseSlug && (
        <Link href={`/courses/${relatedCourseSlug}`} className="text-[13px] hover:underline" style={{ color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>
          Looking for the full {title} course instead? →
        </Link>
      )}

      {(subject.curriculum || subject.gradeLevel || subject.durationLabel) && (
        <div className="flex flex-col gap-1.5 pt-3" style={{ borderTop: "1px solid var(--color-divider)" }}>
          {subject.durationLabel && (
            <span className="inline-flex items-center gap-1.5 text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
              <ClockIcon width={14} height={14} />
              {subject.durationLabel}
            </span>
          )}
          {subject.curriculum && (
            <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
              {subject.curriculum} curriculum
            </span>
          )}
          {subject.gradeLevel && (
            <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
              {subject.gradeLevel}
            </span>
          )}
        </div>
      )}
    </div>
  );
}

// Lives in the sidebar rail now, directly under the PriceCard — same card treatment/width,
// rather than a full-width block in the main content column.
function WhatYoullLearnCard({ items }: { items: string[] }) {
  if (items.length === 0) return null;
  return (
    <Reveal y={20}>
      <div className="card elev-md p-5 flex flex-col gap-3" style={{ borderColor: "var(--color-divider)" }}>
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
  // Deliberately NOT using content?.metaTitleOverride here — that's SEO-tag-style text
  // ("X Tutor — India-Based, Team-Vetted") meant only for the <title> element/OpenGraph/
  // Twitter card (see generateMetadata above), not for reader-facing content. This `title`
  // backs the H1, breadcrumbs, JSON-LD entity name, and inline copy ("{title} FAQ", etc.) —
  // using the override here leaked meta-tag text into the visible page and was flagged by
  // Bing Webmaster Tools as a content-quality issue on /subjects/ib-math (2026-08-08).
  const title = subject.title ?? subject.name;
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
      { "@type": "ListItem", position: 2, name: "Subjects", item: `${BASE_URL}/subjects` },
      { "@type": "ListItem", position: 3, name: title, item: canonicalUrl },
    ],
  };

  const personalizedFaqs = content ? personalizeFaqs(content.faqs, title) : [];
  const faqJsonLd =
    content && personalizedFaqs.length > 0
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
    subject,
    price,
    initialSaved: Boolean(savedSubject),
    initialRequested: Boolean(openRequest),
    content,
    relatedCourseSlug,
    title,
  };

  return (
    <div className="max-w-[1080px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(subjectJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      {faqJsonLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      )}

      <nav aria-label="Breadcrumb" className="text-[13px] mb-5" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
        <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/subjects" className="hover:underline">Subjects</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>{title}</li>
        </ol>
      </nav>

      {/* Hero: plain/unanimated, same reasoning as the course detail page — see the comment
          there. Only content below the fold gets scroll-reveal treatment. */}
      <div className="card elev-sm p-0 overflow-hidden gap-0">
        <div className="relative h-[200px]" style={{ background: "var(--color-neutral-100)" }}>
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
        </div>
      </div>

      {/* Two-column layout, scoped to just the core content block — see the identical
          comment in app/courses/[slug]/page.tsx for why this is intentionally NOT wrapping
          the whole page (Tutors/Related/FAQ are full-width below instead). */}
      <div className="grid lg:grid-cols-[minmax(0,1fr)_300px] gap-8 lg:gap-10 mt-8">
        <div className="lg:hidden flex flex-col gap-6">
          <PriceCard {...priceCardProps} />
          <WhatYoullLearnCard items={subject.whatYoullLearn} />
        </div>

        <div className="flex flex-col gap-8">
          {isChooser && content?.chooserSiblings && (
            <Reveal y={20}>
              <div className="rounded-[var(--radius-md)] p-5" style={{ background: "var(--color-surface)" }}>
                {content.chooserIntro && (
                  <p className="text-[14px] leading-relaxed mb-3" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
                    {content.chooserIntro}
                  </p>
                )}
                <div className="flex flex-col gap-2">
                  {content.chooserSiblings.map((sibling) => (
                    <Link key={sibling.slug} href={`/subjects/${sibling.slug}`} className="btn btn-primary justify-between">
                      {sibling.label}
                      <span aria-hidden>→</span>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}

          {!isChooser && (
            <DetailSection icon={<GraduationCapIcon width={17} height={17} />} tint="accent-2" title={`About ${title} tutoring`}>
              <p className="text-[14.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
                {aboutSubjectParagraph(subject)}
              </p>
            </DetailSection>
          )}

          {!isChooser && content?.subjectDetail && (
            <DetailSection icon={<LayersIcon width={17} height={17} />} tint="accent" title="What this covers">
              <ExpandableDetail
                highlights={content.subjectDetailHighlights ?? []}
                paragraphs={paragraphize(content.subjectDetail)}
              />
            </DetailSection>
          )}

          {!isChooser && content?.differentiation && (
            <DetailSection icon={<UserCheckIcon width={17} height={17} />} tint="verified" title="Why a TutorA tutor">
              <p className="text-[14.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
                {sanitizeDifferentiation(content.differentiation, subjectTutors.length > 0)}
              </p>
            </DetailSection>
          )}

        </div>

        <aside className="hidden lg:flex lg:flex-col lg:gap-6 lg:sticky lg:top-24">
          <PriceCard {...priceCardProps} />
          <WhatYoullLearnCard items={subject.whatYoullLearn} />
        </aside>
      </div>

      {/* Full-width below the two-column zone — see the identical comment in
          app/courses/[slug]/page.tsx. */}
      <div className="flex flex-col gap-8 mt-8">
        {!isChooser && content && (
          <Reveal y={20}>
            <div className="rounded-[var(--radius-md)] p-5" style={{ background: "var(--color-surface)" }}>
              <h2 className="text-[14px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                Tutors for {title}
              </h2>
              {subjectTutors.length > 0 ? (
                <StaggerReveal className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(260px,1fr))]" y={14}>
                  {subjectTutors.map((t) => (
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
                      {t.bio && (
                        <p className="text-[13px] leading-relaxed m-0 mt-0.5" style={{ color: "color-mix(in srgb, var(--color-text) 75%, transparent)" }}>
                          {t.bio}
                        </p>
                      )}
                    </Link>
                  ))}
                </StaggerReveal>
              ) : (
                <p className="text-[13.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 72%, transparent)" }}>
                  {`We don’t have a tutor actively teaching ${title} yet — send a request and we’ll match one for you.`}
                </p>
              )}
            </div>
          </Reveal>
        )}

        {relatedSubjects.length > 0 && (
          <Reveal y={20}>
            <div>
              <h2 className="text-[16px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                More {subject.curriculum} subjects
              </h2>
              <StaggerReveal className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]" y={16}>
                {relatedSubjects.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/subjects/${related.slug}`}
                    className="card elev-sm p-4 flex flex-col gap-1.5 transition-shadow duration-200 hover:shadow-[var(--shadow-md)]"
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
              </StaggerReveal>
            </div>
          </Reveal>
        )}

        {personalizedFaqs.length > 0 && (
          <Reveal y={20}>
            <div>
              <h2 className="text-[16px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
                {title} FAQ
              </h2>
              <FaqAccordion faqs={personalizedFaqs} />
            </div>
          </Reveal>
        )}
      </div>
    </div>
  );
}
