"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface AuthGuardProps {
   children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
   const router = useRouter();
   const [_, setToken] = useState<string | null>(null);

   useEffect(() => {
      const accessToken = localStorage.getItem("access_token");
      setToken(accessToken);
      if (!accessToken) {
         router.push('/login');
      }
   }, [router]);


   return <>{children}</>;
};

export default AuthGuard;
