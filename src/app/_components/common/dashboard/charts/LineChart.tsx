"use client";

import { assetsProps } from '@/utils/types';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {  useTranslations } from 'next-intl';

export default function PriceChangeLineChart({ data }: assetsProps) {
   const t = useTranslations("dashboard")
   return (
      <>
         <h2 className='text-2xl mb-5 mt-2 font-medium border-b-2 border-primary-600 w-fit p-1'>{t("PriceChangeLineChart")}</h2>
         <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
               <CartesianGrid strokeDasharray="3 3" />
               <XAxis dataKey="symbol" />
               <YAxis />
               <Tooltip />
               <Legend />
               <Line
                  type="monotone"
                  dataKey={t("PriceChangeLineChart")}
                  stroke="#0F766E"
                  activeDot={{ r: 8 }}
               />
            </LineChart>
         </ResponsiveContainer></>
   );
}
