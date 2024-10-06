import { useTranslations } from 'next-intl';
import Image from 'next/image';
import Textbox from '@/app/_components/common/Text/Textbox';
import { Link } from '@/i18n/navigation';
import botaiImg from "/public/assets/images/botaiImg.jpg";
import { CgTrending } from "react-icons/cg";
import { MdAnalytics } from "react-icons/md";
import { GiBriefcase } from "react-icons/gi";
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';

export default function Page() {
   const t = useTranslations("botAiPage");

   return (
      <>
         <section className='container mx-auto px-2'>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-y-6 md:gap-x-6 md:gap-y-0 py-8 ">
               <div className="botanylsis-content lg:w-2/3 w-full">
                  <Textbox 
                     titleClass="w-fit me-auto" 
                     title="botAiPage.unlockPowerTitle"
                     description="botAiPage.unlockPowerDescription"
                  />

                  <Link href="/dashboard/botai">
                     <MainBtn content="botAiPage.tryBotAi" btnProps="w-fit" />
                  </Link>
               </div>
               <div className="botanylsis-Image md:w-1/3 w-full">
                  <Image
                     src={botaiImg}
                     alt="bot-ai"
                     width="450"
                     height="450"
                     className="mx-auto w-auto h-auto rounded"
                  />
               </div>
            </div>
         </section>
         <section className="bg-gray-100 py-12 md:px-1 px-3">
            <div className="container mx-auto">
               <div className="content-botAi ">
                  <Textbox 
                     titleClass='w-fit mx-start' 
                     title="botAiPage.exploreBotAiTitle"
                     description="botAiPage.exploreBotAiDescription"
                     descriptionClass='md:w-1/2' 
                  />
                  <div className="flex flex-col lg:flex-row justify-between md:items-end gap-y-6 md:gap-x-6 md:gap-y-0 py-8">
                     <div className="list-data">
                        <h4 className='text-2xl font-semibold px-0'>{t("keyFeaturesTitle")}</h4>
                        <ul className='py-3 list-inside list-disc'>
                           <li className='py-1 text-gray-800 hover:text-primary-700 font-normal text-lg'>{t("realTimeAnalysis")}</li>
                           <li className='py-1 text-gray-800 hover:text-primary-700 font-normal text-lg'>{t("personalizedRecommendations")}</li>
                           <li className='py-1 text-gray-800 hover:text-primary-700 font-normal text-lg'>{t("riskManagement")}</li>
                           <li className='py-1 text-gray-800 hover:text-primary-700 font-normal text-lg'>{t("backtesting")}</li>
                        </ul>
                        <MainBtn content="botAiPage.exploreBotAiButton" btnProps='w-fit' />
                     </div>
                     <div className='bot-ai-states md:mx-auto md:text-center '>
                        <div className="state-1 my-4">
                           <h4 className='text-xl py-2'>{t("priceWithBotAi")}</h4>
                           <span className='text-3xl font-extrabold text-primary-600'>{t("priceWithBotAiValue")}</span>
                        </div>
                        <div className="state-2 my-4">
                           <h4 className='text-xl py-2'>{t("priceWithoutBotAi")}</h4>
                           <span className='text-3xl font-extrabold '>{t("priceWithoutBotAiValue")}</span>
                        </div>
                     </div>
                  </div>
               </div>
            </div>
         </section>
         <section className='container mx-auto px-1'>
            <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
               <div className="botai-card shadow">
                  <div className="p-4">
                     <CgTrending className='bg-primary-600 text-secondary text-5xl p-2 rounded-full' />
                     <div className="card-content py-3">
                        <Textbox titleClass='text-lg' title="botAiPage.cryptoTradingTitle" description="botAiPage.cryptoTradingDescription" />
                     </div>
                  </div>
               </div>
               <div className="botai-card shadow">
                  <div className="p-4">
                     <GiBriefcase className='bg-blue-600 text-secondary text-5xl p-2 rounded-full' />
                     <div className="card-content py-3">
                        <Textbox titleClass='text-lg' title="botAiPage.portfolioManagementTitle" description="botAiPage.portfolioManagementDescription" />
                     </div>
                  </div>
               </div>
               <div className="botai-card shadow">
                  <div className="p-4">
                     <MdAnalytics className='bg-pink-500 text-secondary text-5xl p-2 rounded-full' />
                     <div className="card-content py-3">
                        <Textbox titleClass='text-lg' title="botAiPage.marketAnalysisTitle"description="botAiPage.marketAnalysisDescription" />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
