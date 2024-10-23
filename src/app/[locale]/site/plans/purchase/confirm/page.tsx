"use client"
import FailedPayment from "@/app/_components/paymentstatus/FailedPayment";
import SuccessPayment from "@/app/_components/paymentstatus/SuccessPayment";
import { useRouter, useSearchParams } from "next/navigation";
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import Loading from '@/app/_components/common/loading/Loading';
import { useEffect } from 'react';
import { getTokenFromStorage } from "@/context/AuthContext";

export default function Page() {
   const accessToken = getTokenFromStorage("access_token");
   const searchParams = useSearchParams();
   const router = useRouter();
   const sessionId = searchParams.get('session_id');

   const { data, loading } = useFetch(`${API_BASE_URL}/users/me/subscription/confirm?session_id=${sessionId}`, {
      method: 'POST',
      headers: {
         authorization: `Bearer ${accessToken}`
      }
   });

   useEffect(() => {
      if (!loading && data) {
         const lang = localStorage.getItem("lang");

         // Perform the redirect only after data is ready
         router.push(`/${lang}/site/plans/purchase/confirm?session_id=${sessionId}`);
      }
   }, [data, loading]);

   if (loading) {
      return <Loading />;
   }

   return (
      <>
         {data ? <SuccessPayment /> : <FailedPayment />}
      </>
   );
}
