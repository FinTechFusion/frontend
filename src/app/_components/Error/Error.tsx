import { MdErrorOutline } from "react-icons/md";
import { useTranslations } from "next-intl";
import { MainBtn } from "../common/Buttons/MainBtn";
import { Link } from "@/i18n/navigation";

type ErrorMsg = {
   error: string
}

export default function Error({ error }: ErrorMsg) {
   const t = useTranslations("errorPage")

   return (
      <div className="bg-gray-50 min-h-[85vh] flex flex-col justify-center items-center">
         <div className="bg-secondary shadow-sm rounded-xl px-8 py-10 md:w-1/3 flex flex-col justify-center items-center text-center">
            <MdErrorOutline className="text-red-500 mb-4 w-16 h-16" />
            <b className="text-dark text-3xl font-bold">{error}</b>
            <p className="text-lg text-gray-700 pt-2 pb-4">{t("description")}</p>
            <Link href='/site/contact'>
               <MainBtn content="payment.contactSupport" btnProps="w-full" />
            </Link>
         </div>
         <p className="text-lg text-dark mt-5">{t("persistProblem")}</p>
      </div>
   )
}
