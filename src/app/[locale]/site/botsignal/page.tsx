import Textbox from "@/app/_components/common/Text/Textbox";
import Image from "next/image";
import botanaylsisImg from "/public/assets/images/robot-analysis.png";
import InvestingScenario from "@/app/_components/common/InvestingScenario";
import { Link } from '@/i18n/navigation';
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";

export default function Page() {
   return (
      <section className="container mx-auto px-2">
         <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 md:gap-x-6 md:gap-y-0 py-8 ">
            <div className="botanylsis-content lg:w-2/3 w-full">
               <Textbox titleClass="w-fit me-auto" title="botsignalPage.title" description="botsignalPage.description" />
               <Link href="/dashboard/botsignal">
                  <MainBtn content="trybotsignal" btnProps="w-fit" />
               </Link>
            </div>
            <div className="botanylasis-Image md:w-1/3 w-full">
               <Image
                  src={botanaylsisImg}
                  alt="bot-analysis"
                  width="450"
                  height="450"
                  className="mx-auto w-auto h-auto rounded"
               />
            </div>
         </div>
         <div className="text-center mx-auto my-6 md:w-3/4 w-full">
            <Textbox titleClass="w-fit mx-auto" title="botsignalPage.perfectForTraders" description="botsignalPage.perfectForTradersDescription" />
         </div>
         <div className="trader-levels">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
               <div className="bg-gray-100 rounded shadow-sm p-5">
                  <Textbox title="botsignalPage.beginnerTitle" description="botsignalPage.beginnerDescription" />
               </div>
               <div className="bg-gray-100 rounded shadow-sm p-5">
                  <Textbox title="botsignalPage.intermediateTitle" description="botsignalPage.intermediateDescription" />
               </div>
               <div className="bg-gray-100 rounded shadow-sm p-5">
                  <Textbox title="botsignalPage.expertTitle" description="botsignalPage.expertDescription" />
               </div>
            </div>
         </div>
         <div className="my-12">
            <div className="text-center mx-auto my-6 md:w-3/4 w-full">
               <Textbox
                  titleClass="w-fit mx-auto"
                  title="botsignalPage.considerScenarioTitle"
                  description="botsignalPage.considerScenarioDescription"
               />
            </div>
            <InvestingScenario />
         </div>
      </section>
   )
}
