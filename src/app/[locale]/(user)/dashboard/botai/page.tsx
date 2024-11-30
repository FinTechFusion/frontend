// import TradingViewWidget from "@/app/_components/common/dashboard/TradingViewWidget/TradingViewWidget";
// import TradingBotForm from "@/app/_components/common/forms/Tradingbot/Tradningbot";
// import UserStrategy from "@/app/_components/common/user/UserStrategy";

import Textbox from "@/app/_components/common/Text/Textbox";

export default function page() {
  return (
    <div className="botai">
      {/* <UserStrategy type="ai" />
      <div style={{ height: '60vh' }} className="my-6 pe-3">
        <TradingViewWidget />
      </div>
      <div className="tradingbot-form">
        <TradingBotForm type="ai" />
      </div> */}
      <Textbox title="Our Ai Bot is coming soon!" description="Get ready for an intelligent conversation experience. Our Al bot will revolutionize how you interact with our webapp." />
    </div>
  )
} 
