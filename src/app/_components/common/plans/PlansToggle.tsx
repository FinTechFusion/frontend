import { useState } from 'react';
import { useTranslations } from "next-intl";

interface PlansToggleProps {
   onTabChange: (index: number) => void;
}

const PlansToggle = ({ onTabChange }: PlansToggleProps) => {
   const tabs = ['monthly', 'yearlyUp25'];
   const [activeTab, setActiveTab] = useState(0);
   const t = useTranslations("plans");
   const handleClick = (index: number) => {
      setActiveTab(index);
      onTabChange(index); 
   };

   return (
      <div className="tabs-pills flex justify-center items-center gap-2">
         {tabs.map((el, index) => (
            <button
               key={index}
               onClick={() => handleClick(index)}
               className={`capitalize text-xl cursor-pointer tracking-wide px-4 py-2 rounded-md transition-colors duration-300 ${activeTab === index
                  ? 'bg-primary-600 text-secondary'
                  : 'bg-gray-200 text-gray-950'
                  }`}
            >
               {t(el)}
            </button>
         ))}
      </div>
   );
};

export default PlansToggle;