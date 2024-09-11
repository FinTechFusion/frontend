import { FaRobot, FaChartLine, FaCogs, FaTachometerAlt, FaShieldAlt, FaUserAlt } from 'react-icons/fa';

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
               <div key={index} className="bg-gray-100 rounded py-8 px-4 h-full">
                  <div className="mb-4 flex md:flex-row flex-col justify-start items-start md:space-x-3 space-y-3">
                     <i className="text-primary-600 text-3xl bg-secondary p-3 rounded-full">{feature.icon}</i>
                     <h3 className="text-xl font-bold mb-2 hover:text-primary-600">{feature.title}</h3>
                  </div>
                  <p className="text-gray-600 text-xl">{feature.description}</p>
               </div>
            ))}
         </div>
      </div>
   );
}
