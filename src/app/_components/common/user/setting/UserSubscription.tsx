"use client"
import { getTokenFromStorage } from "@/context/AuthContext";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/utils/api";
import { BsCreditCardFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";

// import { UserSubscriptionProps } from "@/utils/types";

const UserSubscription = () => {
   const accessToken = getTokenFromStorage("access_token");
   const { data } = useFetch(`${API_BASE_URL}/users/me/subscription`,
      {
         method: "GET",
         headers: {
            authorization: `Bearer ${accessToken}`,
         },
      }
   );
   return (
      <>
         <div className="pt-5">
            <h3 className="text-2xl font-semibold text-primary-700  hover:text-primary-800 capitalize">You&apos;re on the {data?.plan?.split('_')[0]} Plan</h3>
            <p className="pt-5 text-xl">Thanks for verifying your account and being part of Fintech Fusion. As a member of the Trial Plan</p>
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
                  <p className="text-secondary text-lg">Plan Purchased at : {data?.created_at.split("T")[0]}</p>
               </div>
               <div className="billing-info flex flex-col gap-3">
                  <div className="duration-bulling text-secondary  flex items-center gap-2">
                     <BsCreditCardFill />
                     <span className="text-lg capitalize">{data?.plan?.split('_')[1]} billing</span>
                  </div>
                  <div className="next-billing-data text-secondary flex items-center gap-2">
                     <FaCalendarAlt />
                     <span className="text-lg">Next Billing: {data?.expire_at.split('T')[0]}</span>
                  </div>
                  <div className="text-secondary">
                     <h6 className="text-xl font-bold flex items-center gap-2" ><GiMoneyStack /> Amount : {data?.price} <span className="text-lg">AED</span></h6>
                  </div>
               </div>
               <div className="subscription-actions flex flex-col gap-3">
                  <button className="main-btn w-1/2">Change Plan</button>
                  <button className="main-btn bg-red-700 w-1/2">Cancel Plan</button>
               </div>
            </div>
         </div></>
   )
}

export default UserSubscription;