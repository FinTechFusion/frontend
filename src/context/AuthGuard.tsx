"use client";

import { useEffect, useState } from 'react';
import Loading from '@/app/_components/common/loading/Loading';
import { useRouter, usePathname } from '@/i18n/navigation';
import { getTokenFromStorage } from "@/context/AuthContext";

interface AuthGuardProps {
   children: React.ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
   const [isLoading, setIsLoading] = useState(true);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const router = useRouter();
   const pathname = usePathname();
   useEffect(() => {
      const checkAuth = () => {
         try {
            const accessToken = getTokenFromStorage("access_token");
            setIsAuthenticated(!!accessToken);

            const protectedRoutes = ['/dashboard', '/site/exchange'];
            const authRoutes = ['/login', '/forget-password', '/reset-password'];

            const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route)) || pathname.includes('payment');
            const isAuthRoute = authRoutes.includes(pathname);

            if (!accessToken && isProtectedRoute ) {
               router.push(`/login`);
               sessionStorage.setItem("path", pathname);
            } else if (accessToken && isAuthRoute) {
               router.push(`/dashboard`);
            }
            if(pathname === "/site/plans"){
               sessionStorage.setItem("path", pathname);
            }
            // Note: We're not redirecting for /site/plans or any other routes
         } catch (error) {
            setIsAuthenticated(false);
         } finally {
            setIsLoading(false);
         }
      };

      checkAuth();
   }, [router, pathname]);

   if (isLoading) {
      return <Loading />;
   }

   return <>{children}</>;
};

export default AuthGuard;