import Link from "next/link"
import { ReactElement } from "react"

type SidebarLink = {
   icon: ReactElement,
   content: string,
   weight: string,
   path: string
}

const SidebarLink = ({ icon, content, path, weight }: SidebarLink) => {
   return (
      <Link className={`hover:bg-gray-300 p-3 rounded mb-2 mt-2 text-xl text-primary-600 flex justify-start items-center ${weight}`} href={`${path}`}>
         <span className="px-2 text-xl">{icon}</span>
         <p >{content}</p>
      </Link>)
}

export default SidebarLink