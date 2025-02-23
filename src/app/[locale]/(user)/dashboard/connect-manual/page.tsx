"use client";
import BinanceApiGuide from "@/app/_components/common/binance/BinanceApiGuide";
import { Input } from "@/app/_components/common/forms";
import Textbox from "@/app/_components/common/Text/Textbox";
import Toast from "@/app/_components/common/Tostify/Toast";
import { getFromCookies, useAuth } from "@/context/AuthContext";
import { useRouter } from "@/i18n/routing";
import { API_BASE_URL } from "@/utils/api";
import {
  connectBinance,
  connectBinanceType,
} from "@/validation/connectBinance";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocale, useTranslations } from "next-intl";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";

export default function Page() {
  const [isLoading, setIsLoading] = useState(false);
  const accessToken = getFromCookies("access_token");
  const {user} = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<connectBinanceType>({
    mode: "onBlur",
    resolver: zodResolver(connectBinance),
  });
  const t = useTranslations("dashboard.connect_manual");
  const validationT = useTranslations("validation.connectManual");
  const locale = useLocale();
  const router = useRouter();
  const submitForm: SubmitHandler<connectBinanceType> = async (data) => {
    setIsLoading(true);
    if(!user?.is_binance){
      try {
        const response = await fetch(
          `${API_BASE_URL}/users/me/binance/link/manual?lang=${locale}`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        // if(!response?.ok){
        //   console.log(response)
        // }
        const responseData = await response.json();
        console.log(responseData)
        if (responseData?.class === "RequestValidationError"){
          return toast.error(t("incorrectApiKeys"));
        }
        if (responseData.success) {
          return router.push('/dashboard/connect-manual/success');
        } else {
          return router.push('/dashboard/connect-manual/failed');
        }      
      }
      catch (error) {
        toast.error(t("tryLater"))
      } finally {
        setIsLoading(false);
      }
    }else{
      setIsLoading(false);
      return toast.info(t("hasBinance"));
    }

  };
  // Error message translation mapping
  const translateErrorMessage = (errorKey: string | undefined) => {
    if (!errorKey) return "";
    return validationT(errorKey);
  };
  return (
    <>
      <Toast />
      <div className="mt-8 border-b-2 border-gray-300">
        <Textbox
          title="dashboard.connect_manual.title"
          description="dashboard.connect_manual.description"
        />
        <form
          className="md:w-2/3 w-full flex flex-col gap-3 pb-5"
          onSubmit={handleSubmit(submitForm)}
        >
          <Input
            label={t("api_key_label")}
            type="text"
            placeholder={t("api_key_placeHolder")}
            name="api_key"
            register={register}
            error={translateErrorMessage(errors?.api_key?.message)}
          />
          <Input
            label={t("api_secret_label")}
            type="password"
            placeholder={t("api_binance_secret_placeHolder")}
            name="api_secret"
            register={register}
            error={translateErrorMessage(errors?.api_secret?.message)}
          />
          <button className="main-btn md:w-fit w-full text-xl">
            {isLoading ? (
              <FaSpinner className="spinner text-secondary w-8 h-8 mx-auto" />
            ) : (
              t("connectAccount")
            )}
          </button>
        </form>
        <BinanceApiGuide />
      </div>
    </>
  );
}
