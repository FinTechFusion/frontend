import { assetsProps } from "@/utils/types";
import React from "react";
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from "recharts";

const COLORS = ["#0D9488", "#4ECDC4", "#2DD4BF", "#5EEAD4"];

const PieChartDigram = ({ data }: assetsProps) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={data}
          dataKey="total"
          nameKey="symbol"
          cx="50%"
          cy="50%"
          outerRadius={110}
          innerRadius={60}
          label={({ name, percent }) =>
            percent > 0.01 ? `${name} ${(percent * 100).toFixed(0)}%` : null
          }
          labelLine={({ percent }) => {
            if (percent > 0.01) {
              return <line stroke="gray" strokeWidth={1} />;
            }
            return <></>; // Render an empty SVG element to satisfy the type requirement
          }}
         >
         
          {data.map((entry: any, index: number) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default PieChartDigram;
