import Header from "@/app/_components/common/Header/Header";
import Footer from "@/app/_components/common/Footer/Footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FinTech Fusion",
  description:
    "FinTechFusion offers an advanced automated trading platform designed to empower cryptocurrency traders by leveraging cutting-edge algorithms and real-time market analysis.",
};

type SiteLayoutProps = {
  children: React.ReactNode;
};

export default function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
