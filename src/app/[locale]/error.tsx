"use client"
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
export default function Error() {
   const t = useTranslations("errorPage")
   return (
      <div className="flex flex-col justify-center items-center min-h-screen px-3 text-center">
         <h2 className="text-3xl font-bold py-6">{t("title")}</h2>
         {/* <h2 className="text-3xl font-bold py-6">{error.message}</h2> */}
         <p className="text-xl text-gray-700 pb-8">{t("description")}</p>
         <Link href="/">
            <MainBtn content="backhome" btnProps="w-fit" />
         </Link>
      </div>
   )
}
