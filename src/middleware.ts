import { NextRequest, NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const supportedLocales = ['en', 'ar'];
const protectedRoutes = ['/(en|ar)/dashboard/:path*']; // Protected routes with locales

export default function middleware(req: NextRequest) {
   const { pathname, search } = req.nextUrl;

   // Split the pathname and check if the first part matches a locale
   const pathnameParts = pathname.split('/');
   const localeInPath = pathnameParts[1];

   // Get the locale from the "NEXT_LOCALE" cookie
   const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value;
   const accessToken = req.cookies.get("access_token")?.value;

   // routes user can't access if logged in
   const restrictedRoutes = [
      `/${cookieLocale}/login`,
      `/${cookieLocale}/register`,
      `/${cookieLocale}/verifyemail`,
      `/${cookieLocale}/reset-password`,
      `/${cookieLocale}/forget-password`,
    ];
    if(accessToken && restrictedRoutes.some((route)=>req.nextUrl.pathname.startsWith(route))){
      const dashboardUrl = new URL(`/${cookieLocale}/dashboard`, req.url);
      return NextResponse.redirect(dashboardUrl);
    }
   if  (!accessToken && req.nextUrl.pathname.startsWith(`/${cookieLocale}/dashboard`)) {
      const loginUrl = new URL(`/${cookieLocale}/login`, req.url);
      return NextResponse.redirect(loginUrl);
   }
   // If the path doesn't start with a locale, redirect to the locale from the cookie
   if (!supportedLocales.includes(localeInPath)) {
      const redirectUrl = new URL(`/${cookieLocale}${pathname}${search}`, req.url);
      return NextResponse.redirect(redirectUrl);
   }

   // If the locale is already in the path, continue with the intl middleware
   return createMiddleware(routing)(req);
}

export const config = {
   matcher: ['/', '/(en|ar)/:path*'],
};
