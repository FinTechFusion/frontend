import { useTranslations } from "next-intl";
import { Link } from '@/i18n/navigation';
import Textbox from '@/app/_components/common/Text/Textbox';

export default function StartTrading() {
   const t = useTranslations('startTrading');

   return (
      <div className="bg-primary-700 w-full mt-6 md:p-6 p-3 md:text-start text-center rounded flex md:flex-row flex-col justify-between items-center space-x-5 space-y-5">
         <Textbox
            mainClass="px-3 md:w-3/4 w-full"
            titleClass="text-secondary md:text-2xl hover:text-secondary"
            title="startTrading.elevateStrategies.title"
            description="startTrading.joinCommunity.description"
            descriptionClass="text-secondary text-xl md:w-3/4"
         />
         <Link href="/dashboard" className="flex justify-center items-center">
            <button className="bg-secondary hover:bg-gray-100 text-dark flex items-center justify-center gap-2 rounded p-3 font-medium md:text-xl text-lg mb-4">
               {t('getStarted')}
            </button>
         </Link>
      </div>
   );
}
