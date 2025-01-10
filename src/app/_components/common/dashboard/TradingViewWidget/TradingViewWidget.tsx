"use client";
import React, { useEffect, useRef, memo, useState } from "react";

const TradingViewWidget: React.FC = () => {
   const container = useRef<HTMLDivElement>(null);
   const [selectedSymbol, setSelectedSymbol] = useState("BTCUSDT"); // Default symbol

   const symbols = [
      { label: "Bitcoin (BTC)", value: "BTCUSDT" },
      { label: "Ethereum (ETH)", value: "ETHUSDT" },
      { label: "Solana (SOL)", value: "SOLUSDT" },
      { label: "Dogecoin (DOGE)", value: "DOGEUSDT" },
      { label: "Ripple (XRP)", value: "XRPUSDT" },
   ];

   useEffect(() => {
      if (container.current) {
         container.current.innerHTML = ""; // Clear the container to prevent duplicate widgets

         const script = document.createElement("script");
         script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
         script.type = "text/javascript";
         script.async = true;
         script.innerHTML = JSON.stringify({
            autosize: true,
            symbol: selectedSymbol,
            interval: "D",
            timezone: "Etc/UTC",
            theme: "light",
            style: "1",
            locale: "en",
            allow_symbol_change: false,
            calendar: false,
            support_host: "https://www.tradingview.com",
         });
         container.current.appendChild(script);
      }
   }, [selectedSymbol]); // Re-render the widget when the selected symbol changes

   return (
      <div style={{ height: "100%", width: "100%" }}>
         <div style={{ marginBottom: "16px" }}>
            <select
               value={selectedSymbol}
               onChange={(e) => setSelectedSymbol(e.target.value)}
               style={{
                  padding: "8px",
                  fontSize: "16px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
               }}
            >
               {symbols.map((symbol) => (
                  <option key={symbol.value} value={symbol.value}>
                     {symbol.label}
                  </option>
               ))}
            </select>
         </div>
         <div
            className="tradingview-widget-container"
            ref={container}
            style={{ height: "100%", width: "100%" }}
         >
            <div
               className="tradingview-widget-container__widget"
               style={{ height: "calc(100% - 32px)", width: "100%" }}
            ></div>
         </div>
      </div>
   );
};

export default memo(TradingViewWidget);
