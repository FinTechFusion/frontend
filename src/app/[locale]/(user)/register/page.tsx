import Textbox from "@/app/_components/common/Text/Textbox";
import registerImg from "/public/assets/images/registerImg.webp"
import Image from "next/image";
import Registerform from "@/app/_components/common/forms/registerform";
import { useTranslations } from "next-intl";

export default function Page() {
   const t = useTranslations("auth");
   return (
      <>
         <div className="bg-gradient-to-r from-primary-600 to-primary-500 h-92 px-2 py-8">
            <div className="container mx-auto">
               <Textbox
                  mainClass="text-center flex flex-col h-92 justify-center items-center"
                  titleClass="text-secondary hover:text-secondary tracking-wider"
                  title="auth.registerTitle"
                  descriptionClass="text-xl text-primary-50 md:w-3/5 w-4/5 py-6"
                  description="auth.registerDescription"
               />
            </div>
         </div>
         <section className="container mx-auto px-2 grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-12 justify-center items-start">
            <div className="form-description">
               <span className="bg-dark text-secondary p-2 rounded-md">{t("secure_crypto")}</span>
               <Textbox
                  mainClass="pt-6"
                  titleClass="text-4xl w-fit"
                  title="auth.secure_crypto_title"
                  description="auth.secure_crypto_description"
               />
               <Image
                  src={registerImg}
                  alt="register-img"
                  className="rounded"
               />
            </div>
            <div className="regitser-form">
               <Registerform />
            </div>
         </section>
      </>
   );
}
