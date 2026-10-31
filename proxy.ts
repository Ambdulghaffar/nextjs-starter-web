import { NextResponse } from "next/server";
import { auth } from "./auth";
import { ROUTES } from "@/utils/routes";

const { SIGN_IN } = ROUTES;

export default auth((req) => {
  const { pathname, search, origin } = req.nextUrl;

  const next = () => NextResponse.next();

  if (pathname.startsWith("/api")) return next();

  const isAuthenticated = !!req.auth && !req.auth.error;
  if (!isAuthenticated) {
    const signInUrl = new URL(SIGN_IN, origin);
    signInUrl.searchParams.set("callbackUrl", pathname + search);
    return NextResponse.redirect(signInUrl);
  }

  return next();
});

export const config = {
  // Zones privées + proxy API (hors /api/auth, géré par Auth.js lui-même).
  // /robots.txt, /sitemap.xml, ...) reste public et visible par Google.
  matcher: ["/dashboard/:path*", "/home/:path*", "/api/((?!auth).*)"],
};
