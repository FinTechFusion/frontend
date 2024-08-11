"use client";
import { API_BASE_URL } from "@/utils/api";
import Image from "next/image";
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import { Strategy } from "@/utils/types";
import Link from 'next/link';
import useFetch from '@/hooks/useFetch';
import Loading from "@/app/_components/common/loading/Loading";
import { toast } from "react-toastify";
import Toast from "@/app/_components/common/Tostify/Toast";



export default function Page() {
   const { data, loading, error } = useFetch(`${API_BASE_URL}/binance/strategies`, {
      method: "GET",
      next: { revalidate: 300 }

   }
   );
   if (loading) {
      return <Loading />;
   }
   if (error) {
      toast.error("Error at fetching Stratgies,try again later");
   }
   return (
      <>
         <Toast />
         <section className="store-strategies grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-3">
            {data.map((el: Strategy) => (
               <div className="px-3 py-5 shadow-sm" key={el.id}>
                  <div className="stategy-image">
                     <Image
                        src={el.banner_url}
                        alt={`${el.name} banner`}
                        width={425}
                        height={300}
                        className="rounded"
                     />
                  </div>
                  <h2 className="text-2xl font-medium pt-2">{el.name}</h2>
                  <p className="line-clamp-3 text-lg text-gray-800 py-2 overflow-hidden">{el.description}</p>
                  <Link href={`store/${el.id}`}>
                     <MainBtn content="install" btnWidth="w-fit my-2 rounded-md p-0 text-lg" />
                  </Link>
               </div>
            ))}
         </section>
      </>
   );
}
