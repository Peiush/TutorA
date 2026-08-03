export const REQUEST_FAQS: {
  q: string;
  a: string;
  link?: { href: string; label: string };
}[] = [
  {
    q: "Does one-on-one tutoring actually help?",
    a: "Yes — high-quality, personalized tutoring is one of the most effective ways to accelerate learning, according to research from the U.S. Department of Education's Institute of Education Sciences. That's the standard we hold every TutorA match to.",
    link: {
      href: "https://ies.ed.gov/learn/blog/how-high-quality-small-group-tutoring-can-accelerate-learning",
      label: "Read the IES research on high-quality tutoring",
    },
  },
  {
    q: "How do I request a tutor on TutorA?",
    a: "Fill in the five-step form on this page with your subject, schedule, budget, and contact details. Our team reviews every request and personally matches you with a verified tutor — no public lead list, no cold pitches.",
  },
  {
    q: "How long does it take to get matched?",
    a: "Most requests are reviewed and matched within 24–48 hours. You'll get an email confirmation the moment your request is submitted, and another once a tutor is proposed.",
  },
  {
    q: "Is requesting a tutor free?",
    a: "Yes. Submitting a request costs nothing. TutorA charges a single success fee only after both you and the tutor confirm the match — never before.",
  },
  {
    q: "What's the difference between requesting a tutor and browsing tutors myself?",
    a: "Requesting puts the search on our team: describe what you need once, and we hand-pick a verified match. Browsing on Find a Tutor lets you compare profiles and reach out directly yourself. Both lead to the same verified pool — pick whichever fits how you like to decide.",
  },
  {
    q: "Can I change my budget or schedule after submitting?",
    a: "Yes. Reply to your confirmation email with any changes and our team will adjust the match before proposing a tutor.",
  },
  {
    q: "Will my contact details be shared with a tutor right away?",
    a: "No. Your name, email, and phone number are only visible to our team until you confirm a proposed match — a tutor never sees them beforehand.",
  },
];
