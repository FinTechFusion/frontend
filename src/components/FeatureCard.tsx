import { FeatureCard } from "@/utils/types";

const Featurecard = ({ title, description, buttonContent }: FeatureCard) => {
   return (
      <div className="feature-card bg-gray-100 rounded p-8 shadow group">
         <h3 className="text-2xl font-bold line-clamp-1 group-hover:text-primary-700">{title}</h3>
         <p className="py-5 text-lg leading-relaxed">{description}</p>
         <button className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-secondary capitalize text-xl">{buttonContent}</button>
      </div>
   )
}

export default Featurecard;