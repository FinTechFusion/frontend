'use client';

import { API_BASE_URL } from '@/utils/api';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTokenFromStorage, useAuth } from '@/context/AuthContext';

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

   const { user } = useAuth();

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
            // Fetch ticker data for each asset
            const fetchTickers = responseData.data.map((asset: any) =>
               fetch(`${API_BASE_URL}/binance/${asset.symbol}/ticker`, {
                  method: 'GET',
                  headers: {
                     'authorization': `Bearer ${accessToken}`,
                  },
               })
                  .then(response => response.json())
                  .then(tickerData => ({
                     symbol: asset.symbol,
                     quantity: asset.quantity,
                     price_change_percent: tickerData.data?.price_change_percent || 'N/A',
                     last_price: tickerData.data?.last_price || 'N/A',
                  }))
            );

            Promise.all(fetchTickers)
               .then(results => {
                  setAssetData(results);
               })
               .catch(() => {
                  setAssetError('Failed to fetch ticker data');
               });
         } else {
            const error: ApiError = {
               success: responseData.success,
               detail: responseData.detail,
               status_code: response.status,
            };
            setErrorMessage(error);
            setAssetError(error.detail);
         }
      } catch (error) {
         setAssetError((error as Error).message);
      } finally {
         setAssetLoading(false);
      }
   };

   useEffect(() => {
      if (user?.is_binance) {
         fetchAssets();
      }
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
