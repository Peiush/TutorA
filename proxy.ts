import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export const { auth: proxy } = NextAuth(authConfig);

export default proxy;

// Scoped to exactly the prefixes authConfig's `authorized` callback gates
// (see roleGatedPrefixes in auth.config.ts). Every other route — the entire
// public marketing site (/, /about, /courses, /guarantee, ...) — is static
// and doesn't need a session check, so it shouldn't pay for one. Proxy runs
// as a Node.js serverless function on every matched request (Next.js 16
// default), so widening this matcher back to "everything" would mean a
// cold-start or transient failure in that function can take down navigation
// to pages that have nothing to do with auth.
export const config = {
  matcher: ["/dashboard/:path*", "/tutor/:path*", "/admin/:path*", "/become-a-tutor/:path*"],
};
