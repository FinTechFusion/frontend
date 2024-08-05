"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import Textbox from "@/app/_components/common/Text/Textbox";
import useTurnstile from "@/hooks/useTurnstile";
import { emailSchema, emailType } from "@/validation/emailSchema";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/utils/api";
import { Input } from "@/app/_components/common/forms";
import Toast from "@/app/_components/common/Tostify/Toast";

export default function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const { register, handleSubmit, formState: { errors } } = useForm<emailType>({
    mode: "onBlur",
    resolver: zodResolver(emailSchema),
  });

  useEffect(() => {
    const emailParam = searchParams.get("email");
    if (emailParam) {
      setEmail(emailParam);
    }
  }, [searchParams]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const submitForm: SubmitHandler<emailType> = async (data) => {

    if (!turnstileToken) {
      toast.error("Please complete the Turnstile challenge.");
      return;
    }
    try {
      const response = await fetch(
        `${API_BASE_URL}/auth/forgot-password?turnstile_token=${turnstileToken}&email=${data.email}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const responseData = await response.json();
      if (response.ok) {
        router.push(`/reset-password?email=${data.email}`)
        return toast.success("Reset Code Sent To Email");
      } else {
        return toast.error(responseData.detail[0].msg || responseData.detail);
      }
    } catch (error) {
      return toast.error("An error occurred while sending the reset code");
    }
  };

  const sitekey: string = process.env.NEXT_PUBLIC_SITEKEY || "0x4AAAAAAAaTEPkTQRU9GjKy";

  useTurnstile(sitekey, (token: string) => setTurnstileToken(token), "light");

  return (
    <section className="container mx-auto py-10 lg:w-1/3 md:2/3 w-full">
      <Toast />
      <Textbox
        mainClass="text-center"
        title="Forgot Password"
        titleClass="hover:text-dark"
        description="Enter your email to receive a OTP code reset your password."
        descriptionClass="text-lg"
      />
      <form className="mx-3" onSubmit={handleSubmit(submitForm)}>
        <div className="w-50">
          <Input
            type="email"
            name="email"
            placeholder="Email"
            register={register}
            error={errors.email?.message}
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div className="text-center">
          <div id="turnstile-container" className="cf-turnstile w-100"></div>
          <MainBtn content="Send Reset Code" btnWidth="md:w-1/2 w-full" />
        </div>
      </form>
    </section>
  );
}
