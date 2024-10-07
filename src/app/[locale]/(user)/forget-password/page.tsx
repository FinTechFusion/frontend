"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { MainBtn, SpinBtn } from "@/app/_components/common/Buttons/MainBtn";
import Textbox from "@/app/_components/common/Text/Textbox";
import useTurnstile from "@/hooks/useTurnstile";
import { emailSchema, emailType } from "@/validation/emailSchema";
import { toast } from "react-toastify";
import { API_BASE_URL } from "@/utils/api";
import { Input } from "@/app/_components/common/forms";
import Toast from "@/app/_components/common/Tostify/Toast";
import Image from "next/image";
import forgetImg from '/public/assets/images/forgot.png';
import Loading from "@/app/_components/common/loading/Loading";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";

function Page() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState<string>("");
  const [turnstileToken, setTurnstileToken] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const t = useTranslations("auth");
  const validationT = useTranslations("validation");

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
  // Error message translation mapping
  const translateErrorMessage = (errorKey: string | undefined) => {
    if (!errorKey) return '';
    return validationT(errorKey);
  };

  const submitForm: SubmitHandler<emailType> = async (data) => {

    if (!turnstileToken) {
      toast.error(t("complete_captcha"));
      return;
    }
    if (!email) {
      return toast.info(t("inavlidEmail"));
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
        return toast.success(t("resetCodeSent"));
      } else {
        return toast.error(responseData.detail[0].msg || responseData.detail);
      }
    } catch (error) {
      return toast.error(t("errorOccuredSentCode"));
    }
    finally {
      setIsLoading(false);
    }
  };

  const sitekey: string = process.env.NEXT_PUBLIC_SITEKEY || "0x4AAAAAAAaTEPkTQRU9GjKy";

  useTurnstile(sitekey, (token: string) => setTurnstileToken(token), "light");
  return (
    <div className="min-h-screen bg-gray-100 w-full flex justify-center items-center">
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
          title="auth.forgetPassword"
          titleClass="hover:text-dark"
          description="auth.resetEmail"
          descriptionClass="text-lg pb-4"
        />
        <form className="" onSubmit={handleSubmit(submitForm)}>
          <div className="w-50">
            <Input
              type="email"
              name="email"
              placeholder={t("emailPlaceHolder")}
              register={register}
              error={translateErrorMessage(errors.email?.message)}
              value={email}
              onChange={handleEmailChange}
            />
          </div>
          <>
            <div id="turnstile-container" className="cf-turnstile w-100"></div>
            {isLoading ? <SpinBtn content="auth.loading" btnProps="w-fit" />
              : <MainBtn content="auth.sendResetCode" btnProps="w-fit" />}
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
