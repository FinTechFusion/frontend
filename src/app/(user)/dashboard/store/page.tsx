"use client"
import { API_BASE_URL } from "@/utils/api";
import useFetch from "@/hooks/useFetch";
import Loading from "@/app/_components/common/loading/Loading";
import { toast } from "react-toastify";
import Toast from "@/app/_components/common/Tostify/Toast";
import Strategies from "@/app/_components/strategies/Strategies";

export default function Page() {

   const { data, loading, error } = useFetch(`${API_BASE_URL}/binance/strategies`, {
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
