"use client";

import { useAuth } from '@/context/AuthContext';
import { useAssetData } from '@/context/AssetsContext';
import BinanceConnectStatus from "../../binance/BinanceConnectStatus";
import TokensTable from "../../binance/TokensTable";
import PriceChangeLineChart from "../charts/LineChart";
import Loading from '@/app/_components/common/loading/Loading';
import { AssetData } from '@/utils/types';
import Tradingopportunity from '../opportunity/Tradingopportunity';
import PieChartDigram from '../charts/PieChart';

function DashboardContent() {
   const { assetData, errorMessage, assetLoading } = useAssetData();
   const { user } = useAuth();

   if (!user) {
      return <Loading />;
   }

   // Transform assetData to the format expected by PriceChangeLineChart
   const formattedData = assetData.map((item: AssetData) => ({
      symbol: item.symbol,
      quantity: item.quantity,
      priceChangePercent: item.price_change_percent,
      lastPrice: item.last_price,
      total: item.quantity * item.last_price,
   }));

   return (
      <>
         <div className="py-5 my-5 shadow rounded-md flex md:flex-row flex-col md:gap-6 justify-between items-center">
            {/* <div className="flex justify-between items-center px-3">
               <h4 className='text-xl font-medium'>Dashboard</h4>
               <MainBtn content='Product Tour' btnProps="text-lg" />
            </div> */}
            <Tradingopportunity />
            {user.is_binance && formattedData.length > 0 && <PieChartDigram data={formattedData} />}
         </div>
         <>
            <TokensTable />
            <div className="grid justify-start items-start md:grid-cols-1 gap-5 grid-cols-1">
               {formattedData.length > 0 && <PriceChangeLineChart data={formattedData} />}
            </div>
         </>
         {!user?.is_binance && <BinanceConnectStatus />
         }
      </>
   );
}

export default DashboardContent;
