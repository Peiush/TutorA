import type { Metadata } from "next";
import { Space_Grotesk, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { auth } from "@/auth";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollTriggerGuard } from "@/components/home/scroll-trigger-guard";
import { AutoLoginPrompt } from "@/components/home/auto-login-prompt";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const caveat = Caveat({
  variable: "--font-caveat",
  subsets: ["latin"],
  weight: ["600"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tutora.it.com"),
  title: {
    default: "TutorA — The right tutor, personally matched",
    template: "%s — TutorA",
  },
  description:
    "TutorA sits between students and tutors so no one has to guess. Every match is personally verified by our team.",
  openGraph: {
    type: "website",
    siteName: "TutorA",
    locale: "en_US",
    title: "TutorA — The right tutor, personally matched",
    description:
      "TutorA sits between students and tutors so no one has to guess. Every match is personally verified by our team.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TutorA — The right tutor, personally matched",
    description:
      "TutorA sits between students and tutors so no one has to guess. Every match is personally verified by our team.",
  },
  verification: {
    google: "CvK_OAkuYG6OD3qFDaKAha2lRdVoEJXihUNSBIr6RGs",
  },
};

const BASE_URL = "https://www.tutora.it.com";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "TutorA",
  url: BASE_URL,
  description:
    "TutorA sits between students and tutors so no one has to guess. Every match is personally verified by our team.",
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TutorA",
  url: BASE_URL,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      className={`${spaceGrotesk.variable} ${inter.variable} ${caveat.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }} />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-full focus:px-4 focus:py-2"
          style={{ background: "var(--color-bg)", color: "var(--color-text)", boxShadow: "var(--shadow-lg)" }}
        >
          Skip to content
        </a>
        <SiteNav user={session?.user ?? null} />
        <main id="main-content" className="flex-1">{children}</main>
        <SiteFooter />
        <ScrollTriggerGuard />
        <AutoLoginPrompt isAuthenticated={Boolean(session?.user?.id)} />
      </body>
    </html>
  );
}
