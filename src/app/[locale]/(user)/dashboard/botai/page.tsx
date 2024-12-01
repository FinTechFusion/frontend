// import TradingViewWidget from "@/app/_components/common/dashboard/TradingViewWidget/TradingViewWidget";
// import TradingBotForm from "@/app/_components/common/forms/Tradingbot/Tradningbot";
// import UserStrategy from "@/app/_components/common/user/UserStrategy";
import Textbox from "@/app/_components/common/Text/Textbox";
import comingSoon from '/public/assets/images/comingsoon.png'
import { useTranslations } from "next-intl";
import Image from "next/image";

export default function Page() {
  const t = useTranslations("dashboard.commingSoon")
  return (
    <div className="botai min-h-96 flex flex-col justify-center items-center gap-y-1 md:px-0 px-2">
      {/* <UserStrategy type="ai" />
      <div style={{ height: '60vh' }} className="my-6 pe-3">
        <TradingViewWidget />
      </div>
      <div className="tradingbot-form">
        <TradingBotForm type="ai" />
      </div> */}
      <Image
      src={comingSoon}
      alt="coming-soon"
      width={120}
      height={120}
      className="my-4"
      />
      <Textbox mainClass="text-center" titleClass="!text-primary-700" title="dashboard.commingSoon.title" description="dashboard.commingSoon.description" descriptionClass="text-xl md:w-2/3 text-center mx-auto p" />
      <b className="md:text-2xl text-secondary bg-gradient-to-r from-primary-500 to-primary-600 bg-primary-500 rounded p-2">{t("stayUpdated")}</b>
    </div>
  )
} 
