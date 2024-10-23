"use client"
import FailedPayment from "@/app/_components/paymentstatus/FailedPayment";
import SuccessPayment from "@/app/_components/paymentstatus/SuccessPayment";
import { useSearchParams, } from "next/navigation"
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { getTokenFromStorage } from "@/context/AuthContext";
import Loading from '@/app/_components/common/loading/Loading';

export default function Page() {
   const accessToken = getTokenFromStorage("access_token");
   const searchParams = useSearchParams();
   const sessionId = searchParams.get('session_id');
   const { data, loading } = useFetch(`${API_BASE_URL}/users/me/subscription/confirm?session_id=${sessionId}`, {
      method: 'POST',
      headers: {
         authorization: `Bearer ${accessToken}`
      }
   });
   console.log(data);
   if (loading) {
      return <Loading />
   }
   return (
      <>
         {data ? <SuccessPayment /> : <FailedPayment />}
      </>
   )
}
