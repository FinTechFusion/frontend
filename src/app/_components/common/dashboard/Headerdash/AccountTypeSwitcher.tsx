import { getTokenFromStorage, useAuth } from "@/context/AuthContext";
import { CheckConfirmAlert } from "@/utils/alerts";
import { API_BASE_URL } from "@/utils/api";
import { AccountTypeProps } from "@/utils/types";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Toast from "../../Tostify/Toast";

export default function AccountTypeSwitcher({ isDemo: initialDemo, balance }: AccountTypeProps) {
   const [isDemo, setIsDemo] = useState(initialDemo);
   const [isOpen, setIsOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const { user, fetchUserData } = useAuth();
   const accessToken = getTokenFromStorage("access_token");
   const router = useRouter();

   useEffect(() => {
      setIsDemo(initialDemo); // Update isDemo when initialDemo changes
   }, [initialDemo]);

   function onConfirm() {
      router.push("/site/exchange/connect");
   }

   const handleToggleAccountType = async () => {
      if (!accessToken) {
         return toast.error('Try,login again');
      }
      if (!(user?.is_binance)) {
         return CheckConfirmAlert(onConfirm);
      }
      try {
         setLoading(true);
         const newAccountType = !isDemo;
         const response = await fetch(`${API_BASE_URL}/users/me/demo/${isDemo ? 'disable' : 'enable'}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               authorization: `Bearer ${accessToken}`,
            },
         });

         if (response.ok) {
            setIsDemo(newAccountType);
         } else {
            return toast.error('Failed to update account type');
         }
      } catch (error) {
         console.error('Error updating account type:', error);
      } finally {
         await fetchUserData(accessToken);
         setLoading(false);
      }
   };

   return (
      <div className="account-type relative">
         <Toast />
         <h5 className="uppercase text-primary-600 flex items-center gap-1 cursor-pointer">
            {isDemo ? "Demo Account" : "Real Account"}
            {isOpen ? (
               <MdKeyboardArrowUp onClick={() => setIsOpen(false)} size={25} />
            ) : (
               <MdKeyboardArrowDown onClick={() => setIsOpen(true)} size={25} />
            )}
         </h5>
         <div className="text-center">
            <span className="block py-1">{balance}</span>
         </div>
         {isOpen && (
            <div className="switch-real w-64 absolute left-0 top-15 bg-secondary rounded-md shadow-sm p-3 z-50">
               <p className="text-lg text-primary-700 pb-2">Type of Account</p>
               <hr />
               <div className="flex items-center justify-between py-2">
                  <span className="text-lg font-semibold text-gray-800">Real Account</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={handleToggleAccountType}
                        checked={!isDemo}
                        disabled={loading}
                     />
                     <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer-checked:bg-primary-600"></div>
                     <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-primary-700 peer-checked:bg-gray-200 rounded-full peer-checked:translate-x-full transition duration-300"></div>
                  </label>
               </div>
            </div>
         )}
      </div>
   );
}
