"use client"
import { API_BASE_URL } from "@/utils/api";
import useFetch from "@/hooks/useFetch";
import Loading from "@/app/_components/common/loading/Loading";
import { toast } from "react-toastify";
import Toast from "@/app/_components/common/Tostify/Toast";
import Strategies from "@/app/_components/strategies/Strategies";
import { useLocale } from 'next-intl';

export default function Page() {
   const locale = useLocale();
   const { data, loading, error } = useFetch(`${API_BASE_URL}/binance/strategies?lang=${locale}`, {
      method: "GET",
      next: { revalidate: 180 },
   });
   if (loading) return <Loading />;
   if (error) {
      toast.error("Error fetching strategies, try again later");  
      return null;
   }

   return (
      <>
         <Toast />
         <Strategies data={data} />
      </>
   );
}
