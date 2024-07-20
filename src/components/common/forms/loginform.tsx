
"use client"

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, loginType } from "@/validation/loginSchema";
import { MainBtn } from "../Buttons/MainBtn";
import { Input } from "@/components/common/forms";

export default function Loginform() {
   const { register, handleSubmit, formState: { errors } } = useForm<loginType>({
      mode: "onBlur",
      resolver: zodResolver(loginSchema),
   })
   const submitForm: SubmitHandler<loginType> = (data) => {
      console.log(data);
   };

   return (
      <form onSubmit={handleSubmit(submitForm)}>
         <div className="pb-3">
            <div className="grid grid-cols-1 gap-4">
               <Input label="email" type="email" register={register} name="email" error={errors.email?.message} placeholder="Email" />
               <Input label="password" type="password" register={register} name="password" error={errors.password?.message} placeholder="Enter strong password" onPaste={(e) => { e.preventDefault() }}
               />
               <div className="login-btn">
                  <MainBtn content="Login" btnWidth="w-full" />
               </div>
            </div>
         </div>
      </form>
   )
}
