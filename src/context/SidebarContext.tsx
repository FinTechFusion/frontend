"use client"
import { createContext, useContext, useState, ReactNode } from 'react';

type SidebarContextType = {
   isVisible: boolean;
   toggleVisibility: () => void;
};

const SidebarContext = createContext<SidebarContextType | undefined>(undefined);

export const SidebarProvider = ({ children }: { children: ReactNode }) => {
   const [isVisible, setIsVisible] = useState(false);

   const toggleVisibility = () => {
      setIsVisible(!isVisible);
   };

   return (
      <SidebarContext.Provider value={{ isVisible, toggleVisibility }}>
         {children}
      </SidebarContext.Provider>
   );
};

export const useSidebar = () => {
   const context = useContext(SidebarContext);
   if (!context) {
      throw new Error('useSidebar must be used within a SidebarProvider');
   }
   return context;
};
