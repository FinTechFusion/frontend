import { NextRequest, NextResponse } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const supportedLocales = ["en", "ar"];

const routes = {
  public: ["/login", "/register", "/verifyemail", "/reset-password", "/forget-password"],
  protected: ["/dashboard", "/site/exchange"], // Now include /site/exchange in protected routes
  excluded: ["/site/exchange/connect/status"] // Exclude specific routes
};

const COOKIE_NAME = "access_token";

export default function middleware(req: NextRequest) {
  const accessToken = req.cookies.get(COOKIE_NAME)?.value || null;
  const { pathname, search } = req.nextUrl;
  const pathnameParts = pathname.split("/");
  const localeInPath = pathnameParts[1];

  const cookieLocale:any = req.cookies.get("NEXT_LOCALE")?.value || 'ar';

   // If the path doesn't start with a locale, redirect to the locale from the cookie
   if (!supportedLocales.includes(localeInPath)) {
    const redirectUrl = new URL(`/${cookieLocale}${pathname}${search}`, req.url);
    return NextResponse.redirect(redirectUrl);
 }

  // Check if the route is protected (excluding exempted routes)
  const isProtectedRoute = routes.protected.some((route) =>
    pathname === `/${localeInPath}${route}` || pathname.startsWith(`/${localeInPath}${route}/`)
  );

  // Check if the user is trying to access a public page while logged in
  const isRestrictedWhenLoggedIn = routes.public.some(route =>
    pathname === `/${localeInPath}${route}` || pathname.startsWith(`/${localeInPath}${route}?`)
  );

  // If user is not logged in and trying to access /site/exchange, redirect to login
  if (pathname === `/${localeInPath}/site/exchange` && !accessToken) {
    const loginUrl = new URL(`/${localeInPath}/login`, req.url);
    loginUrl.searchParams.set("redirect", pathname.replace(`/${localeInPath}`, ""));
    return NextResponse.redirect(loginUrl);
  }

  // Security headers
  const response = NextResponse.next();
  response.headers.set("X-Frame-Options", "DENY");
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");

  // Handle Authentication: Redirect unauthorized users to login
  if (isProtectedRoute && !accessToken) {
    console.log("🚨 Unauthorized access. Redirecting to login.");
    const loginUrl = new URL(`/${localeInPath}/login`, req.url);
    loginUrl.searchParams.set("redirect", pathname.replace(`/${localeInPath}`, ""));
    return NextResponse.redirect(loginUrl);
  }
  // Prevent logged-in users from accessing public pages (like login/register)
  if (accessToken && isRestrictedWhenLoggedIn) {
    console.log("🔄 Already logged in, redirecting to dashboard.");
    return NextResponse.redirect(new URL(`/${localeInPath}/dashboard`, req.url));
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ['/', '/(en|ar)/:path*', '/site/:path*', '/dashboard/:path*'],
};
