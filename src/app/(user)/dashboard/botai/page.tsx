import TradingViewWidget from "@/app/_components/common/dashboard/TradingViewWidget/TradingViewWidget";
import BotLogs from "@/app/_components/common/dashboard/BotLogs/Botlogs";
import TradingBotForm from "@/app/_components/common/forms/Tradingbot/Tradningbot";
import UserStrategy from "@/app/_components/common/user/UserStrategy";

export default function page() {
  return (
    <>
      <UserStrategy type="ai" />
      <div style={{ height: '60vh' }} className="my-6 pe-3">
        <TradingViewWidget />
      </div>
      <div className="tradingbot-form">
        <TradingBotForm type="ai" />
        <div className="logs-conatiner w-full">
          <BotLogs />
        </div>
      </div>
    </>
  )
} 
