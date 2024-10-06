import { User } from "@/utils/types";
import { CiUser } from "react-icons/ci";

export default function UserInfo({ user }: { user: User }) {
   const { first_name, last_name, email, phone_number } = user;
   return (
      <div className="md:col-span-8 col-span-12 text-start">
         <div className="user-data flex justify-start items-center">
            <CiUser className="text-6xl" />
            <div className="flex flex-col justify-start items-start">
               <h3 className="username text-3xl pb-2 font-bold">
                  {`${first_name} ${last_name}`}
               </h3>
               <p className="email text-lg text-gray-600 py-1">{email}</p>
               <p className="phone text-lg text-gray-600 py-1" dir="ltr">{phone_number}</p>
            </div>
         </div>
      </div>
   );
}
