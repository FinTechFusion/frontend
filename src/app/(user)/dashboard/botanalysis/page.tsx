import TradingViewWidget from "@/app/_components/common/dashboad/TradingViewWidget/TradingViewWidget";
import TradingBotForm from "@/app/_components/common/forms/Tradingbot/Tradningbot";
import BotLogs from "@/app/_components/common/dashboad/BotLogs/Botlogs";
import UserStrategy from "@/app/_components/common/user/UserStrategy";

export default function page() {
  return (
    <>
      <UserStrategy/>
      <div style={{ height: '60vh' }} className="my-6 pe-3">
        <TradingViewWidget />
      </div>
      <div className="tradingbot-form">
        <TradingBotForm />
        <div className="logs-conatiner  w-full">
          <BotLogs />
        </div>
      </div>
    </>
  )
} 
