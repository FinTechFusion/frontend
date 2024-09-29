import Image from "next/image";
import binanceImg from "/public/assets/images/binanice.png"
import Link from "next/link";
import { IoIosLock } from "react-icons/io";
export default function page() {
   return (
<div className="bg-[url('/assets/images/pattern-lines.png')] bg-center bg-cover">
         <div className="flex flex-col justify-center items-center min-h-[90vh] text-center mx-auto">
            <div className="binance-heading">
               <h2 className="text-3xl py-5 font-medium tracking-wide leading-10 text-dark ">Connect Account To Start Trading</h2>
            </div>
            <Link href='/site/exchange/connect' className="border-2 hover:border-primary-600 my-16">
               <div className="binance-logo">
                  <Image
                     src={binanceImg}
                     alt="binance-logo"
                     width="160"
                     height="160"
                  />
               </div>
            </Link>
            <div className="connect-info">
               <span className="block py-3 text-lg">I don&apos;t have an exchange</span>
               <Link href="/dashboard">
                  <b className="text-primary-700 text-xl cursor-pointer">Start Trading on the Demo</b>
               </Link>
            </div>
            <p className="py-8 text-center text-dark text-lg flex justify-center items-start w-4/5"><span className="text-2xl"><IoIosLock /></span> FinTech Fusion will not have access to transfer or withdraw your assets</p>
         </div>
      </div>
   )
}
