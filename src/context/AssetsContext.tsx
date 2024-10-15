'use client';

import { API_BASE_URL } from '@/utils/api';
import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getTokenFromStorage } from '@/context/AuthContext';

interface ApiError {
   success: boolean;
   detail: string;
   status_code: number;
}

interface AssetDataContextType {
   assetData: any[];
   counts: number;
   assetLoading: boolean;
   assetError: string | null;
   errorMessage: ApiError | null;
   fetchAssets: () => Promise<void>;
   currentPage:number;
   handlePageClick: (event: any) => void;
}

const AssetDataContext = createContext<AssetDataContextType | undefined>(undefined);

export const AssetDataProvider = ({ children }: { children: ReactNode }) => {
   const [assetData, setAssetData] = useState<any[]>([]);
   const [limit] = useState<number>(5);
   const [currentOffset, setCurrentOffset] = useState<number>(0);
   const [counts, setCounts] = useState(0);
   const [currentPage, setCurrentPage] = useState<number>(0);
   const [assetLoading, setAssetLoading] = useState<boolean>(false);
   const [assetError, setAssetError] = useState<string | null>(null);
   const [errorMessage, setErrorMessage] = useState<ApiError | null>(null);


   const fetchAssets = async () => {
      const accessToken = getTokenFromStorage("access_token");
      setAssetLoading(true);
      setAssetError(null);
      setErrorMessage(null);

      try {
         const response = await fetch(`${API_BASE_URL}/users/me/assets?limit=${limit}&offset=${currentOffset}`, {
            method: 'GET',
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
         });
         const responseData = await response.json();
         if (response.ok && responseData.success) {
            setCounts(responseData.data.total);
            const fetchTickers = responseData.data.items.map((asset: any) =>
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
                     last_price: asset.symbol.toUpperCase() === 'USDT' ? '1' : (tickerData.data?.last_price || 'N/A'),
                  }))
                  .catch(error => {
                     console.error(`Error fetching ticker for ${asset.symbol}:`, error);
                     return {
                        symbol: asset.symbol,
                        quantity: asset.quantity,
                        price_change_percent: 'Error',
                        last_price: 'Error',
                     };
                  })
            );

            const results = await Promise.all(fetchTickers);
            setAssetData(results);
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
   // Handle pagination click events
   const handlePageClick = (event: any) => {
      const selectedPage = event.selected;
      const newOffset = selectedPage * limit;
      setCurrentOffset(newOffset);
      setCurrentPage(selectedPage);
   };
   useEffect(() => {
      fetchAssets()
   }, [currentOffset])
   const contextValue: AssetDataContextType = {
      assetData,
      counts,
      assetLoading,
      assetError,
      errorMessage,
      fetchAssets,
      currentPage,
      handlePageClick,
   };

   return (
      <AssetDataContext.Provider value={contextValue}>
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