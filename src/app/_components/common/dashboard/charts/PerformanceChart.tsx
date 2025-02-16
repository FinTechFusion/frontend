// "use client";

// import filterDataByTimeRange from "@/app/_components/strategies/filterDataByTimeRange";
// import FiltrationLabels from "@/app/_components/strategies/FiltrationLabels";
// import prepareChartData from "@/lib/backtest/profit/prepareChartProfitData";
// import { useState, useMemo } from "react";
// import ProfitChart from "./ProfitChart";
// import { Trade } from "@/utils/types";
// type TimeRange = "1D" | "3D" | "7D" | "1M" | "3M" | "6M" | "1Y" | "Overall";


// // Example API response (replace with actual API fetch)
// const apiResponse:Trade[] = [
//   {
//     "Buy Price": 51443.1,
//     "Buy Date": "2024-02-24 18:56:59.999000",
//     "Sell Price": 51852.93,
//     "Sell Date": "2024-02-25 02:07:59.999000",
//     "Profit": 0.7966666083498112,
//   },
//   {
//     "Buy Price": 51523.5,
//     "Buy Date": "2024-02-25 03:06:59.999000",
//     "Sell Price": 51932.8,
//     "Sell Date": "2024-02-25 20:16:59.999000",
//     "Profit": 0.7943947907265674,
//   },
// ];

// export default function PerformanceChart() {
//   const [activeFilter, setActiveFilter] = useState<TimeRange>("Overall");
//     console.log(activeFilter)
//   // Filter data based on selected timeframe
//   // const filteredData = useMemo(() => {
//   //   return filterDataByTimeRange(apiResponse, activeFilter);
//   // }, [activeFilter]);

//   // // Prepare data for chart
//   // const chartData = useMemo(() => {
//   //   return prepareChartData(filteredData);
//   // }, [filteredData]);

//   return (
//     <div className="w-full mt-12">
//       {/* <FiltrationLabels activeFilter={activeFilter} setActiveFilter={setActiveFilter} />
//       <ProfitChart data={chartData} /> */}
//     </div>
//   );
// }
