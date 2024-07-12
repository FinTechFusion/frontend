import According from "@/components/According";
import Textbox from "@/components/common/Text/Textbox";

export default function page() {
   return (
      <>
         <div className="bg-gray-900 mb-8 px-2">
            <div className="faq-heading">
               <Textbox mainClass="text-center py-12" titleClass="text-secondary hover:text-secondary" descriptionClass="text-secondary" title="Frequently asked questions" description="A lot of people don't appreciate the moment until it's passed. I'm not trying my hardest, and I'm not trying to do" />
            </div>
         </div>
         <According />

      </>


   )
}
