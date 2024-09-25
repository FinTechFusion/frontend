import Image from 'next/image';
import Textbox from '@/app/_components/common/Text/Textbox'
import Link from "next/link";
import botaiImg from "/public/assets/images/botaiImg.jpg";
import { CgTrending } from "react-icons/cg";
import { MdAnalytics } from "react-icons/md";
import { GiBriefcase } from "react-icons/gi";
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';

export default function page() {
   return (
      <>
         <section className='container mx-auto px-2'>
            <div className="flex flex-col lg:flex-row justify-between items-start gap-y-6 md:gap-x-6 md:gap-y-0 py-8 ">
               <div className="botanylsis-content lg:w-2/3 w-full">
                  <Textbox titleClass="w-fit me-auto" title="Unlock the Power of AI-Driven Investing"
                     description="Bot AI is an advanced investment assistant that optimizes trading strategies to maximize returns. It evaluates real-time market conditions to distribute investments across different price levels, reducing the risk of market fluctuations. By buying at various prices, it secures a better average cost. Bot AI’s smart analysis and planning ensure smarter, safer investments by following market trends and minimizing risks." />

                  <Link href="/dashboard/botai">
                     <MainBtn content="try Bot Ai" btnProps="w-fit" />
                  </Link>

               </div>
               <div className="botanylasis-Image md:w-1/3 w-full">
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
                  <Textbox titleClass='w-fit mx-start' title='Explore Bot AI' description='Bot AI is a powerful AI-driven trading assistant that can help you make more informed and profitable trading decisions. Check out the video below to see it in action.' descriptionClass='md:w-1/2' />
                  <div className="flex flex-col lg:flex-row justify-between md:items-end gap-y-6 md:gap-x-6 md:gap-y-0 py-8">
                     <div className="list-data">
                        <h4 className='text-2xl font-semibold px-0'>Key Features:</h4>
                        <ul className='py-3 list-inside list-disc'>
                           <li className='py-1 text-gray-800 hover:text-primary-700 font-normal text-lg'>Real-time market analysis and insights</li>
                           <li className='py-1 text-gray-800 hover:text-primary-700 font-normal text-lg'>Personalized trading recommendations</li>
                           <li className='py-1 text-gray-800 hover:text-primary-700 font-normal text-lg'>Risk management tools and alerts</li>
                           <li className='py-1 text-gray-800 hover:text-primary-700 font-normal text-lg'>Backtesting and performance tracking</li>
                        </ul>
                        <MainBtn content="Explore Bot AI" btnProps='w-fit' />
                     </div>
                     <div className='bot-ai-states md:mx-auto md:text-center '>
                        <div className="state-1 my-4">
                           <h4 className='text-xl py-2'>PRICE WITH BOT AI</h4>
                           <span className='text-3xl font-extrabold text-primary-600'>$70.00</span>
                        </div>
                        <div className="state-2 my-4">
                           <h4 className='text-xl py-2'>PRICE WITHOUT BOT AI</h4>
                           <span className='text-3xl font-extrabold '>$100.00</span>
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
                        <Textbox titleClass='text-lg' title='Crypto Trading' description='Automate your crypto trading with our advanced algorithms, executing trades based on market conditions and your preferences.' />
                     </div>
                  </div>
               </div>
               <div className="botai-card shadow">
                  <div className="p-4">
                     <GiBriefcase className='bg-blue-600 text-secondary text-5xl p-2 rounded-full' />
                     <div className="card-content py-3">
                        <Textbox titleClass='text-lg' title='Portfolio Management' description='Manage your crypto portfolio with ease, track your holdings, and receive personalized recommendations to optimize your investments.' />
                     </div>
                  </div>
               </div>
               <div className="botai-card shadow">
                  <div className="p-4">
                     <MdAnalytics className='bg-pink-500 text-secondary text-5xl p-2 rounded-full' />
                     <div className="card-content py-3">
                        <Textbox titleClass='text-lg' title='Market Analysis' description='Stay on top of the crypto market with our real-time market analysis, providing insights and trends to help you make informed decisions.' />
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   )
}
