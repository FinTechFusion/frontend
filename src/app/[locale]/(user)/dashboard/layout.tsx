import { useLocale } from 'next-intl';
import type { Metadata } from "next";
import { SidebarProvider } from '@/context/SidebarContext';
import Sidebar from "@/app/_components/common/dashboard/sidebar/SideBar";
import Headerdash from "@/app/_components/common/dashboard/Headerdash/Headerdash";
import { AssetDataProvider } from "@/context/AssetsContext";
import Toast from '@/app/_components/common/Tostify/Toast';


export const metadata: Metadata = {
   title: "FinTech Fusion",
   description: "FinTechFusion offers an advanced automated trading platform designed to empower cryptocurrency traders by leveraging cutting-edge algorithms and real-time market analysis.",
};

type DashboardLayoutProps = {
   children: React.ReactNode;
};

export default function UserDashboardLayout({ children }: DashboardLayoutProps) {
   const locale = useLocale();
   return (
      <SidebarProvider>
         <div className="flex justify-between">
            <Sidebar />
            <div className={`md:px-0 px-2 lg:max-w-[80%] w-full absolute ${locale === "en"?"right-0" :"left-0"}`}>
               <AssetDataProvider>
                  <Headerdash />
               </AssetDataProvider>
               {children}
            </div>
            <Toast/>
         </div>
      </SidebarProvider>
   );
}
