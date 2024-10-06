import Textbox from '@/app/_components/common/Text/Textbox';
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Tradingopportunity() {
   const t = useTranslations("dashboard.trading_apportunity");
   return (
      <div className="p-5 md:w-2/3 w-full">
         <div className="pb-4">
            <Textbox title={t("title")} description={t("description")} descriptionClass="text-lg" />
         </div>
         <div className="flex justify-start items-center">
            <Link href="/dashboard/botai">
               <MainBtn content={t("botAi")} btnProps="w-fit me-3" />
            </Link>
            <Link href="/dashboard/signal">
               <MainBtn content={t("botSignal")} btnProps="w-fit" />
            </Link>
         </div>
      </div>
   );
}
