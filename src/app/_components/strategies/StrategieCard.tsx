import { Strategy } from "@/utils/types";
import Image from "next/image";
import { MainBtn } from "../common/Buttons/MainBtn";
import Link from "next/link";

export default function StrategieCard({ id, banner_url, name, type, description }: Strategy) {
   return (
      <div className="px-3 py-5 shadow" key={id}>
         <div className="strategy-image">
            <Image
               src={banner_url}
               alt={`${name} banner`}
               width={425}
               height={300}
               className="rounded w-full"
            />
         </div>
         <div className="flex flex-col">
            <h2 className="text-2xl font-medium pt-2">{name}</h2>
            <span className="text-lg text-primary-600">{type.replace(/_/g, ' ')}</span>
         </div>
         <p className="line-clamp-3 text-lg text-gray-800 py-2 overflow-hidden">
            {description}
         </p>
         <Link href={`store/${id}`}>
            <MainBtn content="install" btnProps="w-fit my-2 rounded-md p-0 text-lg" />
         </Link>
      </div>)
}
