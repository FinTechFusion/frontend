import { Trade } from "@/utils/types";


// Define allowed time range values from timeFilters array
type TimeRange = "1D" | "3D" | "7D" | "1M" | "3M" | "6M" | "1Y" | "Overall";

// Function to filter trades by time range
const filterDataByTimeRange = (
  data: Trade[],
  timeRange: TimeRange
): Trade[] => {
  const now = new Date();

  // Define mapping of time ranges to days
  const timeFilters: Record<TimeRange, number> = {
    "1D": 1,
    "3D": 3,
    "7D": 7,
    "1M": 30,
    "3M": 90,
    "6M": 180,
    "1Y": 365,
    Overall: 1000, // Arbitrary large number for "Overall"
  };

  return data?.filter((trade) => {
    const sellDate = new Date(trade?.sell_date);
    const cutoffDate = new Date(
      now.getTime() - timeFilters[timeRange] * 24 * 60 * 60 * 1000
    );

    return timeRange === "Overall" || sellDate >= cutoffDate;
  });
};

export default filterDataByTimeRange;
