import "server-only";
import { generateSecret, generateURI, verify } from "otplib";
import bcrypt from "bcryptjs";
import QRCode from "qrcode";

const ISSUER = "TutorConnect";

export function generateTotpSecret(): string {
  return generateSecret();
}

export async function generateTotpQrCodeDataUrl(email: string, secret: string): Promise<string> {
  const otpauth = generateURI({ issuer: ISSUER, label: email, secret });
  return QRCode.toDataURL(otpauth);
}

export async function verifyTotpCode(secret: string, code: string): Promise<boolean> {
  try {
    const result = await verify({ secret, token: code });
    return result.valid;
  } catch {
    return false;
  }
}

export function generateBackupCodes(count = 8): string[] {
  const codes: string[] = [];
  for (let i = 0; i < count; i++) {
    const bytes = crypto.getRandomValues(new Uint8Array(5));
    codes.push(Array.from(bytes, (b) => b.toString(16).padStart(2, "0")).join("").slice(0, 10));
  }
  return codes;
}

export async function hashBackupCodes(codes: string[]): Promise<string[]> {
  return Promise.all(codes.map((code) => bcrypt.hash(code, 10)));
}

export async function consumeBackupCode(hashedCodes: string[], candidate: string): Promise<{ matched: boolean; remaining: string[] }> {
  for (let i = 0; i < hashedCodes.length; i++) {
    if (await bcrypt.compare(candidate, hashedCodes[i]!)) {
      const remaining = [...hashedCodes];
      remaining.splice(i, 1);
      return { matched: true, remaining };
    }
  }
  return { matched: false, remaining: hashedCodes };
}
