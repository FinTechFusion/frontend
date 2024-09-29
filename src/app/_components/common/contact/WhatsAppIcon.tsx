import Link from "next/link";
import { IoLogoWhatsapp } from "react-icons/io";

export default function WhatsAppIcon() {
   return (
      <div className="fixed bottom-5 left-5 z-[100]">
         <div className="w-14 h-14 rounded-full bg-[#00D757] flex justify-center items-center">
            <Link href='https://wa.me'>
               <IoLogoWhatsapp className="text-secondary w-8 h-8" />
            </Link>
         </div>
      </div>
   )
}
