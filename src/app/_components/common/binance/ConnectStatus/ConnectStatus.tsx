"use client"
import { getTokenFromStorage } from '@/context/AuthContext';
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { useSearchParams } from 'next/navigation';
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import Textbox from '@/app/_components/common/Text/Textbox';
import { Link } from '@/i18n/navigation';
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import Loading from '@/app/_components/common/loading/Loading';
import { useLocale } from 'next-intl';

export default function ConnectStatus() {
   const accessToken = getTokenFromStorage("access_token");
   const searchParams = useSearchParams();
   const code = searchParams.get('code');
   const locale = useLocale();
   const { data } = useFetch(`${API_BASE_URL}/users/me/binance/link/callback?code=${code}?lang=${locale}`,
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
                  <Textbox title="binance.accountConnected" description="binance.successConnect" descriptionClass="md:w-1/2 w-full mx-auto text-lg" />
                  <Link href='/dashboard'>
                     <MainBtn content="binance.goToDashboard" btnProps="w-fit" />
                  </Link>
               </> : <>
                  <MdError className="p-3 bg-red-600 text-secondary text-6xl rounded-full my-5 " />
                  <Textbox titleClass="hover:text-red-700" title="binance.accountNotConnecteds" description="binance.failedConnect" descriptionClass="md:w-1/2 w-full mx-auto text-lg" />
                  <Link href='/site/exchange/connect'>
                     <MainBtn content="try again" btnProps="w-fit bg-red-600 hover:bg-red-700" />
                  </Link>
               </>
               }</div>
         </div> : <Loading />}
      </>)
}
