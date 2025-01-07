import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const supportedLocales = ['en', 'ar'];

// Define public routes (routes that don't require authentication)
const publicRoutes = [
  '/login',
  '/register',
  '/verifyemail',
  '/reset-password',
  '/forget-password',
  '/api', // Add if you have public API routes
];

// Define protected routes (routes that require authentication)
const protectedRoutes = [
  '/dashboard',
  '/site/exchange',
  '/payment',
];

const COOKIE_NAME = 'access_token';

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const pathnameParts = pathname.split('/');
  const localeInPath = pathnameParts[1];

  // Get cookies
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
  const accessToken = req.cookies.get(COOKIE_NAME)?.value;

   // If the path doesn't start with a locale, redirect to the locale from the cookie
   if (!supportedLocales.includes(localeInPath)) {
    const redirectUrl = new URL(`/${cookieLocale}${pathname}${search}`, req.url);
    return NextResponse.redirect(redirectUrl);
 }

  // Early return for static assets and public API routes
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api/public') ||
    pathname.includes('.')
  ) {
    return NextResponse.next();
  }

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some(route =>
    pathname.includes(`/${localeInPath}${route}`)
  );

  // Check if the current path is a public route that should be restricted when logged in
  const isRestrictedWhenLoggedIn = publicRoutes.some(route =>
    pathname.includes(`/${localeInPath}${route}`)
  );

  // Create response object to modify headers
  const response = NextResponse.next();

  // Add security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains'
  );

  // Handle authentication logic
  if (isProtectedRoute) {
    if (!accessToken) {
      // Redirect to login with return URL
      const loginUrl = new URL(
        `/${localeInPath}/login`,
        req.url
      );
      return NextResponse.redirect(loginUrl);
    }
  }

  // Redirect logged-in users away from auth pages
  if (accessToken && isRestrictedWhenLoggedIn) {
    const dashboardUrl = new URL(`/${localeInPath}/dashboard`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  // Apply intl middleware
  return createMiddleware(routing)(req);
}

export const config = {
    matcher: ['/', '/(en|ar)/:path*', '/site/:path*', '/dashboard/:path*'],
};