import type { Metadata } from "next";
import { Cairo } from 'next/font/google';
import '../../styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AuthProvider } from '@/context/AuthContext';
import AuthGuard from "@/utils/AuthGuard";

import Script from 'next/script'; // Import Next.js Script component
import 'react-toastify/dist/ReactToastify.css';

const cairo = Cairo({ subsets: ["arabic"], weight: ["200", "300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "FinTechFusion",
  description: "FinTechFusion offers an advanced automated trading platform designed to empower cryptocurrency traders by leveraging cutting-edge algorithms and real-time market analysis.",
  icons: {
    icon: "/assets/images/facion.png",
    shortcut: "/assets/images/facion.png",
  },
};

type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

export default async function RootLayout({ children, params }: RootLayoutProps) {
  const messages = await getMessages({ locale: params.locale });

  return (
    <html lang={params.locale} dir={params.locale === "en" ? "ltr" : "rtl"}>
      {/* Google Tag Manager Script */}
      <Script id="google-tag-manager" strategy="afterInteractive">
        {`
          (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','GTM-N3GTKXJH');
        `}
      </Script>

      <body className={cairo.className}>
        {/* Noscript fallback for GTM */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-N3GTKXJH"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <AuthProvider>
          <AuthGuard>
            <NextIntlClientProvider locale={params.locale} messages={messages}>
              {children}
            </NextIntlClientProvider>
          </AuthGuard>
        </AuthProvider>
      </body>
    </html>
  );
}
