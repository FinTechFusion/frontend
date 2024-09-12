
export default function BenfitsSubscription() {
   const subscriptionBenefits = [
      {
         id: 1,
         text: "Access to sophisticated automated trading technology",
      },
      {
         id: 2,
         text: "Automated trading strategies tailored to your goals",
      },
      {
         id: 3,
         text: "24/7 expert support to guide you",
      },
      {
         id: 4,
         text: "Real-time market analysis and insights",
      },
      {
         id: 5,
         text: "Enhanced risk management tools for secure trading",
      },
      {
         id: 6,
         text: "Regular updates and new features",
      },
   ];
  return (
     <div className="bg-gray-100 p-8 rounded-md mt-8">
        <h2 className="md:text-2xl font-bold text-xl text-dark">Why Subscribe?</h2>
        <ul className="list-disc pl-5 mt-4 grid md:grid-cols-2 grid-cols-1 items-start gap-x-10 gap-y-5">
           {subscriptionBenefits.map((benefit) => (
              <li key={benefit.id} className="text-lg">
                 <span>{benefit.text}</span>
              </li>
           ))}
        </ul>
     </div>  )
}
