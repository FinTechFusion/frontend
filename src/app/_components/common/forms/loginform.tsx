"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "@/validation/loginSchema";
import { MainBtn, SpinBtn } from "../Buttons/MainBtn";
import { Input } from "@/app/_components/common/forms";
import Link from "next/link";
import { toast } from 'react-toastify';
import { API_BASE_URL } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";
import Toast from "../Tostify/Toast";
import { useState } from "react";
// import { useState } from "react";

export default function Loginform() {
   const { login } = useAuth();
   const [email, setEmail] = useState('');

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
            localStorage.setItem("expire_data_token", newExpireTime.toString());
            login(access_token, refresh_token);
            toast.success("Login Successfully");
         } else {
            toast.error(responseData.detail || 'Login failed');
         }
      } catch (error) {
         console.error('Error:', error);
         toast.error('An error occurred while logging in');
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
                     label="email"
                     type="email"
                     register={register}
                     name="email"
                     error={errors.email?.message}
                     placeholder="Email"
                     onChange={handleEmailChange}
                  />
                  <Input
                     label="password"
                     type="password"
                     register={register}
                     name="password"
                     error={errors.password?.message}
                     placeholder="Enter strong password"
                     onPaste={preventPaste}
                  />
                  <div className="login-btn">
                     {isLoading ? <SpinBtn content="Login" btnWidth="w-full" />
                        : <MainBtn content="Login" btnWidth="w-full" />}
                  </div>
                  <div className="flex justify-between items-start">
                     <p className="md:pb-0 pb-3 w-1/2">
                        Don&apos;t have an account? <Link href="/register" className="text-primary-600 underline">Create</Link>
                     </p>
                     <Link href={`forget-password?email=${email}`} className="text-primary-600 capitalize ">forget password?</Link>
                  </div>
               </div>
            </div>
         </form>
      </>
   );
}
