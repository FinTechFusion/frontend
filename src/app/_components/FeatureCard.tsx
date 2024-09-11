import { FeatureCard } from "@/utils/types";
import { MainBtn } from "./common/Buttons/MainBtn";

const Featurecard = ({ title, description, buttonContent }: FeatureCard) => {
   return (
      <div className="feature-card relative bg-gray-100 rounded p-8 shadow group">
         <h3 className="text-2xl w-fit font-bold line-clamp-1 group-hover:text-primary-700">{title}</h3>
         <p className="py-5 text-lg leading-relaxed">{description}</p>
         {buttonContent&&<MainBtn content={buttonContent} btnProps="w-fit" />}
      </div>
   )
}

export default Featurecard;