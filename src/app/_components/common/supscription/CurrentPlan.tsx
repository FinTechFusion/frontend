import { useTranslations } from "next-intl";
import { BsCreditCardFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

interface CurrentPlanProps {
   data: any;
   confirmdDeletePlan: () => void;
}

export default function CurrentPlan({ data, confirmdDeletePlan }: CurrentPlanProps) {
   const t = useTranslations("dashboard.userCurrentPlan");
   const scrollToBottom = () => {
      window.scrollBy({
         top: 300,
         behavior: 'smooth',
      });
   };
   return (
      <>
         <div className="pt-5">
            <h3 className="text-2xl font-semibold text-primary-600 hover:text-primary-700">{t("currentPlan")} <span className="capitalize text-left">{data?.plan?.replace(/_/g, ' ')} </span> </h3>
            <p className="pt-3 text-xl md:w-2/3 w-full">{t("thanksForSubscribe")}</p>
         </div>
         <div className="bg-gradient-to-r from-primary-700 to-primary-500 rounded-xl mt-6 p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 items-start gap-8">
               <div className="plan-name">
                  <div className="flex items-center gap-8 pb-4">
                     <h5 className="text-secondary text-2xl font-bold capitalize">
                        {data?.plan?.replace(/_/g, ' ')}
                     </h5>
                     <span className="bg-secondary px-2 py-1 text-lg rounded-xl">{data?.status}</span>
                  </div>
                  <p className="text-secondary text-lg">{t("purchasedAt")} {data?.created_at.split("T")[0]}</p>
               </div>
               <div className="billing-info flex flex-col gap-3">
                  <div className="duration-bulling text-secondary flex items-center gap-2">
                     <BsCreditCardFill />
                     <span className="text-lg capitalize">{data?.plan?.split('_')[1]} billing</span>
                  </div>
                  <div className="next-billing-data text-secondary flex items-center gap-2">
                     <FaCalendarAlt />
                     <span className="text-lg">{t("nextBilling")} {data?.expire_at.split('T')[0]}</span>
                  </div>
                  <div className="text-secondary">
                     <h6 className="text-xl font-bold flex items-center gap-2" ><GiMoneyStack />{t("amount")} {data?.price?.toFixed(2)} <span className="text-lg">{t("AED")}</span></h6>
                  </div>
               </div>
               <div className="subscription-actions flex flex-col lg:items-center items-start gap-3">
                  <button onClick={scrollToBottom} className="main-btn md:w-1/2">{t("changePlan")}</button>
                  <button className="main-btn !bg-red-600 !hover:bg-red-700 md:w-1/2" onClick={confirmdDeletePlan}>{t("cancelPlan")}</button>
               </div>
            </div>
         </div>
      </>
   )
}
