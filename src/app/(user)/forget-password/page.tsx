"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MainBtn, SpinBtn } from "@/app/_components/common/Buttons/MainBtn";
import Textbox from "@/app/_components/common/Text/Textbox";
import useTurnstile from "@/hooks/useTurnstile";
import { emailSchema, emailType } from "@/validation/emailSchema";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/utils/api";
import { Input } from "@/app/_components/common/forms";
import Toast from "@/app/_components/common/Tostify/Toast";
import Loading from "../../_components/common/loading/Loading";
import Image from "next/image";
import forgetImg from '/public/assets/images/forgot.png';

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(true);
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
    finally {
      setIsLoading(false);
    }
  };

  const sitekey: string = process.env.NEXT_PUBLIC_SITEKEY || "0x4AAAAAAAaTEPkTQRU9GjKy";

  useTurnstile(sitekey, (token: string) => setTurnstileToken(token), "light");

  return (
    <div className="min-h-screen bg-gray-100 w-full flex justify-center items-center ">
      <div className="md:w-1/2 w-full bg-secondary container mx-auto p-8 rounded flex flex-col items-start">
        <Toast />
        <Image
          src={forgetImg}
          alt="forget image"
          width={30}
          height={30}
        />
        <Textbox
          mainClass="pt-3"
          title="Forgot Password"
          titleClass="hover:text-dark"
          description="Enter your email to receive a OTP code reset your password."
          descriptionClass="text-lg pb-4"
        />
        <form className="" onSubmit={handleSubmit(submitForm)}>
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
          <>
            <div id="turnstile-container" className="cf-turnstile w-100"></div>
            {isLoading ? <SpinBtn content="loading" btnProps="w-fit" />
              : <MainBtn content="Send rest code" btnProps="w-fit" />} 
            </>
        </form>
      </div>
    </div>
  );
}

export default function WrappedPage() {
  return (
    <Suspense fallback={<div><Loading /></div>}>
      <Page />
    </Suspense>
  );
}
