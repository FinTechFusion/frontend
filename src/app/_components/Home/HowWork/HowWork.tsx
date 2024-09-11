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
         description: "Let our AI handle the rest",
      },
   ];

   return (
      <>
         <Textbox mainClass='' title="How It Works" description='Follow these simple steps to start trading with our platform. From account setup to automated trading, we have streamlined the entire process for you.' descriptionClass='md:w-3/4 w-full' />
         <div className="bg-gray-100 py-8 mt-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 justify-items-center">
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
