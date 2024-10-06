"use client";
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { FaCheck } from "react-icons/fa6";
import Loading from '@/app/_components/common/loading/Loading';
import { PlanType } from '@/utils/types';
import { getTokenFromStorage } from '@/context/AuthContext';
import { toast } from 'react-toastify';
import Toast from '../Tostify/Toast';
import { useAuth } from '@/context/AuthContext';
import BenfitsSubscription from '../supscription/BenfitsSubscription';
import { useLocale, useTranslations } from 'next-intl';
import { useRouter } from '@/i18n/navigation';

interface PlanCardProps {
   selectedPlanType: string;
   excludedPlanId: string;
}

function PlanContent({ selectedPlanType, excludedPlanId }: PlanCardProps) {
   const router = useRouter();
   const { user, fetchUserData } = useAuth();
   const accessToken = getTokenFromStorage("access_token");
   const locale = useLocale();
   const t = useTranslations("plans");

   const { data, loading } = useFetch(`${API_BASE_URL}/subscriptions/plans?lang=${locale}`, {
      method: "GET",
      next: { revalidate: 120 }
   });
   const createSubscription = async (planId: string) => {
      if (!accessToken) {
         router.push('/login');
      }
      try {
         const response = await fetch(`${API_BASE_URL}/users/me/subscription`, {
            method: `${user?.is_subscribed ? "PATCH" : "POST"}`,
            headers: {
               'Content-Type': 'application/json',
               authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ plan: planId })
         });
         const result = await response.json();
         if (!result.success) {
            return toast.info("You already subscribed at this plan,before");
         }
         if (result.data.plan === "beginner_trial") {
            toast.success("You,subscribed at plan successfully");
            if (accessToken) {
               fetchUserData(accessToken);
            }
            return;
         }

         if (result.success && result.data.client_secret) {
            // Redirect to PaymentPage with clientSecret
            router.push(`/site/payment?clientSecret=${encodeURIComponent(result.data.client_secret)}`);
         }
      } catch (error) {
         console.error('Error creating subscription:', error);
      }
   };
   const handlePurchase = async (planId: string) => {
      await createSubscription(planId);
   } 
   if (loading) {
      return <Loading />;
   }

   const filteredPlans = data?.filter((plan: PlanType) => {
      return plan.frequency === selectedPlanType ||
         (selectedPlanType === "monthly" && plan.frequency === "trial");
   }).filter((plan: PlanType) => plan.id != excludedPlanId);
   return (
      <>
         <Toast />
         <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
            {filteredPlans?.map((plan: PlanType, index: number) => (
               <div className="planCard shadow-sm border border-gray-200 px-8 py-10 rounded-[14px] h-full" key={index}>
                  <h2 className="text-2xl font-medium pb-4">{plan.id === "beginner_trial" ? t("freeTrial") : plan.name}</h2>
                  <span className="text-gray-500 text-lg pt-5">
                     <b className="text-gray-950 text-3xl"> {plan.price}/{plan.frequency === "monthly" || plan.frequency === "trial" ? t("mo") : t("yearly")}</b>
                     <span className="text-2xl text-gray-600">{" "}{t("AED")}</span>
                  </span>
                  <p className="info text-gray-500 py-3 line-clamp-2">{plan.description}</p>
                  <button
                     className="main-btn w-full"
                     onClick={() => handlePurchase(plan.id)}
                  >
                     {t("subscribePlan")}
                  </button>
                  <div className="plan-include">
                     <p className="text-gray-800 text-xl font-medium pt-4">{t("includes")}</p>
                     <ul className='py-3'>
                        {plan?.features?.map((feature: any, index: number) => (
                           <li key={index} className='capitalize py-2 flex justify-start items-start'>
                              <FaCheck className="pe-2 text-primary-600 text-2xl" /> {feature}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            ))}
         </div>
         <BenfitsSubscription />
      </>
   );
}

export default function Plans(props: PlanCardProps) {
   return (
      <PlanContent {...props} />
   );
}
