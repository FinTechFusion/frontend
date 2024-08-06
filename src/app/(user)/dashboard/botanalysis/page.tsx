import TradingViewWidget from "@/app/_components/common/dashboad/TradingViewWidget/TradingViewWidget";
import TradningBotForm from "../../../_components/common/forms/Tradingbot/Tradningbot";
import BotLogs from "@/app/_components/common/dashboad/BotLogs/Botlogs";

export default function page() {
  return (
    <>
      <div style={{ height: '60vh' }} className="my-6 pe-3">
        <TradingViewWidget />
      </div>
      <div className="tradingbot-form">
        <TradningBotForm />
        <div className="logs-conatiner md:w-4/5 w-full">
          <BotLogs />
        </div>
      </div>

    </>
  )
} 
