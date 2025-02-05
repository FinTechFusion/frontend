import Image from "next/image";
import binanceImg from "/public/assets/images/binanice.png"
import { Link } from '@/i18n/navigation';
import { IoIosLock } from "react-icons/io";
import { useTranslations } from "next-intl";
import { FiArrowDown } from 'react-icons/fi';

export default function Page() {
   const t = useTranslations("binance");

   return (
      <div className="bg-[url('/assets/images/pattern-lines.png')] bg-center bg-cover">
         <div className="flex flex-col justify-center items-center min-h-[90vh] text-center mx-auto">
            <div className="binance-heading">
               <h2 className="text-3xl py-5 font-medium tracking-wide leading-10 text-dark">{t("connectAccount")}</h2>
            </div>
            
            {/* Added animated arrow */}
            <div className="animate-bounce mt-4 mb-2">
               <FiArrowDown className="text-primary-600 text-5xl " />
            </div>
            <Link 
               href='/site/exchange/connect' 
               className="relative border-2 hover:border-primary-600 my-6 rounded-lg"
            >
               <div className="binance-logo relative p-2 bg-secondary rounded-lg">
                     <Image
                        src={binanceImg}
                        alt="binance-logo"
                        width="160"
                        height="160"
                     />
               </div>
            </Link>

            <div className="connect-info">
               <span className="block py-3 text-lg">{t("donthaveExchanges")}</span>
               <Link href="/dashboard">
                  <b className="text-primary-700 text-xl cursor-pointer hover:underline">{t("startAtDemo")}</b>
               </Link>           
            </div>
            
            <p className="py-8 text-center text-dark text-lg flex justify-center items-start w-4/5 gap-2">
               <span className="text-2xl"><IoIosLock /></span>
               {t("accessTransfer")}
            </p>
         </div>
      </div>
   )
}