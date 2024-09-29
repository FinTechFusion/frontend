"use client"

import { useAuth } from "@/context/AuthContext";
import { useAssetData } from "@/context/AssetsContext";
import Link from "next/link";
import { useState } from "react";
import { FaBriefcase, FaUser, FaChartLine, FaChartBar } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdNotifications, MdSettings } from "react-icons/md";
import AccountTypeSwitcher from "../dashboard/Headerdash/AccountTypeSwitcher";

export default function MenueSetting() {
   const { user, logout } = useAuth();
   const { assetData } = useAssetData();
   const [isOpen, setIsOpen] = useState(false);
   const toggleDropdown = () => setIsOpen(!isOpen);

   return (
      <div className="relative">
         <button
            onClick={toggleDropdown}
            className="flex items-center text-primary-600 hover:text-primary-700"
         >
            <FaUser className="w-8 h-8 text-primary-600" />
            <MdKeyboardArrowDown size={25} />
         </button>

         {isOpen && (
            <div className="absolute right-0 mt-2 md:w-64 w-[21rem] bg-secondary rounded-md shadow-sm p-1 z-50">
               <div className="p-4 border-b">
                  <p className="text-lg text-gray-600 flex items-center gap-2">
                     <FaUser className="w-5 h-5 text-primary-600" />
                     {user?.first_name} {user?.last_name}
                  </p>
               </div>

               {/* Mobile-only asset info */}
               <div className="lg:hidden p-2 border-b">
                  <div className="flex flex-col gap-2">
                     <div>
                        <h5 className="uppercase text-primary-600">btc / usdt</h5>
                        {assetData.length > 0 && (
                           assetData.filter((item: any) => item.symbol === "btc").map((item: any, index: number) => (
                              <div key={index}>
                                 <span>{item.last_price} $</span>
                                 <span className="text-red-600 ml-2">{item.price_change_percent} %</span>
                              </div>
                           ))
                        )}
                     </div>
                     <div>
                        <h5 className="uppercase text-primary-600">eth / usdt</h5>
                        {assetData.length > 0 && (
                           assetData.filter((item: any) => item.symbol === "eth").map((item: any, index: number) => (
                              <div key={index}>
                                 <span>{item.last_price} $</span>
                                 <span className="text-red-600 ml-2">{item.price_change_percent} %</span>
                              </div>
                           ))
                        )}
                     </div>
                     <div>
                        <AccountTypeSwitcher isDemo={user?.is_demo ?? false} />
                        {assetData.length > 0 && (
                           <div>
                              <span>
                                 {assetData.reduce((total: any, symbol: any) => total + (symbol.quantity * symbol.last_price), 0).toFixed(5)}
                              </span>
                           </div>
                        )}
                     </div>
                  </div>
               </div>

               {/* Mobile-only user stats */}
               <div className="lg:hidden p-2 border-b">
                  <div className="flex justify-between">
                     <span className="flex items-center gap-2">
                        <FaChartLine className="text-primary-600 text-xl" /> {user?.signal_cycles}
                     </span>
                     <span className="flex items-center gap-2">
                        <FaChartBar className="text-primary-600 text-xl" /> {user?.ai_cycles}
                     </span>
                  </div>
               </div>

               {/* <div className="p-2">
                  <label className="flex items-center p-2 hover:bg-gray-100 rounded">
                     <span className="mr-2">Dark mode</span>
                     <input type="checkbox" className="ml-auto" />
                  </label>
               </div> */}
               <div className="p-2">
                  <p className="text-lg font-semibold mb-2">Setting</p>
                  <Link onClick={toggleDropdown} href="/dashboard/subscription" className="flex items-center p-2 hover:bg-gray-100 rounded">
                     <MdNotifications size={18} className="mr-2 text-primary-600" />
                     <span>Subscription</span>
                  </Link>
                  <Link onClick={toggleDropdown} href="#" className="flex items-center p-2 hover:bg-gray-100 rounded">
                     <FaBriefcase size={18} className="mr-2 text-primary-600" />
                     <span>My Portfolio</span>
                  </Link>
                  <Link onClick={toggleDropdown} href="/dashboard/settings" className="flex items-center p-2 hover:bg-gray-100 rounded">
                     <MdSettings size={18} className="mr-2 text-primary-600" />
                     <span>Settings</span>
                  </Link>
               </div>
               <div className="p-2">
                  <button className="w-fit bg-primary-600 text-secondary p-2 rounded hover:bg-teal-700" onClick={logout}>
                     Logout
                  </button>
               </div>
            </div>
         )}
      </div>
   )
}