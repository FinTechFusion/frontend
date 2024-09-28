"use client"

import { FaGear, FaChartLine, FaChartBar } from "react-icons/fa6";
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import MenueSetting from '../../user/MenueSetting';
import { getTokenFromStorage, useAuth } from "@/context/AuthContext";
import { useAssetData } from "@/context/AssetsContext";
import { useSidebar } from "@/context/SidebarContext";
import { useState, useEffect } from 'react';
import { API_BASE_URL } from "@/utils/api";

interface AssetInfo {
   symbol: string;
   last_price: number;
   price_change_percent: number;
   quantity: number;
}

interface AssetInfoProps {
   symbol: string;
   price: number;
   changePercent: number;
}

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

interface AccountTypeProps {
   isDemo: boolean;
   balance: string;
}
const AccountType: React.FC<AccountTypeProps> = ({ isDemo: initialDemo, balance }) => {
   const [isDemo, setIsDemo] = useState(initialDemo);
   const [isOpen, setIsOpen] = useState(false);
   const [loading, setLoading] = useState(false);
   const { fetchUserData } = useAuth();
   const accessToken = getTokenFromStorage("access_token");

   useEffect(() => {
      setIsDemo(initialDemo); // Update isDemo when initialDemo changes
   }, [initialDemo]);

   const handleToggleAccountType = async () => {
      if (!accessToken) return;
      try {
         setLoading(true);
         const newAccountType = !isDemo;

         const response = await fetch(`${API_BASE_URL}/users/me/demo/${isDemo ? 'disable' : 'enable'}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
               authorization: `Bearer ${accessToken}`,
            },
         });

         if (response.ok) {
            setIsDemo(newAccountType);
         } else {
            console.error('Failed to update account type');
         }
      } catch (error) {
         console.error('Error updating account type:', error);
      } finally {
         await fetchUserData(accessToken);
         setLoading(false);
      }
   };

   return (
      <div className="account-type relative">
         <h5 className="uppercase text-primary-600 flex items-center gap-1 cursor-pointer">
            {isDemo ? "Demo Account" : "Real Account"}
            {isOpen ? (
               <MdKeyboardArrowUp onClick={() => setIsOpen(false)} size={25} />
            ) : (
               <MdKeyboardArrowDown onClick={() => setIsOpen(true)} size={25} />
            )}
         </h5>
         <div className="text-center">
            <span className="block py-1">{balance}</span>
         </div>
         {isOpen && (
            <div className="switch-real w-64 absolute left-0 top-15 bg-secondary rounded-md shadow-sm p-3 z-50">
               <p className="text-lg text-primary-700 pb-2">Type of Account</p>
               <hr />
               <div className="flex items-center justify-between py-2">
                  <span className="text-lg font-semibold text-gray-800">Real Account</span>
                  <label className="relative inline-flex items-center cursor-pointer">
                     <input
                        type="checkbox"
                        className="sr-only peer"
                        onChange={handleToggleAccountType}
                        checked={!isDemo}
                        disabled={loading}
                     />
                     <div className="w-12 h-6 bg-gray-300 peer-focus:outline-none rounded-full peer-checked:bg-primary-600"></div>
                     <div className="absolute left-0.5 top-0.5 w-5 h-5 bg-primary-700 peer-checked:bg-gray-200 rounded-full peer-checked:translate-x-full transition duration-300"></div>
                  </label>
               </div>
            </div>
         )}
      </div>
   );
};

interface UserProfileProps {
   signalCycles: number;
   aiCycles: number;
}

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
      if (user?.is_binance && assetData && assetData.length > 0) {
         const asset = assetData.find((item: any) => item.symbol.toLowerCase() === symbol);
         return asset ? {
            price: Number(asset.last_price),  // Ensure price is a number
            changePercent: Number(asset.price_change_percent) // Ensure changePercent is a number
         } : null;
      }
      return null;
   };

   // btcInfo and ethInfo default values now use numbers instead of strings
   const btcInfo = getAssetInfo('btc') || { price: 63233.01, changePercent: 0.157 };
   const ethInfo = getAssetInfo('eth') || { price: 2655.08, changePercent: 3.473 };

   // Fix reduce function to use correct types
   const accountBalance = user?.is_binance && assetData.length > 0
      ? assetData.reduce((total: number, asset: any) => total + (asset.quantity * asset.last_price), 0).toFixed(5)
      : '66617.98000';

   return (
      <header className="p-4 bg-gray-50 flex">
         <div className="flex justify-between items-center w-full">
            <div className="gear-icon lg:hidden">
               <FaGear className="text-primary-700 text-2xl cursor-pointer" onClick={toggleVisibility} />
            </div>
            <div className="flex lg:justify-between justify-end items-center w-full">
               <div className="assets-info hidden lg:flex items-start gap-10">
                  <AssetInfo symbol="btc" price={btcInfo.price} changePercent={btcInfo.changePercent} />
                  <AssetInfo symbol="eth" price={ethInfo.price} changePercent={ethInfo.changePercent} />
                  <AccountType isDemo={user?.is_demo ?? false} balance={accountBalance} />
               </div>
               <div className="flex gap-6 items-center">
                  <UserProfile signalCycles={user?.signal_cycles ?? 0} aiCycles={user?.ai_cycles ?? 0} />
                  <MenueSetting />
               </div>
            </div>
         </div>
      </header>
   );
};

export default HeaderDash;
