"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";

export default function BinancePopup() {
   const [isVisible, setIsVisible] = useState(false); // Initially set to false
   const { user } = useAuth();

   useEffect(() => {
      // Delay showing the popup for 2 seconds
      const timer = setTimeout(() => {
         if (!localStorage.getItem("binancePopupDismissed")) {
            setIsVisible(true);
         }
      }, 2000);

      return () => clearTimeout(timer); // Clear the timer on component unmount
   }, []);

   // Handle dismissing the popup
   const handleMarkAsRead = () => {
      setIsVisible(false);
      localStorage.setItem("binancePopupDismissed", "true"); // Store in localStorage to prevent showing again
   };

   return (
      <>
         {!user?.is_binance && isVisible && (
            <div className="fixed bottom-3 right-3 bg-secondary rounded-2xl border border-blue-100 bg-white p-4 shadow-lg sm:p-6 lg:p-8 md:w-1/3 z-50" role="alert">
               <div className="flex items-center gap-4">
                  <span className="shrink-0 rounded-full bg-primary-600 p-2 text-secondary">
                     <svg
                        className="size-5"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                     >
                        <path
                           clipRule="evenodd"
                           d="M18 3a1 1 0 00-1.447-.894L8.763 6H5a3 3 0 000 6h.28l1.771 5.316A1 1 0 008 18h1a1 1 0 001-1v-4.382l6.553 3.276A1 1 0 0018 15V3z"
                           fillRule="evenodd"
                        />
                     </svg>
                  </span>

                  <p className="font-medium sm:text-lg">New message!</p>
               </div>

               <p className="mt-4 text-gray-500 capitalize">
                  Connecting your Binance account unlocks a wealth of opportunities in cryptocurrency trading, enabling you to leverage advanced tools like market analysis and AI-powered trading bots.
               </p>

               <div className="mt-6 sm:flex sm:gap-4">
                  <Link
                     className="inline-block w-full rounded-lg bg-primary-600 hover:bg-primary-700 px-5 py-3 text-center text-sm font-semibold text-secondary sm:w-auto tracking-wider"
                     href="/site/exchange/connect"
                  >
                     Connect
                  </Link>

                  <button
                     className="mt-2 inline-block w-full rounded-lg bg-gray-50 px-5 py-3 text-center text-sm font-semibold text-gray-500 sm:mt-0 sm:w-auto hover:bg-primary-600 hover:text-secondary"
                     onClick={handleMarkAsRead}
                  >
                     Mark as Read
                  </button>
               </div>
            </div>
         )}
      </>
   );
}
