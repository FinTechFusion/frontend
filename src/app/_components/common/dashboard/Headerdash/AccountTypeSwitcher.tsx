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
   const { assetData, fetchAssets } = useAssetData();

   const accessToken = getTokenFromStorage("access_token");
   const router = useRouter();
   const t = useTranslations("dashboard.accountTypes");
   const alertT = useTranslations('alerts');
   useEffect(() => {
      setIsDemo(initialDemo); // Update isDemo when initialDemo changes
   }, [initialDemo]);
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
   function onConfirm() {
      router.push("/site/exchange/connect");
   }

   const handleToggleAccountType = async () => {
      setIsOpen(false);
      if (accessToken) {
         await fetchUserData(accessToken);
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
            await fetchAssets();
         } else {
            return toast.error(t("failedUpdateType"));
         }
      } catch (error) {
      } finally {
         setLoading(false);
      }
   };

   return (
      <div className="account-type relative">
         <Toast />
         <h5 className="uppercase text-primary-600 flex items-center gap-1 cursor-pointer">
            {isDemo ? t("demoAccount") : t("realAccount")}
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
                     <div className={`absolute ${locale === 'en' ? 'left-0.5' : 'right-0.5'} top-0.5 w-5 h-5 bg-primary-700 peer-checked:bg-gray-200 rounded-full peer-checked:translate-x-full transition duration-300`}></div>
                  </label>
               </div>
            </div>
         )}
      </div>
   );
}
