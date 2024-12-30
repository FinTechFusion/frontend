"use client";

import { useState, useEffect } from "react";
import { API_BASE_URL } from "@/utils/api";
import { BotLogsProps, Log } from "@/utils/types";
import { useTranslations } from 'next-intl';
import { getFromCookies } from "@/context/AuthContext";


export default function BotLogs({ orderId }: BotLogsProps) {
   const [logs, setLogs] = useState<Log[]>([]);
   const [rawOutput, setRawOutput] = useState<string[]>([]);
   const accessToken = getFromCookies("access_token");
   const t = useTranslations("dashboard.botlogs");
   async function fetchLogs(orderId: string) {
      try {
         const response = await fetch(`${API_BASE_URL}/users/me/orders/${orderId}/logs`, {
            method: "GET",
            headers: {
               authorization: `Bearer ${accessToken}`,
               'Content-Type': 'application/json',
            },
         });
         if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
         }

         if (!response.body) {
            throw new Error("ReadableStream not supported or response body is null.");
         }

         const reader = response.body.getReader();
         const decoder = new TextDecoder('utf-8');
         let ndjson = '';

         while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            ndjson += decoder.decode(value, { stream: true });

            let lines = ndjson.split('\n');
            ndjson = lines.pop() || ''; // Keep the last incomplete line

            lines.forEach(line => {
               if (line.trim()) {
                  try {
                     const logEntry = JSON.parse(line);
                     setLogs(prevLogs => [...prevLogs, logEntry]);
                     setRawOutput(prevRaw => [...prevRaw, line]);
                  } catch (parseError) {
                     console.error('Error parsing line:', line, parseError);
                  }
               }
            });
         }

         if (ndjson.trim()) {
            try {
               const logEntry = JSON.parse(ndjson);
               setLogs(prevLogs => [...prevLogs, logEntry]);
               setRawOutput(prevRaw => [...prevRaw, ndjson]);
            } catch (parseError) {
               console.error('Error parsing remaining data:', ndjson, parseError);
            }
         }

      } catch (err) {
         console.log('Fetch error:', err);
      }
   }

   useEffect(() => {
      if (orderId) {
         fetchLogs(orderId);
      }
   }, [orderId]);

   return (
      <div className="bot-logs w-full py-2">
         <h3 className="text-xl font-medium capitalize text-dark w-fit py-2 border-b-2 border-primary-600">
            {t("title")}
         </h3>
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
