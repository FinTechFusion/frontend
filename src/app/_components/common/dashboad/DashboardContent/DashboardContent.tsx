"use client";

import { useAssetData } from "@/context/AssetsContext";
import Loading from "../../loading/Loading";
import { MainBtn } from "../../Buttons/MainBtn";
import Tradingopportunity from "../opportunity/Tradingopportunity";
import BinanceConnectStatus from "../../binance/BinanceConnectStatus";
import TokensTable from "../../binance/TokensTable";
import PriceChangeLineChart from "../charts/LineChart";


function DashboardContent() {
   const { assetData, errorMessage, assetLoading } = useAssetData();
   if (assetLoading) {
      return <Loading />;
   }

   return (
    <>
          <div className="py-5 my-5 shadow rounded-md">
         <div className="flex justify-between items-center px-3">
            <h4 className='text-xl font-medium'>Dashboard</h4>
            <MainBtn content='Product Tour' btnProps="text-lg" />
         </div>
         <Tradingopportunity />
      </div>
         
         {!(errorMessage?.success) ? (
            <BinanceConnectStatus />
         ) : (
            <>
               <TokensTable />
               <div className="grid justify-start items-start md:grid-cols-1 gap-5 grid-cols-1">
                  {/* <PortfolioPieChart /> */}
                  <PriceChangeLineChart />
               </div>
            </>
         )}
    </>
   );
}

export default DashboardContent;