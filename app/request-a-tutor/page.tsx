import { RequestPageBody } from "@/components/request/request-page-body";
import { RequestHowItWorks } from "@/components/request/request-how-it-works";
import { RequestComparison } from "@/components/request/request-comparison";
import { RequestFaq } from "@/components/request/request-faq";
import { stats } from "@/lib/mock-data";
import { REQUEST_FAQS } from "@/lib/request-faqs";

const BASE_URL = "https://www.tutora.it.com";

// Bump when this page's content changes materially — reused as the sitemap's lastmod
// (app/sitemap.ts), same convention as HOMEPAGE_LAST_UPDATED in app/page.tsx.
export const REQUEST_A_TUTOR_LAST_UPDATED = "2026-08-03";

export const metadata = {
  title: "Request a Tutor Online: Get Matched Fast",
  description:
    "Tell us what you're looking for and we'll personally match you with a verified tutor. No guessing — every request is reviewed by our team.",
  alternates: { canonical: "/request-a-tutor" },
};

const trustStats = [stats[1], stats[2]];

const breadcrumbJsonLd = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: BASE_URL },
    { "@type": "ListItem", position: 2, name: "Request a Tutor", item: `${BASE_URL}/request-a-tutor` },
  ],
};

const webPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  name: "Request a Tutor Online: Get Matched Fast",
  description: metadata.description,
  url: `${BASE_URL}/request-a-tutor`,
  dateModified: new Date().toISOString(),
  isPartOf: { "@type": "WebSite", name: "TutorA", url: BASE_URL },
  about: { "@type": "Organization", name: "TutorA", url: BASE_URL },
  audience: {
    "@type": "Audience",
    audienceType: "Students, parents, and adult learners looking for a private tutor",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: REQUEST_FAQS.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
};

export default function RequestATutorPage() {
  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <RequestPageBody trustStats={trustStats} />
      <RequestHowItWorks />
      <RequestComparison />
      <RequestFaq />
    </div>
  );
}
