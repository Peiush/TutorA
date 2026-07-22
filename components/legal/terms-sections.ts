import type { LegalSection } from "@/components/legal/legal-content";

export const TERMS_SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    title: "Acceptance of Terms",
    icon: "M9 12.5 11 15l4-5.5M12 3.5l7.5 3v5c0 5-3.2 8.6-7.5 10.5-4.3-1.9-7.5-5.5-7.5-10.5v-5Z",
    body: [
      "By creating an account or using any part of TutorA, you agree to these Terms of Service and to our Privacy Policy. If you don't agree with them, please don't use the platform.",
      "These terms apply to everyone who uses TutorA — students, tutors, and admins alike — whichever dashboard you sign in to.",
    ],
  },
  {
    id: "our-role",
    title: "Our Role as a Marketplace",
    icon: "M3.5 8.5 12 4l8.5 4.5v7L12 20l-8.5-4.5Z M12 4v16 M3.5 8.5 12 12l8.5-3.5",
    body: [
      "TutorA is an admin-mediated marketplace that connects students and tutors across borders. We are not a party to the tutoring relationship itself — we review, verify, and personally introduce the two sides.",
      "We don't employ tutors and we don't enroll students in any curriculum. Once a match is confirmed, the lessons, schedule, and teaching arrangement are between the student and the tutor.",
    ],
  },
  {
    id: "accounts",
    title: "Accounts & Eligibility",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5",
    list: [
      "You must provide accurate, current information when you register, and keep it up to date.",
      "One account per person. Accounts are personal and may not be transferred or shared.",
      "You're responsible for keeping your login credentials secure and for activity on your account.",
      "The platform has three roles — Student, Tutor, and Admin — each with its own dashboard and permissions.",
    ],
  },
  {
    id: "verification",
    title: "Tutor Verification & Listings",
    icon: "M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Zm-3 10 2 2 4-4.5",
    body: [
      "Every tutor listing is reviewed by our team before it goes live — we check the information provided and, where relevant, credentials and experience.",
      "Verification reflects a good-faith review at a point in time. It doesn't guarantee any particular teaching outcome, and tutors are responsible for keeping their listed qualifications accurate.",
    ],
  },
  {
    id: "requests",
    title: "Requests & Matching",
    icon: "M11 4a7 7 0 1 0 4.5 12.4l4.6 4.6M11 4a7 7 0 0 1 7 7",
    body: [
      "When a student submits a request, our team reviews it and personally proposes a match — usually within 24–48 hours. Requests are never posted publicly for tutors to browse or pitch on.",
      "We aim to match thoughtfully rather than quickly. We may ask either side follow-up questions before confirming a match, and we may decline to propose a match if we don't think it's a good fit.",
    ],
  },
  {
    id: "fees",
    title: "Fees, Payments & Commission",
    icon: "M12 2v20M17 6.5c0-1.9-2.2-3-5-3s-5 1.4-5 3 2.2 3 5 3 5 1.1 5 3-2.2 3-5 3-5-1.1-5-3",
    body: [
      "There are no listing fees for tutors and no charge to browse or submit a request. TutorA earns a single, percentage-based success fee once a match is confirmed by both sides — never before.",
      "Current commission rates are published in our Commission Policy, which is incorporated into these terms by reference. We'll give advance notice before any rate change takes effect.",
    ],
  },
  {
    id: "conduct",
    title: "User Conduct",
    icon: "M4 5h16M4 12h16M4 19h10",
    list: [
      "Don't use TutorA to make first contact and then move the arrangement off-platform to avoid the success fee.",
      "Represent your qualifications, availability, and needs honestly.",
      "No harassment, discrimination, or abusive behavior toward tutors, students, or our team.",
      "Honor the sessions and commitments you agree to once a match is confirmed.",
    ],
  },
  {
    id: "cancellations",
    title: "Cancellations & Refunds",
    icon: "M3 12a9 9 0 1 0 3-6.7M3 4v5h5",
    body: [
      "Cancellation and rescheduling terms for individual lessons are agreed between the student and tutor as part of the match. Reach out to our support team if a dispute needs mediation.",
      "We'll always try to help both sides reach a fair outcome in good faith, but TutorA cannot guarantee a specific refund or resolution for disputes that arise after a match is confirmed.",
    ],
  },
  {
    id: "ip",
    title: "Intellectual Property",
    icon: "M12 2v6l3 1.5M12 2 4 5.5v6c0 5 3.4 8.6 8 10.5 4.6-1.9 8-5.5 8-10.5v-6Z",
    body: [
      "The TutorA name, logo, and platform (including its design and code) belong to TutorA. You may not copy or repurpose them without permission.",
      "You keep ownership of the content you submit — profile details, messages, reviews — but grant TutorA a license to display it on the platform for the purpose of matching and running the service.",
    ],
  },
  {
    id: "disclaimers",
    title: "Disclaimers & Limitation of Liability",
    icon: "M12 9v4m0 4h.01M10.3 3.9 2.5 18a1.8 1.8 0 0 0 1.6 2.7h15.8a1.8 1.8 0 0 0 1.6-2.7L13.7 3.9a1.8 1.8 0 0 0-3.4 0Z",
    body: [
      "TutorA is provided \"as is.\" We carry out verification and matching in good faith, but we can't guarantee any tutor's teaching performance or a student's learning outcome.",
      "To the extent permitted by law, TutorA's liability for any claim relating to the platform is limited to the fees you've paid us in the 12 months before the claim arose.",
    ],
  },
  {
    id: "termination",
    title: "Suspension & Termination",
    icon: "M12 8v5m0 4h.01M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Z",
    body: [
      "We may suspend or close an account that violates these terms, misrepresents information, or attempts to bypass the matching process or success fee.",
      "You're free to close your account at any time by contacting support — outstanding fees on confirmed matches remain payable.",
    ],
  },
  {
    id: "changes",
    title: "Changes to These Terms",
    icon: "M4 4v6h6M20 20v-6h-6M5 9a7 7 0 0 1 12.5-3.5M19 15a7 7 0 0 1-12.5 3.5",
    body: [
      "We may update these terms from time to time as the platform evolves. If a change is material, we'll let you know by email or an in-app notice before it takes effect.",
      "Continuing to use TutorA after an update means you accept the revised terms.",
    ],
  },
  {
    id: "law",
    title: "Governing Law",
    icon: "M12 3v3m0 15v-3M5 8l3 5-3 5M19 8l-3 5 3 5M5 8h4m6 0h4",
    body: [
      "These terms are governed by the laws applicable in TutorA's place of operation, without regard to conflict-of-law rules.",
      "If a disagreement comes up, we ask that you reach out to us first — most issues can be resolved directly through good-faith conversation with our support team.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: "M4 6h16v12H4Zm0 0 8 7 8-7",
    body: ["Questions about these terms? Reach our team any time — we're happy to walk through anything that's unclear before you sign up."],
  },
];
