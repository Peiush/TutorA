import type { Metadata } from "next";
import { Space_Grotesk, Inter, Caveat } from "next/font/google";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { SiteNav } from "@/components/layout/site-nav";
import { SiteFooter } from "@/components/layout/site-footer";
import { ScrollTriggerGuard } from "@/components/home/scroll-trigger-guard";
import { AutoLoginPrompt } from "@/components/home/auto-login-prompt";

const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

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
    default: "TutorA — Personalized Online Learning with Expert Indian Teachers",
    template: "%s — TutorA",
  },
  description:
    "Live 1-on-1 and small group classes for Grades 6–12, SAT, Coding & more. Learn from experienced Indian teachers, personally verified by our team — wherever you are in the world.",
  openGraph: {
    type: "website",
    siteName: "TutorA",
    locale: "en_US",
    title: "TutorA — Personalized Online Learning with Expert Indian Teachers",
    description:
      "Live 1-on-1 and small group classes for Grades 6–12, SAT, Coding & more. Learn from experienced Indian teachers — wherever you are in the world.",
  },
  twitter: {
    card: "summary_large_image",
    title: "TutorA — Personalized Online Learning with Expert Indian Teachers",
    description:
      "Live 1-on-1 and small group classes for Grades 6–12, SAT, Coding & more. Learn from experienced Indian teachers — wherever you are in the world.",
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
    "TutorA connects international students with experienced, personally verified Indian teachers for live 1-on-1 and small group online classes.",
  logo: `${BASE_URL}/logo.png`,
  founder: { "@type": "Person", name: "Nancy Gupta", jobTitle: "Founder" },
  // sameAs (verified social/profile links) intentionally omitted — TutorA doesn't have
  // real social profiles live yet. Add them here once they exist; don't ship placeholder
  // URLs, since that fails Google's Organization verification rather than helping it.
  // Explicit priority markets, mirrored from the homepage's Service.areaServed — this
  // entity ships on every page (not just "/"), so it's the sitewide version of that signal.
  areaServed: [
    { "@type": "Country", name: "United States" },
    { "@type": "Country", name: "United Kingdom" },
    { "@type": "Country", name: "Canada" },
    { "@type": "Country", name: "Singapore" },
    { "@type": "Country", name: "United Arab Emirates" },
    "Worldwide",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TutorA",
  url: BASE_URL,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
        {/* Session is read client-side (see SiteNav/AutoLoginPrompt) instead of via
            server-side auth() here — that read used to force this layout, and every
            route under it, to render dynamically with no-store caching. */}
        <SessionProvider>
          <SiteNav />
          <main id="main-content" className="flex-1">{children}</main>
          <SiteFooter />
          <ScrollTriggerGuard />
          <AutoLoginPrompt />
        </SessionProvider>
        {GA_MEASUREMENT_ID && <GoogleAnalytics gaId={GA_MEASUREMENT_ID} />}
      </body>
    </html>
  );
}
