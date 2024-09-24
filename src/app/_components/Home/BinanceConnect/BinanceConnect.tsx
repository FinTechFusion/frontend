"use client"
import Textbox from "../../common/Text/Textbox";
import Image from "next/image";
import binanceImage from "/public/assets/images/binancetest.jpg";
import Link from "next/link";
import { FaLink } from "react-icons/fa";
import { useAuth } from "@/context/AuthContext";

export default function BinanceConnect() {
  const { user } = useAuth();
  return (
    <div className="grid md:grid-cols-2 justify-between items-center gap-6 py-8">
      <div className="integrate">
        <Textbox title="Seamless Integration with Binance" description="We&apos;ve partnered with Binance, the world&apos;s leading cryptocurrency exchange, to provide you with unparalleled trading opportunities and liquidity." descriptionClass="md:w-3/4 w-full" />
        <ul className="list-disc pl-5 pb-5">
          <li className="text-lg py-1">Easy account linking</li>
          <li className="text-lg py-1">Real-time data synchronization</li>
          <li className="text-lg py-1">Access to Binance&apos;s extensive range of trading pairs</li>
          <li className="text-lg py-1">Leverage Binance&apos;s robust API for advanced trading strategies</li>
        </ul>
        {!user?.is_binance ? <Link href="/site/exchange/connect">
          <button className="main-btn flex justify-center items-center gap-2">
            connect your account
            <FaLink className="pt-1" />
          </button>
        </Link> : <Link href="/dashboard">
          <button className="main-btn ">
            Start Trial
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
