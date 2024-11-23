"use client"
import { useAuth } from "@/context/AuthContext";
import { CiUser } from "react-icons/ci";
import Loading from "@/app/_components/common/loading/Loading";

export default function UserInfo() {
   const { user } = useAuth();
   if(!user) <Loading/>
   return (
      <div className="md:col-span-8 col-span-12 text-start">
         <div className="user-data flex justify-start items-center">
            <CiUser className="text-6xl md:flex hidden" />
            <div className="flex flex-col justify-start items-start">
               <h3 className="username text-3xl pb-2 font-bold">
                  {`${user?.first_name} ${user?.last_name}`}
               </h3>
               <p className="email text-lg text-gray-600 py-1">{user?.email}</p>
               <p className="phone text-lg text-gray-600 py-1" dir="ltr">{user?.phone_number}</p>
            </div>
         </div>
      </div>
   );
}
