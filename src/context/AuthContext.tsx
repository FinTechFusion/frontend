"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { Tokens, AuthContextType } from '@/utils/types';
import { API_BASE_URL } from '@/utils/api';
// import Toast from '@/app/_components/common/Tostify/Toast';

const AuthContext = createContext<AuthContextType | null>(null);

interface AuthProviderProps {
   children: ReactNode;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
   const [user, setUser] = useState(null);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const router = useRouter();
   const currentTime = Date.now();
   const fetchUserData = async (accessToken: string) => {
      try {
         const response = await fetch(`${API_BASE_URL}/users/me`, {
            method: 'GET',
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
            next: { revalidate: 30 }
         });


         if (!response.ok) {
            throw new Error('Failed to fetch user data');
         }
         const { data } = await response.json();
         setUser(data);
         return data;
      } catch (error) {
         console.error('Failed to fetch user data', error);
         setError('Failed to fetch user data');
         // toast.error('Failed to fetch user data');
         router.push('/login')
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

         if (expireTokenTime && (Number(currentTime) > Number(expireTokenTime))) {
            const access_token = await refreshAccessToken();
            fetchUserData(access_token);
            console.log("Refresh Token Worked Sucessfully");   
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



   const login = async (access_token: string, refresh_token: string) => {
      try {
         // Store tokens
         localStorage.setItem('access_token', access_token);
         localStorage.setItem('refresh_token', refresh_token);

         // Fetch user data after storing tokens
         const data = await fetchUserData(access_token);
         setUser(data);
         router.push("/dashboard");
      } catch (error) {
         console.error('Login failed', error);
         toast.error('Login failed');
      }
   };

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
         localStorage.setItem('expire_data_token', String(currentTime));
         return newTokens.access_token;
      } catch (error) {
         console.error('Failed to refresh access token', error);
         // logout(); // Handle token refresh failure
         throw error;
      }
   };

   return (
      <AuthContext.Provider value={{ user, logout, isLoading, error, login }}>
         {/* <Toast /> */}
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
