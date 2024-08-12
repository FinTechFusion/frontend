"use client"
import Link from "next/link";
import { MainBtn } from "../Buttons/MainBtn";
import { useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import Toast from "../Tostify/Toast";
import { useRouter } from "next/navigation";

export default function UserStrategy() {
   const { user } = useAuth();
   const router = useRouter();
   const accessToken = localStorage.getItem('access_token');

   async function UnInstallStrategy() {
      try {
         const response = await fetch(`${API_BASE_URL}/users/me/strategy/uninstall`, {
            method: "POST",
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         });

         if (!response.ok) {
            throw new Error('Failed to uninstall strategy');
         }

         const responseData = await response.json();

         if (responseData.success) {
            router.push('/dashboard/store');
            return toast.success('Strategy uninstalled successfully');
         } else {
            toast.error('Failed to uninstall strategy');
         }
      } catch (error) {
         console.log(error);
      }
   }

   return (
      <>
         <Toast />
         <div className="user-strategy py-5">
            <div className="flex justify-between items-center py-3">
               <h3 className="text-2xl font-medium">Strategy Used</h3>
               <Link href="/dashboard/store">
                  <MainBtn content="choose strategy" btnWidth="w-fit" />
               </Link>
            </div>
            <hr />
            {user?.strategy && (
               <div className="md:w-1/3 my-5">
                  <div className="strategy-card p-4 shadow-sm">
                     <h3 className="text-3xl font-bold tracking-wide capitalize">{user.strategy}</h3>
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
                           <span className="block h-4 rounded-full bg-indigo-600 text-center text-xs leading-none w-1/2 bg-primary-700">
                           </span>
                        </span>
                     </div>

                     <button
                        className="bg-primary-600 hover:bg-primary-700 rounded-md px-2 py-1 text-secondary capitalize text-lg cursor-pointer tracking-wide"
                        onClick={UnInstallStrategy}
                     >
                        uninstall
                     </button>
                  </div>
               </div>
            )}
         </div>
      </>
   );
}
