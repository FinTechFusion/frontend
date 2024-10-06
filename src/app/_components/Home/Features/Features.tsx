import { FaRobot, FaChartLine, FaCogs, FaTachometerAlt, FaShieldAlt, FaUserAlt } from 'react-icons/fa';
import MainCard from '../../common/Cards/MainCard';
import Textbox from '@/app/_components/common/Text/Textbox';
import { useTranslations } from 'next-intl';

type Feature = {
   title: string;
   description: string;
   icon: JSX.Element;
};

export default function Features() {
   const t = useTranslations('features');

   const features: Feature[] = [
      {
         title: t("title_1"),
         description: t("description_1"),
         icon: <FaRobot />
      },
      {
         title: t("title_2"),
         description: t("description_2"),
         icon: <FaChartLine />
      },
      {
         title: t("title_3"),
         description: t("description_3"),
         icon: <FaCogs />
      },
      {
         title: t("title_4"),
         description: t("description_4"),
         icon: <FaTachometerAlt />
      },
      {
         title: t("title_5"),
         description: t("description_5"),
         icon: <FaShieldAlt />
      },
      {
         title: t("title_6"),
         description: t("description_6"),
         icon: <FaUserAlt />
      },
   ];

   return (
      <div className="features py-6">
         <Textbox
            title="features.feat_heading"
            description="features.feat_description"
            descriptionClass="md:w-1/2 "
         />
         <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center items-center py-6">
            {features.map((feature, index) => (
               <MainCard
                  key={index}
                  title={feature.title}
                  description={feature.description}
                  icon={feature.icon}
               />
            ))}
         </div>
      </div>
   );
}