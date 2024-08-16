"use client"
import { useSidebar } from "@/context/SidebarContext";
import { FaGear } from "react-icons/fa6";

export default function Headerdash() {
   const { isVisible, toggleVisibility } = useSidebar();

   return (
         <header className="px-4 py-8 bg-gray-100 flex md:hidden">
            <div className="geer-icon" onClick={toggleVisibility}>
               <FaGear className="text-primary-700 text-2xl cursor-pointer" />
            </div>
         </header>
   )
}
