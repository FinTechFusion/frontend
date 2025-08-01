"use client"
import Image from "next/image";
import homeImage from '/public/assets/images/headerimg.webp';
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
const BinancePopup = dynamic(() => import("./Popups/BinancePopup"), { ssr: false });
import { Link } from '@/i18n/navigation';

export default function Hero() {
   const t = useTranslations('hero');
   return (
      <main className="container mx-auto md:min-h-[vh] min-h-[95vh] mt-12" >
         <div className="flex flex-col justify-center items-center md:h-[60vh] h-[80vh]">
            <div className="grid md:grid-cols-2 grid-cols-1 gap-12 md:justify-between justify-start items-center">
               <div className="text-title mt-10 flex flex-col justify-start items-start w-full">
                  <p className="bg-primary-50 my-3 text-primary-600 p-2 rounded-xl tracking-wide text-lg font-semibold">{t("heading")}</p>
                  <h1 className="font-semibold text-4xl tracking-wide capitalize text-dark">{t('title')} <span className="text-primary-600">{t("title-part")}</span></h1>
                  <p className="text-gray-700 text-xl pb-4 pt-2">{t("description")}</p>
                  <Link href="/dashboard" className="flex justify-center items-center gap-x-2 main-btn group">
                     <button>{t("trail_btn")}</button>
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
         </div>
         <BinancePopup />
      </main>
   )
}
