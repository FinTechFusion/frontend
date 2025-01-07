"use client";
import { useAuth } from "@/context/AuthContext";
import Textbox from "@/app/_components/common/Text/Textbox";
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import { Link } from "@/i18n/navigation";

export default function BinanceConnectStatus() {
  const { user } = useAuth();
  return (
    !user?.is_binance && (
      <div className="binance-status bg-gray-100 p-6 rounded my-6 grid md:grid-cols-2 grid-cols-1 md:justify-between justify-start items-center md:gap-0 gap-2">
        <Textbox
          titleClass="text-2xl"
          title="dashboard.binanceConnect"
          description="dashboard.connect_status_info"
        />
        <Link href="/site/exchange/connect" className="md:text-end">
          <MainBtn content="connect_acc" btnProps="w-fit" />
        </Link>
      </div>
    )
  );
}
