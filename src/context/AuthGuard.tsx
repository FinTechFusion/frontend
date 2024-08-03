"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';

interface AuthGuardProps {
   children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
   const router = useRouter();
   const pathname = usePathname();
   const [token, setToken] = useState<string | null>(null);

   useEffect(() => {
      const accessToken = localStorage.getItem("access_token");
      setToken(accessToken);

      if (!accessToken) {
         if (pathname.startsWith('/dashboard')) {
            router.push('/login');
         }

      } else {
         if (pathname == '/login') {
            router.push('/dashboard/profile');
         }
      }
   }, [router, pathname]);


   return <>{children}</>;
};

export default AuthGuard;
