import Textbox from "@/app/_components/common/Text/Textbox"
import { Link } from "@/i18n/navigation"
import { useTranslations } from "next-intl"
import { FaWhatsapp } from "react-icons/fa";
import { MdOutlineMail } from "react-icons/md";
import { PiTelegramLogoBold } from "react-icons/pi";

export default function Page() {
   const t = useTranslations("contactPage")
   return (
      <section className="container mx-auto md:px-0 px-2 flex flex-col justify-center min-h-[60vh] ">
         <Textbox mainClass="text-center" titleClass="text-4xl w-fit mx-auto" title="contactPage.title" descriptionClass="capitalize text-lg" description="contactPage.description" />
         <div className="grid md:grid-cols-3 grid-cols-1 items-start gap-5 pt-6 pb-12">
            <div className="flex md:flex-row flex-col md:justify-start justify-center gap-5 md:text-start  text-center bg-gray-100 rounded-md px-8 py-8 shadow-sm">
               <div className="icon bg-[#25D366] rounded-full h-full w-fit p-2 mx-auto md:mx-0">
                  <FaWhatsapp className="w-10 h-10 text-secondary" />
               </div>
               <div className="flex flex-col justify-start">
                  <h3 className="text-2xl font-bold">{t("whatsapp")}</h3>
                  <p className="text-lg py-3 text-gray-800">{t("chatWhatsapp")}</p>
                  <Link href="https://wa.me/+971585163159" target="_blank">
                     <button className="w-fit rounded-md px-4 py-2 text-dark bg-secondary text-lg tracking-wide border hover:bg-dark hover:text-secondary">{t("openWhatsapp")}</button>
                  </Link>
               </div>
            </div>
            <div className="flex md:flex-row flex-col md:justify-start justify-center gap-5 md:text-start  text-center py-8 bg-gray-100 rounded-md px-8 shadow-sm">
               <div className="icon bg-[#3B82F6] rounded-full h-full w-fit p-2 mx-auto md:mx-0">
                  <PiTelegramLogoBold className="w-10 h-10 text-secondary" />
               </div>
               <div className="flex flex-col justify-start ">
                  <h3 className="text-2xl font-bold">{t("telgram")}</h3>
                  <p className="text-lg py-3 text-gray-800">{t("chatTelgram")}</p>
                  <Link href="https://t.me/FinTechFusio0" target="_blank">
                     <button className="w-fit rounded-md px-4 py-2 text-dark bg-secondary text-lg tracking-wide border hover:bg-dark hover:text-secondary">{t("openTelgram")}</button>
                  </Link>
               </div>
            </div>
            <div className="flex md:flex-row flex-col md:justify-start justify-center gap-5 md:text-start  text-center py-8 bg-gray-100 rounded-md px-8 shadow-sm">
               <div className="icon bg-[#EF4444] rounded-full h-full w-fit p-2 mx-auto md:mx-0">
                  <MdOutlineMail className="w-10 h-10 text-secondary" />
               </div>
               <div className="flex flex-col justify-start ">
                  <h3 className="text-2xl font-bold">{t("email")}</h3>
                  <p className="text-lg py-3 text-gray-800">{t("sendEmail")}</p>
                  <Link href="mailto:Support@fintechfusion.net" target="_blank">
                     <button className="w-fit rounded-md px-4 py-2 text-dark bg-secondary text-lg tracking-wide border hover:bg-dark hover:text-secondary">{t("sendMail")}</button>
                  </Link>
               </div>
            </div>
         </div>
      </section>
   )
}
