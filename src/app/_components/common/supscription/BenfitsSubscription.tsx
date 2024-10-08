import { useTranslations } from "next-intl";

export default function BenfitsSubscription() {
   const t = useTranslations("subscriptionBenefits");
   const subscriptionBenefits = [
      {
         id: 1,
         text: "benfit1",
      },
      {
         id: 2,
         text:"benfit2",
      },
      {
         id: 3,
         text: "benfit3",
      },
      {
         id: 4,
         text: "benfit4",
      },
      {
         id: 5,
         text: "benfit5",
      },
      {
         id: 6,
         text: "benfit6",
      },
   ];
   return (
      <div className="bg-gray-100 p-8 rounded-md mt-8">
         <h2 className="md:text-2xl font-bold text-xl text-dark">{t("whySubscripe")}</h2>
         <ul className="list-disc pl-5 mt-4 grid md:grid-cols-2 grid-cols-1 items-start gap-x-10 gap-y-5">
            {subscriptionBenefits.map((benefit) => (
               <li key={benefit.id} className="text-lg">
                  <span>{t(benefit.text)}</span>
               </li>
            ))}
         </ul>
      </div>)
}
