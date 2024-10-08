import Textbox from '@/app/_components/common/Text/Textbox';
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import { Link } from '@/i18n/navigation';

export default function Tradingopportunity() {
   return (
      <div className="p-5 md:w-2/3 w-full">
         <div className="pb-4">
            <Textbox title="dashboard.trading_apportunity.title" description="dashboard.trading_apportunity.description" descriptionClass="text-lg" />
         </div>
         <div className="flex justify-start items-center">
            <Link href="/dashboard/botai">
               <MainBtn content="dashboard.trading_apportunity.botAi" btnProps="w-fit me-3" />
            </Link>
            <Link href="/dashboard/signal">
               <MainBtn content="dashboard.trading_apportunity.botSignal" btnProps="w-fit" />
            </Link>
         </div>
      </div>
   );
}
