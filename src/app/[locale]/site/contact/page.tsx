import ContactForm from "@/app/_components/common/forms/contact/ContactForm";
import Textbox from "@/app/_components/common/Text/Textbox";
import { useTranslations } from "next-intl";
import { FaPhone } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function Page() {
   const t = useTranslations("contactPage")
   return (
      <section className="container mx-auto">
         <Textbox mainClass="text-center" titleClass="text-4xl w-fit mx-auto" title="contactPage.title"descriptionClass="capitalize text-lg" description="contactPage.description" />
         <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 my-8">
            <div className="contactInformation bg-gray-900 px-8 py-12 rounded-md">
               <div className="text-info">
                  <h2 className="text-secondary text-3xl tracking-wider font-bold">{t("getInTouch")}</h2>
                  <p className="text-lg text-gray-300 py-5">{t("comeBack")}</p>
                  <ul className="contact-ways">
                     <a href="tel:+971585163159" className="text-secondary flex items-center text-xl font-medium py-4"><span className="pe-3 text-2xl"><FaPhone /></span> <span dir="ltr" className="text-left">+971585163159</span></a>
                     <a href="mailto:Support@fintechfusion.net" className="text-secondary flex items-center text-xl font-medium py-4"><span className="pe-3 text-2xl"><IoMailUnread /></span>Support@fintechfusion.net</a>
                     <li className="text-secondary flex items-center text-xl font-medium py-4"><span className="pe-3 text-2xl"><MdOutlineSupportAgent /></span>{t("supportTicket")}</li>
                  </ul>
               </div>
            </div>
            <ContactForm />
         </div>
      </section>
   )
}
