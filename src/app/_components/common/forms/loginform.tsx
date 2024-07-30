"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "@/validation/loginSchema";
import { MainBtn } from "../Buttons/MainBtn";
import { Input } from "@/app/_components/common/forms";
import Link from "next/link";
import { toast } from 'react-toastify';
import { API_BASE_URL } from "@/utils/api";
import { useAuth } from "@/context/AuthContext";

export default function Loginform() {
   const { login } = useAuth();

   const { register, handleSubmit, formState: { errors } } = useForm<loginType>({
      mode: "onBlur",
      resolver: zodResolver(loginSchema),
   });

   const submitForm: SubmitHandler<loginType> = async (data) => {
      try {
         const response = await fetch(`${API_BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
               'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
         });

         const responseData = await response.json();

         if (responseData) {
            const { access_token, refresh_token } = responseData;
            console.log(access_token, refresh_token)
            const currentTime = Date.now();
            const thirtyMinutesInMilliseconds = 9 * 60 * 1000;
            const newTime: number = currentTime + thirtyMinutesInMilliseconds;
            localStorage.setItem("expire_data_token", newTime.toString());
            login(access_token, refresh_token);
         } else {
            toast.error('Error At Login');
         }
      } catch (error: any) {
         console.error('Error:', error);
         toast.error('An error occurred while logging in');
      }
   };

   const preventPaste = (e: React.ClipboardEvent) => {
      e.preventDefault();
   };

   return (
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
                  <MainBtn content="Login" btnWidth="w-full" />
               </div>
               <p>
                  Don&apos;t have an account? <Link href="/register" className="text-primary-600 underline">Create</Link>
               </p>
            </div>
         </div>
      </form>
   );
}
