"use client"
import { useState, useEffect } from 'react';

type FetchOptions = RequestInit;

// type FetchHookResult<T> = {
//    data: T | null;
//    loading: boolean;
//    error: string | null;
// };

const useFetch = (url: string, options?: FetchOptions): any => {
   const [data, setData] = useState<null>(null);
   const [loading, setLoading] = useState<boolean>(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchData = async () => {

         try {
            setLoading(true);
            const response = await fetch(url, options);
            if (!response.ok) {
               throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const { data } = await response.json();
            console.log(data)
            setData(data);
         } catch (err) {
            setError((err as Error).message);
         } finally {
            setLoading(false);
         }
      };

      fetchData();
   }, []);

   return { data, loading, error };
};

export default useFetch;