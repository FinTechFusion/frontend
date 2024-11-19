import { useTranslations } from 'next-intl';

export default function Page() {
   const privacyContent = [
      {
         itemTitle: "introduction",
         itemDescription: "introductionContent"
      },
      {
         itemTitle: "controller",
         itemDescription: "controllerContent"
      },
      {
         itemTitle: "SourcesOfPersonalData",
         itemDescription: "SourcesOfPersonalDataContent"
      },
      {
         itemTitle: "PurposesOfProcessingAndLegalBases",
         itemDescription: "PurposesOfProcessingAndLegalBasesContent"
      },
      {
         itemTitle: "personalDataAndDataTransfers",
         itemDescription: "personalDataAndDataTransfersContent"
      },
      {
         itemTitle: "SecurityOfPersonalData",
         itemDescription: "SecurityOfPersonalDataContent"
      },
      {
         itemTitle: "DataRetention",
         itemDescription: "DataRetentionContent"
      },
      {
         itemTitle: "AutomatedDecisionMaking",
         itemDescription: "AutomatedDecisionMakingContent"
      },
      {
         itemTitle: "dataSubjectRights",
         itemDescription: "dataSubjectRightsContent"
      },
      {
         itemTitle: "jurisdictionalConsiderations",
         itemDescription: "jurisdictionalConsiderationsContent"
      },
      {
         itemTitle: "thirdPartyServices",
         itemDescription: "thirdPartyServicesContent"
      },
      {
         itemTitle: "UpdatesToThePrivacyNotice",
         itemDescription: "UpdatesToThePrivacyNoticeContent"
      },
      {
         itemTitle: "ContactUs",
         itemDescription: "ContactUsContent"
   }];
   const t = useTranslations("privacy");
   return (
      <div className="container mx-auto py-8 px-2">
         <h2 className="text-3xl font-medium capitalize text-dark">{t("privacyHeading")}</h2>
         <p className="py-2 text-lg text-gray-500">{t("effectiveDate")}</p>
         <div className="list-content">
            <ul className="terms-list-items ">
               {privacyContent.map((el, index) => {
                  return (
                     <div className="item" key={index}>
                        <li className="text-xl font-semibold text-dark">{t(el.itemTitle)}</li>
                        <p className="py-2 text-lg text-gray-600">{t(el.itemDescription)}</p>
                     </div>
                  )
               })}
            </ul>
         </div>
      </div>
   )
}
