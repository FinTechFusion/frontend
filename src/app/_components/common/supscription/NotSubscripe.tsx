import Textbox from '@/app/_components/common/Text/Textbox';
// import MainCard from '../Cards/MainCard';
// import { FaBolt } from "react-icons/fa6";
// import { FaChartLine, FaShieldAlt, FaHeadset, FaSyncAlt, FaBell } from "react-icons/fa";
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import Link from 'next/link';

export default function NotSubscripe() {
   // const subscriptionFeatures = [
   //    {
   //       icon: <FaBolt />,
   //       title: "AI-Powered Insights",
   //       description: "Leverage cutting-edge algorithms for smarter trades",
   //    },
   //    {
   //       icon: <FaChartLine />,
   //       title: "Increased Profitability",
   //       description: "Maximize your returns with data-driven decisions",
   //    },
   //    {
   //       icon: <FaShieldAlt />,
   //       title: "Risk Management",
   //       description: "Protect your investments with advanced safeguards",
   //    },
   //    {
   //       icon: <FaHeadset />,
   //       title: "Expert Support",
   //       description: "Get help from our team of trading professionals",
   //    },
   //    {
   //       icon: <FaSyncAlt />,
   //       title: "Automated Trading",
   //       description: "Set it and forget it with our automated strategies",
   //    },
   //    {
   //       icon: <FaBell />,
   //       title: "Customizable Alerts",
   //       description: "Stay informed with custom alerts on price changes ",
   //    },
   // ];

   return (
      <>
         {/* <div className="bg-gradient-to-r from-cyan-500">
            <Textbox mainClass="text-center pt-8 pb-4" titleClass="w-fit mx-auto" title="Unlock the Power of AI Trading" description="Take your crypto trading to the next level with our AI-powered platform. Subscribe now and join thousands of successful traders!" />

            <div className='grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 pt-6 pb-8 md:pe-2'>
               {subscriptionFeatures.map((item, index) => {
                  return (
                     <MainCard key={index} icon={item.icon} title={item.title} description={item.description} />
                  )
               })}
            </div>
         </div> */}
         <Textbox mainClass="text-center pt-8 pb-4" titleClass="w-fit mx-auto" title="Choose Your Trading Power" description="Select the plan that best fits your trading needs and goals. Upgrade or downgrade anytime." />

         <>
            <Textbox mainClass='text-center titleClass="w-fit mx-auto"' title='Still Have Questions?' description='Our team is here to help you make the most of your trading experience.' />
            <div className="flex gap-4 justify-center items-center">
               <Link href="/site/faq">
                  <MainBtn content='View FAQ' btnProps='w-fit' />
               </Link>
               <Link href="/site/contact">
                  <MainBtn content='Contact Us' btnProps='w-fit' />
               </Link>
            </div>
         </>
      </>
   )
}
