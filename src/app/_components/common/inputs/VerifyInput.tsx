"use client";
import { useRouter } from '@/i18n/navigation';
import { API_BASE_URL } from '@/utils/api';
import { useSearchParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Toast from '../Tostify/Toast';
import { useOTPInput } from "@/hooks/useOTPInput";
import React, { Suspense, useState } from 'react';
import Loading from "../loading/Loading";
import { saveTokenToStorage } from "@/context/AuthContext";
import { SpinBtn } from '../Buttons/MainBtn';
import { useLocale, useTranslations } from 'next-intl';

function VerifyInput() {
   const route = useRouter();
   const searchParams = useSearchParams();
   const email = searchParams.get('email');
   const [loadingbtn, SetLoading] = useState(false);
   const { values, inputRefs, handleChange, handleKeyDown } = useOTPInput({ length: 6 });
   const t = useTranslations("auth");

   async function sendCodeToApi(code: number) {
      try {
         SetLoading(true);
         if (!email) {
            return toast.error(t("inavlidEmail"));
         }
         const response = await fetch(`${API_BASE_URL}/auth/verify?otp_code=${code}&email=${email}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
         });

         if (!response.ok) {
            const responseData = await response.json();
            return toast.error(responseData.detail || t("errorOccured"));
         }

         const responseData = await response.json();
         if (responseData) {
            const { access_token, refresh_token } = responseData;
            const currentTime = Date.now();
            const thirtyMinutesInMilliseconds = 10 * 60 * 1000;
            const newTime: number = currentTime + thirtyMinutesInMilliseconds;

            saveTokenToStorage("expire_data_token", newTime.toString());
            saveTokenToStorage("access_token", access_token);
            saveTokenToStorage("refresh_token", refresh_token);
            // check if user choose plan before regiter checkout after verify
            const planExist = sessionStorage.getItem("planId");
            if (planExist) {
               route.push("/site/plans")
            } else {
               route.push(`/site/exchange`);
            }
            return toast.success(t("verify_email_success"));
         } else {
            return toast.error(responseData.detail);
         }
      } catch (error: any) {
         toast.error(t("errorOccured"));
      }
      finally {
         SetLoading(false);
      }
   }

   const handleVerify = (e: React.FormEvent) => {
      e.preventDefault();
      const combinedValue = values.join('');
      if (!combinedValue) {
         return toast.error(t("EnterFullOTP"));
      }
      sendCodeToApi(Number(combinedValue));
   };

   return (
      <>
         <Toast />
         <div className="flex flex-col items-start space-y-4">
            <div className="flex gap-2">
               {values.map((val, index) => (
                  <input
                     key={index}
                     type="text"
                     maxLength={1}
                     value={val}
                     ref={(el) => { inputRefs.current[index] = el; }}
                     onChange={(e) => handleChange(e, index)}
                     onKeyDown={(e) => handleKeyDown(e, index)}
                     className="w-10 h-10 bg-gray-200 rounded text-center text-lg font-bold focus:outline-none focus:ring-1 focus:ring-primary-700"
                     required
                  />
               ))}
            </div>
            {loadingbtn ? <SpinBtn content='loading' btnProps='w-full' /> : <button
               onClick={handleVerify}
               className="bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-secondary capitalize text-xl cursor-pointer tracking-wide"
            >
               {t("verify")}
            </button>}
         </div>
      </>
   );
}

function WrappedVerifyInput() {
   return (
      <Suspense fallback={<div><Loading /></div>}>
         <VerifyInput />
      </Suspense>
   );
}

export default WrappedVerifyInput;
