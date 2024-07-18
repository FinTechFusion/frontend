"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerType } from "@/validation/registerSchema";
import 'react-phone-input-2/lib/style.css';
import Textbox from "@/components/common/Text/Textbox";
import MainBtn from "@/components/common/Buttons/MainBtn";
import { useState } from "react";
import PhoneInput from 'react-phone-input-2';
import Script from 'next/script';
import { parsePhoneNumberFromString } from 'libphonenumber-js';
import { Input } from "@/components/common/forms";

export default function Register() {
   const { register, handleSubmit, setValue, formState: { errors }, setError, clearErrors } = useForm<registerType>({
      mode: "onBlur",
      resolver: zodResolver(registerSchema)
   });
   const [phone, setPhone] = useState('');
   const [turnstileToken,] = useState('');

   const handlePhoneChange = (phone: string, countryData: any) => {
      setPhone(phone);
      setValue('phone', phone, { shouldValidate: true });
      const phoneNumber = parsePhoneNumberFromString(phone, countryData.countryCode);
      if (phoneNumber?.isValid()) {
         clearErrors('phone');
      } else {
         setError('phone', {
            type: 'manual',
            message: 'Enter a valid phone number'
         });
      }
   };

   const submitForm: SubmitHandler<registerType> = (data) => {
      const payload = {
         ...data,
         phone,
         turnstileToken
      };
      console.log(payload);
      // Send payload to your API
   };

   return (
      <>
         <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload" />
         {/* <Script id="turnstile-init" strategy="lazyOnload">
            {`
               function onTurnstileCallback(token) {
                  const event = new CustomEvent('turnstile-token', { detail: { token } });
                  window.dispatchEvent(event);
               }
               window.addEventListener('turnstile-token', function(event) {
                  const { token } = event.detail;
                  setTurnstileToken(token);
               });
            `}
         </Script> */}
         <div className="bg-gradient-to-r from-primary-600 to-primary-500 h-92 px-2 py-8">
            <div className="container mx-auto">
               <Textbox
                  mainClass="text-center flex flex-col h-92 justify-center items-center"
                  titleClass="text-secondary hover:text-secondary tracking-wider"
                  title="Secure Your Financial Future with Our Crypto Platform"
                  descriptionClass="text-xl text-primary-50 md:w-3/5 w-4/5 py-6"
                  description="Experience the future of finance with our cutting-edge cryptocurrency platform. Invest, trade, and manage your digital assets with ease and confidence."
               />
            </div>
         </div>
         <section className="container mx-auto px-2 grid md:grid-cols-2 grid-cols-1 gap-12">
            <div className="form-description">
               <span className="bg-dark text-secondary p-2 rounded-md">Secure Your Crypto</span>
               <Textbox
                  mainClass="pt-6"
                  titleClass="text-4xl "
                  title="Unlock the Future of Finance"
                  description="Join the Crypto Vault and take control of your digital assets. Secure, simple, and seamless."
               />
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
               <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <Input label="first name" register={register} name="first_name" error={errors.first_name?.message} placeholder="First Name" />
                  <Input label="last name" register={register} name="last_name" error={errors.last_name?.message} placeholder="Last Name" />
               </div>
               <Input label="email" register={register} name="email" error={errors.email?.message} placeholder="Email" />
               <div className="pb-4">
                  <PhoneInput
                     country={'sa'}
                     value={phone}
                     onChange={handlePhoneChange}
                     enableSearch={true}
                     inputProps={{
                        required: true,
                        className: "w-full auth_input border-2",
                        style: { paddingLeft: '45px' }
                     }}
                  />
                  {errors.phone && <span className="text-red-500 text-sm pt-2">{errors.phone.message}</span>}
               </div>
               <Input label="password" register={register} name="password" error={errors.password?.message} placeholder="Enter strong password" />

               <div className="cf-turnstile w-100" data-sitekey="1x00000000000000000000AA" data-callback="onTurnstileCallback" data-theme="light"></div>
               <div className="pb-4 my-2">
                  <MainBtn btnWidth="w-full" content="create" />
               </div>
            </form>
         </section>
      </>
   );
}
