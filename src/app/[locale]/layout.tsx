import type { Metadata } from "next";
import { Cairo } from 'next/font/google';
import '../../styles/globals.css';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { AuthProvider } from '@/context/AuthContext';
import AuthGuard from "@/context/AuthGuard";

const cairo = Cairo({ subsets: ["arabic"], weight: ["200", "300", "400", "500", "700"] });

export const metadata: Metadata = {
  title: "FinTechFusion",
  description: "FinTechFusion offers an advanced automated trading platform designed to empower cryptocurrency traders by leveraging cutting-edge algorithms and real-time market analysis.",
  icons: {
    icon: "/assets/images/logo.webp",
    shortcut: "/assets/images/logo.webp",
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
      <body className={cairo.className}>
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