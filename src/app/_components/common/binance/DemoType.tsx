import Link from "next/link";
import { useTranslations } from "next-intl";

export default function DemoType() {
   const t = useTranslations("binance");
   function setDemoTypeToStorage() {
      sessionStorage.setItem("type", "demo")
   }
   return (
      <Link href="/dashboard" onClick={setDemoTypeToStorage}>
         <b className="text-primary-700 text-xl cursor-pointer">{t("startAtDemo")}</b>
      </Link>)
}
