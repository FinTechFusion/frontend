"use client"
import useFetch from "@/hooks/useFetch"
import { API_BASE_URL } from "@/utils/api";
import { useSearchParams } from "next/navigation";

export default function Page() {
   const searchParams = useSearchParams();
   const [code, code_verifier, state, error] = ['code', 'code_verifier', 'state', 'error'].map(param => searchParams.get(param));
   // const route = useRouter();

   const { data, loading } = useFetch(`${API_BASE_URL}/users/me/binance/link/callback?code=${code}&code_verifier=${code_verifier}&state=${state}&error=${error}`);

   return (
      <div className="container mx-auto">
         <h2>Binance Connection</h2>
         {data?.success ? "Account Connected Successfully" : "Faliled at connected"}
      </div>
   )
}
