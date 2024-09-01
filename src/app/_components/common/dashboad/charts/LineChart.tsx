"use client"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
   { symbol: 'BTC', quantity: 1, priceChangePercent: 0.065, lastPrice: 59042.99, total: 59042.99 },
   { symbol: 'ETH', quantity: 10, priceChangePercent: 1.2, lastPrice: 2100.50, total: 21005.00 },
   { symbol: 'ADA', quantity: 1000, priceChangePercent: -0.5, lastPrice: 1.20, total: 1200.00 },
   { symbol: 'DOT', quantity: 100, priceChangePercent: 2.3, lastPrice: 35.80, total: 3580.00 },
];

export default function PriceChangeLineChart() {
   return (
      <>
            <ResponsiveContainer width="100%" height={300}>
               <LineChart data={data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="symbol" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="priceChangePercent" stroke="#0F766E" activeDot={{ r: 8 }} />
               </LineChart>
            </ResponsiveContainer>
      </>
   );
}
