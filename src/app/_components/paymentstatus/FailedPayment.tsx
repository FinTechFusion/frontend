import { useTranslations } from "next-intl";
import { Link } from '@/i18n/navigation';
import { MdErrorOutline } from "react-icons/md";

export default function FailedPayment() {
   const t = useTranslations("payment");
   return (
      <div className="md:bg-gradient-to-b md:from-red-50 md:to-red-100 flex items-center justify-center">
         <div className="successCard h-full py-12 rounded-md bg-secondary shadow-sm my-16 md:w-1/3 w-96">
            <div className="card-heading text-center mx-auto pb-8">
               <div className="icon pb-3">
                  <MdErrorOutline className="w-20 h-20 text-red-600 mx-auto " />
               </div>
               <h3 className="text-3xl font-bold text-red-600">{t("paymentFailed")}</h3>
            </div>
            <div className="px-4 ">
            <div className="card-body">
                  <h5 className="text-xl font-medium pb-3 text-dark">{t("possibleReasons")}</h5>
                  <ul className="pb-5 px-5 list-disc">
                     <li className="text-lg py-2">{t("insufficientFunds")}</li>
                     <li className="text-lg py-2">{t("incorrectCardInformation")}</li>
                     <li className="text-lg py-2">{t("cardExpired")}</li>
                     <li className="text-lg py-2">{t("transactionBlocked")}</li>
               </ul>
            </div>
            <Link href='/site/plans'>
                  <button className="main-btn w-full !bg-red-700 !my-3">{t("tryAgain")}</button>
            </Link>
            <Link href='/site/contact'>
                  <button className="main-btn w-full !bg-transparent !border-1 !hover:bg-gray-100">{t("contactSupport")}</button>
            </Link>
            </div>
         </div>
      </div>)
}
