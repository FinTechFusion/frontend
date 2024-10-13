import Textbox from '@/app/_components/common/Text/Textbox';
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import { Link } from '@/i18n/navigation';

export default function Tradingopportunity() {
   return (
      <div className="p-5 md:w-2/3 w-full">
         <div className="pb-3">
            <Textbox title="dashboard.trading_apportunity.title" description="dashboard.trading_apportunity.description" descriptionClass="text-lg" />
         </div>
         <div className="flex md:flex-row flex-col justify-start items-center gap-3">
            <Link href="/dashboard/botai" className='w-full md:w-fit'>
               <MainBtn content="dashboard.trading_apportunity.botAi" btnProps="w-full" />
            </Link>
            <Link href="/dashboard/signal" className="w-full md:w-fit">
               <MainBtn content="dashboard.trading_apportunity.botSignal" btnProps="w-full" />
            </Link>
         </div>
      </div>
   );
}
