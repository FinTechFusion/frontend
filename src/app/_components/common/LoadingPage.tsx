"use client";

import { useEffect, useState, ReactNode } from 'react';
import { FaBitcoin } from "react-icons/fa";
import { CgSpinner } from 'react-icons/cg';

interface LoadingPageProps {
   children: ReactNode;
}

export default function LoadingPage({ children }: LoadingPageProps) {
   const [currentCrypto, setCurrentCrypto] = useState(0);
   const [isLoading, setIsLoading] = useState(true);

   // useEffect(() => {
   //    const interval = setInterval(() => {
   //       setCurrentCrypto((prev) => (prev + 1) % cryptos.length);
   //    }, 2000);
   //    return () => clearInterval(interval);
   // }, [cryptos.length]);

   useEffect(() => {
      const timer = setTimeout(() => {
         setIsLoading(false);
      }, 3000);

      return () => clearTimeout(timer);
   }, []);

   if (!isLoading) return <>{children}</>;

   return (
      <div className="min-h-screen bg-gradient-to-br from-[#0f766e] to-gray-900 flex flex-col items-center justify-center relative overflow-hidden">
         <div className="absolute inset-0 z-0">
            <div className="absolute h-56 w-56 rounded-full bg-primary-400 opacity-10 animate-blob"></div>
            <div className="absolute h-56 w-56 rounded-full bg-primary-300 opacity-10 animate-blob animation-delay-2000 top-1/2 left-1/4"></div>
            <div className="absolute h-56 w-56 rounded-full bg-primary-500 opacity-10 animate-blob animation-delay-4000 bottom-1/4 right-1/3"></div>
         </div>

         {/* Content */}
         <div className="z-10 text-center">
            <div className="mb-8 relative">
               <FaBitcoin className="w-24 h-24 text-[#0f766e] animate-pulse" />
               <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <CgSpinner className="w-12 h-12 text-primary-100 animate-spin" />
               </div>
            </div>
            <h1 className="text-4xl font-bold text-primary-50 mb-4">Fintech Fusion</h1>
         </div>
      </div>
   );
}
