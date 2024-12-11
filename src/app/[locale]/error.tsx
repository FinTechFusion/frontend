"use client"
import { useTranslations } from "next-intl";
import { useEffect } from "react";

interface errorPageProps {
   error: Error,
   reset: () => void,
}

export default function Error({ error, reset }: errorPageProps) {
   const t = useTranslations("errorPage");
   useEffect(() => {
      let hasReset = false;
      if (error && !hasReset) {
         reset();
         hasReset = true;
         console.log("Error reset triggered");
      }
   }, []); // No dependencies, ensures one-time execution

   return (
      <div className="flex flex-col gap-y-5 justify-center items-center min-h-screen px-3 text-center">
         <h2 className="text-3xl font-bold py-6">{t("title")}</h2>
         {/* <h2 className="text-2xl font-bold text-red-500">{error?.message}</h2> */}
         <p className="text-xl text-gray-700">{t("description")}</p>
         <button className="main-btn" onClick={() => reset()}>{t("tryAgain")}</button>
         {/* <Link href="/" >
            <MainBtn content="backhome" btnProps="w-fit" />
         </Link> */}
      </div>
   )
}
