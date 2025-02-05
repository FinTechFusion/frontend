"use client";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { toast } from "react-toastify";
import { Tokens, AuthContextType, User } from "@/utils/types";
import { API_BASE_URL } from "@/utils/api";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import { useRouter } from "@/i18n/navigation";

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
  children: ReactNode;
}

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

// Auth Provider Component
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    checkAndFetchUserData(); // Initial call
    const intervalId = setInterval(() => {
      checkAndFetchUserData();
    }, 280000);
  
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, []);
  
const login = async (accessToken: string, refreshToken: string) => {
  try {
    setIsLoading(true);
    saveToCookies("access_token", accessToken, 1800);
    saveToCookies("refresh_token", refreshToken, 1800);

    // Fetch user data
    const userData = await fetchUserData(accessToken);
    const storedPath = sessionStorage.getItem("path");

    if (userData) {
      setUser(userData);
      
      // Use sessionStorage path or default to "/dashboard"
      let finalPath = storedPath || "/dashboard";

      if (storedPath) {
        sessionStorage.removeItem("path");
      }

      // 🔥 Instead of using router.push(), add `redirect` param
      router.push(`/${finalPath}?redirect=${encodeURIComponent(finalPath)}`);
      router.refresh();
    } else {
      throw new Error("Failed to fetch user data");
    }
  } catch (err) {
    toast.error("Login failed");
  } finally {
    setIsLoading(false);
  }
};

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
          try {
            const newAccessToken = await refreshAccessToken();
            if (newAccessToken) {
              // Retry with new token
              return await fetchUserData(newAccessToken);
            }
          } catch (refreshError) {
            // Force logout if refresh fails
            logout();
            return null;
          }
        }
        throw new Error("Failed to fetch user data");
      }

      const { data } = await response.json();
      setUser(data);
      return data;
    } catch (err) {
      console.error("User data fetch error:", err);
      logout(); // Force logout on any error
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const accessToken = getFromCookies("access_token");
  useEffect(() => {
    const loadUserData = async () => {
      if (accessToken) {
        await fetchUserData(accessToken);
      }
    };
    loadUserData();
  }, []);

  const checkAndFetchUserData = async () => {
    console.log('check')
    const accessToken = getFromCookies("access_token");
    const expireTokenTime = getFromCookies("expire_data_token");
    const expireTimeNumber = Number(expireTokenTime);

    if (!accessToken) return;
    const currentTime = Date.now();
    if (expireTokenTime && currentTime > expireTimeNumber) {
      try {
        const newAccessToken = await refreshAccessToken();
        if (newAccessToken) {
          console.log("Token refreshed successfully. Fetching user data...");
          await fetchUserData(newAccessToken);
        } else {
          logout(); // Clear cookies and redirect to login
          console.warn("Failed to refresh token. User might need to log in again.");
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    }
  };
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
      const newExpireTime = Date.now() + 29 * 60 * 1000;
      saveToCookies("expire_data_token", newExpireTime.toString());
      console.log('generate new tokens')
      return newTokens.access_token;
    } catch (err) {
      throw err;
    }
  };
  const saveUserData = async (accessToken: string, refreshToken: string) => {
    saveToCookies("access_token", accessToken);
    saveToCookies("refresh_token", refreshToken);
    const userData = await fetchUserData(accessToken);
    if (userData) {
      setUser(userData);
    }
  };

  // Utility function to remove tokens from localStorage
  const clearTokensFromStorage = (): void => {
    deleteCookie("access_token");
    deleteCookie("refresh_token");
    deleteCookie("expire_data_token");
  };
  const logout = () => {
    clearTokensFromStorage();
    sessionStorage.clear();
    router.push("/");
    setUser(null);
    router.refresh();
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
