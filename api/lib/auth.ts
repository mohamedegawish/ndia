import { SignJWT, jwtVerify } from "jose";
import bcryptjs from "bcryptjs";

const SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || "damietta-new-industrial-zone-secret-key-2024"
);

export async function hashPassword(password: string): Promise<string> {
  return bcryptjs.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcryptjs.compare(password, hash);
}

export async function createToken(payload: { id: number; email: string; role: string }): Promise<string> {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .setIssuedAt()
    .sign(SECRET);
}

export async function verifyToken(token: string): Promise<{ id: number; name: string; email: string; role: string } | undefined> {
  try {
    const { payload } = await jwtVerify(token, SECRET, { clockTolerance: 60 });
    return payload as unknown as { id: number; name: string; email: string; role: string };
  } catch {
    return undefined;
  }
}
