import { NextRequest, NextResponse } from "next/server";

const PRIVATE_ROUTES = ["/buy-ticket", "/ticket-list", "/signup", "/my-info"];

const isLoginPath = (pathname: string) => {
  return pathname === "/login" && pathname.match(/^\/login(?:\/([^/]+))?$/);
};

const handleAuthenticatedUser = (pathname: string, origin: string) => {
  if (isLoginPath(pathname)) {
    return NextResponse.redirect(new URL("/", origin));
  }
  return NextResponse.next();
};

const handleUnauthenticatedUser = (pathname: string, origin: string) => {
  if (PRIVATE_ROUTES.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", origin));
  }
  return NextResponse.next();
};

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl;
  const authenticated =
    request.cookies.get("accessToken") && request.cookies.get("refreshToken");
  const isDevelopment = process.env.NODE_ENV === "development";

  // 개발 환경 예외처리
  if (isDevelopment) return NextResponse.next();

  return authenticated
    ? handleAuthenticatedUser(pathname, origin)
    : handleUnauthenticatedUser(pathname, origin);
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
