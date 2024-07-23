import Textbox from "@/app/_components/common/Text/Textbox";
import { FaPhone } from "react-icons/fa6";
import { IoMailUnread } from "react-icons/io5";
import { MdOutlineSupportAgent } from "react-icons/md";

export default function page() {
   return (
      <section className="container mx-auto">
         <Textbox mainClass="text-center" titleClass="text-4xl w-fit mx-auto " title="Contact Us" descriptionClass="capitalize" description="Any questions or remarks? Just write us a messaage!" />
         <div className="grid lg:grid-cols-2 grid-cols-1 gap-12 my-8">
            <div className="contactInformation bg-gray-900 px-8 py-12 rounded-md">
               <div className="text-info">
                  <h2 className="text-secondary text-3xl tracking-wider font-bold">Get in Touch</h2>
                  <p className="text-lg text-gray-300 py-5">Fill up the form and our Team will get back to you within 24 hours</p>
                  <ul className="contact-ways">
                     <li className="text-secondary flex items-center text-xl font-medium py-4"><span className="pe-3 text-2xl"><FaPhone /></span>+1(424) 535 3523</li>
                     <li className="text-secondary flex items-center text-xl font-medium py-4"><span className="pe-3 text-2xl"><IoMailUnread /></span>legal@FintechFusion.io</li>
                     <li className="text-secondary flex items-center text-xl font-medium py-4"><span className="pe-3 text-2xl"><MdOutlineSupportAgent /></span>Open Support Ticket</li>
                  </ul>
               </div>
            </div>
         </div>
      </section>
   )
}
