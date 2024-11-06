"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { MdDelete } from 'react-icons/md';
import { API_BASE_URL } from '@/utils/api';
import { getTokenFromStorage } from '@/context/AuthContext';
import Loading from '../common/loading/Loading';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Order } from '@/utils/types';
import { useLocale, useTranslations } from 'next-intl';
import { toast } from 'react-toastify';
import Toast from './../common/Tostify/Toast';

const TableOrders = () => {
   const accessToken = getTokenFromStorage("access_token");
   const [rowData, setRowData] = useState<Order[]>([]);
   const [loading, setLoading] = useState(true);
   const t = useTranslations("dashboard");
   const locale = useLocale();
   const formatDate = (dateString: string): string => {
      const options: Intl.DateTimeFormatOptions = {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
      };
      return new Date(dateString).toLocaleString(undefined, options);
   };

   const handleDelete = async (order: any) => {
      if (order.status === "pending") {
         try {
            const accessToken = getTokenFromStorage("access_token");
            const response = await fetch(`${API_BASE_URL}/users/me/orders/${order.id}?lang=${locale}`, {
               method: "DELETE",
               headers: {
                  Authorization: `Bearer ${accessToken}`,
               },
            });
            const responseData = await response.json();
            if (response.ok) {
               toast.success(t("deleteOrderSuccess"));
            }
            else {
               toast.error(responseData.detail);
            }
            await fetchUserOrders();
         } catch (error) {
            toast.error(t("failedDeleteOrder"));
         }
      }
      else {
         toast.info(t("cantDeleteOrder"))
      }

   };

   const columnDefs = useMemo<ColDef[]>(() => [
      { field: 'symbol', headerName: t('orderCols.symbol'), filter: true, valueFormatter: (params) => params.value.toUpperCase() },
      { field: 'quantity', headerName: t('orderCols.quantity'), filter: 'agNumberColumnFilter' },
      { field: 'trailing_stop_loss', headerName: t('orderCols.trailing_stop_loss'), filter: 'agNumberColumnFilter' },
      { field: 'cycles', headerName: t('orderCols.cycles'), filter: 'agNumberColumnFilter' },
      { field: 'strategy', headerName: t('orderCols.strategy'), filter: true },
      { field: 'status', headerName: t('orderCols.status'), filter: true },
      { field: 'profit', headerName: t('orderCols.profit'), filter: true },
      {
         field: 'created_at',
         headerName: t('orderCols.created_at'),
         filter: 'agDateColumnFilter',
         valueFormatter: (params) => formatDate(params.value),
      },
      {
         field: 'updated_at',
         headerName: t('orderCols.updated_at'),
         filter: 'agDateColumnFilter',
         valueFormatter: (params) => formatDate(params.value),
      },
      {
         field: 'delete',
         headerName: t('orderCols.delete'),
         cellRenderer: (params: any) => (
            <MdDelete
               className="text-red-600 cursor-pointer text-3xl h-full"
               onClick={() => handleDelete(params.data)}
            />
         ),
      },
   ], []);
   const fetchUserOrders = async () => {
      try {
         const response = await fetch(`${API_BASE_URL}/users/me/orders`, {
            method: "GET",
            headers: {
               Authorization: `Bearer ${accessToken}`,
            },
         });
         if (!response.ok) {
            throw new Error('Failed to fetch orders');
         }
         const { data } = await response.json();
         const orders = data.items;
         // Fetch profit for each order
         const ordersWithProfit = await Promise.all(
            orders.map(async (order: any) => {
               const profit = await fetchOrderProfit(order.id);
               console.log(profit)
               return { profit, ...order }
            })
         )
         setRowData(ordersWithProfit);
      } catch (error) {
         console.error('Error fetching user orders:', error);
      } finally {
         setLoading(false);
      }
   };

   // Fetch profit based on order ID
const fetchOrderProfit = async (orderId: string): Promise<number | string> => {
   try {
      const response = await fetch(`${API_BASE_URL}/users/me/orders/${orderId}/trades`, {
         method: "GET",
         headers: {
            Authorization: `Bearer ${accessToken}`,
         }
      });

      if (!response.ok) {
         throw new Error('Failed to fetch profit');
      }

      const { data } = await response.json();

      if (data?.items.length < 2) {
         return 'N/A';
      }

      // Ensure we have an even number of items by removing the last one if odd
      if (data.items.length % 2 !== 0) {
         data.items.pop();
      }

      // Initialize total profit
      let totalProfit = 0;

      // Iterate over pairs and add up the profits
      for (let i = 0; i < data.items.length; i += 2) {
         const buyPrice = data.items[i].price;
         const sellPrice = data.items[i + 1].price;

         // Calculate profit for this pair
         let pairProfit = (sellPrice - buyPrice) / 100;

         // Adjust if the pairProfit multiplied by 100 is odd
         if (Math.floor(pairProfit * 100) % 2 !== 0) {
            pairProfit = parseFloat(pairProfit.toFixed(5).slice(0, -1));
         }

         // Add the adjusted pair profit to total profit
         totalProfit += pairProfit;
      }

      // Return total profit with fixed precision of 8 decimals
      return parseFloat(totalProfit.toFixed(8));
   }
   catch (error) {
      console.error(`Error fetching profit`, error);
      return 'Error fetching profit';
   }
};


   useEffect(() => {
      fetchUserOrders();
   }, []);
   if (loading) return <Loading />;

   return (
      <>
         <Toast />
         <div className="mt-5">
            <h2 className="md:text-3xl text-2xl font-bold text-dark hover:text-primary-700 w-fit">{t("currentOrders")}</h2>
            <p className="py-4 text-lg text-gray-500">{t("manageOrders")}</p>
         </div>
         <div className="ag-theme-quartz my-5" style={{ height: 1000 }}>
            <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}
               paginationPageSize={5}
               suppressCellFocus={true}
               enableRtl={locale === "ar" && true}
            />
         </div>
      </>
   );
};

export default TableOrders;