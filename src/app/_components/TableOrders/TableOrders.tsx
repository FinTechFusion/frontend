"use client"

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { API_BASE_URL } from '@/utils/api';
import { useState, useEffect } from 'react';
import Loading from '../common/loading/Loading';

export default function TableOrders() {
   const [accessToken, setAccessToken] = useState<string | null>(null);
   const [rowData, setRowData] = useState<any[]>([]);
   const [colDefs, setColDefs] = useState<any[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<Error | null>(null);

   useEffect(() => {
      const storedAccessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
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
                  { field: 'created_at', headerName: 'Created At', filter: 'agDateColumnFilter' },
                  { field: 'updated_at', headerName: 'Updated At', filter: 'agDateColumnFilter' },
                  { field: 'update', headerName: 'Update' },
               ]);

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
      <div className="ag-theme-quartz mb-5 mt-10" style={{ height: 500 }}>
         <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
            pagination={true}
            paginationPageSize={20}
         />
      </div>
   );
}
