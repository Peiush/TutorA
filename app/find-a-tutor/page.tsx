import { FindHero } from "@/components/find/find-hero";
import { TutorBrowser } from "@/components/find/tutor-browser";
import { HowItWorks } from "@/components/find/how-it-works";
import { FindTutorFaq } from "@/components/find/find-tutor-faq";
import { getApprovedTutorListings } from "@/app/lib/tutor-listings";
import { FIND_TUTOR_FAQS } from "@/lib/find-tutor-faqs";

const BASE_URL = "https://www.tutora.it.com";

export const metadata = {
  title: "Find a Tutor Online: Browse Verified, Vetted Educators",
  description:
    "Browse personally verified tutors across subjects and languages. Every listing is reviewed by our team before it's matched with a student.",
  alternates: { canonical: "/find-a-tutor" },
};

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Find a Tutor", item: `${BASE_URL}/find-a-tutor` },
  ],
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: FIND_TUTOR_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default async function FindATutorPage() {
  const tutors = await getApprovedTutorListings();

  const subjectCount = new Set(tutors.flatMap((t) => t.subjects)).size;
  const tutorCount = new Set(tutors.filter((t) => !t.onDemand).map((t) => t.id)).size;

  const collectionPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Find a Tutor",
    description: metadata.description,
    url: `${BASE_URL}/find-a-tutor`,
    dateModified: new Date().toISOString(),
    isPartOf: { "@type": "WebSite", name: "TutorA", url: BASE_URL },
    about: { "@type": "Organization", name: "TutorA", url: BASE_URL },
    author: { "@type": "Organization", name: "TutorA", url: BASE_URL },
    publisher: { "@type": "Organization", name: "TutorA", url: BASE_URL },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: tutorCount,
      itemListElement: Array.from(new Set(tutors.flatMap((t) => t.subjects)))
        .slice(0, 20)
        .map((subject, i) => ({
          "@type": "ListItem",
          position: i + 1,
          item: {
            "@type": "Service",
            serviceType: `${subject} tutoring`,
            name: `${subject} tutoring`,
            provider: { "@type": "Organization", name: "TutorA", url: BASE_URL },
            url: `${BASE_URL}/find-a-tutor?subject=${encodeURIComponent(subject)}`,
          },
        })),
    },
  };

  return (
    <div className="max-w-[1240px] mx-auto px-[clamp(20px,5vw,64px)] py-[clamp(20px,4vw,56px)]">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />

      <FindHero tutorCount={tutorCount} subjectCount={subjectCount} />
      <TutorBrowser tutors={tutors} />
      <HowItWorks />
      <FindTutorFaq />
    </div>
  );
}
