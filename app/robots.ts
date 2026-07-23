import type { MetadataRoute } from "next";

const BASE_URL = "https://www.tutora.it.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard", "/tutor", "/admin", "/become-a-tutor", "/api/"],
    },
    sitemap: `${BASE_URL}/sitemap.xml`,
  };
}
