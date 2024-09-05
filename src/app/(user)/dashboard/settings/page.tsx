"use client"
import { useAuth } from '@/context/AuthContext';
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import Loading from '@/app/_components/common/loading/Loading';
import { toast } from 'react-toastify';
import BinanceConnectStatus from '@/app/_components/common/binance/BinanceConnectStatus';
import UserInfo from '@/app/_components/common/user/setting/UserInfo';
import AccountSetting from '@/app/_components/common/user/setting/AccountSetting';

export default function Page() {
   const { user, isLoading, error, logout } = useAuth();

   if (isLoading) return <Loading />;
   if (error) toast.error(error);
   return (
      <>
         {user ? <div className="container mx-auto px-5">
            <div className="my-8">
               <div className="user-info grid grid-cols-12 justify-between items-center">
                  <UserInfo user={user} />
                  <div className="md:col-span-4 col-span-12 md:text-end md:mt-0 mt-8">
                     <MainBtn content="Edit Profile" btnProps="w-fit" />
                  </div>

               </div>
            </div>
            <AccountSetting user={user} />
            <BinanceConnectStatus />
            <button className='bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 text-secondary capitalize text-xl cursor-pointer tracking-wide w-fit my-3' onClick={logout}>logout</button>
         </div> : <Loading />}
      </>
   )
}
