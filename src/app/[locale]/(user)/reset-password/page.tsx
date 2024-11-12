"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSearchParams } from "next/navigation";
import { API_BASE_URL } from '@/utils/api';
import { toast } from 'react-toastify';
import { useOTPInput } from "@/hooks/useOTPInput";
import Toast from "@/app/_components/common/Tostify/Toast";
import Textbox from "@/app/_components/common/Text/Textbox";
import { passwordSchema, passwordType } from "@/validation/passwordSchema";
import { Input } from "@/app/_components/common/forms";
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';
import React, { Suspense } from 'react';
import Loading from "@/app/_components/common/loading/Loading";
import { useTranslations } from 'next-intl';
import { useRouter } from "@/i18n/routing";

function ResetPasswordPage() {
   const route = useRouter();
   const searchParams = useSearchParams();
   const email = searchParams.get('email');
   const t = useTranslations("auth");
   const validationT = useTranslations("validation");
   const { register, handleSubmit, formState: { errors } } = useForm<passwordType>({
      mode: "onBlur",
      resolver: zodResolver(passwordSchema),
   });
   const { values, inputRefs, handleChange } = useOTPInput({ length: 6 });

   async function handleReset(code: string, data: passwordType) {
      if (!email) {
         return toast.info(t("inavlidEmail"));
      }
      try {
         const response = await fetch(`${API_BASE_URL}/auth/reset-password?otp_code=${code}&password=${data.password}&email=${email}`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json',
            },
         });
         const responseData = await response.json();
         if (!response.ok) {
            return toast.error(responseData.detail || t("errorOccured"));
         }

         if (responseData) {
            route.push('/login');
            return toast.success(t("successOTP"));
         } else {
            return toast.error(responseData.detail);
         }
      } catch (error: any) {
         toast.error(t("errorOccured"));
      }
   }
   // Error message translation mapping
   const translateErrorMessage = (errorKey: string | undefined) => {
      if (!errorKey) return '';
      return validationT(errorKey);
   };

   const onSubmit: SubmitHandler<passwordType> = (data) => {
      const combinedValue = values.join('');
      if (combinedValue.length < 6) {
         return toast.error(t("EnterFullOTP"));
      }
      handleReset(combinedValue, data);
   };

   return (
      <div className="container mx-auto min-h-screen flex flex-col items-center justify-center py-10 lg:w-1/3 md:w-2/3 w-full px-3 md:px-0 ">
         <Toast />
         <div className="p-8 border shadow-sm">
            <Textbox
               mainClass="text-center"
               title="auth.resetPassword"
               titleClass="hover:text-dark"
               description="auth.resetPasswordDescription"
               descriptionClass="text-lg w-3/4 mx-auto" />
            <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
               <input type="text" className="bg-gray-100 rounded focus:outline-none focus:ring-1 focus:ring-primary-700 h-10 w-full text-lg px-3 mb-3 text-dark" placeholder={t("enterOTPCode")} onChange={(e)=>handleChange(e)} maxLength={6}/>
                  <Input
                     label={t("newPassword")}
                     name="password"
                     register={register}
                     placeholder={t("newPasswordPlaceHolder")}
                     type="password"
                     error={translateErrorMessage(errors.password?.message)}
                  />
                  <MainBtn content="auth.reset" btnProps="w-full" />
            </form>
         </div>
      </div>
   );
}

function WrappedResetPasswordPage() {
   return (
      <Suspense fallback={<div><Loading /></div>}>
         <ResetPasswordPage />
      </Suspense>
   );
}

export default WrappedResetPasswordPage;
