import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Script from "next/script";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { AuthProvider } from "@/context/AuthContext";
import "../../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";

const cairo = Cairo({
  subsets: ["arabic"],
  weight: ["200", "300", "400", "500", "700"],
});

// Type definitions
type RootLayoutProps = {
  children: React.ReactNode;
  params: { locale: string };
};

type LocaleMetadata = {
  title: string;
  description: string;
  metadataBase: URL;
  openGraph: {
    title: string;
    description: string;
    url: string;
    siteName: string;
    images: Array<{
      url: string;
      width: number;
      height: number;
      alt: string;
    }>;
    locale: string;
    type: string;
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    images: string[];
  };
};

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://fintechfusion.net';

// Metadata configuration
const metadataConfig: Record<string, LocaleMetadata> = {
  en: {
    title: "FintechFusion",
    description: "Join FinTechFusion for the ultimate trading experience. Powered by cutting-edge algorithms, our platform helps cryptocurrency traders make smarter decisions.",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "FinTechFusion",
      description: "Join FinTechFusion for the ultimate trading experience. Powered by cutting-edge algorithms, our platform helps cryptocurrency traders make smarter decisions.",
      url: `${baseUrl}/en`,
      siteName: "FintechFusion",
      images: [{
        url: '/assets/images/preview.png',
        width: 1200,
        height: 630,
        alt: "FintechFusion Logo and Tagline",
      }],
      locale: "en_US",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "FintechFusion - Automated Trading Platform",
      description: "Join FinTechFusion for the ultimate trading experience. Powered by cutting-edge algorithms, our platform helps cryptocurrency traders make smarter decisions.",
      images: ['/assets/images/preview.png'],
    },
  },
  ar: {
    title: "فنتك فيوجن",
    description: "انضم إلى فين تك فيوجن لتجربة تداول فريدة. منصة متطورة تساعد المتداولين في العملات الرقمية باتخاذ قرارات أذكى باستخدام أحدث الخوارزميات.",
    metadataBase: new URL(baseUrl),
    openGraph: {
      title: "فنتك فيوجن - منصة التداول الآلية",
      description: "انضم إلى فين تك فيوجن لتجربة تداول فريدة. منصة متطورة تساعد المتداولين في العملات الرقمية باتخاذ قرارات أذكى باستخدام أحدث الخوارزميات.",
      url: `${baseUrl}/ar`,
      siteName: "فنتك فيوجن",
      images: [{
        url: '/assets/images/preview.png',
        width: 1200,
        height: 630,
        alt: "فنتك فيوجن شعار وعلامة",
      }],
      locale: "ar_EG",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: "فنتك فيوجن - منصة التداول الآلية",
      description: "انضم إلى فين تك فيوجن لتجربة تداول فريدة. منصة متطورة تساعد المتداولين في العملات الرقمية باتخاذ قرارات أذكى باستخدام أحدث الخوارزميات.",
      images: ['/assets/images/preview.png'],
    },
  },
};

// Generate metadata based on locale
export async function generateMetadata({ params: { locale } }: RootLayoutProps): Promise<Metadata> {
  return metadataConfig[locale] as Metadata;
}

// Google Tag Manager Component
const GoogleTagManager = () => (
  <>
    <Script id="google-tag-manager" strategy="afterInteractive">
      {`
        (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-N3GTKXJH');
      `}
    </Script>
    <noscript>
      <iframe
        src="https://www.googletagmanager.com/ns.html?id=GTM-N3GTKXJH"
        height="0"
        width="0"
        style={{ display: "none", visibility: "hidden" }}
      />
    </noscript>
  </>
);

export default async function RootLayout({
  children,
  params: { locale },
}: RootLayoutProps) {
  const messages = await getMessages({ locale });

  return (
    <html lang={locale} dir={locale === "en" ? "ltr" : "rtl"}>
      <head>
        <meta
          name="google-site-verification"
          content="E118GLWAyszxIiZi3ZAtKIa3XGIaP43ifPKClul_q88"
        />
        <GoogleTagManager />
      </head>
      <body className={cairo.className}>
        <AuthProvider>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}