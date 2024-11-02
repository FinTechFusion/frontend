"use client"
import { MdError } from "react-icons/md";
import { FaCheck } from "react-icons/fa6";
import Textbox from '@/app/_components/common/Text/Textbox';
import { Link } from '@/i18n/navigation';
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import Loading from '@/app/_components/common/loading/Loading';

export default function ConnectStatus() {
   const data = true
   return (
      <>
         {data ? (
            <div className="container mx-auto">
               <div className="flex flex-col justify-start items-center text-center min-h-screen pt-16">
                  <FaCheck className="p-3 bg-primary-600 text-secondary text-6xl rounded-full my-5" />
                  <Textbox title="binance.accountConnected" description="binance.successConnect" descriptionClass="md:w-1/2 w-full mx-auto text-lg" />
                  <Link href='/dashboard'>
                     <MainBtn content="binance.goToDashboard" btnProps="w-fit" />
                  </Link>
               </div>
            </div>
         ) : (
            <div className="container mx-auto">
               <div className="flex flex-col justify-start items-center text-center min-h-screen pt-16">
                  <MdError className="p-3 bg-red-600 text-secondary text-6xl rounded-full my-5" />
                  <Textbox titleClass="hover:text-red-700" title="binance.accountNotConnected" description="binance.failedConnect" descriptionClass="md:w-1/2 w-full mx-auto text-lg" />
                  <Link href='/site/exchange/connect'>
                     <MainBtn content="try again" btnProps="w-fit bg-red-600 hover:bg-red-700" />
                  </Link>
               </div>
            </div>
         ) || <Loading />}
      </>
   )
}
