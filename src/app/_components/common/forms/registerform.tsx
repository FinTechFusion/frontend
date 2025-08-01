"use client";
import { ChangeEvent, useState } from "react";
import { Link, useRouter } from "@/i18n/navigation";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerType } from "@/validation/registerSchema";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Input from "./input/input";
import useTurnstile from "@/hooks/useTurnstile";
import { MainBtn, SpinBtn } from "../Buttons/MainBtn";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/utils/api";
import { useLocale, useTranslations } from "next-intl";
import  Toast from '@/app/_components/common/Tostify/Toast';

export default function RegisterForm() {
   const t = useTranslations("auth");
   const validationT = useTranslations("validation");
   const route = useRouter();
   const locale = useLocale();
   const isENVEXIST = process.env.NEXT_PUBLIC_ENV;

   const { register, handleSubmit, setValue, formState: { errors } } = useForm<registerType>({
      mode: "onBlur",
      resolver: zodResolver(registerSchema),
   });

   const [phone_number, setPhoneNumber] = useState<string>("");
   const [turnstileToken, setTurnstileToken] = useState<string>("");
   const [isLoading, setIsLoading] = useState<boolean>(false);
   const [checked, setChecked] = useState<boolean>(false);
   const [showAgreementError, setShowAgreementError] = useState<boolean>(false);

   const handlePhoneChange = (phone: string) => {
      const formattedPhone = `+${phone}`;
      setPhoneNumber(formattedPhone);
      setValue("phone_number", formattedPhone, { shouldValidate: true });
   };

   const handleAgreement = (e: ChangeEvent<HTMLInputElement>) => {
      setChecked(e.target.checked);
      if (e.target.checked) setShowAgreementError(false); // Reset error when checked
   };

   const submitForm: SubmitHandler<registerType> = async (data) => {
      if (!turnstileToken && isENVEXIST?.trim() !== 'ENV') return toast.error(t("complete_captcha"));
      // Ensure the agreement is checked
      if (!checked) return setShowAgreementError(true);
      
      setShowAgreementError(false); // Reset error when valid
      setIsLoading(true);
      try {
         const response = await fetch(`${API_BASE_URL}/auth/register?turnstile_token=${turnstileToken}&lang=${locale}`, {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
         });
         const responseData = await response.json();
         if (!responseData.success) {
            return toast.error(responseData.detail[0]?.msg || responseData.detail);
         } else {
            toast.success(t("accountCreated"));
            await route.push(`/verifyemail?email=${data.email}`);
         }
      } catch (error: any) {
         toast.error(error.message || t("registerError"));
      } finally {
         setIsLoading(false);
      }
   };

   const sitekey: string = process.env.NEXT_PUBLIC_SITEKEY || "0x4AAAAAAAaTEPkTQRU9GjKy";
   useTurnstile(sitekey, (token: string) => setTurnstileToken(token), "light");

   const translateErrorMessage = (errorKey: string | undefined) => {
      if (!errorKey) return "";
      return validationT(errorKey);
   };

   return (
      <>
         <Toast />
         <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
               <Input
                  label={t("firstName")}
                  register={register}
                  name="first_name"
                  error={translateErrorMessage(errors.first_name?.message)}
                  placeholder={t("firstName")}
               />
               <Input
                  label={t("lastName")}
                  register={register}
                  name="last_name"
                  error={translateErrorMessage(errors.last_name?.message)}
                  placeholder={t("lastName")}
               />
            </div>
            <div className="py-2 email-input">
            <Input
               label={t("email")}
               register={register}
               name="email"
               error={translateErrorMessage(errors.email?.message)}
               placeholder={t("emailPlaceHolder")}
            />
            </div>
            <div className="py-4">
               <PhoneInput
                  country={"sa"}
                  value={phone_number}
                  onChange={handlePhoneChange}
                  enableSearch={true}
                  inputProps={{
                     required: true,
                     className: `w-full py-2 border-2 rounded-md ${locale === "ar" ? "pr-10 pl-4" : "pl-10 pr-4"}`,
                  }}
                  containerClass="w-full"
               />
               {errors.phone_number && (
                  <span className="text-red-500 text-sm pt-2">{errors.phone_number.message}</span>
               )}
            </div>
            <Input
               label={t("password")}
               register={register}
               name="password"
               error={translateErrorMessage(errors.password?.message)}
               placeholder={t("passwordPlaceHolder")}
            />
            <label
               htmlFor="confirm-condition"
               className={`${showAgreementError ? "text-red-600" : "text-dark"} flex items-center gap-x-1 text-lg pb-3`}
            >
               <input
                  onChange={handleAgreement}
                  type="checkbox"
                  id="confirm-condition"
                  className="accent-primary-700"
               />
               <span className="py-2">
                  {t("agreementCreation")}{" "}
                  <span className="text-medium">
                     <Link href="/site/terms">{t("TermsandConditions")}</Link>
                  </span>{" "}
                  {t("and")}{" "}
                  <span className="text-medium">
                     <Link href="/site/privacy">{t("privacyPolicy")}</Link>
                  </span>
               </span>
            </label>
            <div id="turnstile-container" className="cf-turnstile w-100"></div>
            <div className="register-btn">
               {isLoading ? (
                  <SpinBtn content="loading" btnProps="w-full" />
               ) : (
                  <MainBtn content="auth.create" btnProps="w-full" />
               )}
            </div>
            <p className="pt-2 text-lg">
               {t("alreadyhaveaccount")}
               <Link href="/login" className="text-primary-600 underline">
                  {t("login")}
               </Link>
            </p>
         </form>
      </>
   );
}
