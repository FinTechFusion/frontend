"use client";

import { useTranslations } from "next-intl";
export type TimeRange = "1D" | "3D" | "7D" | "1M" | "3M" | "6M" | "1Y" | "Overall";


interface FiltrationLabelsProps {
  activeFilter: string;
  setActiveFilter: React.Dispatch<React.SetStateAction<TimeRange>>;
}

export default function FiltrationLabels({ activeFilter, setActiveFilter }: FiltrationLabelsProps) {
  const t = useTranslations("dashboard.strategies");

  return (
    <div className="flex md:flex-row flex-col justify-between md:items-center items-start gap-3 w-full">
      <h2 className="text-xl font-semibold">{t("performanceOverview")}</h2>
      <div className="flex p-2 gap-8 bg-gray-100 rounded-lg">
      {["1D", "3D", "7D", "1M", "3M", "6M", "1Y", "Overall"].map((filter) => (
        <button
          key={filter}
          onClick={() => setActiveFilter(filter as TimeRange)} // Explicitly cast to TimeRange
          className={activeFilter === filter ? "bg-secondary p-2 rounded" :"" }
        >
          {filter}
        </button>
      ))}
    </div>
    </div>
  );
}
