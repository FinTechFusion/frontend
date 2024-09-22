"use client";

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Loading from '@/app/_components/common/loading/Loading';

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
            const accessToken = localStorage.getItem("access_token");
            setIsAuthenticated(!!accessToken);

            const protectedRoutes = ['/dashboard', '/site/exchange'];
            const authRoutes = ['/login', '/forget-password', '/reset-password'];

            const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route)) || pathname.includes('payment');
            const isAuthRoute = authRoutes.includes(pathname);

            if (!accessToken && isProtectedRoute) {
               router.push('/login');
               sessionStorage.setItem("path", pathname);
            } else if (accessToken && isAuthRoute) {
               router.push('/dashboard');
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