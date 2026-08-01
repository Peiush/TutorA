import "server-only";
import bcrypt from "bcryptjs";

export const OTP_TTL_MS = 10 * 60 * 1000;
export const MAX_OTP_ATTEMPTS = 5;

export function generateOtpCode(): string {
  const bytes = crypto.getRandomValues(new Uint32Array(1));
  const code = 100000 + (bytes[0]! % 900000);
  return code.toString();
}

export async function hashOtpCode(code: string): Promise<string> {
  return bcrypt.hash(code, 10);
}

export async function verifyOtpCode(candidate: string, hash: string): Promise<boolean> {
  return bcrypt.compare(candidate, hash);
}
