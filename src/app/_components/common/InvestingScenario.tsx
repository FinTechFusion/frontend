export default function InvestingScenario() {
   return (
      <div className="mx-auto w-full max-w-4xl">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-dark">
                     <th className="px-4 py-3 font-bold text-secondary">Trading Scenario</th>
                     <th className="px-4 py-3 font-bold text-secondary">Without Bot Signal</th>
                     <th className="px-4 py-3 font-bold text-secondary">With Bot Signal</th>
                  </tr>
               </thead>
               <tbody>
                  <tr className="border-b border-gray-700 hover:bg-gray-100">
                     <td className="px-4 py-3 font-medium text-gray-900">
                        Buying a crypto at the wrong time
                     </td>
                     <td className="px-4 py-3 text-gray-800 font-medium">$5,000 loss</td>
                     <td className="px-4 py-3 text-gray-800 font-medium">$1,000 loss</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100">
                     <td className="px-4 py-3 font-medium text-gray-900">
                        Selling a crypto too early
                     </td>
                     <td className="px-4 py-3 text-gray-800 font-medium">$3,000 missed opportunity</td>
                     <td className="px-4 py-3 text-gray-800 font-medium">$500 missed opportunity</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100" >
                     <td className="px-4 py-3 font-medium text-gray-900">Failing to manage risk</td>
                     <td className="px-4 py-3 text-gray-800 font-medium">$7,000 loss</td>
                     <td className="px-4 py-3 text-gray-800 font-medium">$2,000 loss</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   )
}
