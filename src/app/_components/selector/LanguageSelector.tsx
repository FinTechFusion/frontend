"use client";

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { TbWorld } from "react-icons/tb";

export default function LanguageSelector() {
   const router = useRouter();
   const pathname = usePathname();
   const locale = useLocale();

   const switchLang = (nextLocale: string) => {
      const currentPathWithoutLocale = pathname.replace(/^\/(ar|en)/, '');
      const searchParams = new URLSearchParams(window.location.search).toString();
      router.replace(`/${nextLocale}${currentPathWithoutLocale}${searchParams ? `?${searchParams}` : ''}`);
   };

   return (
      <div className="relative inline-block text-left">
         <button
            onClick={() => switchLang(locale === "en" ? "ar" : "en")}
            className={`flex items-center gap-1 px-3 py-2 text-lg font-medium bg-gray-100 shadow-sm rounded-md outline-none`}>
            <TbWorld className={`flex  ${locale === 'ar'&& 'order-2'}`} />
            <span>{locale === "en" ? "Arabic" : "English"}</span>
         </button>
      </div>
   );
}
