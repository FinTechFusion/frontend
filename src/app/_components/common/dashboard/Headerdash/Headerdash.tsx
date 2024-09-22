"use client"
import { useAssetData } from "@/context/AssetsContext";
import { useAuth } from "@/context/AuthContext";
import { useSidebar } from "@/context/SidebarContext";
import { FaGear } from "react-icons/fa6";

export default function Headerdash() {
   const { isVisible, toggleVisibility } = useSidebar();
   const { user } = useAuth();
   const { assetData } = useAssetData();

   return (
      <header className="p-4 bg-gray-50 flex">
         <div className="geer-icon lg:hidden" onClick={toggleVisibility}>
            <FaGear className="text-primary-700 text-2xl cursor-pointer" />
         </div>
         <div className="flex justify-between items-center">
            <div className="assets-info flex items-start gap-10">
               <div className="btc-info">
                  <h5 className="uppercase text-primary-600">btc / usdt</h5>
                  {user?.is_binance && assetData && assetData.length > 0 && (
                     assetData.filter((item: any) => item.symbol === "btc").map((item: any, index: number) => (
                        <div className="text-center" key={index}>
                           <span className="block py-1" >{item.last_price} $</span>
                           <span className="text-red-600">{item.price_change_percent} %</span>
                        </div>
                     ))
                  )}
               </div>
               <div className="eth-info">
                  <h5 className="uppercase text-primary-600">eth / usdt</h5>
                  {user?.is_binance && assetData && assetData.length > 0 && (
                     assetData.filter((item: any) => item.symbol === "eth").map((item: any, index: number) => (
                        <div className="text-center" key={index}>
                           <span className="block py-1" >{item.last_price}$</span>
                           <span className="text-red-600">{item.price_change_percent}%</span>
                        </div>
                     ))
                  )}
               </div>
               <div className="account-type">
                  <h5 className="uppercase text-primary-600">
                     {user?.is_demo ? "Demo Account" : "Real Account"}
                  </h5>
                  {user?.is_binance && assetData && assetData.length > 0 && (
                     <div className="text-center">
                        <span className="block py-1">
                           {assetData.reduce((total:any, symbol:any) => total + (symbol.quantity * symbol.last_price), 0).toFixed(5)}
                        </span>
                     </div>
                  )}
               </div>
            </div>
         </div>
      </header>
   )
}
