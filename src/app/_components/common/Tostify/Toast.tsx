"use client";
import {ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useLocale } from 'next-intl';


export default function Toast() {
   const locale = useLocale();

   return (
      <ToastContainer
         position={locale === "ar" ? "top-right" : "top-left"}
         rtl={locale === "ar"}
         autoClose={2000}
         closeOnClick
         hideProgressBar={false}
         theme="light"
      />
   );
}
