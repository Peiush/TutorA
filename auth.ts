import NextAuth, { CredentialsSignin } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { authConfig } from "./auth.config";
import { rateLimit } from "@/lib/rate-limit";
import { verifyTotpCode, consumeBackupCode } from "@/lib/mfa";
import { logSecurityEvent } from "@/lib/security-log";

const credentialsSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  code: z.string().trim().optional().nullable(),
});

class MfaRequiredError extends CredentialsSignin {
  code = "mfa_required";
}

class InvalidMfaCodeError extends CredentialsSignin {
  code = "invalid_mfa_code";
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      // Reads clientId/clientSecret from AUTH_GOOGLE_ID / AUTH_GOOGLE_SECRET.
      // Google verifies ownership of the email itself, so it's safe to link
      // straight into an existing credentials account with the same address
      // instead of bouncing the user with an OAuthAccountNotLinked error.
      allowDangerousEmailAccountLinking: true,
    }),
    Credentials({
      credentials: {
        email: {},
        password: {},
        code: {},
      },
      async authorize(credentials, request) {
        const parsed = credentialsSchema.safeParse(credentials);
        if (!parsed.success) {
          logSecurityEvent("auth.login_failed", { reason: "invalid_input" });
          return null;
        }

        const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
        const { email, password, code } = parsed.data;

        const byIp = rateLimit(`login:ip:${ip}`, 20, 15 * 60 * 1000);
        const byEmail = rateLimit(`login:email:${email}`, 8, 15 * 60 * 1000);
        if (!byIp.ok || !byEmail.ok) {
          logSecurityEvent("auth.login_rate_limited", { email, ip });
          return null;
        }

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user?.password) {
          logSecurityEvent("auth.login_failed", { reason: "unknown_email", email, ip });
          return null;
        }

        const valid = await bcrypt.compare(password, user.password);
        if (!valid) {
          logSecurityEvent("auth.login_failed", { reason: "bad_password", email, ip, userId: user.id });
          return null;
        }

        if (user.role === "ADMIN" && user.twoFactorEnabled) {
          if (!code) throw new MfaRequiredError();

          const validTotp = user.twoFactorSecret ? await verifyTotpCode(user.twoFactorSecret, code) : false;
          if (!validTotp) {
            const { matched, remaining } = await consumeBackupCode(user.twoFactorBackupCodes, code);
            if (!matched) {
              logSecurityEvent("auth.mfa_failed", { email, ip, userId: user.id });
              throw new InvalidMfaCodeError();
            }
            await prisma.user.update({ where: { id: user.id }, data: { twoFactorBackupCodes: remaining } });
            logSecurityEvent("auth.mfa_backup_code_used", { email, ip, userId: user.id, remaining: remaining.length });
          }
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
});
