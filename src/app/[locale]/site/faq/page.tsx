import According from "@/app/_components/According";
import Textbox from "@/app/_components/common/Text/Textbox";

export default function Page() {
   return (
      <>
         <div className="bg-gray-900 mb-8 px-2">
            <div className="faq-heading">
               <Textbox mainClass="text-center py-12" titleClass="text-secondary hover:text-secondary" descriptionClass="text-secondary" title="faq.faqTitle" description="faq.faqdescription" />
            </div>
         </div>
         <According />
      </>


   )
}
