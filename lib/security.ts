import { NextResponse } from "next/server";

const encoder = new TextEncoder();
const ADMIN_COOKIE = "aixelis_admin";
const PASSWORD_ITERATIONS = 210000;

function toBase64Url(bytes: Uint8Array): string {
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function fromBase64Url(value: string): Uint8Array {
  const padded = value.replace(/-/g, "+").replace(/_/g, "/").padEnd(Math.ceil(value.length / 4) * 4, "=");
  const binary = atob(padded);
  const bytes = new Uint8Array(binary.length);
  for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
  return bytes;
}

function randomBytes(length: number): Uint8Array {
  const bytes = new Uint8Array(length);
  crypto.getRandomValues(bytes);
  return bytes;
}

async function hmac(value: string, secret: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", encoder.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const signature = await crypto.subtle.sign("HMAC", key, encoder.encode(value));
  return toBase64Url(new Uint8Array(signature));
}

function timingSafeEqual(left: string, right: string): boolean {
  const leftBytes = encoder.encode(left);
  const rightBytes = encoder.encode(right);
  if (leftBytes.length !== rightBytes.length) return false;

  let diff = 0;
  for (let index = 0; index < leftBytes.length; index += 1) {
    diff |= leftBytes[index] ^ rightBytes[index];
  }
  return diff === 0;
}

async function derivePassword(password: string, salt: Uint8Array, iterations: number): Promise<string> {
  const keyMaterial = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const saltBuffer = salt.buffer.slice(salt.byteOffset, salt.byteOffset + salt.byteLength) as ArrayBuffer;
  const bits = await crypto.subtle.deriveBits(
    { name: "PBKDF2", hash: "SHA-256", salt: saltBuffer, iterations },
    keyMaterial,
    256,
  );
  return toBase64Url(new Uint8Array(bits));
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16);
  const hash = await derivePassword(password, salt, PASSWORD_ITERATIONS);
  return `pbkdf2_sha256$${PASSWORD_ITERATIONS}$${toBase64Url(salt)}$${hash}`;
}

export async function verifyPassword(password: string, storedPassword: string): Promise<boolean> {
  const [scheme, iterationsValue, saltValue, hashValue] = storedPassword.split("$");
  if (scheme !== "pbkdf2_sha256" || !iterationsValue || !saltValue || !hashValue) return false;

  const iterations = Number(iterationsValue);
  if (!Number.isInteger(iterations) || iterations < 100000) return false;

  const derived = await derivePassword(password, fromBase64Url(saltValue), iterations);
  return timingSafeEqual(derived, hashValue);
}

export function getAdminPassword(): string | null {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV !== "production") return "888";
  return null;
}

function getAdminSessionSecret(): string | null {
  return process.env.ADMIN_SESSION_SECRET || process.env.ADMIN_PASSWORD || (process.env.NODE_ENV !== "production" ? "dev-admin-session-secret" : null);
}

export async function createAdminSessionCookie(): Promise<string | null> {
  const secret = getAdminSessionSecret();
  if (!secret) return null;

  const payload = toBase64Url(
    encoder.encode(
      JSON.stringify({
        exp: Date.now() + 1000 * 60 * 60 * 12,
        nonce: toBase64Url(randomBytes(12)),
      }),
    ),
  );
  const signature = await hmac(payload, secret);
  return `${payload}.${signature}`;
}

export async function isAdminRequest(request: Request): Promise<boolean> {
  const secret = getAdminSessionSecret();
  if (!secret) return false;

  const cookieHeader = request.headers.get("cookie") || "";
  const token = cookieHeader
    .split(";")
    .map((part) => part.trim())
    .find((part) => part.startsWith(`${ADMIN_COOKIE}=`))
    ?.slice(ADMIN_COOKIE.length + 1);

  if (!token) return false;
  const [payload, signature] = token.split(".");
  if (!payload || !signature) return false;

  const expectedSignature = await hmac(payload, secret);
  if (!timingSafeEqual(signature, expectedSignature)) return false;

  try {
    const session = JSON.parse(new TextDecoder().decode(fromBase64Url(payload))) as { exp?: number };
    return typeof session.exp === "number" && session.exp > Date.now();
  } catch {
    return false;
  }
}

export function setAdminCookie(response: NextResponse, token: string): void {
  response.cookies.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 12,
  });
}

export function clearAdminCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_COOKIE, "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
