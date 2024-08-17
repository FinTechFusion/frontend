import React, { useState } from 'react';

interface PlansToggleProps {
   onTabChange: (index: number) => void;
}

const PlansToggle = ({ onTabChange }: PlansToggleProps) => {
   const tabs = ['Monthly', 'Yearly up to 25%'];
   const [activeTab, setActiveTab] = useState(0);

   const handleClick = (index: number) => {
      setActiveTab(index);
      onTabChange(index); 
   };

   return (
      <div className="tabs-pills flex justify-center items-center space-x-2">
         {tabs.map((el, index) => (
            <button
               key={index}
               onClick={() => handleClick(index)}
               className={`capitalize text-xl cursor-pointer tracking-wide px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === index
                  ? 'bg-primary-600 text-secondary'
                  : 'bg-gray-200 text-gray-950'
                  }`}
            >
               {el}
            </button>
         ))}
      </div>
   );
};

export default PlansToggle;