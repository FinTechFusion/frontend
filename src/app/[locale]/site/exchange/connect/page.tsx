"use client"
import Image from "next/image";
import Binance from "@/app/_components/common/Binance";
import binanceImg from "/public/assets/images/binanice.png"
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import { API_BASE_URL } from '@/utils/api';
import useFetch from "@/hooks/useFetch";
import Loading from '@/app/_components/common/loading/Loading';
import { useLocale, useTranslations } from "next-intl";
import { IoClose } from "react-icons/io5";
import { Link, useRouter } from "@/i18n/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Page() {
   const t = useTranslations("binance");
   const router = useRouter();
   const locale = useLocale();
   const {user} = useAuth();
   const { data, loading } = useFetch(`${API_BASE_URL}/users/me/binance/link`,{
      method:'GET',
      next: { revalidate: 60 },
   },[]);
   if (loading) return <Loading />;
   if(user?.is_binance) return router.push('/dashboard');
   return (
      <div className="relative">
         <div className="opacity-25">
            <Binance />
         </div>
         <aside className={`absolute top-0 bottom-0 ${locale === "en" ? "left-0" : "right-0"} bg-secondary lg:w-1/3 md:w-1/2 w-full p-6 shadow`}>
            <Link href='/site/exchange'>
               <IoClose className={`text-3xl font-bold absolute top-3 ${locale === "en" ? "right-2" : "left-2"} cursor-pointer text-secondary bg-red-600 rounded`} />
            </Link>
            <div className="flex justify-between items-center pt-5">
               <h2 className="text-2xl font-medium capitalize">{t("connectExchange")}</h2>
               <div className="binance-logo">
                  <Image
                     src={binanceImg}
                     alt="binance-logo"
                     width="160"
                     height="160"
                     className="md:block hidden"
                  />
               </div>
            </div>
            <div className="connect-steps my-6">
               <ul>
                  <li className="my-8 capitalize text-lg font-medium flex items-center">
                     <span className="bg-primary-600 me-4 text-2xl rounded-full text-secondary w-[45px] h-[45px] flex justify-center items-center">1</span>{t("clickAtConnect")}</li>
                  <li className="my-8 capitalize text-lg font-medium flex items-center">
                     <span className="bg-primary-600 me-4 text-2xl rounded-full text-secondary w-[45px] h-[45px] flex justify-center items-center">2</span>{t("loginBinance")}</li>
                  <li className="my-8 capitalize text-lg font-medium flex items-center">
                     <span className="bg-primary-600 me-4 text-2xl rounded-full text-secondary w-[45px] h-[45px] flex justify-center items-center">3</span>{t("confirmConnect")}</li>
               </ul>
            </div>
            <div className="connection mx-auto text-center">
               <p className="py-4 text-lg tracking-wider">{t("availableTypes")}</p>
               <Link href={`${data?.authorization_url}`}>
                  <MainBtn content="binance.connect_binance" btnProps="w-fit" />
               </Link>
               <p className="py-5 w-1/2 text-center mx-auto capitalize">{t("donthaveBinance")} <Link href='https://accounts.binance.com/ar/register' target="_blank" className="text-primary-600 cursor-pointer">{t("createAccount")}</Link></p>
            </div>
         </aside>
      </div>
   )
}
