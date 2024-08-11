"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/app/_components/common/loading/Loading';

interface AuthGuardProps {
   children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
   const [isLoading, setIsLoading] = useState(true);
   const router = useRouter();
   const pathname = usePathname();

   useEffect(() => {
      const accessToken = localStorage.getItem("access_token");

      if (!accessToken) {
         if (pathname.startsWith('/dashboard')) {
            router.push('/login');
         }
      } else {
         if (pathname == '/login' || pathname == "/forget-password" || pathname == "/reset-password") {
            router.push('/dashboard');
         }
      }

      setIsLoading(false);
   }, [router, pathname]);

   if (isLoading) {
      return <Loading />;
   }

   return <>{children}</>;
};

export default AuthGuard;
