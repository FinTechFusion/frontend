"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "@/validation/loginSchema";
import { MainBtn } from "../Buttons/MainBtn";
import { Input } from "@/app/_components/common/forms";
import Link from "next/link";

export default function Loginform() {
   const { register, handleSubmit, formState: { errors } } = useForm<loginType>({
      mode: "onBlur",
      resolver: zodResolver(loginSchema),
   });

   const submitForm: SubmitHandler<loginType> = (data) => {
      console.log(data);
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
