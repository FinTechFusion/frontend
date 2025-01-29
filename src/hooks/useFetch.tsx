"use client"
import { useState, useEffect, useCallback } from 'react';

type FetchOptions = RequestInit;

const useFetch = (url: string, options?: FetchOptions,dependencies: any[] = []): any => {
   const [data, setData] = useState<null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   const fetchData = useCallback(async () => {
      try {
         setLoading(true);
         const response = await fetch(url, options);
         if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
         }
         const { data } = await response.json();
         setData(data);
      } catch (err) {
         setError((err as Error).message);
      } finally {
         setLoading(false);
      }
   }, [url, options]);

   useEffect(() => {
      fetchData();
   },dependencies);

   return { data, loading, error, refetch: fetchData }; // Expose refetch as a property
};

export default useFetch;

