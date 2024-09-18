// pages/Plans.tsx
import { useState } from 'react';
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { FaCheck } from "react-icons/fa6";
import Loading from '@/app/_components/common/loading/Loading';
import { PlanType } from '@/utils/types';
import { getTokenFromStorage } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface PlanCardProps {
   selectedPlanType: string;
   excludedPlanId: string;
}

function PlanContent({ selectedPlanType, excludedPlanId }: PlanCardProps) {
   const router = useRouter();
   const [selectedPlanId, setSelectedPlanId] = useState<string | null>(null);

   const accessToken = getTokenFromStorage("access_token");

   if (!accessToken) {
      router.push('/login');
   }

   const { data, loading } = useFetch(`${API_BASE_URL}/subscriptions/plans`, {
      method: "GET",
      next: { revalidate: 120 }
   });

   const createSubscription = async (planId: string) => {
      if (!accessToken) return;
      try {
         const response = await fetch(`${API_BASE_URL}/users/me/subscription`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               authorization: `Bearer ${accessToken}`
            },
            body: JSON.stringify({ plan: planId })
         });
         const result = await response.json();
         if (result.success && result.data.client_secret) {
            // Redirect to PaymentPage with clientSecret
            // router.push(`/site/payment?clientSecret=${encodeURIComponent(result.data.client_secret)}`);

         }
      } catch (error) {
         console.error('Error creating subscription:', error);
      }
   };

   const handlePurchase = async (planId: string) => {
      await createSubscription(planId);
   };

   if (loading) {
      return <Loading />;
   }

   const filteredPlans = data?.filter((plan: PlanType) => {
      return plan.frequency === selectedPlanType ||
         (selectedPlanType === "monthly" && plan.frequency === "trial");
   }).filter((plan: PlanType) => plan.id != excludedPlanId);

   return (
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
         {filteredPlans?.map((plan: PlanType, index: number) => (
            <div className="planCard shadow-sm border border-gray-200 px-8 py-10 rounded-[14px] h-full" key={index}>
               <h2 className="text-2xl font-medium pb-4">{plan.id === "beginner_trial" ? "Free Trial" : plan.name}</h2>
               <span className="text-gray-500 text-lg pt-5">
                  <b className="text-gray-950 text-3xl"> {plan.price}/{plan.frequency === "monthly" || plan.frequency === "trial" ? "mo" : "yearly"}</b>
                  <span className="text-2xl text-gray-600">{" "}AED</span>
               </span>
               <p className="info text-gray-500 py-3 line-clamp-2">{plan.description}</p>
               <button
                  className="main-btn w-full"
                  onClick={() => handlePurchase(plan.id)}
               >
                  Purchase Plan
               </button>
               <div className="plan-include">
                  <p className="text-gray-800 text-xl font-medium pt-4">Includes :</p>
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
   );
}

export default function Plans(props: PlanCardProps) {
   return (
      <PlanContent {...props} />
   );
}
