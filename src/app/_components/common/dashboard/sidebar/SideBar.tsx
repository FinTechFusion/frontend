"use client"
import { useLocale } from 'next-intl';
import { FaRobot, FaStore } from 'react-icons/fa';
import { IoMdContacts } from "react-icons/io";
import { FaHouse, FaGear } from "react-icons/fa6";
import { BsBagCheckFill } from "react-icons/bs";
import SidebarLink from './SidebarLink';
import { IoClose } from "react-icons/io5";
import { useSidebar } from '@/context/SidebarContext';
import { HiOutlineSignal } from "react-icons/hi2";
import { IoWalletOutline } from "react-icons/io5";
import { useTranslations } from 'next-intl';

export default function Sidebar() {
   const { isVisible, toggleVisibility } = useSidebar();
   const t = useTranslations("dashboard.sidebar");
   const locale = useLocale();
   return (
      <div className={`min-h-screen bg-gray-100 px-3 md:flex fixed transform z-10 md:w-[18%] ${isVisible ? 'translate-x-0 ' : (locale === "en" ? "-translate-x-full" : "translate-x-full")} lg:translate-x-0`}>
         <ul className=" px-3 py-5">
            <SidebarLink icon={<FaHouse />} content='dashboard' weight='font-semibold' path='/dashboard' />
               <span onClick={() => toggleVisibility()}>
                  <IoClose className={`text-4xl font-bold absolute top-3 ${locale === "en" ? "right-2" : "left-2"} cursor-pointer text-red-600 flex lg:hidden`} />
               </span>
               
               <p className="text-gray-700 text-xl py-3">{t("trading")}</p>

               <SidebarLink icon={<HiOutlineSignal />} content='botsignal' weight='font-normal' path='/dashboard/botsignal' />
               <SidebarLink icon={<FaRobot />} content='botai' weight='font-normal' path='/dashboard/botai' />
               <SidebarLink icon={<BsBagCheckFill />} content='orders' weight='font-normal' path='/dashboard/orders' />
               <p className="text-gray-700 text-xl py-3">{t("others")}</p>

               <SidebarLink icon={<FaStore className="px-2 text-4xl" />} content="store" weight='font-normal' path="/dashboard/store" />
               <SidebarLink icon={<IoWalletOutline className="px-2 text-4xl" />} content="subscription" weight='font-normal' path="/dashboard/subscription" />
               <SidebarLink icon={<FaGear className="px-2 text-4xl" />} content="settings" weight='font-normal' path="/dashboard/settings" />
               <SidebarLink icon={<IoMdContacts className="px-2 text-4xl" />} content="contactus" weight='font-normal' path="/site/contact" />
            </ul>
      </div>
   )
};
