"use client";
import { useEffect, useState } from "react";
import Loading from "@/app/_components/common/loading/Loading";
import { useRouter, usePathname } from "@/i18n/navigation";
import { getFromCookies } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const accessToken = getFromCookies("access_token");
  const protectedRoutes = ["/dashboard", "/site/exchange", "/payment"];
  const authRoutes = ["/login", "/forget-password", "/reset-password"];
  const isAuthRoute = authRoutes.includes(pathname);

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.includes(route)
  );
  const redirect = searchParams.get("redirect");
  const checkAuth = () => {
   // Store /site/plans path if needed
   if (pathname === "/site/plans") {
     sessionStorage.setItem("path", pathname);
   }
 };
 useEffect(() => {
   if (redirect && !accessToken) {
     // Save the preferred route to sessionStorage
     sessionStorage.setItem("path", redirect);
   }
 }, [redirect]);

 useEffect(() => {
   checkAuth();
 }, [router, pathname]);

//  if (isLoading) {
//    return <Loading />;
//  }
 return <>{children}</>;
};

export default AuthGuard;