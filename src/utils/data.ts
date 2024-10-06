import { FiShield } from "react-icons/fi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaWallet } from "react-icons/fa6";
import { PlatformFeature } from "./types";

export const tradingPlatformData: PlatformFeature[] = [
   {
      icon: FiShield,
      titleKey: "secure_trading",
      descriptionKey: "secure_trading_info",
   },
   {
      icon: AiOutlineThunderbolt,
      titleKey: "fast_execution",
      descriptionKey: "fast_execution_info",
   },
   {
      icon: FaWallet,
      titleKey: "intuitive_wallet",
      descriptionKey: "intuitive_wallet_info",
   },
];

