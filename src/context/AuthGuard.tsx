"use client";

import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
   children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
   const { error } = useAuth();
   const router = useRouter();
   const token = localStorage.getItem("access_token")
   console.log(error)
   useEffect(() => {
      if (!token || error) {
         router.push('/login');
      } 
   }, []);


   return <>{children}</>;
};

export default AuthGuard;
