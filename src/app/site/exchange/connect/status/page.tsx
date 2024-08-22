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

function BinanceConnectionStatus() {
   const searchParams = useSearchParams();
   const [code, code_verifier, state, error] = ['code', 'code_verifier', 'state', 'error'].map(param => searchParams.get(param));

   const { data } = useFetch(`${API_BASE_URL}/users/me/binance/link/callback?code=${code}&code_verifier=${code_verifier}&state=${state}&error=${error}`);


   return (
      <div className="container mx-auto">
         <div className="flex flex-col  justify-start items-center text-center min-h-screen pt-16">
            {data?.success ? <>
            <FaCheck className="p-3 bg-primary-600 text-secondary text-6xl rounded-full my-5"/>
               <Textbox title="Binance Account Connected" description="Your Binance account has been successfully connected. You can now access your trading data and manage your portfolio." descriptionClass="md:w-1/2 w-full mx-auto text-lg" />
               <Link href='/dashboard'>
                  <MainBtn content="Go to Dashboard" btnProps="w-fit" />
               </Link>
            </> : <>
               <MdError className="p-3 bg-red-600 text-secondary text-6xl rounded-full my-5 " />
               <Textbox title="Binance Account Connection Failed" description="We're sorry, but there was an error connecting your Binance account. Please try again later or contact support if the issue persists." descriptionClass="md:w-1/2 w-full mx-auto text-lg" />
               <Link href='/site/exchange/connect'>
                  <MainBtn content="try again" btnProps="w-fit" />
               </Link>
            </>
            }</div>   
      </div>
   );
}

export default function Page() {
   return (
      <Suspense fallback={<Loading />}>
         <BinanceConnectionStatus />
      </Suspense>
   );
}
