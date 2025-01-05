"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { usePathname, useRouter } from "@/i18n/navigation";
import { toast } from "react-toastify";
import { Tokens, AuthContextType, User } from "@/utils/types";
import { API_BASE_URL } from "@/utils/api";
import { deleteCookie, getCookie, setCookie } from "cookies-next";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

//
export const saveToCookies = (
  key: string,
  value: string,
  expireInSeconds?: number
): void => {
  if (typeof window !== "undefined") {
    const options = {
      expires: expireInSeconds
        ? new Date(Date.now() + expireInSeconds * 1000)
        : undefined, // Set expiry if provided
      path: "/",
      secure: process.env.NODE_ENV === "production", // Only set secure cookies in production
    };

    setCookie(key, value, options);
  }
};

export const getFromCookies = (key: string) => {
  return getCookie(key);
};

const accessToken = getFromCookies("access_token");

// Auth Provider Component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      checkAndFetchUserData();
    }, 60000);
  }, []);
  const login = async (accessToken: string, refreshToken: string) => {
    try {
      saveToCookies("access_token", accessToken, 1800);
      saveToCookies("refresh_token", refreshToken, 1800);
      const userData = await fetchUserData(accessToken);
      setUser(userData);
      const storedPath = sessionStorage.getItem("path");
      console.log("stored path "+storedPath)
      if (storedPath) {
        router.push(storedPath || '/dashboard');
        sessionStorage.removeItem("path");
      } else {
        return router.push("/dashboard");
      }
    } catch (err) {
      toast.error("Login failed");
    }
  };

  // logout user if change accessToken

  const fetchUserData = async (accessToken: string): Promise<User | null> => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/me`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        if (response.status === 401) {
          const newAccessToken = await refreshAccessToken(); // Refresh token
          return await fetchUserData(newAccessToken); // Retry fetching user data
        }
        throw new Error("Failed to fetch user data");
      }
      const { data } = await response.json();
      setUser(data);
      return data;
    } catch (err) {
      setError("Unable to fetch user data");
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const checkAndFetchUserData = async () => {
    const expireTokenTime = getFromCookies("expire_data_token");
    if (!accessToken) return;
    const currentTime = Date.now();
    if (expireTokenTime && currentTime > Number(expireTokenTime)) {
      const newAccessToken = await refreshAccessToken();
      await fetchUserData(newAccessToken);
    }
  };

  useEffect(() => {
    const loadUserData = async () => {
      if (accessToken) {
        await fetchUserData(accessToken);
      }
      checkAndFetchUserData();
    };
    loadUserData();
  }, []);

  const refreshAccessToken = async (): Promise<string> => {
    try {
      const refreshToken = getFromCookies("refresh_token");
      if (!refreshToken) {
        router.push("/login");
        throw new Error("Refresh token not found");
      }
      const body = new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: refreshToken,
      });
      const response = await fetch(`${API_BASE_URL}/oauth/token`, {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: body.toString(),
      });
      if (!response.ok) {
        throw new Error("Failed to refresh access token");
      }
      const newTokens = (await response.json()) as Tokens;
      saveToCookies("access_token", newTokens.access_token);
      saveToCookies("refresh_token", newTokens.refresh_token);
      console.log("saved new token "+newTokens)
      const newExpireTime = Date.now() + 29 * 60 * 1000;
      saveToCookies("expire_data_token", newExpireTime.toString());
      console.log("saved new token " + newExpireTime.toString());

      return newTokens.access_token;
    } catch (err) {
      throw err;
    }
  };
  const saveUserData = async (accessToken: string, refreshToken: string) => {
    saveToCookies("access_token", accessToken);
    saveToCookies("refresh_token", refreshToken);
    const userData = await fetchUserData(accessToken);
    setUser(userData);
  };


  // handle save user needed route at session storage if not logedin
  const pathname = usePathname();
  const protectedRoutes = ['/dashboard', '/site/exchange', '/payment'];
  const authRoutes = ['/login', '/forget-password', '/reset-password'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.includes(route));
  const isAuthRoute = authRoutes.includes(pathname);
  const accessToken = getFromCookies("access_token")
  const checkAuth = () => {
     const existRoute = sessionStorage.getItem("path");
     if (!accessToken && isProtectedRoute) {
        sessionStorage.setItem("path", pathname);
        router.push(`/login`);
        console.log("saved path and go to login")
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

  // useEffect(() => {
  //    const handleBackButton = () => {
  //       sessionStorage.removeItem("path");
  //       router.push('/');
  //    };
   
  //    // Add event listener for the back button
  //    window.addEventListener("popstate", handleBackButton);
   
  //    return () => {
  //      // Clean up the event listener when the component unmounts
  //      window.removeEventListener("popstate", handleBackButton);
  //    };
  //  }, []);
   
  // Utility function to remove tokens from localStorage
  const clearTokensFromStorage = (): void => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    deleteCookie("expire_data_token");
    localStorage.removeItem("expire_data_token");
  };
  const logout = () => {
    clearTokensFromStorage();
    sessionStorage.clear();
    setUser(null);
    router.push("/");
  };
  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        error,
        login,
        logout,
        fetchUserData,
        saveUserData,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
