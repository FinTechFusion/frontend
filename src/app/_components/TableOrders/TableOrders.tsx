"use client"
import React, { useState, useEffect, useMemo } from 'react';
import { AgGridReact } from 'ag-grid-react';
import { ColDef } from 'ag-grid-community';
import { MdDelete } from 'react-icons/md';
import { API_BASE_URL } from '@/utils/api';
import { getTokenFromStorage } from '@/context/AuthContext';
import Loading from '../common/loading/Loading';
import Textbox from '../common/Text/Textbox';
import { toast } from 'react-toastify';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { Order } from '@/utils/types';



const TableOrders: React.FC = () => {
   const accessToken = getTokenFromStorage("access_token");
   const [rowData, setRowData] = useState<Order[]>([]);
   const [loading, setLoading] = useState(true);

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

   // const handleDelete = async (id: string) => {
   //    try {
   //       const accessToken = getTokenFromStorage("access_token");
   //       const response = await fetch(`${API_BASE_URL}/users/me/orders/${id}`, {
   //          method: "DELETE",
   //          headers: {
   //             Authorization: `Bearer ${accessToken}`,
   //          },
   //       });

   //       if (!response.ok) {
   //          throw new Error('Failed to delete order');
   //       }

   //       setRowData(prevData => prevData.filter(order => order.id !== id));
   //       toast.success('Order deleted successfully');
   //    } catch (error) {
   //       console.error('Error deleting order:', error);
   //       toast.error('Failed to delete order');
   //    }
   // };

   const columnDefs = useMemo<ColDef[]>(() => [
      { field: 'symbol', headerName: 'Symbol', filter: true,valueFormatter: (params) => params.value.toUpperCase() },
      { field: 'quantity', headerName: 'Quantity', filter: 'agNumberColumnFilter' },
      { field: 'profit_threshold', headerName: 'Profit Threshold', filter: 'agNumberColumnFilter' },
      { field: 'trailing_stop_loss', headerName: 'Trailing Stop Loss', filter: 'agNumberColumnFilter' },
      { field: 'cycles', headerName: 'Cycles Count', filter: 'agNumberColumnFilter' },
      { field: 'strategy', headerName: 'Strategy', filter: true },
      { field: 'status', headerName: 'Status', filter: true },
      {
         field: 'created_at',
         headerName: 'Created At',
         filter: 'agDateColumnFilter',
         valueFormatter: (params) => formatDate(params.value),
      },
      {
         field: 'updated_at',
         headerName: 'Updated At',
         filter: 'agDateColumnFilter',
         valueFormatter: (params) => formatDate(params.value),
      },
      {
         field: 'delete',
         headerName: 'Delete',
         cellRenderer: (params: any) => (
            <MdDelete
               className="text-red-600 cursor-pointer text-3xl h-full"
            // onClick={() => handleDelete(params.data.id)}
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

         const data = await response.json();
         setRowData(data.data);
      } catch (error) {
         console.error('Error fetching user orders:', error);
         toast.error('Failed to load orders');
      } finally {
         setLoading(false);
      }
   };

   useEffect(() => {
      fetchUserOrders();
   }, []);

   if (loading) return <Loading />;

   return (
      <>
         <Textbox
            mainClass="mt-5"
            title='Your current orders'
            description='View and manage your active orders'
         />
         <div className="ag-theme-quartz my-5" style={{ height: 500 }}>
            <AgGridReact
               rowData={rowData}
               columnDefs={columnDefs}
               pagination={true}
               paginationPageSize={20}
               rowSelection="multiple"
               suppressCellFocus={true}
            />
         </div>
      </>
   );
};

export default TableOrders;