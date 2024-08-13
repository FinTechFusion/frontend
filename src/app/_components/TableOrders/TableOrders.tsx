"use client";
import { AgGridReact } from 'ag-grid-react';
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css";
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { useState, useEffect } from 'react';

export default function TableOrders() {
   const { data } = useFetch(`${API_BASE_URL}/users/me/orders`, {
      method: "GET",
      headers: {
         authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiZGFjZGY1My01M2Y0LTRlZDgtOGZiMy0zOWI0YmMzMjE1NTEiLCJzY29wZXMiOlsibWU6cmVhZCIsIm1lOndyaXRlIl0sImV4cCI6MTcyMzUxMzg2OX0.4sFb4YfiYNJSSgtRj5r8WIhz_I1WZ6l1xd7Ez4ErgfQ`,
      },
   });

   const [rowData, setRowData] = useState<any[]>([]);
   const [colDefs, setColDefs] = useState<any[]>([]);

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
   }, [data]);


   return (
      <div className="ag-theme-quartz mb-5 mt-10" style={{ height: 500 }}>
         <AgGridReact
            rowData={rowData}
            columnDefs={colDefs}
         />
      </div>
   );
}
