import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import { Input } from "@/app/_components/common/forms";
import TextInfo from "@/app/_components/common/Text/TextInfo";


export default function page() {
   return (
      <div className="apikeyForm py-5">
         <div className="flex justify-between items-center">
            <TextInfo content="Dashboard" />
            <MainBtn content="product tour" btnWidth="w-fit" />
         </div>
         <h3 className="text-2xl font-medium pt-5">Binance API Key Connect Binance</h3>
         {/* <Input label="Binance API Key" name="api key" placeholder="Type Your Binance Api Key" type="text" /> */}
      </div>
   );
}
