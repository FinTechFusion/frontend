import { useTranslations } from "next-intl";

export default function Page() {
   const refundContent = [
      {
         title: "introduction",
         description: "monthlySubscription"
      },
      {
         title: "annualSubscription",
         description: "marketplaceAndAppsStore"
      },
      {
         title: "refundProcessByPaymentMethod",
         description: "singleRefundRequestPolicy"
      },
      {
         title: "currencyOfRefund",
         description: "processingTimes"
      },
      {
         title: "serviceProviderFees",
         description: "contactInfo"
      },
   ];
   const t = useTranslations("refund");
   return (
      <div className="container mx-auto py-8 px-2">
         <h2 className="text-3xl font-medium capitalize text-dark">{t("title")}</h2>
         <p className="py-2 text-lg text-gray-500">{t("effectiveDate")}</p>
         <div className="list-content">
            <ul className="terms-list-items ">
               {refundContent.map((el, index) => {
                  return (
                     <div className="item" key={index}>
                        <li className="text-xl font-meduim text-dark">{t(el.title)}</li>
                        <p className="py-3 text-lg text-gray-600">{t(el.description)}</p>
                     </div>
                  )
               })}
            </ul>
         </div>
      </div>)
}
