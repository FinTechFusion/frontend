import { TextBox } from '@/utils/types';
import { useTranslations } from "next-intl";

const Textbox = ({ title, description, mainClass = "", titleClass = "", descriptionClass = "" }: TextBox) => {
   const t = useTranslations();
   return (
      <div className={`text-box ${mainClass}`}>
         <h2 className={`md:text-3xl text-2xl font-bold text-dark hover:text-primary-700 ${titleClass}`}>
            {t(title)}
         </h2>
         <p className={`py-4 text-lg text-gray-600 ${descriptionClass}`}>
            {t(description)}
         </p>
      </div>
   );
};

export default Textbox;