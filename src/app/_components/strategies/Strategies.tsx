"use client"

import { Strategy } from '@/utils/types';
import { useState } from 'react';
import StrategieCard from './StrategieCard';

interface dataProps {
  data?: Strategy[]
}

export default function Strategies({ data }: dataProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value.toUpperCase());
  };

  const handleTypeClick = (type: string) => {
    setSelectedType(type === selectedType ? null : type);
  };

  const filteredData = data?.filter((strategy: Strategy) => {
    const matchesType = selectedType ? strategy.type === selectedType : true;
    const matchesSearch = strategy.name.toUpperCase().includes(searchQuery);
    return matchesType && matchesSearch;
  });

  const strategyTypes: string[] = Array.from(new Set<string>(data?.map((strategy: Strategy) => strategy.type)));

  return (
    <>
      <div className="section-title pt-6 pb-3">
        <h3 className="text-2xl font-medium">Get better Strategy experience with special apps for Fintech Fusion </h3>
      </div>
      <div className="type-filter flex gap-4 mt-4">
        {strategyTypes.map((type, index) => (
          <button
            key={index}
            onClick={() => handleTypeClick(type)}
            className={`px-4 py-2 text-xl border rounded ${selectedType === type ? "bg-primary-600 text-secondary" : "bg-gray-100"}`}
          >
            {type}
          </button>
        ))}
      </div>

      <form className="searchForm mt-8">
        <input
          type="search"
          placeholder="Search about strategy"
          className="main_input border focus:border-primary-700 text-xl"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>

      <section className="store-strategies grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3">
        {filteredData!.length > 0 ? (
          filteredData?.map((el: Strategy) => (
            <StrategieCard key={el.id} {...el} />
          ))
        ) : (
          <p className="text-xl">No strategies found</p>
        )}
      </section>
    </>
  )
}
