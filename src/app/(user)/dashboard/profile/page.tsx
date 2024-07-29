"use client"
import { useAuth } from '@/context/AuthContext';

import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import { CiUser } from "react-icons/ci";

export default function page() {
   const { user, isLoading, error } = useAuth();
   return (
      <div className="container mx-auto px-5">
         <div className="my-8">
            <div className="user-info grid grid-cols-12 justify-between items-center">
               <div className="col-span-8 text-start">
                  <div className="user-data flex justify-start items-center">
                     <CiUser className="text-6xl" />
                     <div className="flex flex-col justify-start items-start">
                        <h3 className="username text-3xl pb-2 font-bold">{`${user?.first_name} ${user?.last_name}`}</h3>
                        <p className="email text-lg text-gray-600 py-1">{user?.email}</p>
                        <p className="phone text-lg text-gray-600 py-1">{user?.phone_number}</p>
                     </div>
                  </div>
               </div>
               <div className="col-span-4 text-end">
                  <MainBtn content="Edit Profile" btnWidth="w-fit" />
               </div>
            </div>
         </div>
         <div className="grid grid-cols-12 justify-between items-center gap-8">
            <div className="subscription-box border shadow-sm col-span-6 p-5 rounded-md">
               <h3 className="text-2xl font-bold pb-8">Subscription</h3>
               <div className="flex justify-between items-center pb-3">
                  <div>
                     <p className="text-xl pb-2">plan</p>
                     <b>{user?.plan == null ? "No plan" : user?.plan }</b>
                  </div>
                  <span className="border rounded-md p-2">active</span>
               </div>
               <div className="flex justify-between items-center pb-3">
                  <div>
                     <p className="text-xl pb-2">Remaining Cycles</p>
                     <b>{user?.cycles_count_remaining}</b>
                  </div>
               </div>
            </div>
            <div className="account-setting border shadow-sm col-span-6 p-5 rounded-md ">
               <h3 className="text-2xl font-bold pb-8">Account Settings</h3>
               <div className="flex justify-between items-center">
                  <div>
                     <p className="text-xl pb-2">Strategy</p>
                     <b>{user?.strategy == null ? "No Strategy" :user?.strategy}</b>
                  </div>
               </div>
               <div className="flex justify-between items-center mt-4">
                  <div>
                     <p className="pb-2">Demo Account</p>
                     <b>{user?.is_demo ? 'true' : 'false'}</b>
                  </div>
                  <div>
                     <p className="pb-2">Verified</p>
                     <b>{user?.is_verified ? "verified" :"false"}</b>
                  </div>
                  <div>
                     <p className="pb-2">Active</p>
                     <b>{user?.is_active ? "active" :"false"}</b>
                  </div>
               </div>
            </div>
         </div>
      </div>
   )
}
