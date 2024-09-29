import Textbox from "@/app/_components/common/Text/Textbox";
import Image from "next/image";
import botanaylsisImg from "/public/assets/images/robot-analysis.png";
import InvestingScenario from "@/app/_components/common/InvestingScenario";
import Link from "next/link";
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
export default function page() {
   return (
      <section className="container mx-auto px-2">
         <div className="flex flex-col lg:flex-row justify-between items-center gap-y-6 md:gap-x-6 md:gap-y-0 py-8 ">
            <div className="botanylsis-content lg:w-2/3 w-full">
               <Textbox titleClass="w-fit me-auto" title="Unlock Your Trading Potential with Bot Signal"
                  description="Bot Signal is a trading assistant that helps you make informed, profitable decisions. It segments your trading strategy over time, analyzing and suggesting optimal entry and exit points for trades. This smooths out market volatility and targets the best average prices. By doing so, it protects your investments from market unpredictability. With Bot Signal, you avoid the risks of trading without data and gain smarter, more strategic trading insights." />

               <Link href="/dashboard/botanalysis">
                  <MainBtn content="try Bot Signal" btnProps="w-fit" />
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
            <Textbox titleClass="w-fit mx-auto" title="Perfect for Every Trader Level" description="Bot Signal is designed to be a powerful tool for traders of all experience levels, from beginners to experts. No matter your trading style or strategy, Bot Signal can help you make more informed and profitable decisions." />
         </div>
         <div className="trader-levels">
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
               <div className="bg-gray-100 rounded shadow-sm p-5">
                  <Textbox title="Beginner Traders" description="Bot Signal provides a user-friendly interface and step-by-step guidance to help new traders navigate the market with confidence." />
               </div>
               <div className="bg-gray-100 rounded shadow-sm p-5">
                  <Textbox title="Intermediate Traders" description="Bot Signal offers advanced features and customization options to help intermediate traders refine their strategies and take their trading to the next level." />
               </div>
               <div className="bg-gray-100 rounded shadow-sm p-5">
                  <Textbox title="Expert Traders" description="Bot Signal provides powerful analytical tools and real-time market insights to help experienced traders make more informed and profitable decisions." />
               </div>
            </div>
         </div>
         <div className="my-12">
            <div className="text-center mx-auto my-6 md:w-3/4 w-full">
               <Textbox titleClass="w-fit mx-auto" title="Consider this Scenario" description="You're a trader, and you've been struggling to make consistent profits. But then you discover Bot Signal, a powerful trading assistant that can help you make more informed and profitable decisions." />
            </div>
            <InvestingScenario />
         </div>
      </section>
   )
}
