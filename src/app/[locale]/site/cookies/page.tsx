import SectionHeading from "@/app/_components/common/Text/Heading";
import TextInfo from "@/app/_components/common/Text/TextInfo";
import Textbox from "@/app/_components/common/Text/Textbox";
import { useTranslations } from "next-intl";

export default function Page() {
   const t = useTranslations("cookies");
   return (
      <section className="container mx-auto px-2">
         <SectionHeading title={t("cookiesNotice")} />
         <TextInfo content={t("cookiesEffectiveData")} />
         <TextInfo content={t("effectiveDetails")} />
         <Textbox titleClass="text-xl font" title="cookies.whatCookies" description="cookies.cookiesDescription" descriptionClass="text-lg py-2" />
         <Textbox titleClass="text-xl font-medium" title="cookies.howControlCookies" description="cookies.cookiesControl" descriptionClass="py-2" />
         <Textbox titleClass="text-xl font-medium" title="cookies.contactUs" description="cookies.anyQuestions" descriptionClass="py-2" />
      </section>
   )
}
