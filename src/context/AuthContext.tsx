"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Tokens, AuthContextType } from '@/utils/types';
import { API_BASE_URL } from '@/utils/api';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();

   const login = async (access_token: string, refresh_token: string) => {
      try {
         localStorage.setItem('access_token', access_token);
         localStorage.setItem('refresh_token', refresh_token);
         const data = await fetchUserData(access_token);
         setUser(data);
         router.push("/dashboard");
      } catch (error) {
         toast.error('Login failed');
      }
   };

   const fetchUserData = async (accessToken: string) => {
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
         const {data} = await response.json();
         setUser(data);
         return data;
      } catch (error) {
         setError('Failed to fetch user data');
      } finally {
         setIsLoading(false);
      }
   };

   const checkAndFetchUserData = async () => {
      try {
         const accessToken = localStorage.getItem('access_token');
         const expireTokenTime = localStorage.getItem('expire_data_token');
         if (!accessToken) {
            setIsLoading(false);
            return;
         }

         const currentTime = Date.now();
         if (expireTokenTime && (Number(currentTime) > Number(expireTokenTime))) {
            const newAccessToken = await refreshAccessToken();
            await fetchUserData(newAccessToken);
         }
      } catch (error) {
         console.error('Error in checkAndFetchUserData', error);
         setIsLoading(false);
      }
   };

   useEffect(() => {
      const loadUserData = async () => {
         try {
            const accessToken = localStorage.getItem('access_token');
            if (accessToken) {
               const data = await fetchUserData(accessToken);
               setUser(data);
            }
            checkAndFetchUserData(); // Ensure token expiration is checked
         } catch (error) {
            console.error('Error loading user data:', error);
         }
      };

      loadUserData();
   }, []);

   const logout = () => {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      localStorage.removeItem('expire_data_token');
      setUser(null);
      router.push('/login');
      toast.success('Logged out');
   };

   const refreshAccessToken = async () => {
      try {
         const refreshToken = localStorage.getItem('refresh_token');
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

         localStorage.setItem('access_token', newTokens.access_token);
         localStorage.setItem('refresh_token', newTokens.refresh_token);
         const currentTime = Date.now();
         const thirtyMinutesInMilliseconds = 9 * 60 * 1000;
         const newExpireTime = currentTime + thirtyMinutesInMilliseconds;
         localStorage.setItem('expire_data_token', newExpireTime.toString());
         return newTokens.access_token;
      } catch (error) {
         console.error('Failed to refresh access token', error);
         throw error;
      }
   };

   return (
      <AuthContext.Provider value={{ user, logout, isLoading, error, login, fetchUserData }}>
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
