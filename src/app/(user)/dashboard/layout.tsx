import Sidebar from "@/app/_components/common/dashboad/sidebar/SideBar"
import AuthGuard from "@/context/AuthGuard"
import React from "react"

type DashboardLayoutProps = {
   children: React.ReactNode,
}

export default function userDahsboardLayout({ children }: DashboardLayoutProps) {
   return (
      <AuthGuard>
         <div className="grid grid-cols-12 gap-x-3">
            <div className="lg:col-span-2 md:col-span-3 col-span-10">
               <Sidebar />
            </div>
            <div className="lg:col-span-10 md:col-span-9 col-span-1">
               {children}
            </div>
         </div>
      </AuthGuard>
   )
}
