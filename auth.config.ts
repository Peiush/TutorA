import type { NextAuthConfig } from "next-auth";

const roleGatedPrefixes: Record<string, string> = {
  "/dashboard": "STUDENT",
  "/tutor": "TUTOR",
  "/admin": "ADMIN",
  "/become-a-tutor": "ADMIN",
};

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
    // Kept short since the role claim in the JWT isn't re-checked against the
    // database between logins — bounds how long a revoked/changed role stays live.
    maxAge: 12 * 60 * 60,
  },
  callbacks: {
    authorized({ auth, request }) {
      const { pathname } = request.nextUrl;
      const prefix = Object.keys(roleGatedPrefixes).find((p) =>
        pathname.startsWith(p)
      );
      if (!prefix) return true;
      if (!auth?.user) return false;

      const requiredRole = roleGatedPrefixes[prefix];
      // Admins can access any gated area; otherwise role must match.
      return auth.user.role === "ADMIN" || auth.user.role === requiredRole;
    },
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.sub as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
