"use client"
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { FaCheck } from "react-icons/fa6";
import Loading from '@/app/_components/common/loading/Loading';

interface PlanType {
   id: string,
   name: string,
   price: number,
   description: string,
   frequency: string,
   features: string[],
}

interface PlanCardProps {
   selectedPlanType: string;
}



export default function PlanCard({ selectedPlanType }: PlanCardProps) {
   const { data, loading } = useFetch(`${API_BASE_URL}/subscriptions/plans`, {
      method: "GET",
      next: { revalidate: 120 }
   })
   if (loading) {
      return <Loading />
   }

   const filteredPlans = data?.filter((plan: PlanType) => {
      return plan.frequency === selectedPlanType ||
         (selectedPlanType === "monthly" && plan.frequency === "trial");
   }).filter((plan: PlanType) => plan.id != 'beginner_monthly');

   return (
      <div className="grid md:grid-cols-3 grid-cols-1 gap-6">
         {filteredPlans?.map((plan: PlanType, index: number) => {
            return (
               <div className="planCard shadow-sm border border-gray-200 px-8 py-10 rounded-[14px]" key={index}>
                  <h2 className="text-2xl font-medium pb-4">{plan.id === "beginner_trial" ? "Free Trial" : plan.name}</h2>
                  <span className="text-gray-500 text-lg pt-5"><b className="text-gray-950 text-3xl"><span className="text-2xl text-gray-600">AED</span> {" "}{plan.price}/{plan.frequency === "monthly" || plan.frequency === "trial" ? "mo" : "yearly"}</b></span>
                  <p className="info text-gray-500 pb-3 pt-4">{plan.description} </p>
                  <MainBtn content='purchase plan' btnProps="w-full capitalize" />
                  <div className="plan-include">
                     <p className="text-gray-800 text-xl font-medium pt-4">Includes :</p>
                     <ul className='py-3'>
                        {plan?.features?.map((feature: any, index: number) => (
                           <li key={index} className='capitalize py-2 flex justify-start items-start '>
                              <FaCheck className="pe-2 text-primary-600 text-2xl" /> {feature}
                           </li>
                        ))}
                     </ul>
                  </div>
               </div>
            )
         })}
      </div>

   )
};