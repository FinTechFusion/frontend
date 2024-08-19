"use client"
import { useState } from 'react';
import PlanCard from '@/app/_components/common/plans/PlanCard';
import PlansToggle from '@/app/_components/common/plans/PlansToggle';

const Page = () => {
  const [selectedPlanType, setSelectedPlanType] = useState('monthly'); // Initial state for selected plan

  const handleTabChange = (index: number) => {
    const newPlanType = index === 0 ? 'monthly' : 'yearly'; // Set plan type based on selected tab
    setSelectedPlanType(newPlanType);
  };

  return (
    <section className="container mx-auto">
      <div className="pb-6 text-center mx-auto">
        <PlansToggle onTabChange={handleTabChange} />
      </div>
      <>
        <PlanCard selectedPlanType={selectedPlanType} />
      </>
    </section>
  );
};

export default Page;