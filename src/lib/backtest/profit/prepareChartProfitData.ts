import { Trade } from "@/utils/types";

// Define the ChartData type for Recharts
export interface ChartDataItem {
  date: string; // Formatted sell date
  profit: number;
}

// Function to prepare data for the chart
const prepareChartData = (trades: Trade[]): ChartDataItem[] => {
  return trades?.map((trade) => ({
    date: new Date(trade?.sell_date).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
    }),
    profit: trade?.profit,
  }));
};

export default prepareChartData;
