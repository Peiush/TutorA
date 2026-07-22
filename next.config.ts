import type { NextConfig } from "next";

const isDev = process.env.NODE_ENV !== "production";

const contentSecurityPolicy = [
  "default-src 'self'",
  // React's dev mode uses eval() for debugging (stack traces, Fast Refresh);
  // never enabled in production builds.
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ""}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
  { key: "Strict-Transport-Security", value: "max-age=63072000; includeSubDomains; preload" },
];

// Server Actions already reject cross-origin POSTs by default (Origin vs Host
// check). This only needs populating if the app sits behind a reverse proxy
// or CDN domain that differs from the Host header — set APP_ORIGINS to a
// comma-separated list of those hostnames (no protocol), e.g. "my-proxy.com".
const allowedOrigins = process.env.APP_ORIGINS?.split(",").map((o) => o.trim()).filter(Boolean);

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
  ...(allowedOrigins?.length ? { experimental: { serverActions: { allowedOrigins } } } : {}),
};

export default nextConfig;
