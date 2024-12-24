import { getTokenFromStorage, useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import { AccountTypeProps } from "@/utils/types";
import { useRouter } from '@/i18n/navigation';
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Toast from "../../Tostify/Toast";
import { useAssetData } from "@/context/AssetsContext";
import { useTranslations } from "next-intl";
import { useLocale } from 'next-intl';
import Swal from 'sweetalert2';

export default function AccountTypeSwitcher({ isDemo: initialDemo, balance }: AccountTypeProps) {
   const locale = useLocale();
   const [isDemo, setIsDemo] = useState(initialDemo);
   const [isOpen, setIsOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const { user, fetchUserData } = useAuth();

   const accessToken = getTokenFromStorage("access_token");
   const router = useRouter();
   const t = useTranslations("dashboard.accountTypes");
   const alertT = useTranslations('alerts');

   // Synchronize `isDemo` state with `user?.is_demo`
   useEffect(() => {
      setIsDemo(user?.is_demo ?? initialDemo);
   }, [user?.is_demo, initialDemo]);

   const CheckConfirmAlert = (onConfirm: () => void, onCancel?: () => void) => {
      Swal.fire({
         icon: "error",
         title: alertT('oopsTitle'),
         text: alertT('connectAccountText'),
         showCancelButton: true,
         confirmButtonColor: "#0D9488",
         cancelButtonColor: "#d33",
         confirmButtonText: alertT('connectButtonText'),
         cancelButtonText: alertT('cancelButtonText'),
         customClass: {
            confirmButton: 'custom-ok-btn',
            cancelButton: 'custom-cancel-btn',
         },
      }).then((result) => {
         if (result.isConfirmed) {
            onConfirm();
         } else if (result.isDismissed && onCancel) {
            onCancel();
         }
      });
   };

   const handleToggleAccountType = async () => {
      setIsOpen(false);
      if (!user?.is_binance) {
         return CheckConfirmAlert(() => router.push("/site/exchange/connect"));
      }
      if (!accessToken) {
         return toast.error("Access token is missing.");
      }
      try {
         setLoading(true);
         const newAccountType = !isDemo;
         const endpoint = `${API_BASE_URL}/users/me/demo/${isDemo ? 'disable' : 'enable'}`;
         const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               authorization: `Bearer ${accessToken}`,
            },
         });
         // const responseData = await response.json();
         if (response.ok) {
            await fetchUserData(accessToken);
            setIsDemo(newAccountType);
         } else {
            toast.error(t("failedUpdateType"));
         }
      } catch (error) {
         toast.error("An unexpected error occurred.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="account-type relative">
         <Toast />
         <h5
            className="uppercase bg-primary-50 w-fit py-1 px-2 rounded text-primary-700 flex items-start gap-1 cursor-pointer"
            onClick={() => setIsOpen(!isOpen)}
            role="button"
            aria-expanded={isOpen}
         >
            {isDemo ? t("demoAccount") : t("realAccount")}
            {isOpen ? (
               <MdKeyboardArrowUp size={25} aria-label="Close account type menu" />
            ) : (
               <MdKeyboardArrowDown size={25} aria-label="Open account type menu" />
            )}
         </h5>
         <div className="text-center">
            <span className="block py-1">{balance}</span>
         </div>
         {isOpen && (
            <div className="switch-real w-64 absolute left-0 top-15 bg-secondary rounded-md shadow-sm p-3 z-50">
               <p className="text-lg text-primary-700 pb-2">{t("Types")}</p>
               <hr />
               <div className="flex items-center justify-between py-2">
                  <span className="text-lg font-semibold text-gray-800">{t("realAccount")}</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={handleToggleAccountType}
                        checked={!isDemo}
                        disabled={loading}
                     />
                     <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer-checked:bg-primary-600"></div>
                     <div
                        className={`absolute ${locale === 'en' ? 'left-0.5' : 'right-5'} top-0.5 w-5 h-5 bg-primary-700 peer-checked:bg-gray-200 rounded-full peer-checked:translate-x-full transition duration-300`}
                     ></div>
                  </label>
               </div>
            </div>
         )}
      </div>
   );
}
