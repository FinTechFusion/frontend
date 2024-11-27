"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../input/input";
import { tradingbotType, tradingbotSchema } from "@/validation/TradingbotSchema";
import { MainBtn, SpinBtn } from "../../Buttons/MainBtn";
import { getTokenFromStorage, useAuth } from '@/context/AuthContext';
import useFetch from '@/hooks/useFetch';
import { API_BASE_URL } from '@/utils/api';
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
// import BotLogs from '@/app/_components/common/dashboard/BotLogs/Botlogs';
import { useLocale, useTranslations } from "next-intl";

type tradingBotType = {
  type: 'signal' | 'ai';
}

export default function TradingBotForm({ type }: tradingBotType) {
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
  const [symbolData, setSymbolData] = useState([]);
  const [loading, setLoading] = useState<boolean>(false);
  // const [orderId, setOrderId] = useState<string | null>(null);
  const [signalProfitRange, setSignalProfitRange] = useState("N/A");
  const [aiProfitRange, setAiProfitRange] = useState("N/A");
  const { user } = useAuth();
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const validationT = useTranslations("validation.tradingbot");
  const accessToken = getTokenFromStorage("access_token");

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
  async function createOrder(data: any) {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/users/me/orders/${type}?lang=${locale}}`, {
        method: 'POST',
        headers: {
          'authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(validationT("ordersuccess"));
        // setOrderId(responseData?.data?.id);
        reset();
      } else {
        toast.error(responseData?.detail);
      }
    }
    catch (error) {
      toast.error(validationT("orderfailed"));
    }
    finally {
      setLoading(false);
    }
  }
  async function FetchSymbols() {
    const response = await fetch(`${API_BASE_URL}/orders/symbols`, {
      method: 'GET',
    });
    const { data } = await response.json();
    return data;
  }
  async function FetchSignalProfitRange() {
    if (type === "signal" && user?.signal_cycles != null) {
      const response = await fetch(`${API_BASE_URL}/binance/strategies/${user?.signal_strategy}`, {
        method: 'GET',
      });
      const { data } = await response.json();
      setSignalProfitRange(data?.start_range + " - " + data?.end_range);
    }
  }
  async function FetchAiProfitRange() {
    if (type === "ai" && user?.ai_strategy != null) {
      const response = await fetch(`${API_BASE_URL}/binance/strategies/${user?.ai_strategy}`, {
        method: 'GET',
      });
      const { data } = await response.json();
      setAiProfitRange(data?.start_range + " - " + data?.end_range);
    }
  }
  useEffect(() => {
    if (type === "signal" && user?.signal_strategy) {
      FetchSignalProfitRange();
    }
    else{
        setSignalProfitRange("N/A"); // Reset to N/A if the strategy is uninstalled
    }
    if (type === "ai" && user?.ai_strategy) {
      FetchAiProfitRange();
    }
    else {
      setAiProfitRange("N/A"); // Reset to N/A if the strategy is uninstalled
    }
  }, [user?.signal_strategy,user?.ai_strategy]);

  useEffect(() => {
    const fetchData = async () => {
      if (currentSymbol !== null) {
        const symbolData = await FetchSymbols();
        setSymbolData(symbolData)
      }
    }
    fetchData();
  }, [currentSymbol])

  const translateErrorMessage = (errorKey: string | undefined) => {
    if (!errorKey) return '';
    return validationT(errorKey);
  };

  const submitForm: SubmitHandler<tradingbotType> = async (data) => {
    if ((user?.is_subscribed && !user?.is_demo) || user?.is_demo) {
      createOrder(data);
    } else {
      return toast.info(t("subscribeFirst"));
    }
  };
  function checkSymbol(e: any) {
    const selectedSymbol = e.target.value;
    if (selectedSymbol === "usdt") {
      setCurrentSymbol(selectedSymbol);
    } else {
      setCurrentSymbol(null);
    }
  }

  return (
    <>
      <h3 className="text-xl font-medium capitalize text-dark w-fit py-2 border-b-2 border-primary-600">{t("start_trading")}</h3>
      <form className="w-full py-3" onSubmit={handleSubmit(submitForm)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-start items-start ">
          <div>
            <label htmlFor="symbol" className="block capitalize pb-1 text-lg font-medium tracking-wide">
              {t("symbol")}
            </label>
            <select
              id="symbol"
              className={`main_input border translate-y-0 ${errors.symbol ? 'border-2 border-red-600 shadow' : ''}`}
              {...register('symbol')}
              onChange={checkSymbol}
            >
              <option value="">{t("please_select")}</option>
              {assetData?.items?.map((asset: any, index: number) => (
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
          {currentSymbol === "usdt" && (
            <div className="second-symbol">
              <label htmlFor="symbol2" className="block capitalize pb-1 text-lg font-medium tracking-wide">
                {t("symbol")}
              </label>
              <select
                id="symbol2"
                className={`main_input border translate-y-0 ${errors.symbol ? 'border-2 border-red-600 shadow' : ''}`}
                {...register("secondarySymbol")}
              >
                <option value="">{t("please_select")}</option>
                {symbolData?.map((asset: string, index: number) => (
                  <option key={index} value={asset}>
                    {asset?.toUpperCase()}
                  </option>
                ))}
              </select>
              {errors?.secondarySymbol?.message && (
                <span className="text-red-600 text-sm pt-2">{translateErrorMessage(errors.secondarySymbol.message)}</span>
              )}
            </div>
          )}

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
          {type === "signal" ? <Input
            label={t("profitThreshold")}
            name="profit_range"
            type="text"
            placeholder=""
            readOnly={true}
            value={signalProfitRange}
          /> : <Input
            label={t("profitThreshold")}
            name="profit_range"
            type="text"
            placeholder=""
            readOnly={true}
            value={aiProfitRange}
          />}
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
        {loading ? <SpinBtn content="loading" btnProps="w-fit" /> : <MainBtn content="start" btnProps="w-fit" />}
      </form>
      {/* <>
        {orderId && <BotLogs orderId={orderId} />}
      </> */}
    </>
  )
}
