import TradingViewWidget from "@/app/_components/common/dashboad/TradingViewWidget/TradingViewWidget";
import TradningBotForm from "../../../_components/common/forms/Tradingbot/Tradningbot";

export default function page() {
  return (
    <>
      <div style={{ height: '60vh' }} className="my-6 pe-3">
        <TradingViewWidget />
      </div>
      <div className="tradingbot-form">
        <TradningBotForm />
      </div>
    </>
  )
} 
