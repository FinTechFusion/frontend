"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Input from "../input/input";
import { tradingbotType,tradingbotSchema,} from "@/validation/TradingbotSchema";
import { MainBtn, SpinBtn } from "../../Buttons/MainBtn";
import { getTokenFromStorage, useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";

type tradingBotType = {
  type: "signal" | "ai";
};

export default function TradingBotForm({ type }: tradingBotType) {
  const [currentSymbol, setCurrentSymbol] = useState<string | null>(null);
  const [symbolData, setSymbolData] = useState([]);
  const [userAssets, setUserAssets] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [signalProfitRange, setSignalProfitRange] = useState("N/A");
  const [aiProfitRange, setAiProfitRange] = useState("N/A");
  const { user } = useAuth();
  const t = useTranslations("dashboard");
  const locale = useLocale();
  const validationT = useTranslations("validation.tradingbot");
  const accessToken = getTokenFromStorage("access_token");

  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors },
    reset,
  } = useForm<tradingbotType>({
    mode: "onBlur",
    resolver: zodResolver(tradingbotSchema),
  });
  async function FetchAssets() {
    const response = await fetch(`${API_BASE_URL}/users/me/assets`, {
      method: "GET",
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch assets");
    }
    const { data } = await response.json();
    return data;
  }

  async function FetchSupportedSymbols() {
    if (!user?.is_demo) {
      const response = await fetch(`${API_BASE_URL}/orders/symbols`, {
        method: "GET",
      });
      if (!response.ok) {
        throw new Error("Failed to fetch supported symbols");
      }
      const { data } = await response.json();
      return data;
    }
  }

  useEffect(() => {
    async function GetSymbolIntersection() {
      try {
        // Fetch user's assets
        const fetchedAssets: { items: { quantity: number; symbol: string }[] } =
          await FetchAssets();
        const supportedSymbols: string[] = await FetchSupportedSymbols();

        // If the user is a demo user, we use demo assets
        if (user?.is_demo) {

          // Instead of stringify, extract just the asset symbols and set them to state
          const demoAssets = fetchedAssets.items.map((item) =>
            item.symbol.toUpperCase()
          ); // Extract asset symbols
          setUserAssets(demoAssets); // Set the state to an array of symbols
          return;
        }
        // Extract symbols from user assets and normalize to lowercase
        const assetSymbols = fetchedAssets.items
          .map((asset) => asset.symbol?.toLowerCase())
          .filter(Boolean); // Ensure no null/undefined symbols

        // Extract and normalize supported symbols to lowercase
        const supportedSymbolsList = supportedSymbols.map((symbol) =>
          symbol.toLowerCase()
        );

        // Find intersection between user's assets and supported symbols
        const intersection = assetSymbols.filter((symbol) =>
          supportedSymbolsList.includes(symbol)
        );

        // Check if "usdt" exists in the user's assets
        if (assetSymbols.includes("usdt")) {
          if (!intersection.includes("usdt")) {
            intersection.push("usdt");
          }
        }

        setUserAssets(intersection); // Update the state with the intersection
        return intersection;
      } catch (error) {
        console.error("Error fetching or processing symbols:", error);
        return [];
      }
    }
    GetSymbolIntersection();
  }, [user?.is_demo]);

  async function FetchSignalProfitRange() {
    if (type === "signal" && user?.signal_cycles != null) {
      const response = await fetch(
        `${API_BASE_URL}/binance/strategies/${user?.signal_strategy}`,
        {
          method: "GET",
        }
      );
      const { data } = await response.json();
      setSignalProfitRange(data?.start_range + " - " + data?.end_range);
    }
  }
  async function FetchAiProfitRange() {
    if (type === "ai" && user?.ai_strategy != null) {
      const response = await fetch(
        `${API_BASE_URL}/binance/strategies/${user?.ai_strategy}`,
        {
          method: "GET",
        }
      );
      const { data } = await response.json();
      setAiProfitRange(data?.start_range + " - " + data?.end_range);
    }
  }
  useEffect(() => {
    if (type === "signal" && user?.signal_strategy) {
      FetchSignalProfitRange();
    } else {
      setSignalProfitRange("N/A"); // Reset to N/A if the strategy is uninstalled
    }
    if (type === "ai" && user?.ai_strategy) {
      FetchAiProfitRange();
    } else {
      setAiProfitRange("N/A"); // Reset to N/A if the strategy is uninstalled
    }
  }, [user?.signal_strategy, user?.ai_strategy, type]);

  useEffect(() => {
    const fetchData = async () => {
      const symbolData = await FetchSupportedSymbols();
      setSymbolData(symbolData);
    };
    fetchData();
  }, [user?.is_demo]);

  const translateErrorMessage = (errorKey: string | undefined) => {
    if (!errorKey) return "";
    return validationT(errorKey);
  };
  async function createOrder(data: any) {
    setLoading(true);
    try {
      const response = await fetch(
        `${API_BASE_URL}/users/me/orders/${type}?lang=${locale}`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      const responseData = await response.json();
      if (responseData.success) {
        toast.success(validationT("ordersuccess"));
        reset();
      } else {
        return toast.error(responseData.detail || responseData.detail[0]?.msg);
      }
    } catch (error) {
      toast.error(validationT("orderfailed"));
    } finally {
      setLoading(false);
    }
  }
  const quantityAtRealCheck = (e: React.FocusEvent<HTMLInputElement>) => {
    const value = +e.target.value; // Convert the value to a number
    if (!user?.is_demo && value < 10) {
      // Set the error if quantity is less than 10 for real users
      setError("quantity", {
        type: "manual",
        message: "quantity.min",
      });
    } else {
      clearErrors("quantity");
    }
  };
  async function calcQuantity(symbol: string) {
    try {
      const response = await fetch(`${API_BASE_URL}/binance/${symbol}/ticker`, {
        method: "GET",
        headers: {
          authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        return toast.error(validationT("invalidErrOrSymbol"));
      }
      const data = await response.json();
      if (!data?.success) {
        return toast.error(data.detail[0]?.msg || data.detail);
      }
      return data?.data?.last_price;
    } catch (err) {
      console.log(err);
    }
  }
  const submitForm: SubmitHandler<tradingbotType> = async (data) => {
    if (data?.quantity < 10 && !user?.is_demo) {
      toast.warning(validationT("quantity.min"));
      return; // Prevent form submission if there is an error in quantity
    }

    const isSubscribedAndReal = user?.is_subscribed && !user?.is_demo;
     const isDemo = user?.is_demo;
     // Modify data if account is real
     const modifiedData = { ...data,
      symbol: data.symbol?.toLowerCase(),
     };

    if (!user?.is_demo && data.secondarySymbol) {
      modifiedData.symbol = data.secondarySymbol.toLocaleLowerCase(); // Use secondarySymbol as symbol
      if (modifiedData?.secondarySymbol) {
        const symbolPrice = await calcQuantity(modifiedData?.secondarySymbol);
        modifiedData.quantity = +(data.quantity / symbolPrice).toFixed(4);
      }
    }

    if (isSubscribedAndReal || isDemo) {
      await createOrder(modifiedData);
    } else {
      return toast.info(t("subscribeFirst"));
    }
  };
  function checkSymbol(e: any) {
    const selectedSymbol = e.target.value;
    if (selectedSymbol == "USDT") {
      setCurrentSymbol(selectedSymbol);
    } else {
      setCurrentSymbol(null);
    }
  }

  return (
    <>
      <h3 className="text-xl font-medium capitalize text-dark w-fit py-2 border-b-2 border-primary-600">
        {t("start_trading")}
      </h3>
      <form className="w-full py-3" onSubmit={handleSubmit(submitForm)}>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-5 justify-start items-start ">
          <div>
            <label
              htmlFor="symbol"
              className="block capitalize pb-1 text-lg font-medium tracking-wide"
            >
              {t("symbol")}
            </label>
            <select
              id="symbol"
              className={`main_input border translate-y-0 ${
                errors.symbol ? "border-2 border-red-600 shadow" : ""
              }`}
              {...register("symbol",{required:validationT("symbol.required")})}
              onChange={checkSymbol}
            >
              <option value="">{t("please_select")}</option>
              {userAssets?.map((asset: any, index: number) => (
                <option key={index} value={asset?.symbol}>
                  {asset?.toUpperCase()}
                </option>
              ))}
            </select>
            {errors?.symbol?.message && (
              <span className="text-red-600 text-sm pt-2">
                {translateErrorMessage(errors.symbol.message)}
              </span>
            )}
          </div>
          {currentSymbol == "USDT" && (
            <div className="second-symbol">
              <label
                htmlFor="symbol2"
                className="block capitalize pb-1 text-lg font-medium tracking-wide"
              >
                {t("symbol")}
              </label>
              <select
                id="symbol2"
                className={`main_input border translate-y-0 ${
                  errors.symbol && "border-2 border-red-600 shadow"
                }`}
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
                <span className="text-red-600 text-sm pt-2">
                  {translateErrorMessage(errors.secondarySymbol.message)}
                </span>
              )}
            </div>
          )}

          <Input
            label={user?.is_demo ? t("quantity") : t("tradingQuantity")}
            name="quantity"
            type="number"
            placeholder={user?.is_demo ? t("quantity") : t("tradingQuantity")}
            register={register}
            onBlur={quantityAtRealCheck}
            error={translateErrorMessage(errors.quantity?.message)}
          />
          <Input
            label={t("side")}
            value={t("buy")}
            type="text"
            name="buy"
            placeholder=""
            readOnly={true}
          />
          <Input
            label={t("orderType")}
            value={t("spot")}
            type="text"
            name="spot"
            placeholder=""
            readOnly={true}
          />

          {type === "signal" ? (
            <Input
              label={t("profitThreshold")}
              name="profit_range"
              type="text"
              placeholder=""
              readOnly={true}
              value={signalProfitRange}
            />
          ) : (
            <Input
              label={t("profitThreshold")}
              name="profit_range"
              type="text"
              placeholder=""
              readOnly={true}
              value={aiProfitRange}
            />
          )}
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
        {loading ? (
          <SpinBtn content="loading" btnProps="w-fit" />
        ) : (
          <MainBtn content="start" btnProps="w-fit" />
        )}
      </form>
    </>
  );
}
