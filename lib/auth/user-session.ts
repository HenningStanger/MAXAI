import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const USER_SESSION_COOKIE = "maxai_user_session";
const SESSION_DURATION_SECONDS = 60 * 60 * 24 * 30;

function getSecret() {
  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    throw new Error("AUTH_SECRET mangler i miljøvariabler.");
  }
  return new TextEncoder().encode(secret);
}

function shouldUseSecureCookie() {
  if (process.env.AUTH_COOKIE_SECURE === "true") {
    return true;
  }
  if (process.env.AUTH_COOKIE_SECURE === "false") {
    return false;
  }
  return process.env.NODE_ENV === "production";
}

export async function createUserSession(userId: string, email: string) {
  const token = await new SignJWT({ role: "user", userId, email })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_DURATION_SECONDS}s`)
    .sign(getSecret());

  const cookieStore = await cookies();
  cookieStore.set(USER_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: shouldUseSecureCookie(),
    path: "/",
    sameSite: "lax",
    maxAge: SESSION_DURATION_SECONDS
  });
}

export async function destroyUserSession() {
  const cookieStore = await cookies();
  cookieStore.delete(USER_SESSION_COOKIE);
}

export async function getUserSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(USER_SESSION_COOKIE)?.value;
  if (!token) {
    return null;
  }

  try {
    const { payload } = await jwtVerify(token, getSecret());
    if (
      payload.role !== "user" ||
      typeof payload.userId !== "string" ||
      typeof payload.email !== "string"
    ) {
      return null;
    }

    return {
      userId: payload.userId,
      email: payload.email
    };
  } catch {
    return null;
  }
}

