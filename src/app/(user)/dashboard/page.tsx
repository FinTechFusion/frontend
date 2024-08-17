import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import Tradingopportunity from '@/app/_components/common/dashboad/opportunity/Tradingopportunity';

export default function page() {
   return (
      <div className="py-5 my-5 shadow rounded-md">
         <div className="flex justify-between items-center px-3" >
            <h4 className='text-xl font-meduim'>Dashboard</h4>
            <MainBtn content='Product Tour' btnProps="text-lg" />
         </div>
         <Tradingopportunity />
      </div>
   );
}
