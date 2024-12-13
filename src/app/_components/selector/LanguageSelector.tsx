"use client";

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { usePathname } from 'next/navigation';
import { TbWorld } from "react-icons/tb";
import americaflag from '/public/assets/images/americaflag.png';
import saudiarabiaflag from '/public/assets/images/saudiarabiaflag.png';
import Image from 'next/image';

export default function LanguageSelector() {
   const [isOpen, setIsOpen] = useState(false);
   const router = useRouter();
   const pathname = usePathname();
   const locale = useLocale();

   const onSelectChange = (nextLocale: string) => {
      const currentPathWithoutLocale = pathname.replace(/^\/(ar|en)/, '');
      const searchParams = new URLSearchParams(window.location.search).toString();
      router.replace(`/${nextLocale}${currentPathWithoutLocale}${searchParams ? `?${searchParams}` : ''}`);
      setIsOpen(false);
   };

   return (
      <div className="relative inline-block text-left">
         <button
            onClick={() => setIsOpen(!isOpen)}
            className={`flex items-center ${locale === "ar" && "gap-1"} px-3 py-2 text-lg font-medium bg-gray-100 shadow-sm rounded-md outline-none`}
         >
            <TbWorld className="mr-2" />
            <span>{locale === "en" ? "English" : "Arabic"}</span>
         </button>

         {isOpen && (
            <ul className={`absolute left-0 mt-2 bg-white border border-gray-300 rounded-md shadow-lg w-full z-10 flex flex-col ${locale =="en" ? "items-start" :"items-end"}`}>
               <li
                  onClick={() => onSelectChange("en")}
                  className="flex items-center gap-1 p-2 cursor-pointer hover:bg-gray-100">
                  <Image
                     src={americaflag}
                     alt='america-flag'
                     className={`w-8 h-4 ${locale === "ar" && "order-2"}`}
                  />
                  <span>English</span>
               </li>
               <li
                  onClick={() => onSelectChange("ar")}
                  className="flex items-center gap-1 p-2 cursor-pointer hover:bg-gray-100"
               >
                  <Image
                     src={saudiarabiaflag}
                     alt='america-flag'
                     className={`w-8 h-4 ${locale === "ar" && "order-2"}`}
                  />
                  <span>Arabic</span>
               </li>
            </ul>
         )}
      </div>
   );
}
