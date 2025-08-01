"use client"
import Swal from 'sweetalert2'
import { getFromCookies, useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import Loading from '@/app/_components/common/loading/Loading';
import CurrentPlan from '../../supscription/CurrentPlan';
import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';

const UserSubscription = () => {
   const accessToken = getFromCookies("access_token");
   const { user, fetchUserData } = useAuth();
   const [subscriptionData, setSubscriptionData] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const t = useTranslations("dashboard.userCurrentPlan");

   useEffect(() => {
      const fetchSubscription = async () => {
         if (user?.is_subscribed) {
            setIsLoading(true);
            try {
               const response = await fetch(`${API_BASE_URL}/users/me/subscription`, {
                  method: "GET",
                  headers: {
                     authorization: `Bearer ${accessToken}`,
                  },
               });
               const {data} = await response.json();
               setSubscriptionData(data);
            } catch (error) {
               throw new Error(t("errorFetchPlans"));
            } finally {
               setIsLoading(false);
            }
         }
      };

      fetchSubscription();
   }, [user]);

   const handleDeletePlan = async () => {
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

      } catch (err) {
         Swal.fire({
            title: "Error!",
            text: "An error occurred while deleting the plan.",
            icon: "error"
         });
      }
   };

   const confirmDeleted = () => {
      Swal.fire({
         title: t("areYouSure"),
         text: t("revertIt"),
         icon: "warning",
         showCancelButton: true,
         confirmButtonColor: "#3085d6",
         cancelButtonColor: "#d33",
         confirmButtonText: t("confirmButtonText"),
         cancelButtonText: t("cancel")
      }).then(async (result) => {
         if (result.isConfirmed) {
            await handleDeletePlan();
            if(accessToken){
               await fetchUserData(accessToken);
            }
            Swal.fire({
               title: t("deleted"),
               text: t("deletedPlan"),
               icon: "success"
            });
         }
      });
   }

   if (isLoading) {
      return <Loading />;
   }

   return (
      <>
         {user?.is_subscribed && subscriptionData && (
            <CurrentPlan data={subscriptionData} confirmdDeletePlan={confirmDeleted} />
         )}
      </>
   )
}

export default UserSubscription;