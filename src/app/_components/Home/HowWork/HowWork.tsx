import { useTranslations } from 'next-intl';

export default function HowItWorks() {
   const steps = [
      {
         id: 1,
         title: "signup",
         description: "signup_info",
      },
      {
         id: 2,
         title: "connectexchanges",
         description: "connectexchanges_info",
      },
      {
         id: 3,
         title: "setstrategies",
         description: "setstrategies_info",
      },
      {
         id: 4,
         title: "starttrading",
         description: "starttrading_info",
      },
   ];
   const t = useTranslations("howItWork");
   return ( 
      <>
         <div className="md:bg-gray-50 py-8 mt-8 w-full rounded-md">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 justify-items-center">
               {steps.map((step) => (
                  <div key={step.id} className="flex flex-col justify-center items-center text-center">
                     <div className="bg-primary-600 text-secondary w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold mb-4">
                        {step.id}
                     </div>
                     <h3 className="text-xl font-semibold mb-2">{t(step.title)}</h3>
                     <p className="text-gray-600">{t(step.description)}</p>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}
