"use client";

import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';

interface AuthGuardProps {
   children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
   const { user, error } = useAuth();
   const router = useRouter();

   useEffect(() => {
      if (!user) {
         router.push('/login');
      } else if (!user.is_verified) {
         router.push('/register');
      }
   }, [user, router]);


   if (error) {
      return <div>Error: {error}</div>;
   }

   return <>{children}</>;
};

export default AuthGuard;
