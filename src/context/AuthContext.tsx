"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Tokens, AuthContextType, User } from '@/utils/types';
import { API_BASE_URL } from '@/utils/api';

// Auth Context
const AuthContext = createContext<AuthContextType | null>(null);

// Auth Provider Props Interface
interface AuthProviderProps {
   children: ReactNode;
}

export const getTokenFromStorage = (key: string): string | null => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem(key);
  }
  return null;
};

export const saveTokenToStorage = (key: string, value: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, value);
  }
};

// Utility function to remove tokens from localStorage
const clearTokensFromStorage = (): void => {
   localStorage.removeItem('access_token');
   localStorage.removeItem('refresh_token');
   localStorage.removeItem('expire_data_token');
};

// Auth Provider Component
export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   const login = async (accessToken: string, refreshToken: string) => {
      try {
         saveTokenToStorage('access_token', accessToken);
         saveTokenToStorage('refresh_token', refreshToken);
         const userData = await fetchUserData(accessToken);
         setUser(userData);
         router.push("/dashboard");
      } catch (err) {
         toast.error('Login failed');
         console.error('Login error:', err);
      }
   };

   const fetchUserData = async (accessToken: string): Promise<User | null> => {
      setIsLoading(true);
      try {
         const response = await fetch(`${API_BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         });

         if (!response.ok) {
            throw new Error('Failed to fetch user data');
         }

         const { data } = await response.json();
         setUser(data);
         return data;
      } catch (err) {
         setError('Failed to fetch user data');
         console.error('Error fetching user data:', err);
         return null;
      } finally {
         setIsLoading(false);
      }
   };

   const checkAndFetchUserData = async () => {
      const accessToken = getTokenFromStorage('access_token');
      const expireTokenTime = getTokenFromStorage('expire_data_token');

      if (!accessToken) return;

      const currentTime = Date.now();
      if (expireTokenTime && currentTime > Number(expireTokenTime)) {
         const newAccessToken = await refreshAccessToken();
         await fetchUserData(newAccessToken);
      }
   };

   useEffect(() => {
      const loadUserData = async () => {
         const accessToken = getTokenFromStorage('access_token');
         if (accessToken) {
            await fetchUserData(accessToken);
         }
         checkAndFetchUserData();
      };

      loadUserData();
   }, []);

   const logout = () => {
      clearTokensFromStorage();
      setUser(null);
      router.push('/');
      toast.success('Logged out');
   };

   const refreshAccessToken = async (): Promise<string> => {
      try {
         const refreshToken = getTokenFromStorage('refresh_token');
         if (!refreshToken) {
            router.push('/login');
            throw new Error('Refresh token not found');
         }

         const body = new URLSearchParams({
            grant_type: 'refresh_token',
            refresh_token: refreshToken,
         });

         const response = await fetch(`${API_BASE_URL}/oauth/token`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: body.toString(),
         });

         if (!response.ok) {
            throw new Error('Failed to refresh access token');
         }

         const newTokens = (await response.json()) as Tokens;
         saveTokenToStorage('access_token', newTokens.access_token);
         saveTokenToStorage('refresh_token', newTokens.refresh_token);

         const newExpireTime = Date.now() + 9 * 60 * 1000;
         saveTokenToStorage('expire_data_token', newExpireTime.toString());

         return newTokens.access_token;
      } catch (err) {
         console.error('Failed to refresh access token:', err);
         throw err;
      }
   };

   return (
      <AuthContext.Provider value={{ user, isLoading, error, login, logout, fetchUserData }}>
         {children}
      </AuthContext.Provider>
   );
};

// Custom hook to use the Auth context
export const useAuth = (): AuthContextType => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};
