"use client"
import Link from "next/link";
import { MainBtn } from "../Buttons/MainBtn";
import { useAuth } from "@/context/AuthContext";

export default function UserStrategy() {
   const { user } = useAuth();
   return (
      <div className="user-strategy py-5">
         <div className="flex justify-between items-center py-3">
            <h3 className="text-2xl font-medium">Strategy Used</h3>
            <Link href="/dashboard/store">
               <MainBtn content="choose strategy" btnWidth="w-fit" />
            </Link>
         </div>
         <hr />
         {user &&
            <div className="md:w-1/3 my-5">
               <div className="startegy-card p-4 shadow-sm">
                  <h3 className="text-2xl font-medium tracking-wide">{user.strategy}</h3>
               </div>
            </div>
         }
      </div>
   )
}
