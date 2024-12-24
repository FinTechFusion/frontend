"use client";
import { useState, useEffect } from "react";
import { MainBtn } from "../Buttons/MainBtn";
import { getTokenFromStorage, useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import { useTranslations } from "next-intl";
import { Link } from '@/i18n/navigation';

type UserStrategyProps = {
   type: "signal" | "ai";
};

export default function UserStrategy({ type }: UserStrategyProps) {
   const { user, fetchUserData } = useAuth(); 
   const accessToken = getTokenFromStorage("access_token");
   const [currentStrategy, setCurrentStrategy] = useState<string | null>(null);
   const [loading, setLoading] = useState(true); // Loading state
   const t = useTranslations("dashboard.strategies");

   useEffect(() => {
      setLoading(true); // Start loading
      if (type === "signal") {
         setCurrentStrategy(user?.signal_strategy || null);
      } else if (type === "ai") {
         setCurrentStrategy(user?.ai_strategy || null);
      }
      setLoading(false); // End loading
   }, [user, type]);

   async function UnInstallStrategy() {
      if (currentStrategy !== null) {
         try {
            const response = await fetch(
               `${API_BASE_URL}/users/me/strategy/${type}/uninstall`,
               {
                  method: "POST",
                  headers: {
                     authorization: `Bearer ${accessToken}`,
                  },
               }
            );
            if (!response.ok) {
               throw new Error("Failed to install strategy");
            }
            const responseData = await response.json();
            if (responseData.success) {
               setCurrentStrategy(null);
               if (accessToken) {
                  await fetchUserData(accessToken);
               };
            } else {
               toast.error(t("failedInstalled"));
            }
         } catch (error) {
            toast.error(t("uninstallError"));
         }
      }
   }

   // Skeleton loader
   const SkeletonLoader = () => (
      <div className="animate-pulse rounded p-5 max-w-md shadow-sm mt-3">
         <div className="bg-gray-200 h-8 w-1/3 rounded mb-4"></div>
         <div className="bg-gray-200 h-6 w-full rounded mb-2"></div>
         <div className="bg-gray-200 h-6 w-3/4 rounded"></div>
         <div className="bg-gray-200 h-6 w-1/2 rounded mt-4"></div>
      </div>
   );

   return (
      <>
         {loading ? (
            <SkeletonLoader />
         ) : currentStrategy ? (
            <div className="user-strategy py-5">
               <div className="flex justify-between items-center py-3">
                  <h3 className="text-xl font-medium">{t("strategy_used")}</h3>
                  {currentStrategy == null && (
                     <Link href="/dashboard/store">
                        <MainBtn content="dashboard.choose_startegy" btnProps="w-fit text-sm" />
                     </Link>
                  )}
               </div>
               <hr />
               <div className="md:w-1/3 my-5 bg-gray-50 rounded-lg">
                  <div className="strategy-card p-4 shadow-sm">
                     <h3 className="text-3xl font-bold tracking-wide capitalize">
                        {currentStrategy}
                     </h3>
                     <span className="block py-5 text-lg">{t("spotStartegy")}</span>
                     <div className="pb-4">
                        <span
                           role="progressbar"
                           aria-labelledby="ProgressLabel"
                           aria-valuenow={50}
                           aria-valuemin={0}
                           aria-valuemax={100}
                           className="block rounded-full bg-gray-200"
                        >
                           <span className="block h-4 rounded-full bg-indigo-600 text-center text-xs leading-none w-1/2 bg-primary-700"></span>
                        </span>
                     </div>

                     <button
                        className={`bg-primary-600 hover:bg-primary-700 rounded-md p-2 text-secondary capitalize text-lg cursor-pointer tracking-wide`}
                        onClick={UnInstallStrategy}
                     >
                        {t("uninstall")}
                     </button>
                  </div>
               </div>
            </div>
         ) : (
            <div className="flex justify-start py-3">
               <Link href="/dashboard/store">
                  <MainBtn content="dashboard.choose_startegy" btnProps="w-fit" />
               </Link>
            </div>
         )}
      </>
   );
}
