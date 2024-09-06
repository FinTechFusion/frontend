"use client";
import { useState, useEffect } from "react";
import Loading from '@/app/_components/common/loading/Loading';
import { getTokenFromStorage } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";

// Define the expected shape of the log data
interface Log {
   timestamp: string;
   message: string;
}

export default function BotLogs() {
   const [logs, setLogs] = useState<Log[]>([]);
   const [isLoading, setIsLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
   const accessToken = getTokenFromStorage("access_token");

   useEffect(() => {
      const fetchLogs = async () => {
         try {
            const response = await fetch(`${API_BASE_URL}/orders/logs`, {
               method: "GET",
               headers: {
                  "Content-Type": "application/json",
                  authorization: `Bearer ${accessToken}`,
               },
            });

            if (!response.ok) {
               throw new Error(`Error: ${response.status}`);
            }

            const data = await response.json();

            console.log(data);
            setLogs(data); 
            setIsLoading(false);
         } catch (error: any) {
            setError(error.message);
            setIsLoading(false);
         }
      };

      fetchLogs(); // Fetch logs when the component mounts
   }, []);

   if (isLoading) return <Loading />;
   if (error) return <p>{error}</p>;

   return (
      <div className="bot-logs py-2">
         <h3 className="text-xl font-medium capitalize text-dark w-fit py-2 border-b-2 border-primary-600">Bot Logs</h3>
         <div className="log-output bg-gray-200 p-3 my-2 rounded-md overflow-y-auto max-h-52">
            {logs.map((log, index) => (
               <p key={index} className="bg-gray-100 text-lg p-2 rounded-md my-3">
                  {log.timestamp} - {log.message}
               </p>
            ))}
         </div>
      </div>
   );
}
