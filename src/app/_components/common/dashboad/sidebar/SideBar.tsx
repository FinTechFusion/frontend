import Link from 'next/link';
import { FaUser, FaChartLine, FaRobot, FaStore, FaBell } from 'react-icons/fa';
import { FaHouse, FaGear } from "react-icons/fa6";
import { BsBagCheckFill } from "react-icons/bs";

import SidebarLink from './SidebarLink';


export default function Sidebar() {
   return (
      <div className="min-h-screen bg-gray-100">
         <div className="sideBar lg:col-span-2 md:col-span-3 col-span-12 ">
            <ul className="sideBar-List px-3 py-5">
               <SidebarLink icon={<FaHouse />
               } content='Dashboard' weight='font-semibold' path='/dashboard' />

               <SidebarLink icon={<FaUser />
               } content='My Portfolio' weight='font-normal' path='/' />

               <p className="text-gray-700 text-xl py-3">Trading</p>

               <SidebarLink icon={<FaChartLine />
               } content='Bot Analysis' weight='font-normal' path='/dashboard/botanalysis' />

               <SidebarLink icon={<FaRobot />
               } content='Bot AI' weight='font-normal' path='/dashboard/botai' />
               <SidebarLink icon={<BsBagCheckFill />
               } content='Orders' weight='font-normal' path='/dashboard/orders' />

               <p className="text-gray-700 text-xl py-3">Other</p>

               <SidebarLink
                  icon={<FaStore className="px-2 text-4xl" />}
                  content="Store"
                  weight='font-normal'
                  path="/dashboard/store"
               />
               <SidebarLink
                  icon={<FaBell className="px-2 text-4xl" />}
                  content="Subscription"
                  weight='font-normal'

                  path="/binance/connect/apikey/subscription"
               />
               {/* <SidebarLink
                  icon={<FaUserGroup className="px-2 text-4xl" />}
                  content="Invite Friends"
                  weight='font-normal'
                  path="/binance/connect/apikey/portfolio/invitefriends"
               /> */}
               <SidebarLink
                  icon={<FaGear className="px-2 text-4xl" />}
                  content="Settings"
                  weight='font-normal'
                  path="/dashboard/settings"
               />

               <div className="text-center my-5 w-100">
                  <Link className="text-xl text-primary-600 hover:text-primary-700" href="/contact">
                     Contact Us
                  </Link>
                  <div className="flex justify-around items-center py-8">
                     <Link className="text-gray-950" href="/livechat">Live Chat</Link>
                     <Link className="text-gray-950" href="/feedback">Feedback</Link>
                  </div>
               </div>
            </ul>
         </div>
      </div>
   );
}
