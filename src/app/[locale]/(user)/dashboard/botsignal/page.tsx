import TradingViewWidget from "@/app/_components/common/dashboard/TradingViewWidget/TradingViewWidget";
import TradingBotForm from "@/app/_components/common/forms/Tradingbot/Tradningbot";
import UserStrategy from "@/app/_components/common/user/UserStrategy";

export default function page() {
  return (
    <div className="botsignal">
      <UserStrategy type="signal" />
      <div style={{ height: '60vh' }} className="mt-6 mb-16 pe-3">
        <TradingViewWidget />
      </div>
      <div className="tradingbot-form">
        <TradingBotForm type="signal" />
      </div>
    </div>
  )
} 
