"use client"
import FailedPayment from "@/app/_components/paymentstatus/FailedPayment";
import SuccessPayment from "@/app/_components/paymentstatus/SuccessPayment";
import { useSearchParams, } from "next/navigation"
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { getTokenFromStorage } from "@/context/AuthContext";
import Loading from '@/app/_components/common/loading/Loading';
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

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
   const lang = localStorage.getItem("lang");
   useEffect(() => {
      if (lang) {
         router.replace(`/${lang}/site/plans/purchase/confirm?session_id=${sessionId}`);
      }
   }, [])
   if (loading) {
      return <Loading />
   }
   return (
      <>
         {data ? <SuccessPayment /> : <FailedPayment />}
      </>
   )
}
