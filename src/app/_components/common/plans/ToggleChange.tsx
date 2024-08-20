"use client"
import { useState } from "react";

function ToggleChange() {
   const [selectedPlanType, setSelectedPlanType] = useState('monthly');

   const handleTabChange = (index: number) => {
      const newPlanType = index === 0 ? 'monthly' : 'yearly';
      setSelectedPlanType(newPlanType);
   };

   return { selectedPlanType, handleTabChange };
}

export default ToggleChange;
