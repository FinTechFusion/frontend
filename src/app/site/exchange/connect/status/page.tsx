"use client"

import { Suspense } from "react";
import useFetch from "@/hooks/useFetch";
import { API_BASE_URL } from "@/utils/api";
import { useSearchParams } from "next/navigation";
import Loading from "@/app/_components/common/loading/Loading";

function BinanceConnectionStatus() {
   const searchParams = useSearchParams();
   const [code, code_verifier, state, error] = ['code', 'code_verifier', 'state', 'error'].map(param => searchParams.get(param));

   const { data } = useFetch(`${API_BASE_URL}/users/me/binance/link/callback?code=${code}&code_verifier=${code_verifier}&state=${state}&error=${error}`);

   return (
      <div className="container mx-auto">
         <h2>Binance Connection</h2>
         {data?.success ? "Account Connected Successfully" : "Failed to Connect"}
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
