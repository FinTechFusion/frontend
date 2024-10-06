import { IoIosCheckmark } from "react-icons/io";
import Textbox from "@/app/_components/common/Text/Textbox";
import HowItWorks from "@/app/_components/Home/HowWork/HowWork";
import { useTranslations } from 'next-intl';

export default function Page() {
   const t = useTranslations("aboutPage");

   return (
      <div className="container mx-auto mt-12 md:px-0 px-3">
         <div className="md:flex lg:gap-24 space-x-0 my-8">
            <div className="lg:w-2/3 w-full text-start">
               <Textbox
                  title={t("boostYourProfitsTitle")}
                  description={t("boostYourProfitsDescription")}
               />
            </div>
            <div className="features-list">
               <h3 className="bg-gray-100 px-3 py-2 rounded-md w-fit me-12">{t("keyFeaturesTitle")}</h3>
               <ul className="mt-2">
                  <li className="py-1"><IoIosCheckmark className="text-3xl inline-block text-primary-800" /> {t("feature1")}</li>
                  <li className="py-1"><IoIosCheckmark className="text-3xl inline-block text-primary-800" /> {t("feature2")}</li>
                  <li className="py-1"><IoIosCheckmark className="text-3xl inline-block text-primary-800" /> {t("feature3")}</li>
               </ul>
            </div>
         </div>
         <div className="">
            <Textbox
               title={t("capabilitiesTitle")}
               description={t("capabilitiesDescription")}
            />
            <div className="text-center my-12 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded-md" titleClass="text-primary-600" title={t("botSignalTitle")} description={t("botSignalDescription")} />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded-md" titleClass="text-primary-600" title={t("botAITitle")} description={t("botAIDescription")} />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded-md" titleClass="text-primary-600" title={t("simplicityTitle")} description={t("simplicityDescription")} />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded-md" titleClass="text-primary-600" title={t("securityTitle")} description={t("securityDescription")} />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded-md" titleClass="text-primary-600" title={t("profitabilityTitle")} description={t("profitabilityDescription")} />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded-md" titleClass="text-primary-600" title={t("reliabilityTitle")} description={t("reliabilityDescription")} />
            </div>
         </div>
         <Textbox
            title={t("howItWorksTitle")}
            description={t("howItWorksDescription")}
            descriptionClass='md:w-3/4 w-full'
         />
         <HowItWorks />
         <div className="banner my-8">
            <div className="bg-dark p-10 rounded-md flex md:flex-row flex-col items-center justify-between">
               <Textbox
                  titleClass="text-secondary tracking-wide hover:text-secondary"
                  descriptionClass="text-secondary tracking-wide hover:text-secondary md:w-3/4 w-full"
                  title={t("startBoostingTitle")}
                  description={t("startBoostingDescription")}
               />
            </div>
         </div>
      </div>
   )
}
