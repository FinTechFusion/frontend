import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { FaCheck } from "react-icons/fa6";

interface PlanType {
   planType: string;
}

const plans = {
   monthly: {
      title: 'Monthly',
      price: '$29/mo',
      description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Architecto, placeat.',
      features: ['unlimited placeholder texts', 'unlimited placeholder texts', 'unlimited placeholder texts', 'unlimited placeholder texts'],
   },
   yearly: {
      title: 'Yearly',
      price: '$290/yr',
      description: 'Save 25% with our yearly plan!',
      features: ['unlimited placeholder texts', 'unlimited placeholder texts', 'unlimited placeholder texts', 'additional feature for yearly'],
   },
};

export default function PlanCard({ planType }: PlanType) {
   // const { data } = useFetch(`${API_BASE_URL}/subscriptions/plans`, {
   //    method: "GET",
   //    next: { revalidate: 120 }
   // })
   const { title, price, description, features } = plans[planType as keyof typeof plans];
   return (
      <div className="planCard shadow-sm border border-gray-200 px-8 py-10 rounded-[14px]">
         <h2 className="text-2xl font-medium pb-4">{title}</h2>
         <span className="text-gray-500 text-lg pt-5"><b className="text-gray-950 text-3xl">{price}</b></span>
         <p className="info text-gray-500 pb-3 pt-4">{description}</p>
         <MainBtn content='purchase plan' btnProps="w-full capitalize" />
         <div className="plan-include">
            <p className="text-gray-800 text-xl font-medium pt-4">Includes :</p>
            <ul className='py-3'>
               {features.map((feature: any, index: number) => (
                  <li key={index} className='capitalize py-2 text-xl flex justify-start items-center '>
                     <FaCheck className="pe-2 text-primary-600 text-xl" /> {feature}
                  </li>
               ))}
            </ul>
         </div>
      </div>
   );
}