import { useTranslations } from 'next-intl';

export default function InvestingScenario() {
   const t = useTranslations("investingScenario");

   return (
      <div className="mx-auto w-full max-w-4xl">
         <div className="overflow-x-auto">
            <table className="w-full">
               <thead>
                  <tr className="bg-dark">
                     <th className="px-4 py-3 font-bold text-secondary">{t("tradingScenario")}</th>
                     <th className="px-4 py-3 font-bold text-secondary">{t("withoutBotSignal")}</th>
                     <th className="px-4 py-3 font-bold text-secondary">{t("withBotSignal")}</th>
                  </tr>
               </thead>
               <tbody className='text-center'>
                  <tr className="border-b border-gray-700 hover:bg-gray-100">
                     <td className="px-4 py-3 font-medium text-gray-900">
                        {t("buyingWrongTime")}
                     </td>
                     <td className="px-4 py-3 text-gray-800 font-medium">{t("lossWithoutBotSignal")}</td>
                     <td className="px-4 py-3 text-gray-800 font-medium">{t("lossWithBotSignal")}</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100">
                     <td className="px-4 py-3 font-medium text-gray-900">
                        {t("sellingTooEarly")}
                     </td>
                     <td className="px-4 py-3 text-gray-800 font-medium">{t("missedOpportunityWithoutBotSignal")}</td>
                     <td className="px-4 py-3 text-gray-800 font-medium">{t("missedOpportunityWithBotSignal")}</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-100">
                     <td className="px-4 py-3 font-medium text-gray-900">{t("failingToManageRisk")}</td>
                     <td className="px-4 py-3 text-gray-800 font-medium">{t("lossRiskWithoutBotSignal")}</td>
                     <td className="px-4 py-3 text-gray-800 font-medium">{t("lossRiskWithBotSignal")}</td>
                  </tr>
               </tbody>
            </table>
         </div>
      </div>
   )
}
