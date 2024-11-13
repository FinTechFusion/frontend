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
   const router = useRouter();
   const pathname = usePathname();
   const accessToken = getTokenFromStorage("access_token");
   const protectedRoutes = ['/dashboard', '/site/exchange', '/payment'];
   const authRoutes = ['/login', '/forget-password', '/reset-password'];

   const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
   const isAuthRoute = authRoutes.includes(pathname);

   const checkAuth = () => {
      const existRoute = sessionStorage.getItem("path");
      if (!accessToken && isProtectedRoute) {
         sessionStorage.setItem("path", pathname);
         router.push(`/login`);
      } else if (accessToken && isAuthRoute) {
         router.push(existRoute || `/dashboard`);
         sessionStorage.removeItem("path");
      }
      // Store /site/plans path if needed
      if (pathname === "/site/plans") {
         sessionStorage.setItem("path", pathname);
      }
      setIsLoading(false);
   };

   useEffect(() => {
      checkAuth();
   }, [router, pathname]);

   if (isLoading) {
      return <Loading />;
   }
   return <>{children}</>;
};

export default AuthGuard;
