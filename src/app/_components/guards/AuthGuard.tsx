"use client";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useEffect, useState } from "react";
import Loading from "../common/loading/Loading";
import { getFromCookies } from "@/context/AuthContext";
import { useSearchParams } from "next/navigation";

interface AuthGuardProps {
  children: React.ReactNode;
}
const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const accessToken = getFromCookies("access_token");
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const protectedRoutes = ["/dashboard", "/site/exchange",'/site/exchange/connect', "/payment"];
  const authRoutes = ["/login", "/forget-password", "/reset-password"];
  const excludedRoutes = ["/site/exchange/connect/status"];
  const isProtectedRoute = protectedRoutes.some((route) =>pathname.includes(route));
  const searchParams = useSearchParams();
  const redirect = searchParams.get("redirect");
  const isAuthRoute = authRoutes.includes(pathname);
  const isExcludedRoute = excludedRoutes.some((route) =>
    pathname.includes(route)
  );
// Safely access sessionStorage only on the client side
const existRoute = typeof window !== "undefined" ? sessionStorage.getItem("path") : null;
  const checkAuth = () => {
    // Check if the current route is in excluded routes
    // if (!accessToken && isProtectedRoute) {
    //     sessionStorage.setItem("path", pathname);
    //     console.log("Saved path to sessionStorage:", pathname);
    //   // router.push(`/login`);
    // } 
    // else if (accessToken && isAuthRoute && !isExcludedRoute) {
    //   router.push(existRoute || `/dashboard`);
    //   sessionStorage.removeItem("path");
    // }
    // Store /site/plans path if needed
    if (pathname === "/site/plans") {
      sessionStorage.setItem("path", pathname);
    }
    setIsLoading(false);
  };
  useEffect(() => {
    if (redirect) {
      // Save the preferred route to sessionStorage
      sessionStorage.setItem("path", redirect);
    }
  }, [redirect]);

  useEffect(() => {
    checkAuth();
  }, [router, pathname]);

  if (isLoading) {
    return <Loading />;
  }
  return <>{children}</>;
};

export default AuthGuard;
