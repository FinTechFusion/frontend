"use client"

import { Suspense } from "react";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/_components/common/loading/Loading";
import Textbox from "@/app/_components/common/Text/Textbox";
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import Link from "next/link";
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import { getTokenFromStorage } from "@/context/AuthContext";

function BinanceConnectionStatus() {
   const accessToken = getTokenFromStorage("access_token");
   const searchParams = useSearchParams();
   const code = searchParams.get('code');

   const { data } = useFetch(`${API_BASE_URL}/users/me/binance/link/callback?code=${code}`,
      {
         method: 'GET',
         headers: {
            'authorization': `Bearer ${accessToken}`,
         },
      }
   );

   return (
      <>
         {data ? <div className="container mx-auto">
            <div className="flex flex-col justify-start items-center text-center min-h-screen pt-16">
               {data?.is_binance ? <>
                  <FaCheck className="p-3 bg-primary-600 text-secondary text-6xl rounded-full my-5" />
                  <Textbox title="Binance Account Connected" description="Your Binance account has been successfully connected. You can now access your trading data and manage your portfolio." descriptionClass="md:w-1/2 w-full mx-auto text-lg" />
                  <Link href='/dashboard'>
                     <MainBtn content="Go to Dashboard" btnProps="w-fit" />
                  </Link>
               </> : <>
                  <MdError className="p-3 bg-red-600 text-secondary text-6xl rounded-full my-5 " />
                  <Textbox titleClass="hover:text-red-700" title="Binance Account Connection Failed" description="We're sorry, but there was an error connecting your Binance account. Please try again later or contact support if the issue persists." descriptionClass="md:w-1/2 w-full mx-auto text-lg" />
                  <Link href='/site/exchange/connect'>
                     <MainBtn content="try again" btnProps="w-fit bg-red-600 hover:bg-red-700" />
                  </Link>
               </>
               }</div>
         </div> : <Loading />}
      </>

   );
}

export default function Page() {
   return (
      <Suspense fallback={<Loading />}>
         <BinanceConnectionStatus />
      </Suspense>
   );
}
