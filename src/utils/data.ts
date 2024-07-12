import { FiShield } from "react-icons/fi";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { FaWallet } from "react-icons/fa6";
import { PlatformFeature } from "./types";

export const tradingPlatformData: PlatformFeature[] = [
   {
      icon: FiShield,
      title: "Secure Trading",
      description: "prioritizes top-tier security, ensuring the protection of both your assets and personal information.",
   },
   {
      icon: AiOutlineThunderbolt,
      title: "Fast Execution",
      description: "Experience lightning-fast trade execution with our state-of-the-art trading engine.",
   },
   {
      icon: FaWallet,
      title: "Intuitive Wallet",
      description: "Manage your crypto assets with ease using our user-friendly and secure wallet.",
   },
]