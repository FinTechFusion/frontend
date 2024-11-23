import BinanceConnectStatus from '@/app/_components/common/binance/BinanceConnectStatus';
import UserInfo from '@/app/_components/common/user/setting/UserInfo';
import AccountSetting from '@/app/_components/common/user/setting/AccountSetting';

export default function page() {
   return (
      <div className="container mx-auto px-5">
         <div className="my-8">
            <div className="user-info grid grid-cols-12 justify-between items-center">
               <UserInfo />
               {/* <div className="md:col-span-4 col-span-12 md:text-end md:mt-0 mt-8">
                     <MainBtn content="Edit Profile" btnProps="w-fit" />
                  </div> */}
            </div>
         </div>
         <AccountSetting />
         <BinanceConnectStatus />
      </div>
   )
}
