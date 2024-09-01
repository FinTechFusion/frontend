'use client';

import { API_BASE_URL } from '@/utils/api';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTokenFromStorage } from './AuthContext';

interface ApiError {
   success: boolean;
   detail: string;
   status_code: number;
}

interface AssetDataContextType {
   assetData: any;
   assetLoading: boolean;
   assetError: string | null;
   errorMessage: ApiError | null;
}

const AssetDataContext = createContext<AssetDataContextType | undefined>(undefined);

export const AssetDataProvider = ({ children }: { children: ReactNode }) => {
   const [assetData, setAssetData] = useState<any>([]);
   const [assetLoading, setAssetLoading] = useState<boolean>(true);
   const [assetError, setAssetError] = useState<string | null>(null);
   const [errorMessage, setErrorMessage] = useState<ApiError | null>(null);
   const accessToken = getTokenFromStorage("access_token");

   const fetchAssets = async () => {
      try {
         setAssetLoading(true);
         const response = await fetch(`${API_BASE_URL}/users/me/assets`, {
            method: 'GET',
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         });
         const responseData = await response.json();

         if (response.ok && responseData.success) {
            setAssetData(responseData);
         } else {
            const error: ApiError = {
               success: responseData.success,
               detail: responseData.detail,
               status_code: response.status,
            };
            setErrorMessage(error);
            setAssetError(error.detail);  // Set assetError with the error detail
         }
      } catch (error) {
         setAssetError((error as Error).message);
      } finally {
         setAssetLoading(false);
      }
   };

   useEffect(() => {
      fetchAssets();
   }, []);

   return (
      <AssetDataContext.Provider value={{ assetData, assetLoading, assetError, errorMessage }}>
         {children}
      </AssetDataContext.Provider>
   );
};

export const useAssetData = () => {
   const context = useContext(AssetDataContext);
   if (!context) {
      throw new Error('useAssetData must be used within an AssetDataProvider');
   }
   return context;
};
