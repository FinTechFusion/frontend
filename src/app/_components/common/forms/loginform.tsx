"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "@/validation/loginSchema";
import { MainBtn, SpinBtn } from "../Buttons/MainBtn";
import { Input } from "@/app/_components/common/forms";
import { toast } from 'react-toastify';
import { API_BASE_URL } from "@/utils/api";
import { saveTokenToStorage, useAuth } from "@/context/AuthContext";
import Toast from "../Tostify/Toast";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

export default function Loginform() {
   const { login } = useAuth();
   const [email, setEmail] = useState('');
   const t = useTranslations("auth");
   const [isLoading, setIsLoading] = useState(false);
   const { register, handleSubmit, formState: { errors } } = useForm<loginType>({
      mode: "onBlur",
      resolver: zodResolver(loginSchema),
   });

   const submitForm: SubmitHandler<loginType> = async (data) => {
      setIsLoading(true);
      try {
         const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         });

         const responseData = await response.json();

         if (response.ok) {
            const { access_token, refresh_token } = responseData;
            const currentTime = Date.now();
            const thirtyMinutesInMilliseconds = 30 * 60 * 1000;
            const newExpireTime = currentTime + thirtyMinutesInMilliseconds;
            // localStorage.setItem("expire_data_token", newExpireTime.toString());
            saveTokenToStorage("expire_data_token", newExpireTime.toString());
            login(access_token, refresh_token);
            toast.success(t("loginSuccess"));
         } else {
            toast.error(responseData.detail || t("loginFailed"));
         }
      } catch (error) {
         toast.error(t("errorWhileLogin"));
      } finally {
         setIsLoading(false);
      }
   };

   const preventPaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
   };

   const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setEmail(e.target.value);
   };
   return (
      <>
         <Toast />
         <form onSubmit={handleSubmit(submitForm)}>
            <div className="pb-3">
               <div className="grid grid-cols-1 gap-4">
                  <Input
                     label={t("email")}
                     type="email"
                     register={register}
                     name="email"
                     error={errors.email?.message}
                     placeholder={t("emailPlaceHolder")}
                     onChange={handleEmailChange}
                  />
                  <Input
                     label={t("password")}
                     type="password"
                     register={register}
                     name="password"
                     error={errors.password?.message}
                     placeholder={t("passwordPlaceHolder")}
                     onPaste={preventPaste}
                  />
                  <div className="login-btn">
                     {isLoading ? <SpinBtn content="loading" btnProps="w-full" />
                        : <MainBtn content="auth.login" btnProps="w-full" />}
                  </div>
                  <div className="flex justify-between items-start">
                     <p className="md:pb-0 pb-3 w-1/2">
                        {t("don'thaveaccount")} <Link href="/register" className="text-primary-600 underline">{t("create")}</Link>
                     </p>
                     <Link href={`forget-password?email=${email}`} className="text-primary-600 capitalize">{t("forgetPassword")}</Link>
                  </div>
               </div>
            </div>
         </form>
      </>
   );
}
