"use client"
import Plans from '@/app/_components/common/plans/Plans';
import PlansToggle from '@/app/_components/common/plans/PlansToggle';
import ToggleChange from '@/app/_components/common/plans/ToggleChange';

const page = () => {
  const { selectedPlanType, handleTabChange } = ToggleChange();
  return (
    <section className="container mx-auto">
      <div className="pb-6 text-center mx-auto">
        <PlansToggle onTabChange={handleTabChange} />
      </div>
      <>
        <Plans excludedPlanId='beginner_monthly' selectedPlanType={selectedPlanType} />
      </>
    </section>
  );
};

export default page;