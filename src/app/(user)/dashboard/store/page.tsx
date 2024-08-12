"use client";

import { useState } from "react";
import { API_BASE_URL } from "@/utils/api";
import Image from "next/image";
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import { Strategy } from "@/utils/types";
import Link from "next/link";
import useFetch from "@/hooks/useFetch";
import Loading from "@/app/_components/common/loading/Loading";
import { toast } from "react-toastify";
import Toast from "@/app/_components/common/Tostify/Toast";

export default function Page() {
   const [searchQuery, setSearchQuery] = useState("");
   const [selectedType, setSelectedType] = useState<string | null>(null);

   const { data, loading, error } = useFetch(`${API_BASE_URL}/binance/strategies`, {
      method: "GET",
      next: { revalidate: 300 },
   });

   if (loading) {
      return <Loading />;
   }

   if (error) {
      toast.error("Error fetching strategies, try again later");
      return null;
   }

   const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(event.target.value.toUpperCase());
   };

   const handleTypeClick = (type: string) => {
      setSelectedType(type === selectedType ? null : type);
   };

   const filteredData = data.filter((strategy: Strategy) => {
      const matchesType = selectedType ? strategy.type === selectedType : true;
      const matchesSearch = strategy.name.toUpperCase().includes(searchQuery);
      return matchesType && matchesSearch;
   });

const strategyTypes: string[] = Array.from(new Set<string>(data.map((strategy: Strategy) => strategy.type)));

   return (
      <>
         <Toast />
         <div className="section-title pt-6 pb-3">
            <h3 className="text-2xl font-medium">Get better Strategy experience with special apps for Fintech Fusion </h3>
         </div>
         <div className="type-filter flex gap-4 mt-4">
            {strategyTypes.map((type, index) => (
               <button
                  key={index}
                  onClick={() => handleTypeClick(type)}
                  className={`px-4 py-2 text-xl border rounded ${selectedType === type ? "bg-primary-600 text-secondary" : "bg-gray-100"
                     }`}
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
            {filteredData.length > 0 ? (
               filteredData.map((el: Strategy) => (
                  <div className="px-3 py-5 shadow" key={el.id}>
                     <div className="strategy-image">
                        <Image
                           src={el.banner_url}
                           alt={`${el.name} banner`}
                           width={425}
                           height={300}
                           className="rounded"
                        />
                     </div>
                     <div className="flex flex-col">
                        <h2 className="text-2xl font-medium pt-2">{el.name}</h2>
                        <span className="text-lg text-primary-600">{el.type}</span>
                     </div>
                     <p className="line-clamp-3 text-lg text-gray-800 py-2 overflow-hidden">
                        {el.description}
                     </p>
                     <Link href={`store/${el.id}`}>
                        <MainBtn content="install" btnWidth="w-fit my-2 rounded-md p-0 text-lg" />
                     </Link>
                  </div>
               ))
            ) : (
               <p className="text-xl">No strategies found</p>
            )}
         </section>
      </>
   );
}
