"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { User, Tokens, AuthContextType } from '@/utils/types';
import { API_BASE_URL } from '@/utils/api';
import Toast from '@/app/_components/common/Tostify/Toast';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [user, setUser] = useState<User | null>(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   useEffect(() => {
      const fetchUserData = async () => {
         try {
            const accessToken = Cookies.get('access_token');
            if (!accessToken) {
               router.push('/login');
               setIsLoading(false);
               return;
            }

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
         } catch (error) {
            console.error('Failed to fetch user data', error);
            setError('Failed to fetch user data');
            toast.error('Failed to fetch user data');
         } finally {
            setIsLoading(false);
         }
      };

      fetchUserData();
   }, []);

   const login = async (tokens: Tokens, userData: User) => {
      try {
         Cookies.set('access_token', tokens.accessToken);
         Cookies.set('refresh_token', tokens.refreshToken);
         setUser(userData);
         toast.success('Login successful');
      } catch (error) {
         console.error('Login failed', error);
         toast.error('Login failed');
      }
   };

   const logout = () => {
      Cookies.remove('access_token');
      Cookies.remove('refresh_token');
      setUser(null);
      router.push('/login');
      toast.success('Logged out');
   };

   const refreshAccessToken = async () => {
      try {
         const refreshToken = Cookies.get('refresh_token');
         if (!refreshToken) {
            router.push('/login')
            throw new Error('Refresh token not found');
         }

         const response = await fetch('/api/auth/refresh', {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
            body: JSON.stringify({ refreshToken }),
         });

         if (!response.ok) {
            throw new Error('Failed to refresh access token');
         }

         const newTokens = (await response.json()) as Tokens;
         Cookies.set('access_token', newTokens.accessToken);
         Cookies.set('refresh_token', newTokens.refreshToken);

         return newTokens.accessToken;
      } catch (error) {
         console.error('Failed to refresh access token', error);
         logout(); // Handle token refresh failure
         throw error;
      }
   };

   const useRefreshToken = <T,>(fn: (...args: any[]) => Promise<T>) => {
      return async (...args: any[]) => {
         try {
            const response = await fn(...args);
            return response;
         } catch (error: any) {
            if (error.response && error.status === 401) {
               const newAccessToken = await refreshAccessToken();
               // Retry the original request with the new access token
               const response = await fn(...args);
               return response;
            } else {
               throw error;
            }
         }
      };
   };

   return (
      <AuthContext.Provider value={{ user, login, logout, isLoading, error, useRefreshToken }}>
         <Toast />
         {children}
      </AuthContext.Provider>
   );
};

export const useAuth = (): AuthContextType => {
   const context = useContext(AuthContext);
   if (!context) {
      throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
};
