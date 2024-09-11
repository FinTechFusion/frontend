import { tradingPlatformData } from "@/utils/data"
import Textbox from "../common/Text/Textbox"
import Hero from "../Hero"
import Features from "./Features/Features"
import StartTrading from "./StartTradingBanner/StartTrading"
import BinanceConnect from "./BinanceConnect/BinanceConnect"

export default function HomePage() {
  return (
     <div className="px-4">
        <Hero />
        <div className="container mx-auto">
           <Features />
           <BinanceConnect />
           <Textbox mainClass="capitalize pt-4" title="why choose our crypto trading platform ? " description="discover the key features that make our platform the best choise for your crypto trading needs" />
           <div className="trading-platform py-8">
              <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
                 {tradingPlatformData.map((item, index) => {
                    return (
                       <div className="shadow rounded-md bg-secondary p-5" key={index}>
                          <div className="title flex items-center">
                             <span className="text-4xl text-primary-700">{<item.icon />}</span>
                             <h2 className="text-2xl font-bold mx-3 hover:text-primary-700">{item.title}</h2>
                          </div>
                          <div className="description">
                             <p className="text-gray-500 py-3 text-lg">{item.description}</p>
                          </div>
                       </div>
                    )
                 })}
              </div>
              <StartTrading />
           </div>
        </div>
     </div>  )
}
