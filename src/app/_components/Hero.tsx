import Image from "next/image";
import homeImage from '/public/assets/images/headerimg.webp';
import Link from "next/link";
import { MainBtn } from "./common/Buttons/MainBtn";
import dynamic from "next/dynamic";
import HowItWorks from "./Home/HowWork/HowWork";
const BinancePopup = dynamic(() => import("./Popups/BinancePopup"), { ssr: false });

export default function Hero() {
   return (
      <div className="container mx-auto md:min-h-[vh] min-h-[95vh] mt-12" >
         <div className="flex flex-col justify-center items-center">
            <div className="grid md:grid-cols-2 grid-cols-1 md:gap-12 md:justify-center justify-start items-start">
               <div className="text-title mt-12 flex flex-col justify-start items-start">
                  <h1 className="font-semibold text-4xl tracking-wide capitalize text-dark">Meet your new crypto trading bots</h1>
                  <p className="text-gray-700 py-3 text-xl">Meet your new trading edge Bot Signal and Bot AI, Simple smart,and secure Bot Signal finds opportunities. Bot AI predicts the market.
                     Both designed to boost your profits with ease and safety in mind.</p>
                  <Link href="/dashboard">
                     <MainBtn content="start trial" btnProps="w-fit" />
                  </Link>
               </div>
               <div className="w-3/4 mx-auto md:h-fit h-full">
                  <Image
                     src={homeImage}
                     alt="home-image"
                     width={600}
                     height={300}
                     priority
                     quality={75}
                     sizes="(max-width: 768px) 100vw, 800px"
                  />
               </div>
            </div>
            <HowItWorks />
         </div>
         <BinancePopup />
      </div>
   )
}
