"use link"
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export function NotFound() {
   const t = useTranslations("NotFound");
   return (
      <div className="bg-[url('/assets/images/pattern-lines.png')] bg-center bg-cover">
         <div className="flex flex-col justify-center items-center text-center min-h-[80vh]">
            <h1 className="text-6xl font-extrabold">404</h1>
            <p className="mt-8 mb-10 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
               {t("description")}
            </p>
            <Link href="/" className="text-center">
               <MainBtn content="backhome" btnProps="w-fit" />
            </Link>
         </div>
      </div>
   );
}

export default NotFound;