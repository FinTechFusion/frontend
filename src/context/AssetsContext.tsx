"use client";

import { API_BASE_URL } from "@/utils/api";
import { createContext, useContext, useState, useMemo, ReactNode } from "react";
import { getFromCookies } from "@/context/AuthContext";
import { ApiError, AssetDataContextType, AssetInfo } from "../utils/types";
import { useAuth } from "@/context/AuthContext";

const AssetDataContext = createContext<AssetDataContextType | undefined>(
  undefined
);

export const AssetDataProvider = ({ children }: { children: ReactNode }) => {
  const [assetData, setAssetData] = useState<AssetInfo[]>([]);
  const [limit] = useState<number>(5);
  const [currentOffset, setCurrentOffset] = useState<number>(0);
  const [counts, setCounts] = useState(0);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [assetLoading, setAssetLoading] = useState<boolean>(false);
  const [assetError, setAssetError] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<ApiError | null>(null);
  const { user } = useAuth();
  const accessToken:any = getFromCookies("access_token");

  const fetchAssets = async () => {
    if (!user || !accessToken) return;
    setAssetLoading(true);
    setAssetError(null);
    setErrorMessage(null);
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/me/assets?limit=${limit}&offset=${currentOffset}`,
        {
          method: "GET",
          next: { revalidate: 60 },
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (response.ok && responseData.success) {
        setCounts(responseData.data.total);
        const fetchTickers = responseData?.data?.items.map((asset: any) =>
          fetch(`${API_BASE_URL}/binance/${asset.symbol}/ticker`, {
            method: "GET",
            next: { revalidate: 120 },
            headers: {
              authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          })
            .then((response) => response.json())
            .then((tickerData) => {
              return {
                symbol: asset.symbol,
                quantity: asset.quantity,
                price_change_percent:
                  tickerData.data?.price_change_percent?.toFixed(2) || "N/A",
                last_price:
                  asset.symbol.toUpperCase() === "USDT"
                    ? "1"
                    : tickerData.data?.last_price?.toFixed(2) || "N/A",
              };
            })
            .catch((error) => {
              console.error(
                `Error fetching ticker for ${asset.symbol}:`,
                error
              );
              return {
                symbol: asset.symbol,
                quantity: asset.quantity,
                price_change_percent: "Error",
                last_price: "Error",
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
        setAssetError(error?.detail);
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
    if (newOffset !== currentOffset) {
      setCurrentOffset(newOffset);
      setCurrentPage(selectedPage);
    }
  };
  useMemo(() => {
    fetchAssets();
  }, [currentOffset, user?.is_demo]);

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
    throw new Error("useAssetData must be used within an AssetDataProvider");
  }
  return context;
};
