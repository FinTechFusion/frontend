"use client"
import Plans from "@/app/_components/common/plans/Plans";
import PlansToggle from "@/app/_components/common/plans/PlansToggle";
import ToggleChange from "@/app/_components/common/plans/ToggleChange";
// import NotSubscripe from "@/app/_components/common/supscription/NotSubscripe";

export default function page() {
   const { selectedPlanType, handleTabChange } = ToggleChange();

   return (
      <div className="container mx-auto py-8">
         <div className="pb-6 text-center mx-auto">
            <PlansToggle onTabChange={handleTabChange} />
         </div>
         <Plans selectedPlanType={selectedPlanType} excludedPlanId="beginner_trial" />
      </div>
   );
}
