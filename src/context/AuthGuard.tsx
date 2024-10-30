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
   const existRoute = sessionStorage.getItem("path");

   useEffect(() => {
      const checkAuth = () => {
         try {
            const accessToken = getTokenFromStorage("access_token");
            setIsAuthenticated(!!accessToken);

            const protectedRoutes = ['/dashboard', '/site/exchange'];
            const authRoutes = ['/login', '/forget-password', '/reset-password'];

            const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route)) || pathname.includes('payment');
            const isAuthRoute = authRoutes.includes(pathname);

            // Handle unauthenticated access to protected routes
            if (!accessToken && isProtectedRoute) {
               sessionStorage.setItem("path", pathname);
               router.push(`/login`);
            }
            // Handle authenticated users accessing auth routes
            else if (accessToken && isAuthRoute) {
               if (existRoute) {
                  router.push(existRoute);
                  sessionStorage.removeItem("path");
               } else {
                  router.push(`/dashboard`);
               }
            }

            // Store /site/plans path separately if needed
            if (pathname === "/site/plans") {
               sessionStorage.setItem("path", pathname);
            }
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
