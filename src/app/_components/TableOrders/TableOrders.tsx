"use client"

import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { useState, useEffect } from 'react';
import Loading from '../common/loading/Loading';

export default function TableOrders() {
   const [accessToken, setAccessToken] = useState<string | null>(null);
   const [rowData, setRowData] = useState<any[]>([]);
   const [colDefs, setColDefs] = useState<any[]>([]);
   const { data, loading } = useFetch(`${API_BASE_URL}/users/me/orders`, {
      method: "GET",
      headers: {
         authorization: `Bearer ${accessToken}`,
      },
   });
   useEffect(() => {
      const storedAccessToken = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null;
      setAccessToken(storedAccessToken);
   }, []);

   useEffect(() => {
      if (data) {
         setRowData(data);

         setColDefs([
            { field: 'symbol', headerName: 'Symbol' },
            { field: 'quantity', headerName: 'Quantity' },
            { field: 'profit_threshold', headerName: 'Profit Threshold' },
            { field: 'trailing_stop_loss', headerName: 'Trailing Stop Loss' },
            { field: 'cycles_count', headerName: 'Cycles Count' },
            { field: 'strategy', headerName: 'Strategy' },
            { field: 'status', headerName: 'Status' },
            { field: 'created_at', headerName: 'Created At' },
            { field: 'updated_at', headerName: 'Updated At' },
         ]);
      }
   }, []);

   if (loading || !accessToken) {
      return <Loading />
   }

   return (
      <div className="ag-theme-quartz mb-5 mt-10" style={{ height: 500 }}>
         <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
         />
      </div>
   );
}
