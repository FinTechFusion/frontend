import { MainBtn } from "../../Buttons/MainBtn";
import Textbox from "../../Text/Textbox";
import Link from 'next/link';

export default function Tradingopportunity() {
   return (
      <div className="p-5 md:w-3/5 w-full">
         <div className="pb-4">
            <Textbox title="Trading Opportunities" description="user our made strategies from store page trading strategies designed for different market conditions. A simple and quick way to start automated trading." descriptionClass="text-lg" />
         </div>
         <div className="flex justify-start items-center">
            <Link href="/dashboard/botai">
               <MainBtn content="Bot AI" btnWidth="w-fit me-3" />
            </Link>
            <Link href="/dashboard/botanalysis">
               <MainBtn content="Bot Analysis" btnWidth="w-fit" />
            </Link>
         </div>
      </div>
   )
}
