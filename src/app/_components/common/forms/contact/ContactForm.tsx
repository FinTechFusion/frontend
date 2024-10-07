"use client"
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, contactType } from "@/validation/contactSchema";
import { useState } from "react";
import Input from "../input/input";
import { MainBtn, SpinBtn } from "../../Buttons/MainBtn";
import { useTranslations } from "next-intl";


export default function ContactForm() {
   const [isLoading, setIsLoading] = useState(false);
   const validationT = useTranslations("validation.contact");
   const { register, handleSubmit, formState: { errors } } = useForm<contactType>({
      mode: "onBlur",
      resolver: zodResolver(contactSchema),
   });

   const submitForm: SubmitHandler<contactType> = async (data) => {
      setIsLoading(true);
   };
   const t = useTranslations("contactPage.contactForm");
      // Error message translation mapping
   const translateErrorMessage = (errorKey: string | undefined) => {
      if (!errorKey) return '';
      return validationT(errorKey);
   };

   return (
      <form onSubmit={handleSubmit(submitForm)}>
         <Input
            label={t("nameLabel")}
            name="first_name"
            placeholder={t("namePlaceholder")}
            error={translateErrorMessage(errors.first_name?.message)}
            type="text"
            register={register}
         />
         <Input
            label={t("emailLabel")}
            type="email"
            register={register}
            name="email"
            error={translateErrorMessage(errors.email?.message)}
            placeholder={t("emailPlaceholder")}
         />
         <Input
            label={t("address")}
            type="address"
            register={register}
            name="address"
            error={translateErrorMessage(errors.address?.message)}
            placeholder={t("addressPlaceholder")}
         />

         <textarea className="w-full p-3 rounded-md border-gray-300 text-lg mb-4 border" placeholder={t("messageBody")} rows={4}
            required minLength={8}
         >
         </textarea>
         <div className="send-btn">
            {isLoading ? <SpinBtn content="sendMessage" btnProps="w-fit" />
               : <MainBtn content="sendMessage" btnProps="w-fit" />}
         </div>
      </form>
   )
}
