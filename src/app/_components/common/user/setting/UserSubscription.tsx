"use client"
import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2'
import { getTokenFromStorage } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import { BsCreditCardFill } from "react-icons/bs";
import { FaCalendarAlt } from "react-icons/fa";
import { GiMoneyStack } from "react-icons/gi";
import Loading from '@/app/_components/common/loading/Loading';

interface SubscriptionData {
   plan: string;
   status: string;
   created_at: string;
   expire_at: string;
   price: number;
}

enum SubscriptionStatus {
   LOADING,
   SUBSCRIBED,
   NOT_SUBSCRIBED,
   ERROR
}

const UserSubscription: React.FC = () => {
   const [subscriptionData, setSubscriptionData] = useState<SubscriptionData | null>(null);
   const [status, setStatus] = useState<SubscriptionStatus>(SubscriptionStatus.LOADING);
   const [error, setError] = useState<string | null>(null);
   const accessToken = getTokenFromStorage("access_token");

   const checkSubscriptionStatus = async (): Promise<void> => {
      try {
         const response = await fetch(`${API_BASE_URL}/users/me/subscription`, {
            method: "GET",
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         });

         if (response.status === 404) {
            setStatus(SubscriptionStatus.NOT_SUBSCRIBED);
            return;
         }

         if (!response.ok) {
            throw new Error("Failed to check subscription status");
         }

         const { data } = await response.json();
         setStatus(data ? SubscriptionStatus.SUBSCRIBED : SubscriptionStatus.NOT_SUBSCRIBED);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'An unknown error occurred');
         setStatus(SubscriptionStatus.ERROR);
      }
   };

   const fetchSubscriptionData = async (): Promise<void> => {
      try {
         const response = await fetch(`${API_BASE_URL}/users/me/subscription`, {
            method: "GET",
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         });

         if (!response.ok) {
            throw new Error("Failed to fetch subscription data");
         }

         const data: SubscriptionData = await response.json();
         setSubscriptionData(data);
      } catch (err) {
         setError(err instanceof Error ? err.message : 'An unknown error occurred');
         setStatus(SubscriptionStatus.ERROR);
         console.error("Error fetching subscription data:", err);
      }
   };

   useEffect(() => {
      checkSubscriptionStatus();
   }, []);

   useEffect(() => {
      if (status === SubscriptionStatus.SUBSCRIBED) {
         fetchSubscriptionData();
      }
   }, [status]);

   const handleDeletePlan = async (): Promise<void> => {
      try {
         const response = await fetch(`${API_BASE_URL}/users/me/subscription`, {
            method: "DELETE",
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         });

         if (!response.ok) {
            throw new Error("Failed to delete plan");
         }

         setStatus(SubscriptionStatus.NOT_SUBSCRIBED);
         setSubscriptionData(null);
      }
      catch (err) {
         console.error("Error deleting plan:", err);
         throw err;
      }
   }

   const confirmDeleted = async (): Promise<void> => {
      const result = await Swal.fire({
         title: "Are you sure?",
         text: "You won't be able to revert this!",
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#0d9488",
         cancelButtonColor: "#d33",
         confirmButtonText: "Yes, delete it!"
      });

      if (result.isConfirmed) {
         try {
            await handleDeletePlan();
            Swal.fire({
               title: "Deleted!",
               text: "Your Plan has been canceled.",
               icon: "success"
            });
         } catch (error) {
            Swal.fire({
               title: "Error!",
               text: "An error occurred while deleting the plan.",
               icon: "error"
            });
         }
      }
   };

   if (status === SubscriptionStatus.LOADING) {
      return <Loading />
   }

   if (status === SubscriptionStatus.NOT_SUBSCRIBED) {
      return <div>You are not currently subscribed to any plan. Would you like to view our subscription options?</div>
   }

   if (!subscriptionData) {
      return <Loading />
   }

   return (
      <>
         <div className="pt-5">
            <h3 className="text-2xl font-semibold text-primary-600 hover:text-primary-700">You&apos;re on the <span className="capitalize">{subscriptionData.plan.split('_')[0]}</span> Plan</h3>
            <p className="pt-3 text-xl md:w-2/3 w-full">Thanks for verifying your account and being part of Fintech Fusion. As a member of the <span className="capitalize text-primary-700"> {subscriptionData.plan.replace(/_/g, ' ')}</span> Plan</p>
         </div>
         <div className="bg-gradient-to-r from-primary-700 to-primary-500 rounded-xl mt-6 p-8">
            <div className="grid md:grid-cols-2 lg:grid-cols-3 grid-cols-1 items-start gap-8">
               <div className="plan-name">
                  <div className="flex items-center gap-8 pb-4">
                     <h5 className="text-secondary text-2xl font-bold capitalize">
                        {subscriptionData.plan.replace(/_/g, ' ')}
                     </h5>
                     <span className="bg-secondary px-2 py-1 text-lg rounded-xl">{subscriptionData.status}</span>
                  </div>
                  <p className="text-secondary text-lg">Plan Purchased at : {subscriptionData.created_at.split("T")[0]}</p>
               </div>
               <div className="billing-info flex flex-col gap-3">
                  <div className="duration-bulling text-secondary flex items-center gap-2">
                     <BsCreditCardFill />
                     <span className="text-lg capitalize">{subscriptionData.plan.split('_')[1]} billing</span>
                  </div>
                  <div className="next-billing-data text-secondary flex items-center gap-2">
                     <FaCalendarAlt />
                     <span className="text-lg">Next Billing: {subscriptionData.expire_at.split('T')[0]}</span>
                  </div>
                  <div className="text-secondary">
                     <h6 className="text-xl font-bold flex items-center gap-2" ><GiMoneyStack /> Amount : {subscriptionData.price} <span className="text-lg">AED</span></h6>
                  </div>
               </div>
               <div className="subscription-actions flex flex-col lg:items-center items-start gap-3">
                  <button className="main-btn md:w-1/2">Change Plan</button>
                  <button className="main-btn !bg-red-600 !hover:bg-red-700 md:w-1/2" onClick={confirmDeleted}>Cancel Plan</button>
               </div>
            </div>
         </div>
      </>
   )
}

export default UserSubscription;