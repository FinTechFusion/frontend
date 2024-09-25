import Textbox from '@/app/_components/common/Text/Textbox';

export default function HowItWorks() {
   const steps = [
      {
         id: 1,
         title: "Sign Up",
         description: "Create your account in minutes",
      },
      {
         id: 2,
         title: "Connect Exchanges",
         description: "Link your preferred crypto exchanges",
      },
      {
         id: 3,
         title: "Set Strategies",
         description: "Choose a custom trading strategies",
      },
      {
         id: 4,
         title: "Start Trading",
         description: "Let our AI or Signal handle the rest",
      },
   ];

   return (
      <>
         <div className="md:bg-gray-50 py-8 mt-8 w-full rounded-md">
            <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-8 justify-items-center">
               {steps.map((step) => (
                  <div key={step.id} className="flex flex-col justify-center items-center text-center">
                     <div className="bg-primary-600 text-secondary w-12 h-12 flex items-center justify-center rounded-full text-lg font-bold mb-4">
                        {step.id}
                     </div>
                     <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                     <p className="text-gray-600">{step.description}</p>
                  </div>
               ))}
            </div>
         </div>
      </>
   );
}
