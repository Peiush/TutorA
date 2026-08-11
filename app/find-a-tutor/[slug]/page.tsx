import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Tag } from "@/components/ui/tag";
import { VerifiedBadge } from "@/components/ui/verified-badge";
import { TutorAvatar } from "@/components/ui/tutor-avatar";
import { SubjectIcon } from "@/components/ui/subject-icons";
import { TutorDetailActions } from "@/components/find/tutor-detail-actions";
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
    <div className="max-w-[720px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(32px,4vw,56px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />

      <nav aria-label="Breadcrumb" className="text-[13px] mb-5" style={{ color: "color-mix(in srgb, var(--color-text) 68%, transparent)" }}>
        <ol className="flex items-center gap-1.5 flex-wrap list-none m-0 p-0">
          <li><Link href="/" className="hover:underline">Home</Link></li>
          <li aria-hidden>/</li>
          <li><Link href="/find-a-tutor" className="hover:underline">Find a Tutor</Link></li>
          <li aria-hidden>/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>{tutor.name}</li>
        </ol>
      </nav>

      <div className="card elev-sm p-6 flex flex-col gap-4">
        <div className="flex gap-4 items-center">
          <TutorAvatar name={tutor.name} size={72} withBadge />
          <div className="min-w-0">
            <h1 className="font-[var(--font-heading)] text-[24px] m-0">{tutor.name}</h1>
            <div className="text-[13.5px] mt-1" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
              {tutor.country}
              {tutor.yearsExperience != null ? ` · ${tutor.yearsExperience} yrs experience` : ""}
            </div>
            <div className="flex items-center gap-1.5 mt-1.5">
              <VerifiedBadge />
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {tutor.subjects.map((s) => (
            <Tag key={s.id} variant="neutral" className="inline-flex items-center gap-1">
              <SubjectIcon subject={s.subjectName} />
              {s.subjectName}
            </Tag>
          ))}
        </div>

        <p className="text-[14.5px] leading-relaxed m-0" style={{ color: "color-mix(in srgb, var(--color-text) 78%, transparent)" }}>
          {tutorIntroParagraph(tutor)}
        </p>

        <h2 className="text-[14px] font-semibold mt-2" style={{ fontFamily: "var(--font-heading)" }}>
          Subjects taught
        </h2>
        <TutorDetailActions
          tutorProfileId={tutor.id}
          tutorName={tutor.name}
          subjects={tutor.subjects}
          initialSaved={Boolean(savedTutor)}
          initialRequestedSubjects={requestedSubjectNames}
        />

        {(relatedSubjectLinks.length > 0 || relatedCourseSlugs.length > 0) && (
          <div className="flex flex-col gap-1">
            <span className="text-[12px]" style={{ color: "color-mix(in srgb, var(--color-text) 60%, transparent)" }}>
              Subjects & courses {tutor.name} teaches
            </span>
            <div className="flex flex-wrap gap-x-3 gap-y-1">
              {relatedSubjectLinks.map((s) => (
                <Link key={s.id} href={`/subjects/${s.subjectSlug}`} className="text-[13px] hover:underline">
                  {s.subjectName} →
                </Link>
              ))}
              {relatedCourseSlugs.map((slug) => (
                <Link key={slug} href={`/courses/${slug}`} className="text-[13px] hover:underline">
                  Full prep course →
                </Link>
              ))}
            </div>
          </div>
        )}

        <Link href="/find-a-tutor" className="text-[13.5px] hover:underline mt-2">
          ← Back to all tutors
        </Link>
      </div>

      {relatedTutors.length > 0 && (
        <div className="mt-8">
          <h2 className="text-[16px] font-semibold mb-3" style={{ fontFamily: "var(--font-heading)" }}>
            Other tutors teaching similar subjects
          </h2>
          <div className="grid gap-3 [grid-template-columns:repeat(auto-fit,minmax(220px,1fr))]">
            {relatedTutors.map((related) => (
              <Link
                key={related.slug}
                href={`/find-a-tutor/${related.slug}`}
                className="card elev-sm p-4 flex flex-col gap-1.5 hover:shadow-[var(--shadow-md)] transition-shadow duration-200"
                style={{ borderColor: "var(--color-divider)" }}
              >
                <span className="text-[14px] font-semibold" style={{ fontFamily: "var(--font-heading)" }}>
                  {related.name}
                </span>
                <span className="text-[12.5px]" style={{ color: "color-mix(in srgb, var(--color-text) 70%, transparent)" }}>
                  {related.subjectNames.slice(0, 2).join(", ")}
                  {related.country ? ` · ${related.country}` : ""}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
