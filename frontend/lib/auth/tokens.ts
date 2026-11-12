import "server-only";
import crypto from "crypto";
import type { Role } from "./roles";

export type SessionPayload = {
  userId: string;
  email: string;
  name: string;
  role: Role;
  exp: number; // unix timestamp ms
};

const SECRET = process.env.ADMIN_SESSION_SECRET || "purva-ocean-default-admin-secret-key-32-chars-long";

/**
 * Sign session payload as a base64 string with HMAC-SHA256 signature
 */
export function createSessionToken(payload: Omit<SessionPayload, "exp">, maxAgeSeconds: number = 7 * 24 * 60 * 60): string {
  const fullPayload: SessionPayload = {
    ...payload,
    exp: Date.now() + maxAgeSeconds * 1000,
  };

  const payloadBase64 = Buffer.from(JSON.stringify(fullPayload)).toString("base64url");
  const signature = crypto.createHmac("sha256", SECRET).update(payloadBase64).digest("base64url");

  return `${payloadBase64}.${signature}`;
}

/**
 * Verify session token string and return payload if valid and unexpired
 */
export function verifySessionToken(tokenString: string): SessionPayload | null {
  try {
    const parts = tokenString.split(".");
    if (parts.length !== 2) return null;

    const [payloadBase64, signature] = parts;
    const expectedSignature = crypto.createHmac("sha256", SECRET).update(payloadBase64).digest("base64url");

    // Timing-safe comparison to prevent timing attacks
    if (!crypto.timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSignature))) {
      return null;
    }

    const payloadJson = Buffer.from(payloadBase64, "base64url").toString("utf-8");
    const payload = JSON.parse(payloadJson) as SessionPayload;

    // Check expiry
    if (payload.exp && payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}

