import { IoIosCheckmark } from "react-icons/io";
import Textbox from "@/app/_components/common/Text/Textbox";
import HowItWorks from "@/app/_components/Home/HowWork/HowWork";

export default function page() {
   return (
      <div className="container mx-auto mt-12 md:px-0 px-3">
         <div className="md:flex lg:space-x-24 space-x-0 my-8">
            <div className="lg:w-2/3 w-full text-start">
               <Textbox title="Boost Your Profits with Bot Analysis and Bot AI"
                  description="Our cutting-edge trading system combines the power of Bot Analysis and Bot AI to find opportunities and predict the market, all designed with simplicity, intelligence, and security in mind." />
            </div>
            <div className="features-list">
               <h3 className="bg-gray-100 px-3 py-2 rounded-md w-fit me-12">Key Features</h3>
               <ul className="mt-2">
                  <li className="py-1"><IoIosCheckmark className="text-3xl  inline-block text-primary-800" /> Simple to use</li>
                  <li className="py-1"><IoIosCheckmark className="text-3xl  inline-block text-primary-800" />Smart trading algorithms</li>
                  <li className="py-1"><IoIosCheckmark className="text-3xl  inline-block text-primary-800" />Secure and reliable</li>
               </ul>
            </div>
         </div>
         <div className="text-start">
            <Textbox title="Capabilities of Bot Analysis and Bot AI" description="Our cutting-edge trading system combines the power of advanced algorithms to identify profitable opportunities and predict market movements, all while prioritizing simplicity and security." />
            <div className="text-center my-12 grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-6">
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded" titleClass="text-primary-600" title="Bot Analysis" description="Our advanced algorithms analyze market data to identify profitable trading opportunities, helping you make informed decisions." />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded" titleClass="text-primary-600" title="Bot AI" description="Our AI-powered models use historical data and machine learning to predict future market trends, enabling you to stay ahead of the curve." />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded" titleClass="text-primary-600" title="Simplicity" description="Our user-friendly interface and intuitive design make it easy for traders of all levels to leverage the power of Bot Analysis and Bot AI." />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded" titleClass="text-primary-600" title="Security" description="Your data and trades are protected by industry-leading security measures, ensuring your investments are safe and secure." />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded" titleClass="text-primary-600" title="Profitability" description="By leveraging the power of Bot Analysis and Bot AI, you can boost your trading profits and achieve your financial goals." />
               <Textbox mainClass="shadow p-5 bg-gray-100 rounded" titleClass="text-primary-600" title="Reliability" description="Our robust and dependable system ensures consistent performance, giving you the confidence to make informed trading decisions." />
            </div>
         </div>
         <HowItWorks />
         <div className="banner my-8">
            <div className="bg-dark p-10 rounded-md flex md:flex-row flex-col items-center justify-between">
               <Textbox titleClass="text-secondary tracking-wide hover:text-secondary" descriptionClass="text-secondary tracking-wide hover:text-secondary md:w-3/4 w-full" title="Start Boosting Your Profits Today" description="Experience the power of Bot Analysis and Bot AI to take your trading to the next level. Sign up now and unlock a world of profitable opportunities." />
            </div>
         </div>
      </div>
   )
}
