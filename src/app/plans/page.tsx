"use client"

import { useState } from "react";

const PricingTable = () => {
   // const [isAnnual, setIsAnnual] = useState(true);
   const durations = ["Yearly", "Monthly"];
   const [yearly, setYearly] = useState({
      value: "Yearly"
   });
   function durationChangeHandler(val: string) {
      setYearly((prev) => ({ ...yearly, value: val }))
   }
   return (
      <section className="plans container mx-auto">
         <div className="duration-tap text-center bg-gray-200 w-fit mx-auto px-3 py-2 rounded-full ">
            {durations.map((el, index) => {
               return (
                  <span onClick={() => durationChangeHandler(el)} className={`text-lg cursor-pointer px-4 py-2 rounded-full  ${yearly.value === el ? 'bg-primary-600 text-secondary' : ''}`} key={index}>{el}</span>
               )
            })}
         </div>
      </section>
   );
};



export default PricingTable;
