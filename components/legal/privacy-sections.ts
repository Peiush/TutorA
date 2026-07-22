import type { LegalSection } from "@/components/legal/legal-content";

export const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: "overview",
    title: "Overview",
    icon: "M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0-13c4 3 7 4.5 9 4.5-.3 8-4.3 12-9 14-4.7-2-8.7-6-9-14 2 0 5-1.5 9-4.5Z",
    body: [
      "This policy explains what personal information TutorA collects, why we collect it, and the choices you have — for students, tutors, and admins alike.",
      "Because TutorA matches people with care across borders, some of what follows covers how information moves between countries as part of that process. If anything here is unclear, our team is happy to walk you through it.",
    ],
  },
  {
    id: "data-we-collect",
    title: "Information We Collect",
    icon: "M4 7c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3Zm0 0v10c0 1.7 3.6 3 8 3s8-1.3 8-3V7M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3",
    list: [
      "Account details: name, email, and password when you sign up as a student, tutor, or admin.",
      "Profile information: subjects, availability, experience, and other details you add to a request or listing.",
      "Payment information: processed by our payment provider — TutorA doesn't store full card numbers.",
      "Usage data: pages visited, actions taken, and device/browser information, collected automatically.",
    ],
  },
  {
    id: "how-we-use",
    title: "How We Use Your Information",
    icon: "M11 4a7 7 0 1 0 4.5 12.4l4.6 4.6M11 4a7 7 0 0 1 7 7",
    list: [
      "To review requests and listings, and to personally propose matches between students and tutors.",
      "To verify tutor credentials and keep the marketplace trustworthy.",
      "To communicate with you about your account, a match, or a support request.",
      "To detect fraud, enforce our Terms of Service, and keep the platform secure.",
      "To understand how TutorA is used so we can improve it.",
    ],
  },
  {
    id: "sharing",
    title: "How We Share Information",
    icon: "M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 14a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm2.6-1.7 6.8 3.9M15.4 5.8 8.6 9.7",
    body: [
      "We don't sell your personal information, and we don't post student requests or tutor availability publicly. Contact details are shared between a student and tutor only after our team confirms a match.",
      "We share limited information with service providers who help us run TutorA — such as payment processing, hosting, and email delivery — and only to the extent needed for them to do that work. We may also disclose information when required by law or to protect the safety of our users.",
    ],
  },
  {
    id: "cross-border",
    title: "International Data Transfers",
    icon: "M12 2a15 15 0 0 1 0 20 15 15 0 0 1 0-20ZM2.5 9h19M2.5 15h19",
    body: [
      "Because TutorA connects students and tutors across borders, your information may be stored and processed in a country other than the one you live in — typically wherever our hosting and payment providers operate.",
      "Wherever your data travels, we apply the same safeguards described in this policy and only transfer what's needed to run the service.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies & Tracking Technologies",
    icon: "M14.5 3.5c0 1 .8 1.8 1.8 1.8s1.8.8 1.8 1.8c0 6-3.6 11-9 12-5-1-8.5-5.5-9-11 0-3 3-6.5 8-6.5.9 0 1.7.3 2.3.9-.3.4-.4.9-.4 1.4a3.5 3.5 0 0 0 3.5 3.5Zm-6 6.5h.01M9 15h.01M12.5 12h.01",
    body: [
      "We use cookies to keep you signed in, remember your preferences, and understand how the platform is used. Some cookies are essential for TutorA to work; others are optional analytics cookies.",
      "You can control or clear cookies through your browser settings. Disabling essential cookies may prevent parts of the site, like staying signed in, from working properly.",
    ],
  },
  {
    id: "security",
    title: "Data Security",
    icon: "M12 2 3.5 5.5v6c0 5 3.6 8.6 8.5 10.5 4.9-1.9 8.5-5.5 8.5-10.5v-6L12 2Zm0 6v5",
    body: [
      "We use encryption in transit, access controls, and our admin review pipeline to limit who can see sensitive information and when.",
      "No method of storage or transmission is completely secure, so while we work hard to protect your data, we can't guarantee absolute security.",
    ],
  },
  {
    id: "retention",
    title: "Data Retention",
    icon: "M12 7v5l3.5 2M12 3.5a8.5 8.5 0 1 0 8.5 8.5",
    body: [
      "We keep your information for as long as your account is active, and for a reasonable period afterward to resolve disputes, keep financial records, and meet legal obligations.",
      "You can ask us to delete your account at any time — see \"Your Rights & Choices\" below.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    icon: "M9 12.5 11 15l4-5.5M12 3.5l7.5 3v5c0 5-3.2 8.6-7.5 10.5-4.3-1.9-7.5-5.5-7.5-10.5v-5Z",
    list: [
      "Access or correct the personal information in your account at any time from your dashboard.",
      "Ask us to delete your account and associated data, subject to the retention needs described above.",
      "Opt out of non-essential marketing emails using the unsubscribe link in any message.",
      "Contact our team with any privacy question or request, and we'll respond promptly.",
    ],
  },
  {
    id: "children",
    title: "Children's Privacy",
    icon: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm-7 8c0-3.6 3.1-6.5 7-6.5s7 2.9 7 6.5",
    body: [
      "TutorA accounts are intended for adults. If a student is a minor, their account and requests must be created and managed by a parent or guardian, who is responsible for the information provided.",
      "If we learn that a minor has created an account directly without guardian involvement, we'll take steps to remove it.",
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    icon: "M4 4v6h6M20 20v-6h-6M5 9a7 7 0 0 1 12.5-3.5M19 15a7 7 0 0 1-12.5 3.5",
    body: [
      "We may update this policy as TutorA evolves. If a change is material, we'll let you know by email or an in-app notice before it takes effect.",
      "Continuing to use TutorA after an update means you accept the revised policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    icon: "M4 6h16v12H4Zm0 0 8 7 8-7",
    body: ["Questions about this policy or your data? Reach our team any time — we're glad to help."],
  },
];
