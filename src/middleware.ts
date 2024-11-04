import { NextResponse } from 'next/server';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const supportedLocales = ['en', 'ar'];

export default function middleware(req: any) {
   const { pathname, search } = req.nextUrl;

   // Split the pathname and check if the first part matches a locale
   const pathnameParts = pathname.split('/');
   const localeInPath = pathnameParts[1];

   // Get the locale from the "NEXT_LOCALE" cookie
   const cookieLocale = req.cookies.get('NEXT_LOCALE')?.value || 'ar';

   // If the path doesn't start with a locale, redirect to the locale from the cookie
   if (!supportedLocales.includes(localeInPath)) {
      const redirectUrl = new URL(`/${cookieLocale}${pathname}${search}`, req.url);
      return NextResponse.redirect(redirectUrl);
   }

   // If the locale is already in the path, continue with the intl middleware
   return createMiddleware(routing)(req);
}

export const config = {
   matcher: ['/', '/(en|ar)/:path*', '/site/:path*', '/dashboard/:path*'],
};
