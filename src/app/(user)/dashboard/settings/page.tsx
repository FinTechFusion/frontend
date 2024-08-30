"use client"
import { useAuth } from '@/context/AuthContext';
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import { CiUser } from "react-icons/ci";
import Loading from '@/app/_components/common/loading/Loading';
import { toast } from 'react-toastify';
import BinanceConnectStatus from '@/app/_components/common/binance/BinanceConnectStatus';

export default function Page() {
   const { user, isLoading, error, logout } = useAuth();

   if (isLoading) {
      return <Loading />;
   }
   if (error) {
      toast.error(error);
   }


   return (
      <div className="container mx-auto px-5">
         <div className="my-8">
            <div className="user-info grid grid-cols-12 justify-between items-center">
               <div className="md:col-span-8 col-span-12 text-start">
                  <div className="user-data flex justify-start items-center">
                     <CiUser className="text-6xl" />
                     <div className="flex flex-col justify-start items-start">
                        <h3 className="username text-3xl pb-2 font-bold">{`${user?.first_name} ${user?.last_name}`}</h3>
                        <p className="email text-lg text-gray-600 py-1">{user?.email}</p>
                        <p className="phone text-lg text-gray-600 py-1">{user?.phone_number}</p>
                     </div>
                  </div>
               </div>
               <div className="md:col-span-4 col-span-12 md:text-end md:mt-0 mt-8">
                  <MainBtn content="Edit Profile" btnProps="w-fit" />
               </div>
            </div>
         </div>
         <div className="grid grid-cols-12 justify-between items-center gap-8">
            <div className="subscription-box border shadow-sm md:col-span-6 col-span-12 p-5 rounded-md h-full">
               <h3 className="text-2xl font-bold pb-8">Subscription</h3>
               <div className="flex justify-between items-center pb-3">
                  <p className="text-xl pb-2">plan</p>
                  <b className="bg-gray-100 p-2 rounded">{user?.plan == null ? "No plan" : user?.plan}</b>
               </div>
               <div className="flex justify-between items-center pb-3">
                  <div>
                     <p className="text-xl pb-2">Remaining Cycles</p>
                     <b>{user?.cycles_count_remaining}</b>
                  </div>
               </div>
            </div>
            <div className="account-setting border shadow-sm md:col-span-6 col-span-12 p-5 rounded-md h-full">
               <h3 className="text-2xl font-bold pb-8">Account Settings</h3>
               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-xl pb-2">Strategy</p>
                     <b className="capitalize text-lg">{user?.strategy == null ? "No " : user?.strategy} Strategy</b>
                  </div>
               </div>
               <div className="grid md:grid-cols-3 grid-cols-1 justify-between items-center mt-4">
                  <div className="md:py-0 py-3">
                     <p className="pb-2">Demo Account</p>
                     <b>{user?.is_demo ? 'true' : 'false'}</b>
                  </div>
                  <div className="md:py-0 py-3">
                     <p className="pb-2">Verified</p>
                     <b>{user?.is_verified ? "verified" : "false"}</b>
                  </div>
                  <div className="md:py-0 py-3">
                     <p className="pb-2">Active</p>
                     <b>{user?.is_active ? "active" : "false"}</b>
                  </div>
               </div>
            </div>
         </div>
         <BinanceConnectStatus />
         <button className='bg-red-600 hover:bg-red-700 rounded-md px-4 py-2 text-secondary capitalize text-xl cursor-pointer tracking-wide w-fit mb-3' onClick={logout}>logout</button>
      </div>
   )
}
