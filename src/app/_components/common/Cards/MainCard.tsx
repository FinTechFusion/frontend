import { MainCardProps } from "@/utils/types";

export default function MainCard({ icon, title, description }: MainCardProps) {
   return (
      <div className="rounded py-8 px-3 h-full bg-gray-100 shadow-sm">
         <div className="flex md:flex-row flex-col gap-4 items-start">
            <div className="card-header flex items-center justify-start gap-3 ">
               <span className="text-primary-600 text-2xl bg-secondary p-3 rounded-full">{icon}</span>
            </div>
            <div className="card-content">
               <h3 className="text-2xl font-medium mb-2 group:hover:text-primary-600 hover:text-primary-700">{title}</h3>
               <p className="text-gray-600 text-xl">{description}</p>
            </div>
         </div>
      </div>
   )
}
