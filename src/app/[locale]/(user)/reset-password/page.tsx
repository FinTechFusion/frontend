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
   const { register, handleSubmit, formState: { errors } } = useForm<passwordType>({
      mode: "onBlur",
      resolver: zodResolver(passwordSchema),
   });
   const { values, inputRefs, handleChange, handleKeyDown } = useOTPInput({ length: 6 });

   async function handleReset(code: string, data: passwordType) {
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

   const onSubmit: SubmitHandler<passwordType> = (data) => {
      const combinedValue = values.join('');
      if (combinedValue.length < 6) {
         return toast.error(t("EnterFullOTP"));
      }
      handleReset(combinedValue, data);
   };

   return (
      <div className="container mx-auto py-10 lg:w-1/3 md:w-2/3 w-full px-3 md:px-0">
         <Toast />
         <Textbox
            mainClass="text-center"
            title="auth.resetPassword"
            titleClass="hover:text-dark"
            description="auth.resetPasswordDescription"
            descriptionClass="text-lg" />
         <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
               <p className="text-xl font-medium text-center">{t("enterOTPCode")}</p>
               <div className="flex justify-center gap-2 my-5">
                  {values.map((val: string, index: number) => (
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
               <Input
                  label={t("newPassword")}
                  name="password"
                  register={register}
                  placeholder={t("newPasswordPlaceHolder")}
                  type="password"
                  error={errors.password?.message}
               />
               <MainBtn content="auth.reset" btnProps="w-full" />
            </div>
         </form>
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
