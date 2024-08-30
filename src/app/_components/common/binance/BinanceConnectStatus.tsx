"use client"
import { useAuth } from "@/context/AuthContext"
import Textbox from '@/app/_components/common/Text/Textbox';
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import Link from "next/link";

export default function BinanceConnectStatus() {
   const { user } = useAuth();
   return (

      !(user?.is_binance_active) && <div className="binance-status bg-gray-100 p-6 rounded my-6 grid md:grid-cols-2 grid-cols-1 md:justify-between justify-start items-center md:gap-0 gap-2">
         <Textbox titleClass='text-2xl' title='Binance Connect Status' description='Connect your Binance account to our platform for seamless trading and portfolio management all in one place.' />
         <Link href="/site/exchange/connect" className='md:text-end'>
            <MainBtn content='connect' btnProps='w-fit' />
         </Link>
      </div>
   )
}
