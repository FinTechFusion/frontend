import Textbox from "@/app/_components/common/Text/Textbox";
import registerImg from "/public/assets/images/registerImg.webp"
import Image from "next/image";
import Registerform from "@/app/_components/common/forms/registerform";

export default function Register() {


   return (
      <>
         <div className="bg-gradient-to-r from-primary-600 to-primary-500 h-92 px-2 py-8">
            <div className="container mx-auto">
               <Textbox
                  mainClass="text-center flex flex-col h-92 justify-center items-center"
                  titleClass="text-secondary hover:text-secondary tracking-wider"
                  title="Secure Your Financial Future with Our Crypto Platform"
                  descriptionClass="text-xl text-primary-50 md:w-3/5 w-4/5 py-6"
                  description="Experience the future of finance with our cutting-edge cryptocurrency platform. Invest, trade, and manage your digital assets with ease and confidence."
               />
            </div>
         </div>
         <section className="container mx-auto px-2 grid lg:grid-cols-2 md:grid-cols-1 grid-cols-1 gap-12 justify-center items-start">
            <div className="form-description">
               <span className="bg-dark text-secondary p-2 rounded-md">Secure Your Crypto</span>
               <Textbox
                  mainClass="pt-6"
                  titleClass="text-4xl w-fit"
                  title="Unlock the Future of Finance"
                  description="Join the Crypto Vault and take control of your digital assets. Secure, simple, and seamless."
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
