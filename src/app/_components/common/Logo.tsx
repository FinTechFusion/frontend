import { Link } from "@/i18n/navigation";
import { useLocale } from "next-intl";
import Image from "next/image";

export default function Logo() {
   const locale = useLocale();
   return (
      <div className="logo">
         <Link href='/' className='flex justify-center items-center text-xl font-bold tracking-widest'>
            <Image
               src={`${locale === "en" ? "/assets/images/logofintechfusion-en.png" : "/assets/images/logofintechfusion-ar.png"}`}
               alt='Logo'
               width='220'
               height='120'
               className="w-auto h-auto"
            />
         </Link>
      </div>)
}
