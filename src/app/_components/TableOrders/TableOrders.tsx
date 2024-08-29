"use client"

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { MdEditSquare, MdDelete } from 'react-icons/md';
import { API_BASE_URL } from '@/utils/api';
import { useState, useEffect } from 'react';
import Loading from '../common/loading/Loading';
import Textbox from '../common/Text/Textbox';
import { getTokenFromStorage } from '@/context/AuthContext';

export default function TableOrders() {
   const [accessToken, setAccessToken] = useState<string | null>(null);
   const [rowData, setRowData] = useState<any[]>([]);
   const [colDefs, setColDefs] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);
   function handleDelete() {

   }
   const formatDate = (dateString: string) => {
      const options: Intl.DateTimeFormatOptions = {
         year: 'numeric',
         month: '2-digit',
         day: '2-digit',
         hour: '2-digit',
         minute: '2-digit',
      };
      return new Date(dateString).toLocaleString(undefined, options);
   };
   useEffect(() => {
      const storedAccessToken = typeof window !== 'undefined' ? getTokenFromStorage('access_token') : null;
      setAccessToken(storedAccessToken);
   }, []);

   useEffect(() => {
      if (accessToken) {
         fetch(`${API_BASE_URL}/users/me/orders`, {
            method: "GET",
            headers: {
               authorization: `Bearer ${accessToken}`,
            },
            next: { revalidate: 60 }
         })
            .then(response => response.json())
            .then(data => {
               setRowData(data.data);
               setColDefs([
                  { field: 'symbol', headerName: 'Symbol', filter: true },
                  { field: 'quantity', headerName: 'Quantity', filter: 'agNumberColumnFilter' },
                  { field: 'profit_threshold', headerName: 'Profit Threshold', filter: 'agNumberColumnFilter' },
                  { field: 'trailing_stop_loss', headerName: 'Trailing Stop Loss', filter: 'agNumberColumnFilter' },
                  { field: 'cycles_count', headerName: 'Cycles Count', filter: 'agNumberColumnFilter' },
                  { field: 'strategy', headerName: 'Strategy', filter: true },
                  { field: 'status', headerName: 'Status', filter: true },
                  {
                     field: 'created_at',
                     headerName: 'Created At',
                     filter: 'agDateColumnFilter',
                     valueFormatter: (params: any) => formatDate(params.value),
                  },
                  {
                     field: 'updated_at',
                     headerName: 'Updated At',
                     filter: 'agDateColumnFilter',
                     valueFormatter: (params: any) => formatDate(params.value),
                  },
                  {
                     field: 'delete',
                     headerName: 'Delete',
                     cellRendererFramework: (params: any) => (
                        <MdDelete className="text-red-500 cursor-pointer" />
                     ),
                  },]);

               setLoading(false);
            })
            .catch(err => {
               setError(err);
               setLoading(false);
            });
      }
   }, [accessToken]);

   if (loading || accessToken === null) {
      return <Loading />;
   }

   if (error) {
      console.log(error);
   }

   return (
      <>
         <Textbox mainClass="mt-5" title='Your current orders.' description='View, edit, and delete your active orders' />
         <div className="ag-theme-quartz my-5 h-fit" style={{ height: 500 }}>
            <AgGridReact
               rowData={rowData}
               columnDefs={colDefs}
               pagination={true}
               paginationPageSize={20}
            />
         </div>
      </>
   );
}
