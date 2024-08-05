
"use client";
import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema, registerType } from "@/validation/registerSchema";
import PhoneInput from 'react-phone-input-2';
import Input from "./input/input";
import useTurnstile from "@/hooks/useTurnstile";
import 'react-phone-input-2/lib/style.css';
import { MainBtn } from "../Buttons/MainBtn";
import { toast } from 'react-toastify';
import { API_BASE_URL } from "@/utils/api";
import { useRouter } from "next/navigation";
import Toast from "../Tostify/Toast";

export default function RegisterForm() {
   const route = useRouter();
   const { register, handleSubmit, setValue, formState: { errors } } = useForm<registerType>({
      mode: "onBlur",
      resolver: zodResolver(registerSchema)
   });

   const [phone_number, setPhoneNumber] = useState('');
   const [turnstileToken, setTurnstileToken] = useState('');

   const handlePhoneChange = (phone: string) => {
      const formattedPhone = `+${phone}`;
      setPhoneNumber(formattedPhone);
      setValue('phone_number', formattedPhone, { shouldValidate: true });
   };

   const submitForm: SubmitHandler<registerType> = async (data) => {
      if (turnstileToken) {
         try {
            const response = await fetch(`${API_BASE_URL}/auth/register?turnstile_token=${turnstileToken}`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json'
               },
               body: JSON.stringify(data) // Send the data directly
            });

            const responseData = await response.json();
            // console.log('response data:', responseData);
            if (!responseData.success) {
               toast.error(responseData.detail[0].msg || responseData.detail);
            }
            else {
               toast.success("Account created successfully");
               route.push(`/verifyemail?email=${data.email}`);
            }
            if (!response.ok) {
               throw new Error("An error has occurred");
            }

         } catch (error: any) {
            console.error(error);
         }
      } else {
         toast.error("Turnstile verification required.");
      }
   };

   const sitekey: string = process.env.NEXT_PUBLIC_SITEKEY || '0x4AAAAAAAaTEPkTQRU9GjKy';

   useTurnstile(sitekey, (token: string) => setTurnstileToken(token), "light");

   return (
      <>
         <Toast />
         <form onSubmit={handleSubmit(submitForm)}>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
               <Input label="first name" register={register} name="first_name" error={errors.first_name?.message} placeholder="First Name" />
               <Input label="last name" register={register} name="last_name" error={errors.last_name?.message} placeholder="Last Name" />
            </div>
            <Input label="email" register={register} name="email" error={errors.email?.message} placeholder="Email" />
            <div className="pb-4">
               <PhoneInput
                  country={'sa'}
                  value={phone_number}
                  onChange={handlePhoneChange}
                  enableSearch={true}
                  inputProps={{
                     required: true,
                     className: "w-full auth_input border-2",
                     style: { paddingLeft: '45px' }
                  }}
               />
               {errors.phone_number && <span className="text-red-500 text-sm pt-2">{errors.phone_number.message}</span>}
            </div>
            <Input label="password" register={register} name="password" error={errors.password?.message} placeholder="Enter strong password" />
            <div
               id="turnstile-container"
               className="cf-turnstile w-100"
            ></div>
            {!turnstileToken && <span className="text-red-600 text-sm py-2">Please complete the CAPTCHA</span>
            }
            <MainBtn content="creating" btnWidth="w-full" />
         </form>
      </>
   );
}