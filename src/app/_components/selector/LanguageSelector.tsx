"use client";

import { useLocale } from 'next-intl';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useTransition } from 'react';
import { IoIosGlobe } from "react-icons/io";

export default function LanguageSelector() {
   const [isPending, startTransition] = useTransition();
   const router = useRouter();
   const locale = useLocale();

   const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
      const nextLocale = e.target.value;
      startTransition(() => {
         router.replace(`/${nextLocale}`);
      });
   }; 

   return (
      <div className="flex items-center bg-gray-100 px-2 rounded-md">
         <select
            defaultValue={locale}
            onChange={onSelectChange}
            disabled={isPending}
            className="bg-gray-100 border-none p-2 rounded-md cursor-pointer focus:outline-none"
         >
            <option value="en">English</option>
            <option value="ar">العربية</option>
         </select>
      </div>
   );
}
