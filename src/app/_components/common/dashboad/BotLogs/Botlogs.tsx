"use client";

import { useState, useEffect } from "react";
import { getTokenFromStorage } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
// @ts-ignore
// import ndjsonStream from "can-ndjson-stream";

interface Log {
   timestamp: string;
   message: string;
}

export default function BotLogs() {
   const [logs, setLogs] = useState<Log[]>([]);
   const [rawOutput, setRawOutput] = useState<string[]>([]);
   const accessToken = getTokenFromStorage("access_token");

   // useEffect(() => {
   // const fetchLogs = async () => {
   //    const accessToken = getTokenFromStorage("access_token");
   //    if (!accessToken) {
   //       console.error("No access token found");
   //       setRawOutput(prev => [...prev, "Error: No access token found"]);
   //       return;
   //    }

   //    try {
   //       const response = await fetch(`${API_BASE_URL}/users/me/orders/logs`, {
   //          method: "GET",
   //          headers: {
   //             authorization: `Bearer ${accessToken}`,
   //          },
   //       });

   //       if (!response.ok) {
   //          throw new Error(`HTTP error! status: ${response.status}`);
   //       }

   //       const exampleStream = ndjsonStream(response.body);
   //       const reader = exampleStream.getReader();

   //       const readChunk = async (): Promise<void> => {
   //          const { done, value } = await reader.read();
   //          if (done) {
   //             setRawOutput(prev => [...prev, "Stream complete"]);
   //             return;
   //          }

   //          // Log raw value
   //          console.log("Received value:", value);
   //          setRawOutput(prev => [...prev, JSON.stringify(value)]);

   //          // Add to logs if it matches the Log interface
   //          if (typeof value === 'object' && value !== null && 'timestamp' in value && 'message' in value) {
   //             setLogs(prevLogs => [...prevLogs, value as Log]);
   //          }

   //          await readChunk();
   //       };

   //       await readChunk();
   //    } catch (err) {
   //       console.error("Error fetching logs:", err);
   //       setRawOutput(prev => [...prev, `Error: ${err instanceof Error ? err.message : "An unknown error occurred"}`]);
   //    }
   // };
   // fetchLogs();
   // }, []);

   useEffect(() => {
      async function fetchLogs() {
         try {
            const response = await fetch(`${API_BASE_URL}/users/me/orders/logs`, {
               method: "GET",
               headers: {
                  authorization: `Bearer ${accessToken}`,
               },
            })
            if (!response.ok) {
               throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            console.log(data);
         }
         catch (err) {
            console.log(err)
         }
      }
      fetchLogs()
   }, []);
   return (
      <div className="bot-logs py-2">
         <h3 className="text-xl font-medium capitalize text-dark w-fit py-2 border-b-2 border-primary-600">
            Bot Logs
         </h3>
         <div className="log-output bg-gray-200 p-3 my-2 rounded-md overflow-y-auto max-h-52">
            <h4 className="font-bold">Parsed Logs:</h4>
            {logs.map((log, index) => (
               <p key={index} className="bg-gray-100 text-lg p-2 rounded-md my-3">
                  {log.timestamp} - {log.message}
               </p>
            ))}
         </div>
         <div className="raw-output bg-gray-200 p-3 my-2 rounded-md overflow-y-auto max-h-52">
            <h4 className="font-bold">Raw Output:</h4>
            {rawOutput.map((output, index) => (
               <p key={index} className="bg-gray-100 text-sm p-2 rounded-md my-1 font-mono">
                  {output}
               </p>
            ))}
         </div>
      </div>
   );

}



