"use client"
import { useLocale } from 'next-intl';
import { ToastContainer } from 'react-toastify';

export default function Toast() {
   const locale = useLocale();
   return (
      <ToastContainer
         position={locale === "ar" ? "top-right" : "top-left"}
         autoClose={3000}
         closeOnClick
         pauseOnHover={true}
         hideProgressBar={false}
         rtl={locale === "ar"}
         theme="light"
         limit={1}
      />
   )
}
