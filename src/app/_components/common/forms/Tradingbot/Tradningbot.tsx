"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../input/input";
import { tradingbotType, tradingbotSchema } from "@/validation/TradingbotSchema";
import { MainBtn } from "../../Buttons/MainBtn";
import { getTokenFromStorage, useAuth } from '@/context/AuthContext';
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { toast } from "react-toastify";
import Toast from "../../Tostify/Toast";
import { useState } from "react";
import BotLogs from '@/app/_components/common/dashboard/BotLogs/Botlogs';
import { useTranslations } from "next-intl";

type tradingBotType = {
  type: 'signal' | 'ai';
}

export default function TradingBotForm({ type }: tradingBotType) {
  const t = useTranslations("dashboard");
  const validationT = useTranslations("validation.tradingbot");
  const accessToken = getTokenFromStorage("access_token");
  const { user } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm<tradingbotType>({
    mode: "onBlur",
    resolver: zodResolver(tradingbotSchema),
  });
  const { data: assetData } = useFetch(`${API_BASE_URL}/users/me/assets`, {
    method: 'GET',
    headers: {
      'authorization': `Bearer ${accessToken}`,
    },
    next: { revalidate: 60 }
  });

  const [orderId, setOrderId] = useState<string | null>(null);

  async function createOrder(data: any) {
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/orders/${type}`, {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      console.log(responseData);
      if (responseData.success) {
        toast.success("Order created successfully");
        setOrderId(responseData?.data?.id); // Set the orderId
        reset();
      } else {
        toast.error(responseData?.detail);
      }
    }
    catch (error) {
      toast.error("order creation failed");
    }
  }
  const translateErrorMessage = (errorKey: string | undefined) => {
    if (!errorKey) return '';
    return validationT(errorKey);
  };
  const submitForm: SubmitHandler<tradingbotType> = async (data) => {
    if ((user?.is_subscribed && !user?.is_demo) || user?.is_demo) {
      createOrder(data);
    } else {
      return toast.info("Please subscribe to create order");
    }
  };

  return (
    <>
      <Toast />
      <h3 className="text-xl font-medium capitalize text-dark w-fit py-2 border-b-2 border-primary-600">{t("start_trading")}</h3>
      <form className="w-full py-3" onSubmit={handleSubmit(submitForm)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-start items-start ">
          <div>
            <label htmlFor="symbol" className="block capitalize pb-1 text-lg font-medium tracking-wide">
              {t("symbol")}
            </label>
            <select
              id="symbol"
              className={`main_input border ${errors.symbol ? 'border-2 border-red-600 shadow' : ''}`}
              {...register('symbol')}
            >
              <option value="">{t("please_select")}</option>
              {assetData?.filter((asset: any) => asset.symbol !== 'usdt')
                .map((asset: any, index: number) => (
                  <option key={index} value={asset?.symbol}>
                    {asset?.symbol?.toUpperCase()}
                  </option>
                ))
              }
            </select>
            {errors?.symbol?.message && (
              <span className="text-red-600 text-sm pt-2">{translateErrorMessage(errors.symbol.message)}</span>
            )}
          </div>

          <Input
            label={t("quantity")}
            name="quantity"
            type="number"
            placeholder={t("quantity")}
            register={register}
            error={translateErrorMessage(errors.quantity?.message)}
          />
          <Input label={t("side")} value={t("buy")} type="text" name="buy" placeholder="" readOnly={true} />
          <Input label={t("orderType")} value={t("spot")} type="text" name="spot" placeholder="" readOnly={true} />
          <Input
            label={t("profitThreshold")}
            name="profit_threshold"
            type="number"
            placeholder={t("enter_profit_threshold")}
            register={register}
            error={translateErrorMessage(errors.profit_threshold?.message)}
          />
          <Input
            label={t("TrailingStopLoss")}
            name="trailing_stop_loss"
            type="number"
            placeholder={t("enter_trailling_loss")}
            register={register}
            error={translateErrorMessage(errors.trailing_stop_loss?.message)}
          />
          <Input
            label={t("maxCycles")}
            name="cycles"
            type="number"
            placeholder={t("maxCycles")}
            register={register}
            error={translateErrorMessage(errors.cycles?.message)}
          />
        </div>
        <MainBtn content="start" btnProps="w-fit" />
      </form>
      <>
        {orderId && <BotLogs orderId={orderId} />}
      </>
    </>
  )
}
