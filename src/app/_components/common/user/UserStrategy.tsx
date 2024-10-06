"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MainBtn } from "../Buttons/MainBtn";
import { getTokenFromStorage, useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import Toast from "../Tostify/Toast";
import { useTranslations } from "next-intl";

type UserStrategyProps = {
   type: "signal" | "ai";
};

export default function UserStrategy({ type }: UserStrategyProps) {
   const { user, fetchUserData } = useAuth(); 
   const accessToken = getTokenFromStorage("access_token");
   const [currentStrategy, setCurrentStrategy] = useState<string | null>(null);
   const t = useTranslations("dashboard")
   useEffect(() => {
      if (type === "signal") {
         setCurrentStrategy(user?.signal_strategy || null);
      } else if (type === "ai") {
         setCurrentStrategy(user?.ai_strategy || null);
      }
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
               throw new Error("Failed to uninstall strategy");
            }

            const responseData = await response.json();
            if (responseData.success) {
               toast.success("Strategy uninstalled successfully");
               if (accessToken) {
                  fetchUserData(accessToken);
               }
               setCurrentStrategy(null); 
            } else {
               toast.error("Failed to uninstall strategy");
            }
         } catch (error) {
            toast.error("Error occurred while uninstalling, try again later");
         } 
      }
   }
   return (
      <>
         <Toast />
         {currentStrategy ? (
            <div className="user-strategy py-5">
               <div className="flex justify-between items-center py-3">
                  <h3 className="text-xl font-medium">{t("strategy_used")}</h3>
                  {currentStrategy == null && <Link href="/dashboard/store">
                     <MainBtn content={t("choose_startegy")} btnProps="w-fit text-sm" />
                  </Link>}
               </div>
               <hr />
               <div className="md:w-1/3 my-5">
                  <div className="strategy-card p-4 shadow-sm">
                     <h3 className="text-3xl font-bold tracking-wide capitalize">
                        {currentStrategy}
                     </h3>
                     <span className="block py-5 text-lg">Spot Strategy</span>
                     <div className="pb-4">
                        <span id="ProgressLabel" className="sr-only">Loading</span>
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
                     <MainBtn content={t("choose_startegy")} btnProps="w-fit" />
                  </Link>
               </div>
            )}
      </>
   );
}
