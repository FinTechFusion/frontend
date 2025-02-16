"use client";

import { ChartDataItem } from "@/lib/backtest/profit/prepareChartProfitData";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

interface ProfitChartProps {
  trades: ChartDataItem[];
}

const ProfitChart: React.FC<ProfitChartProps> = ({ trades }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart
        data={trades}
        margin={{ top: 20, right: 30, left: 20, bottom: 10 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="date"
          tickFormatter={(date) => new Date(date).toLocaleDateString()}
          type="category"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="profit"
          stroke="rgba(75, 192, 192, 1)"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ProfitChart;
