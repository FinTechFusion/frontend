"use client"

import { useTranslations } from "next-intl";
import { useState } from "react";

const timeFilters = [
    { label: "1D", value: "1D", days: 1 },
    { label: "3D", value: "3D", days: 3 },
    { label: "7D", value: "7D", days: 7 },
    { label: "1M", value: "1M", days: 30 },
    { label: "3M", value: "3M", days: 90 },
    { label: "6M", value: "6M", days: 180 },
    { label: "1Y", value: "1Y", days: 365 },
    { label: "Overall", value: "Overall", days: 1000 }, // Overall timeframe
  ];

export default function FiltrationLabels() {
   const [activeFilter, setActiveFilter] = useState('Overall');
   const t = useTranslations("dashboard.strategies");
   return (
    <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-3 w-full mt-12">
    <h2 className="text-xl font-semibold">{t('performanceOverview')}</h2>
      <div className="flex p-3 gap-2 bg-gray-100 rounded-lg">
      {timeFilters?.map((el) => {
      return (<button 
        key={el?.value}
        onClick={()=>setActiveFilter(el?.value)}
        className={`px-3 py-1 rounded-md text-sm font-medium ${activeFilter == el?.value && 'bg-secondary'}`}
        >
        {el?.label}
      </button>);
    })}
      </div>
  </div>
   )
}
