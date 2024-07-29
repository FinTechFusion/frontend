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
   const currentTime = Date.now();

   useEffect(() => {
      const fetchUserData = async (accessToken: string) => {
         const TokenTime = localStorage.getItem('expire_data_token');
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
         } catch (error) {
            console.error('Failed to fetch user data', error);
            setError('Failed to fetch user data');
            toast.error('Failed to fetch user data');
         } finally {
            setIsLoading(false);
         }g
      };

      const checkAndFetchUserData = async () => {
         try {
            const accessToken = localStorage.getItem('access_token');
            const expireTokenTime = localStorage.getItem('expire_data_token');
            if (!accessToken) {
               router.push('/login');
               setIsLoading(false);
               return;
            }

            if (expireTokenTime && (Number(currentTime) > Number(expireTokenTime))) {
               const newAccessToken = await refreshAccessToken();
               fetchUserData(newAccessToken);
            } else {
               fetchUserData(accessToken);
            }
         } catch (error) {
            console.error('Error in checkAndFetchUserData', error);
            setIsLoading(false);
         }
      };

      checkAndFetchUserData();
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
         const refreshToken = Cookies.get('refresh_token');
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
         Cookies.set('access_token', newTokens.accessToken, { secure: true, sameSite: 'Strict' });
         Cookies.set('refresh_token', newTokens.refreshToken, { secure: true, sameSite: 'Strict' });

         localStorage.setItem('access_token', newTokens.accessToken);
         localStorage.setItem('expire_data_token', String(currentTime + 3600 * 1000)); // Assuming token is valid for 1 hour

         return newTokens.accessToken;
      } catch (error) {
         console.error('Failed to refresh access token', error);
         logout(); // Handle token refresh failure
         throw error;
      }
   };

   return (
      <AuthContext.Provider value={{ user, logout, isLoading, error }}>
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
