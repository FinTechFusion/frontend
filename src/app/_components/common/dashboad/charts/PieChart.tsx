"use client"
import { PieChart, Pie, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
   { symbol: 'BTC', quantity: 1, priceChangePercent: 0.065, lastPrice: 59042.99, total: 59042.99 },
   { symbol: 'ETH', quantity: 10, priceChangePercent: 1.2, lastPrice: 2100.50, total: 21005.00 },
   { symbol: 'ADA', quantity: 1000, priceChangePercent: -0.5, lastPrice: 1.20, total: 1200.00 },
   { symbol: 'DOT', quantity: 100, priceChangePercent: 2.3, lastPrice: 35.80, total: 3580.00 },
];

export default function PortfolioPieChart() {
   return (
               <div className="w-full h-72">
                  <ResponsiveContainer width="100%" height="100%">
                     <PieChart>
                        <Pie
                           data={data}
                           dataKey="total"
                           nameKey="symbol"
                           cx="50%"
                           cy="50%"
                           outerRadius={80}
                           fill="#0F766E"
                           label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        />
                        <Tooltip />
                     </PieChart>
                  </ResponsiveContainer>
               </div>
   );
}
