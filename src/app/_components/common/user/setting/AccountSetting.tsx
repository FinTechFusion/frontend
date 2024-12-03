"use client";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { FaBell, FaSignal, FaRobot, FaUserCheck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";
import Loading from "../../loading/Loading";

export default function AccountSetting() {
   const { user } = useAuth();
   const t = useTranslations("dashboard");
   if (!user) return <Loading />;
   const { signal_cycles, ai_cycles, signal_strategy, ai_strategy, is_demo, is_verified, is_active, is_subscribed } = user;

   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         {/* Subscription Box */}
         <div className="subscription-box bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-3xl font-medium mb-6 flex items-center gap-2">
               <FaBell className="mr-3" />{t("subscription")}
            </h3>
            <div className="flex justify-between items-center mb-6">
               <p className="text-2xl font-medium">{t("plan")}</p>
               <span className={`bg-primary-100 text-primary-700 py-2 px-4 rounded-full font-bold`}>
                  {is_subscribed ? t("subscribed") : t("NotSubscribed")}
               </span>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
               <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xl font-medium mb-2">{t("Signalcycles")}</p>
                  <b className={`text-2xl ${signal_cycles > 0 ? "text-primary-600" : "text-red-600"}`}>
                     {signal_cycles}
                  </b>
               </div>
               <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xl font-medium mb-2">{t("Aicycles")}</p>
                  <b className={`text-2xl ${ai_cycles > 0 ? "text-primary-600" : "text-red-600"}`}>
                     {ai_cycles}
                  </b>
               </div>
            </div>
         </div>
         {/* Account Setting */}
         <div className="account-setting bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-3xl font-medium mb-6 flex items-center gap-2 ">
               <FaGear className="mr-3" />{t("AccountSettings")}
            </h3>
            <div className="grid md:grid-cols-1 grid-cols-1 gap-6 mb-6">
               <div className="flex flex-col gap-y-2">
                  <p className="text-xl font-medium mb-2 flex items-center gap-2">
                     <FaSignal className="mr-2" />{t("SignalStrategy")}
                  </p>
                  <b className="capitalize text-lg text-start bg-gray-100 w-fit text-primary-600 py-1 px-3 rounded-full">
                     {signal_strategy == null ? t("NoStrategy") : signal_strategy.replace(/_/g, ' ')}
                  </b>
               </div>
               <div className="flex flex-col gap-y-2">
                  <p className="text-xl font-medium mb-2 flex items-center gap-2">
                     <FaRobot className="mr-2" /> {t("AIStrategy")}
                  </p>
                  <b className="capitalize text-lg text-start bg-gray-100 w-fit text-primary-600 py-1 px-3 rounded-full">
                     {ai_strategy == null ? t("NoStrategy") : ai_strategy.replace(/_/g, ' ')}
                  </b>
               </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-2 gap-4">
               <div className="text-start">
                  <p className="text-lg font-medium mb-2">{t("AccountType")}</p>
                  <b className={`text-lg ${is_demo ? 'text-black' : 'text-primary-600'} flex items-center gap-2`}>
                     <FaUserCheck className="mr-1" /> {is_demo ? t("demoAccount") : t("realAccount")}
                  </b>
               </div>
               <div className="text-start">
                  <p className="text-lg font-medium mb-2">{t("Verified")}</p>
                  <b className={`text-lg ${is_verified ? 'text-primary-600' : 'text-red-600'} flex items-center gap-2`}>
                     {is_verified ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                     {is_verified ? t("isVerify") : t("notVerify")}
                  </b>
               </div>
               <div className="text-start">
                  <p className="text-lg font-medium mb-2">{t("Active")}</p>
                  <b className={`text-lg ${is_active ? 'text-primary-600' : 'text-red-600'} flex items-center gap-2`}>
                     {is_active ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                     {is_active ? t("Active") : t("inActive")}
                  </b>
               </div>
            </div>
         </div>
      </div>
   );
}
