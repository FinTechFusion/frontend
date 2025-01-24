import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const supportedLocales = ['en', 'ar'];

// Centralized Route Configuration
const routes = {
  public: [
    '/login', 
    '/register', 
    '/verifyemail', 
    '/reset-password', 
    '/forget-password', 
    '/api'
  ],
  protected: [
    '/dashboard', 
    '/site/exchange', 
    '/payment'
  ],
  excluded: [
    '/site/exchange/connect/status'
  ]
};

const COOKIE_NAME = 'access_token';

export default async function middleware(req: NextRequest) {
  const { pathname, search } = req.nextUrl;
  const pathnameParts = pathname.split('/');
  const localeInPath = pathnameParts[1];

  // Validate locale
  const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value || 'en';
  const accessToken = req.cookies.get(COOKIE_NAME)?.value;

  // Redirect if no locale or invalid locale
  if (!supportedLocales.includes(localeInPath)) {
    const redirectUrl = new URL(`/${cookieLocale}${pathname}${search}`, req.url);
    return NextResponse.redirect(redirectUrl);
  }

  // Enhanced route matching
  const isProtectedRoute = routes.protected.some(route => 
    pathname === `/${localeInPath}${route}` || 
    pathname.startsWith(`/${localeInPath}${route}/`)
  ) && !routes.excluded.some(excludedRoute => 
    pathname.includes(`/${localeInPath}${excludedRoute}`)
  );

  const isRestrictedWhenLoggedIn = routes.public.some(route => 
    pathname.includes(`/${localeInPath}${route}`)
  );

  const response = NextResponse.next();

  // Security headers
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains');

  // Authentication checks
  if (isProtectedRoute && !accessToken) {
    const loginUrl = new URL(`/${localeInPath}/login`, req.url);
    return NextResponse.redirect(loginUrl);
  }

  if (accessToken && isRestrictedWhenLoggedIn) {
    const dashboardUrl = new URL(`/${localeInPath}/dashboard`, req.url);
    return NextResponse.redirect(dashboardUrl);
  }

  return createMiddleware(routing)(req);
}

export const config = {
  matcher: ['/', '/(en|ar)/:path*', '/site/:path*', '/dashboard/:path*'],
};