"use client"
import { useEffect } from 'react';
import confetti from 'canvas-confetti'
import { LuCheckCircle } from "react-icons/lu";
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';
import { useAuth } from '@/context/AuthContext';

export default function SuccessPayment() {
   const { user } = useAuth();
   const t = useTranslations("payment");
   useEffect(() => {
      // Trigger confetti effect on component mount
      confetti({
         particleCount: 120,
         spread: 80,
         origin: { y: 0.6 }
      })
   }, [])
   return (
      <div className="md:bg-gradient-to-b md:from-primary-50 md:to-primary-100 flex items-center justify-center">
         <div className="successCard flex flex-col justify-center items-center h-full px-2 py-16 rounded-md bg-secondary shadow-sm my-16 md:w-1/3 w-96">
            <div className="card-heading text-center mx-auto pb-5">
               <div className="icon pb-3">
                  <LuCheckCircle className="w-20 h-20 text-primary-600 mx-auto " />
               </div>
               <h3 className="text-3xl font-bold text-primary-700">{t("welcomeAboard")}</h3>
               <p className="text-lg text-primary-600 pt-2">{t("paymentSuccessful")}</p>
            </div>
            <div className="card-body">
               <h5 className="text-xl font-medium pb-3 text-dark">{t("whatsNext")}</h5>
               <ul className="pb-5 px-5 list-disc">
                  <li className="text-lg py-2">{t("setupProfile")}</li>
                  <li className="text-lg py-2">{t("exploreFeatures")}</li>
                  <li className="text-lg py-2">{t("checkMail")}</li>
               </ul>
            </div>
            <>
               {user?.is_binance ? <Link href='/dashboard'>
                  <button className="main-btn !w-full">{t("goToDashboard")}</button>
               </Link> : <Link href='/dashboard/connect-manual'>
                  <button className="main-btn !w-full">{t("connect_binance")}</button>
               </Link>}
            </>
         </div>
      </div>
   )
}
