"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { API_BASE_URL } from '@/utils/api';
import { toast } from 'react-toastify';
import { useOTPInput } from "@/hooks/useOTPInput";
import Toast from "@/app/_components/common/Tostify/Toast";
import Textbox from "@/app/_components/common/Text/Textbox";
import { passwordSchema, passwordType } from "@/validation/passwordSchema";
import { Input } from "@/app/_components/common/forms";
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';

function ResetPasswordPage() {
   const route = useRouter();
   const searchParams = useSearchParams();
   const email = searchParams.get('email')
   console.log(email)
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
         console.log(response)
         const responseData = await response.json();
         console.log(responseData)
         if (!response.ok) {
            return toast.error(responseData.detail || "An error has occurred");
         }

         if (responseData) {
            route.push('/login'); // Adjust the route as needed
            return toast.success("OTP Verified, proceed to reset password");
         } else {
            return toast.error(responseData.detail);
         }
      } catch (error: any) {
         console.error(error);
         toast.error("An error has occurred");
      }
   }

   const onSubmit: SubmitHandler<passwordType> = (data) => {
      const combinedValue = values.join('');
      if (combinedValue.length < 6) {
         return toast.error("Enter Full OTP code");
      }
      handleReset(combinedValue, data);
   };

   return (
      <section className="container mx-auto py-10 lg:w-1/3 md:w-2/3 w-full">
         <Toast />
         <Textbox
            mainClass="text-center"
            title="Reset Password"
            titleClass="hover:text-dark"
            description="Enter a new password and the OTP sent to your email to reset your account password."
            descriptionClass="text-lg" />
         <form className="mx-auto" onSubmit={handleSubmit(onSubmit)}>
            <div className="">
               <p className="text-xl font-medium text-center">Enter an OTP Code</p>
               <div className="flex justify-center space-x-2 my-5">
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
                  label="New Password"
                  name="password"
                  register={register}
                  placeholder="New Password"
                  type="password"
                  error={errors.password?.message}
               />
               <MainBtn content="Reset" btnWidth="w-full" />
            </div>
         </form>
      </section>
   );
}

export default ResetPasswordPage;
