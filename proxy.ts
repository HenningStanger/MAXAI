import { jwtVerify } from "jose";
import { NextResponse, type NextRequest } from "next/server";

const ADMIN_COOKIE_NAME = "maxai_admin_session";
const USER_COOKIE_NAME = "maxai_user_session";

async function hasRoleSession(request: NextRequest, cookieName: string, expectedRole: "admin" | "user") {
  const token = request.cookies.get(cookieName)?.value;
  if (!token) {
    return false;
  }

  const secret = process.env.AUTH_SECRET;
  if (!secret) {
    return false;
  }

  try {
    const { payload } = await jwtVerify(token, new TextEncoder().encode(secret));
    return payload.role === expectedRole;
  } catch {
    return false;
  }
}

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (pathname.startsWith("/admin/login")) {
      return NextResponse.next();
    }

    const authenticated = await hasRoleSession(request, ADMIN_COOKIE_NAME, "admin");
    if (authenticated) {
      return NextResponse.next();
    }

    const loginUrl = new URL("/admin/login", request.url);
    loginUrl.searchParams.set("next", request.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname.startsWith("/onboarding") || pathname.startsWith("/min-konto")) {
    const userAuthenticated = await hasRoleSession(request, USER_COOKIE_NAME, "user");
    if (userAuthenticated) {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (pathname.startsWith("/login") || pathname.startsWith("/ny-bruker")) {
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/onboarding/:path*", "/min-konto/:path*", "/login", "/ny-bruker"]
};
