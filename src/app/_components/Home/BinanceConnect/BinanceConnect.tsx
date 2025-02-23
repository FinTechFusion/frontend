"use client"
import Image from "next/image";
import binanceImage from "/public/assets/images/binancetest.jpg";
import { Link } from '@/i18n/navigation';
import { FaLink } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import Textbox from '@/app/_components/common/Text/Textbox';

export default function BinanceConnect() {
  const { user } = useAuth();
  const t = useTranslations("");
  return (
    <div className="grid md:grid-cols-2 justify-between items-center gap-6 py-8">
      <div className="integrate">
        <Textbox title="integrate_heading" description="integrate_description" descriptionClass="md:w-3/4 text-lg w-full" />
        <ul className="list-disc px-5 pb-5">
          <li className="text-lg py-1">{t("integrate_feat_1")}</li>
          <li className="text-lg py-1">{t("integrate_feat_2")}</li>
          <li className="text-lg py-1">{t("integrate_feat_3")}</li>
          <li className="text-lg py-1">{t("integrate_feat_4")}</li>
        </ul>
        {!user?.is_binance ? <Link href="/dashboard/connect-manual">
          <button className="main-btn flex justify-center items-center gap-2">
            {t("connect_acc")}
            <FaLink className="pt-1" />
          </button>
        </Link> : <Link href="/dashboard">
          <button className="main-btn ">
            {t("trail_btn")}
          </button>
        </Link>}
      </div>
      <div className="flex md:justify-end justify-center">
        <Image
          src={binanceImage}
          alt="Binance"
          className="md:w-[85%] rounded w-full"
        />
      </div>
    </div>
  )
}
