import { useTranslations } from 'next-intl';

export default function Page() {
   const t = useTranslations("terms");
   const termsContent = [
      {
         itemTitle: "introduction",
         itemDescription: "introductionContent"
      },
      {
         itemTitle: "definitions",
         itemDescription: "definitionsContent",
      },
      {
         itemTitle: "softwareUsage",
         itemDescription: "softwareUsageContent",
      },
      {
         itemTitle: "Eligibility",
         itemDescription: "EligibilityContent",
      },
      {
         itemTitle: "accountSecurity",
         itemDescription: "accountSecurityContent",
      },
      {
         itemTitle: "subscriptionPlans",
         itemDescription: "subscriptionPlansContent",
      },
      {
         itemTitle: "paymentTerms",
         itemDescription: "paymentTermsContent",
      },
      {
         itemTitle: "intellectualRights",
         itemDescription: "intellectualRightsContent",
      },
      {
         itemTitle: "limitationofLiability",
         itemDescription: "limitationofLiabilityContent",
      },
      {
         itemTitle: "accountDeletion",
         itemDescription: "accountDeletionContent",
      },
      {
         itemTitle: "dataProcessing",
         itemDescription: "dataProcessingContent",
      },
      {
         itemTitle: "governingLaw",
         itemsDescription: "LawAndJurisdictionContent",
      },
      {
         itemTitle: "updatesAndModifications",
         itemDescription: "updatesContent",
      },
      {
         itemTitle: "contactInformation",
         itemDescription: "contactInformationContent",
      },
   ]
   return (
      <div className="container mx-auto py-8 px-2">
         <h2 className="text-3xl font-medium capitalize text-dark">{t("termsHeading")}</h2>
         <p className="py-2 text-lg text-gray-500">{t("effectiveDate")}</p>
         <div className="list-content">
            <ul className="terms-list-items ">
               {termsContent.map((el, index) => {
                  return (
                     <div className="item" key={index}>
                        <li className="text-xl font-semibold text-dark">{t(el.itemTitle)}</li>
                        <p className="py-3 text-lg text-gray-600">{t(el.itemDescription)}</p>
                     </div>
                  )
               })}
            </ul>
         </div>
      </div>
   )
}
