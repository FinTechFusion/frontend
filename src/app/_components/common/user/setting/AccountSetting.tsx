import { User } from "@/utils/types"
import { FaBell, FaSignal, FaRobot, FaUserCheck, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaGear } from "react-icons/fa6";

export default function AccountSetting({ user }: { user: User }) {
   const { plan, signal_cycles, ai_cycles, signal_strategy, ai_strategy, is_demo, is_verified, is_active } = user;
   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
         <div className="subscription-box bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-3xl font-medium mb-6 flex items-center">
               <FaBell className="mr-3" />Subscription
            </h3>
            <div className="flex justify-between items-center mb-6">
               <p className="text-2xl font-medium">Plan</p>
               <span className="bg-primary-100 text-primary-700 py-2 px-4 rounded-full font-bold">
                  {plan == null ? "No plan" : plan}
               </span>
            </div>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
               <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xl font-medium mb-2">Signal cycles</p>
                  <b className={`text-2xl ${signal_cycles > 0 ? "text-primary-600" : "text-red-600"}`}>
                     {signal_cycles}
                  </b>
               </div>
               <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xl font-medium mb-2">AI cycles</p>
                  <b className={`text-2xl ${ai_cycles > 0 ? "text-primary-600" : "text-red-600"}`}>
                     {ai_cycles}
                  </b>
               </div>
            </div>
         </div>
         <div className="account-setting bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-3xl font-medium mb-6 flex items-center ">
               <FaGear className="mr-3" /> Account Settings
            </h3>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
               <div>
                  <p className="text-xl font-medium mb-2 flex items-center">
                     <FaSignal className="mr-2" /> Signal Strategy
                  </p>
                  <b className="capitalize text-lg bg-gray-100 py-1 px-3 rounded-full">
                     {signal_strategy == null ? "No" : signal_strategy} Strategy
                  </b>
               </div>
               <div>
                  <p className="text-xl font-medium mb-2 flex items-center">
                     <FaRobot className="mr-2" /> AI Strategy
                  </p>
                  <b className="capitalize text-lg bg-gray-100 py-1 px-3 rounded-full">
                     {ai_strategy == null ? "No" : ai_strategy} Strategy
                  </b>
               </div>
            </div>
            <div className="grid lg:grid-cols-3 grid-cols-2 justify-between gap-4">
               <div className="text-start">
                  <p className="text-lg font-medium mb-2">Account Type</p>
                  <b className={`text-lg ${is_demo ? 'text-balck' : 'text-primary-600'} flex items-center justify-start`}>
                     <FaUserCheck className="mr-1" /> {is_demo ? 'Demo' : 'Real'}
                  </b>
               </div>
               <div className="text-start">
                  <p className="text-lg font-medium mb-2">Verified</p>
                  <b className={`text-lg ${is_verified ? 'text-primary-600' : 'text-red-600'} flex items-center justify-start`}>
                     {is_verified ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                     {is_verified ? "Verified" : "Not Verified"}
                  </b>
               </div>
               <div className="text-start">
                  <p className="text-lg font-medium mb-2">Active</p>
                  <b className={`text-lg ${is_active ? 'text-primary-600' : 'text-red-600'} flex items-center justify-start`}>
                     {is_active ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
                     {is_active ? "Active" : "Inactive"}
                  </b>
               </div>
            </div>
         </div>
      </div>
   )
}
