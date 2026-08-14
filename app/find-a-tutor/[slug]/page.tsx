import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/tag";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { TutorDetailActions } from "@/components/find/tutor-detail-actions";
import { TutorDetailMotion } from "@/components/find/tutor-detail-motion";
import { TutorProfileIllustration } from "@/components/find/tutor-profile-illustration";
import {
  getTutorProfileBySlug,
  getApprovedTutorListings,
  getRelatedTutors,
  type TutorProfileDetail,
} from "@/app/lib/tutor-listings";
import { SUBJECT_TO_COURSE_SLUG } from "@/lib/subject-course-links";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

const BASE_URL = "https://www.tutora.it.com";

// Google truncates SERP snippets around ~155-160 chars; admin-written bios run
// unbounded (548 chars on a sampled profile — RE-AUDIT-REPORT-2026-08-10-POSTFIX.md,
// action 6), so the <meta description>/og/twitter tags need a hard cap. Cuts at the
// last whole word under the limit rather than mid-word.
const META_DESCRIPTION_MAX = 155;

function truncateMetaDescription(text: string, max = META_DESCRIPTION_MAX): string {
  if (text.length <= max) return text;
  const cut = text.slice(0, max);
  const lastSpace = cut.lastIndexOf(" ");
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}

// Keeps the <title> tag within Google's ~60-char display limit even for tutors with many subject listings.
function titleSubjectLabel(tutor: TutorProfileDetail): string {
  const names = tutor.subjects.map((s) => s.subjectName);
  if (names.length === 0) return "Verified Tutor";
  if (names.length <= 2) return names.join(", ");
  return `${names.slice(0, 2).join(", ")} & more`;
}

// When the admin wrote a real bio, it stands on its own — the avatar, subject chips, and meta
// line elsewhere on this page already show name/subjects/country/experience, so restating them
// here was pure redundant filler (RE-AUDIT-REPORT.md, 2026-08-10). Only fall back to a
// structured-facts summary when there's no bio to show at all.
function tutorIntroParagraph(tutor: TutorProfileDetail): string {
  if (tutor.bio) return tutor.bio;

  const names = tutor.subjects.map((s) => s.subjectName);
  const subjectList =
    names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names[names.length - 1]}` : names[0] ?? "their subject";
  const experiencePart =
    tutor.yearsExperience != null
      ? `with ${tutor.yearsExperience} year${tutor.yearsExperience === 1 ? "" : "s"} of experience`
      : "as a personally verified tutor";
  const summary = `${tutor.name} teaches ${subjectList} on TutorA${
    tutor.country ? `, based in ${tutor.country}` : ""
  }, ${experiencePart}.`;

  return `${summary} Every tutor on TutorA is personally reviewed by our team before their profile goes live — there's no self-listing and no unverified claims.`;
}

export async function generateStaticParams() {
  const tutors = await getApprovedTutorListings();
  const slugs = new Set(tutors.map((t) => t.slug).filter((s): s is string => Boolean(s)));
  return Array.from(slugs).map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const tutor = await getTutorProfileBySlug(slug);
  if (!tutor) return {};

  const subjectNames = tutor.subjects.map((s) => s.subjectName).join(", ");
  const description = truncateMetaDescription(
    tutor.bio ||
      `${tutor.name} is a personally verified tutor on TutorA teaching ${subjectNames || "multiple subjects"}${
        tutor.country ? ` from ${tutor.country}` : ""
      }.`
  );
  const title = `${tutor.name} — ${titleSubjectLabel(tutor)}`;

  return {
    title,
    description,
    alternates: { canonical: `/find-a-tutor/${tutor.slug}` },
    openGraph: {
      type: "profile",
      title,
      description,
      url: `${BASE_URL}/find-a-tutor/${tutor.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function TutorDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [tutor, session] = await Promise.all([getTutorProfileBySlug(slug), auth()]);
  if (!tutor) notFound();

  const subjectNamesForMatch = tutor.subjects.map((s) => s.subjectName);
  const userId = session?.user?.id;
  const [savedTutor, openRequests, relatedTutors] = userId
    ? await Promise.all([
        prisma.savedTutor.findUnique({ where: { userId_tutorProfileId: { userId, tutorProfileId: tutor.id } } }),
        prisma.tutorRequest.findMany({
          where: { userId, requestedTutorProfileId: tutor.id, status: { in: ["OPEN", "MATCHED"] } },
          select: { subject: true },
        }),
        getRelatedTutors(tutor.id, subjectNamesForMatch),
      ])
    : [null, [], await getRelatedTutors(tutor.id, subjectNamesForMatch)];
  const requestedSubjectNames = openRequests.map((r) => r.subject);

  // Subject/course cross-links: prior to this, tutor profile pages linked out only to other
  // tutor profiles — the internal-linking audit (2026-08-09) flagged this as a one-directional
  // gap (subject/course pages already link to tutors, but tutors never linked back).
  const relatedSubjectLinks = tutor.subjects.filter(
    (s): s is typeof s & { subjectSlug: string } => Boolean(s.subjectSlug)
  );
  const relatedCourseSlugs = Array.from(
    new Set(
      relatedSubjectLinks
        .map((s) => SUBJECT_TO_COURSE_SLUG[s.subjectSlug])
        .filter((slug): slug is string => Boolean(slug))
    )
  );

  const canonicalUrl = `${BASE_URL}/find-a-tutor/${tutor.slug}`;
  const subjectNames = tutor.subjects.map((s) => s.subjectName).join(", ");
  const description =
    tutor.bio ||
    `${tutor.name} is a personally verified tutor on TutorA teaching ${subjectNames || "multiple subjects"}.`;

  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: tutor.name,
    description,
    url: canonicalUrl,
    ...(tutor.subjects.length > 0 && { knowsAbout: tutor.subjects.map((s) => s.subjectName) }),
    worksFor: { "@type": "Organization", name: "TutorA", sameAs: BASE_URL },
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
      { "@type": "ListItem", position: 2, name: "Find a Tutor", item: `${BASE_URL}/find-a-tutor` },
      { "@type": "ListItem", position: 3, name: tutor.name, item: canonicalUrl },
    ],
  };

  return (
    <TutorDetailMotion>
    <div className="tutor-detail-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav aria-label="Breadcrumb" className="tutor-breadcrumb" data-profile-intro>
        <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/find-a-tutor" className="hover:underline">Find a Tutor</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>{tutor.name}</li>
        </ol>
      </nav>

      <div className="tutor-detail-layout">
      <div className="tutor-profile-card">
        <div className="tutor-profile-hero">
        <div className="tutor-profile-identity" data-profile-intro>
          <TutorAvatar name={tutor.name} size={72} withBadge />
          <div className="min-w-0">
            <p className="tutor-kicker">Personally verified tutor</p>
            <h1 className="tutor-profile-name">{tutor.name}</h1>
            <div className="tutor-profile-meta">
              {tutor.country}
              {tutor.yearsExperience != null ? ` · ${tutor.yearsExperience} yrs experience` : ""}
            </div>
            <div className="tutor-verified-line">
              <span className="inline-flex items-center gap-1" style={{ color: "var(--color-verified)", fontWeight: 600 }}>
                <VerifiedBadge />
                <span className="text-[12.5px]">Verified</span>
              </span>
              <span className="tutor-verified-copy">
                Reviewed by our team for subject expertise and experience.{" "}
                <Link href="/about" className="hover:underline" style={{ color: "inherit" }}>
                  How we vet tutors →
                </Link>
              </span>
            </div>
          </div>
        </div>
        <TutorProfileIllustration />
        </div>

        <div className="tutor-skill-strip" data-profile-intro>
          {tutor.subjects.map((s) => (
            <Tag key={s.id} variant="neutral" className="tutor-skill-pill">
              <SubjectIcon subject={s.subjectName} />
              {s.subjectName}
            </Tag>
          ))}
        </div>

        <p className="tutor-bio" data-profile-intro>
          {tutorIntroParagraph(tutor)}
        </p>

        <div className="tutor-section-heading" data-profile-intro>
          <div>
            <p className="tutor-kicker">Build your next breakthrough</p>
            <h2>Subjects taught</h2>
          </div>
          <span>{tutor.subjects.length} {tutor.subjects.length === 1 ? "subject" : "subjects"}</span>
        </div>
        <TutorDetailActions
          tutorProfileId={tutor.id}
          tutorName={tutor.name}
          subjects={tutor.subjects}
          initialSaved={Boolean(savedTutor)}
          initialRequestedSubjects={requestedSubjectNames}
        />

        {(relatedSubjectLinks.length > 0 || relatedCourseSlugs.length > 0) && (
          <div className="tutor-related-links" data-related-section>
            <div className="tutor-related-heading">
              <span className="tutor-related-heading-mark" aria-hidden="true">↗</span>
              <div>
                <span className="tutor-kicker">Keep learning</span>
                <span className="tutor-related-label">
              Subjects & courses {tutor.name} teaches
                </span>
              </div>
            </div>
            <div className="tutor-resource-grid">
              {relatedSubjectLinks.map((s) => (
                <Link key={s.id} href={`/subjects/${s.subjectSlug}`} className="tutor-resource-link" data-related-link>
                  <span className="tutor-resource-icon" aria-hidden="true"><SubjectIcon subject={s.subjectName} /></span>
                  <span><small>Subject guide</small>{s.subjectName}</span>
                  <span className="tutor-resource-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
              {relatedCourseSlugs.map((slug) => (
                <Link key={slug} href={`/courses/${slug}`} className="tutor-resource-link tutor-resource-link-course" data-related-link>
                  <span className="tutor-resource-icon" aria-hidden="true">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 5.5c2-1 5-1 8 .5 3-1.5 6-1.5 8-.5v13c-2-1-5-1-8 .5-3-1.5-6-1.5-8-.5v-13Z" /><path d="M12 6v13" /></svg>
                  </span>
                  <span><small>Structured path</small>Full prep course</span>
                  <span className="tutor-resource-arrow" aria-hidden="true">↗</span>
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link href="/find-a-tutor" className="tutor-back-link">
          ← Back to all tutors
        </Link>
      </div>
      </div>

      {relatedTutors.length > 0 && (
        <div className="tutor-related-section" data-related-section>
          <div className="tutor-related-section-heading">
            <div>
              <p className="tutor-kicker">More people to learn from</p>
              <h2>Other tutors teaching similar subjects</h2>
            </div>
            <span className="tutor-related-count">{relatedTutors.length} nearby matches</span>
          </div>
          <div className="tutor-related-grid">
            {relatedTutors.map((related, index) => (
              <Link
                key={related.slug}
                href={`/find-a-tutor/${related.slug}`}
                className="tutor-related-card"
                data-related-card
              >
                <div className="tutor-related-card-topline">
                  <TutorAvatar name={related.name} index={index + 1} size={48} />
                  <span className="tutor-related-card-arrow" aria-hidden="true">↗</span>
                </div>
                <span className="tutor-related-card-name">{related.name}</span>
                <span className="tutor-related-card-subjects">
                  {related.subjectNames.slice(0, 2).join(", ")}
                </span>
                <span className="tutor-related-card-location">
                  <span aria-hidden="true">●</span>{related.country || "Worldwide"}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
    </TutorDetailMotion>
  );
}
