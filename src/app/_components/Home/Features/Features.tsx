import { FaRobot, FaChartLine, FaCogs, FaTachometerAlt, FaShieldAlt, FaUserAlt } from 'react-icons/fa';
import MainCard from '../../common/Cards/MainCard';

type Feature = {
   title: string;
   description: string;
   icon: JSX.Element;
};

export default function Features() {
   // Array of feature data with icons
   const features: Feature[] = [
      { title: "AI-Powered Trading", description: "Leverage advanced algorithms for optimal trade execution.", icon: <FaRobot /> },
      { title: "Real-Time Analysis", description: "Stay ahead with instant market insights and predictions.", icon: <FaChartLine /> },
      { title: "Automated Strategies", description: "Set up and run complex trading strategies with ease.", icon: <FaCogs /> },
      { title: "Performance Tracking", description: "Monitor your portfolio and strategy performance in real-time.", icon: <FaTachometerAlt /> },
      { title: "Risk Management", description: "Built-in tools to protect your investments and minimize losses.", icon: <FaShieldAlt /> },
      { title: "User-Friendly Interface", description: "Platform designed for traders of all experience levels.", icon: <FaUserAlt /> },
   ];

   return (
      <div className="features py-6">
         <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5 justify-center items-center py-6">
            {features.map((feature, index) => (
               <MainCard key={index} title={feature.title} description={feature.description} icon={feature.icon} />
            ))}
         </div>
      </div>
   );
}
