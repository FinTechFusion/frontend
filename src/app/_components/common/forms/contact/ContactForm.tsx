"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, contactType } from "@/validation/contactSchema";
import { useState } from "react";
import Input from "../input/input";
import { MainBtn, SpinBtn } from "../../Buttons/MainBtn";


export default function ContactForm() {
   const [isLoading, setIsLoading] = useState(false);

   const { register, handleSubmit, formState: { errors } } = useForm<contactType>({
      mode: "onBlur",
      resolver: zodResolver(contactSchema),
   });

   const submitForm: SubmitHandler<contactType> = async (data) => {
      setIsLoading(true);
      console.log(data)

   };
   return (
      <form onSubmit={handleSubmit(submitForm)}>
         <Input
            label="Your Name"
            name="first_name"
            placeholder="Enter Your Name"
            error={errors.first_name?.message}
            type="text"
            register={register}
         />
         <Input
            label="email"
            type="email"
            register={register}
            name="email"
            error={errors.email?.message}
            placeholder="Email"
         />
         <Input
            label="Address"
            type="address"
            register={register}
            name="address"
            error={errors.address?.message}
            placeholder="Address"
         />

         <textarea className="w-full p-3 rounded-md border-gray-300 text-lg mb-4 border" placeholder="Enter your message here" rows={4}
            required minLength={8}
         >
         </textarea>
         <div className="send-btn">
            {isLoading ? <SpinBtn content="Send Message" btnProps="w-fit" />
               : <MainBtn content="Send Message" btnProps="w-fit" />}
         </div>
      </form>
   )
}
