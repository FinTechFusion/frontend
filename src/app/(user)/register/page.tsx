"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import 'react-phone-input-2/lib/style.css';
import Textbox from "@/components/common/Text/Textbox";
import MainBtn from "@/components/common/Buttons/MainBtn";
import { useState } from "react";
// import { parsePhoneNumberFromString } from 'libphonenumber-js';
import PhoneInput from 'react-phone-input-2';
import Script from 'next/script';

const registerSchema = z.object({
   first_name: z.string({ message: "First Name must be a string" })
      .min(3, { message: "First name must be at least 3 characters long" }),
   last_name: z.string().min(3, { message: "Last name must be at least 3 characters long" }),
   phone: z.string(),
   email: z.string().min(6, { message: "Email is required" }).email({ message: "Email is not valid" }),
   password: z.string().min(6, { message: "Password must be at least 6 characters" })
});

type TFormInputs = z.infer<typeof registerSchema>;

export default function Register() {
   const { register, handleSubmit, setValue, formState: { errors }, setError, clearErrors } = useForm<TFormInputs>({
      mode: "onBlur",
      resolver: zodResolver(registerSchema)
   });
   const [phone, setPhone] = useState('');
   // const [countryCode, setCountryCode] = useState('SA');
   // const handlePhoneChange = (phone: string, countryData: any) => {
   //    setPhone(phone);
   //    setCountryCode(countryData.countryCode);
   //    const isValid = validatePhoneNumber(phone, countryData.countryCode);
   //    if (isValid) {
   //       clearErrors('phone');
   //    } else {
   //       setError('phone', {
   //          type: 'manual',
   //          message: 'Enter a valid phone number'
   //       });
   //    }
   //    setValue('phone', phone, { shouldValidate: true });
   // };

   const submitForm: SubmitHandler<TFormInputs> = (data) => {
      console.log({ ...data, phone });
   };



   return (
      <>
         <Script src="https://challenges.cloudflare.com/turnstile/v0/api.js" strategy="lazyOnload"></Script>
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
                  <div className="pb-4">
                     <label htmlFor="firstName" className="block capitalize pb-1 text-lg font-medium tracking-wide">first name</label>
                     <input
                        type="text"
                        className={`auth_input border-2 ${errors.first_name ? 'border-red-600 shadow' : ''}`}
                        {...register("first_name")}
                        id="firstName"
                        placeholder="first name"
                     />
                     {errors.first_name && <span className="text-red-600 text-sm pt-2">{errors.first_name.message}</span>}
                  </div>
                  <div className="pb-4">
                     <label htmlFor="lastName" className="block capitalize pb-1 text-lg font-medium tracking-wide">last name</label>
                     <input
                        type="text"
                        className={`auth_input border-2 ${errors.last_name ? 'border-red-600 shadow' : ''}`}
                        {...register("last_name")}
                        id="lastName"
                        placeholder="last name"
                     />
                     {errors.last_name && <span className="text-red-600 text-sm pt-2">{errors.last_name.message}</span>}
                  </div>
               </div>
               <div className="pb-4">
                  <label htmlFor="email" className="block capitalize pb-1 text-lg font-medium tracking-wide">Email</label>
                  <input
                     type="email"
                     className={`auth_input border-2 ${errors.email ? 'border-red-600 shadow' : ''}`}
                     {...register("email")}
                     id="email"
                     placeholder="Enter Your Email"
                  />
                  {errors.email && <span className="text-red-600 text-sm pt-2">{errors.email.message}</span>}
               </div>
               <div className="pb-4">
                  <PhoneInput
                     country={'sa'}
                     value={phone}
                     // onChange={handlePhoneChange}
                     enableSearch={true}
                     inputProps={{
                        required: true,
                     }}
                  />
                  {errors.phone && <span className="text-red-500 text-sm pt-2">{errors.phone.message}</span>}
               </div>
               <div className="pb-4">
                  <label htmlFor="password" className="block capitalize pb-1 text-lg font-medium tracking-wide">password</label>
                  <input
                     type="password"
                     className={`auth_input border-2 ${errors.password ? 'border-red-600 shadow' : ''}`}
                     {...register("password")}
                     id="password"
                     placeholder="choose strong password"
                  />
                  {errors.password && <span className="text-red-600 text-sm pt-2">{errors.password?.message}</span>}
               </div>
               {/* 0x4AAAAAAAaTEPkTQRU9GjKy */}
               <div className="cf-turnstile w-100" data-sitekey="1x00000000000000000000AA" data-theme="light"></div>
               <div className="pb-4 my-2">
                  <MainBtn btnWidth="w-full" content="create" />
               </div>
            </form>
         </section>
      </>
   );
}
