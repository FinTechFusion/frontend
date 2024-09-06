"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { MainBtn } from "../Buttons/MainBtn";
import { getTokenFromStorage, useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import Toast from "../Tostify/Toast";

type UserStrategyProps = {
   type: string;
};

export default function UserStrategy({ type }: UserStrategyProps) {
   const { user } = useAuth();
   const accessToken = getTokenFromStorage("access_token");
   const [currentStrategy, setCurrentStrategy] = useState<string | null>(null);

   // Initialize the current strategy based on the user and type
   useEffect(() => {
      if (user) {
         setCurrentStrategy(type === "botanalysis" ? "signal" : "ai");
      }
   }, [type, user]);

   async function UnInstallStrategy() {
      if (currentStrategy !== null) {
         try {
            const response = await fetch(
               `${API_BASE_URL}/users/me/strategy/${currentStrategy}/uninstall`,
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
            console.log(responseData)
            if (responseData.success) {
               toast.success("Strategy uninstalled successfully");
               // Update state to remove the current strategy from the UI
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
         <div className="user-strategy py-5">
            <div className="flex justify-between items-center py-3">
               <h3 className="text-2xl font-medium">Strategy Used</h3>
                  <Link href="/dashboard/store">
                     <MainBtn content="choose strategy" btnProps="w-fit" />
                  </Link>
            </div>
            <hr />

            {(type === "botanalysis" && user?.signal_strategy) && (
               <div className="md:w-1/3 my-5">
                  <div className="strategy-card p-4 shadow-sm">
                     <h3 className="text-3xl font-bold tracking-wide capitalize">
                        {currentStrategy === "signal" ? user?.signal_strategy : user?.ai_strategy}
                     </h3>
                     <span className="block py-5 text-lg">Spot Strategy</span>
                     <div className="pb-4">
                        <span id="ProgressLabel" className="sr-only">
                           Loading
                        </span>
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
                        className="bg-primary-600 hover:bg-primary-700 rounded-md p-2 text-secondary capitalize text-lg cursor-pointer tracking-wide"
                        onClick={UnInstallStrategy}
                     >
                        Uninstall
                     </button>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}
