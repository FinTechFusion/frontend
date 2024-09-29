"use client"

import { FaGear, FaChartLine, FaChartBar } from "react-icons/fa6";
import MenueSetting from '../../user/MenueSetting';
import { useAuth } from "@/context/AuthContext";
import { useAssetData } from "@/context/AssetsContext";
import { useSidebar } from "@/context/SidebarContext";
import Toast from '@/app/_components/common/Tostify/Toast';
import { AssetInfoProps, UserProfileProps } from "@/utils/types";
import AccountTypeSwitcher from "./AccountTypeSwitcher";

const AssetInfo: React.FC<AssetInfoProps> = ({ symbol, price, changePercent }) => (
   <div className="asset-info">
      <h5 className="uppercase text-primary-600">{symbol} / usdt</h5>
      <div className="text-center">
         <span className="block py-1">{price} $</span>
         <span className={`text-${changePercent >= 0 ? 'primary-600' : 'red-600'}`}>
            {changePercent} %
         </span>
      </div>
   </div>
);


const UserProfile: React.FC<UserProfileProps> = ({ signalCycles, aiCycles }) => (
   <div className="user-profile hidden lg:flex items-center gap-6">
      <div className="signal-number">
         <span className="flex items-center gap-2">
            <FaChartLine className="text-primary-600 text-xl" /> {signalCycles}
         </span>
      </div>
      <div className="ai-number">
         <span className="flex items-center gap-2">
            <FaChartBar className="text-primary-600 text-xl font-medium" /> {aiCycles}
         </span>
      </div>
   </div>
);

const HeaderDash = () => {
   const { toggleVisibility } = useSidebar();
   const { user } = useAuth();
   const { assetData } = useAssetData();

   const getAssetInfo = (symbol: string): { price: number; changePercent: number } | null => {
      if (assetData.length > 0) {
         const asset = assetData.find((item: any) => item.symbol.toLowerCase() === symbol);
         return asset ? {
            price: Number(asset.last_price), 
            changePercent: Number(asset.price_change_percent) 
         } : null;
      }
      return null;
   };

   // btcInfo and ethInfo default values now use numbers instead of strings
   const btcInfo = getAssetInfo('btc') || { price: 63233.01, changePercent: 0.157 };
   const ethInfo = getAssetInfo('eth') || { price: 2655.08, changePercent: 3.473 };

   // Fix reduce function to use correct types
   const accountBalance = assetData.length > 0
      ? assetData.reduce((total: number, asset: any) => total + (asset.quantity * asset.last_price), 0).toFixed(5)
      : '66617.98000';

   return (
      <><Toast />
         <header className="p-4 bg-gray-50 flex">
            <div className="flex justify-between items-center w-full">
               <div className="gear-icon lg:hidden">
                  <FaGear className="text-primary-700 text-2xl cursor-pointer" onClick={toggleVisibility} />
               </div>
               <div className="flex lg:justify-between justify-end items-center w-full">
                  <div className="assets-info hidden lg:flex items-start gap-10">
                     <AssetInfo symbol="btc" price={btcInfo.price} changePercent={btcInfo.changePercent} />
                     <AssetInfo symbol="eth" price={ethInfo.price} changePercent={ethInfo.changePercent} />
                     <AccountTypeSwitcher isDemo={user?.is_demo ?? false} balance={accountBalance} />
                  </div>
                  <div className="flex gap-6 items-center">
                     <UserProfile signalCycles={user?.signal_cycles ?? 0} aiCycles={user?.ai_cycles ?? 0} />
                     <MenueSetting />
                  </div>
               </div>
            </div>
         </header></>
   );
};

export default HeaderDash;
