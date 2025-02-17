"use client";
import { useState, useEffect, useMemo } from "react";
import { getFromCookies, useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import Loading from "@/app/_components/common/loading/Loading";
import useFetch from "@/hooks/useFetch";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import Toast from "@/app/_components/common/Tostify/Toast";
import { useAssetData } from "@/context/AssetsContext";
import {
  AssetData,
  resultBacktest,
  SingleStrategyItemProps,
} from "@/utils/types";
import { FiDollarSign, FiPieChart } from "react-icons/fi";
import { FaRegClock, FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";
import { CalculateNetProfitAndRIO } from "@/lib/backtest/NetProfitService";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { balanceSchema, balanceType } from "@/validation/balanceSchema";
import { Input } from "@/app/_components/common/forms";
import ProfitChart from "@/app/_components/common/dashboard/charts/ProfitChart";
import filterDataByTimeRange from "@/app/_components/strategies/filterDataByTimeRange";
import FiltrationLabels from "@/app/_components/strategies/FiltrationLabels";
type TimeRange = "1D" | "3D" | "7D" | "1M" | "3M" | "6M" | "1Y" | "Overall";

const SingleStrategy = ({ params }: SingleStrategyItemProps) => {
  const { user, fetchUserData } = useAuth();
  const accessToken = getFromCookies("access_token");
  const { assetData, assetLoading } = useAssetData();
  const [selectedValue, setSelectedValue] = useState<string>(""); // Default value
  const [isInstalling, setIsInstall] = useState<boolean>(false);
  const [resultBacktest, setResultBacktest] = useState<resultBacktest>({
    finalBalance: "0",
    netProfit: "0",
    roi: "0",
  });
  const [activeFilter, setActiveFilter] = useState<TimeRange>("Overall");

  const validationT = useTranslations("validation");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<balanceType>({
    mode: "onBlur",
    resolver: zodResolver(balanceSchema),
  });
  const getSymbol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
  };
  const [signalStrategy, setSignalStrategy] = useState<string | null>(null);
  const [aiStrategy, setAiStrategy] = useState<string | null>(null);
  const t = useTranslations("dashboard.strategies");
  const locale = useLocale();
  const router = useRouter();

  // Fetch strategy details
  const { data, error } = useFetch(
    `${API_BASE_URL}/binance/strategies/${params?.singlestrategy}?lang=${locale}`,
    {
      method: "GET",
      next: { revalidate: 180 },
    }
  );
  // Update the state based on the user's installed strategies
  useEffect(() => {
    if (user?.signal_strategy && user?.ai_strategy) {
      setSignalStrategy(user.signal_strategy);
      setAiStrategy(user.ai_strategy);
    }
  }, [user]);

  // set default first symbol at mount page
  useEffect(() => {
    if (assetData.length > 0 && assetData[0]?.symbol) {
      setSelectedValue(assetData[0].symbol);
    }
  }, [assetData]);
  // Ensure shouldFetch is either a string (valid URL) or null (prevent fetching)
  const shouldFetch =params?.singlestrategy
      ? `${API_BASE_URL}/binance/backtest/${selectedValue}/${params.singlestrategy}`
      : null;
  const { data: backtestData} = useFetch(
    shouldFetch, // Pass null if no fetch is needed
    {
      method: "GET",
      next: { revalidate: 120 },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    [selectedValue, params?.singlestrategy]
  );
  // console.log(backtestData)

  // if(loading) <Loading
  const onSubmit: SubmitHandler<balanceType> = (data) => {
    if (backtestData && backtestData?.total_trades) {
      const result = CalculateNetProfitAndRIO(
        data?.balance,
        backtestData?.profitable_trades
      );
      console.log(result)
      setResultBacktest(result);
      console.log(result);
      reset();
    }
  };

  if (assetLoading) return <Loading />;
  // check there is error at fetch startegy details
  if (error) {
    toast.error(t("fetchStrategyError"));
    return null;
  }
  // Handle installation of the strategy
  async function InstallStrategy() {
    if (data.bot_type === "signal" && signalStrategy != null) {
      return toast.info(t("installOneSignalOnly"));
    } else if (data.bot_type === "ai" && aiStrategy != null) {
      return toast.info(t("installOneAiOnly"));
    } else {
      try {
        setIsInstall(true);
        const response = await fetch(
          `${API_BASE_URL}/users/me/strategy/${data.bot_type}/${data.id}/install`,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${accessToken}`,
            },
          }
        );
        const responseData = await response.json();
        if (responseData.success) {
          if (accessToken) {
            await fetchUserData(accessToken);
          }
          if (data.bot_type === "signal") {
            router.push(`/dashboard/botsignal`);
          } else {
            router.push(`/dashboard/botai`);
          }
        } else {
          if (responseData.class === "UserStrategyNotAvailable")
            return toast.info(t("subscribeFirst"));
        }
      } catch (error) {
        throw new Error(t("somethingError"));
      } finally {
        setIsInstall(false);
      }
    }
  }
  // Error message translation mapping
  const translateErrorMessage = (errorKey: string | undefined) => {
    if (!errorKey) return "";
    return validationT(errorKey);
  };
  // const filteredData: Trade[] = useMemo(() => {
  //   return backtestData?.profitable_trades
  //     ? filterDataByTimeRange(backtestData.profitable_trades, activeFilter)
  //     : [];
  // }, [backtestData, activeFilter]);

  // Just use filteredData directly for the chart
  // const chartData = filteredData;
  
  return (
    <div className="md:px-0 px-2">
      <Toast />
      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-5 mb-6">
        <div className="md:w-32 w-full mt-5">
          <select
            id="crypto-select"
            className="block uppercase w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-primary-600 focus:border-primary-600"
            value={selectedValue}
            onChange={getSymbol}
          >
            {assetData?.length > 0 &&
              assetData.map((symbol: AssetData, index: number) => (
                <option
                  className="uppercase"
                  key={index}
                  value={symbol?.symbol}
                >
                  {symbol?.symbol}
                </option>
              ))}
          </select>
        </div>
        <button
          className="main-btn md:w-fit w-full text-xl"
          onClick={InstallStrategy}
        >
          {isInstalling ? (
            <FaSpinner className="spinner text-secondary w-6 h-6" />
          ) : (
            t("install")
          )}
        </button>
      </div>
      <hr />
      {/* calculate balance */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex md:flex-row flex-col md:justify-between md:items-center pt-5 gap-2"
      >
        <div className="md:w-1/3">
          <Input
            register={register}
            name="balance"
            type="number"
            placeholder={t("enterBalnceByusdt")}
            error={translateErrorMessage(errors.balance?.message)}
          />
        </div>
        <button className="main-btn md:w-[250px]" type="submit">
          {t("calculate")}
        </button>
      </form>
      <div className="space-y-6 pt-6">
        {/* Profitability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Net Profit */}
          <div className="p-4 bg-gray-50 shadow-md rounded-lg">
            <div className="flex justify-between pb-2">
              <span className="text-lg font-medium text-gray-800">
                {t("Netprofit")}
              </span>
              <FiDollarSign className="h-4 w-4 text-primary-700" />
            </div>
            <div>
              <div className="text-2xl font-bold py-1">
                $ {resultBacktest?.netProfit}
              </div>
            </div>
          </div>

          {/* Win Rate */}
          <div className="p-4 bg-gray-50 shadow-md rounded-lg">
            <div className="flex justify-between pb-2">
              <span className="text-lg font-medium text-gray-800">
                {t("winRate")}
              </span>
              <FiPieChart className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <div className="text-2xl font-bold py-1">100 %</div>
              <div className="text-sm text-gray-500">
                {(backtestData && backtestData?.total_trades) || 0}{" "}
                {t("totalTrades")}
              </div>
            </div>
          </div>
          {/* RIO */}
          <div className="p-4 bg-gray-50 shadow-md rounded-lg">
            <div className="flex justify-between pb-2">
              <span className="text-lg font-medium text-gray-800">
                {t("ROI")}
              </span>
              <FiPieChart className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <div className="text-2xl text-primary-600 font-bold py-1">
                {resultBacktest?.roi} %
              </div>
            </div>
          </div>
          {/* Average Time Per Cycle */}
          <div className="p-4 bg-gray-50 shadow-md rounded-lg">
            <div className="flex justify-between pb-2">
              <span className="text-lg font-medium text-gray-800">
                {t("averageTimePerCycle")}
              </span>
              <FaRegClock className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold py1">
              {backtestData && backtestData?.avg_time_per_cycle != null
                ? (parseFloat(backtestData?.avg_time_per_cycle) / 60).toFixed(2)
                : "0.00"}{" "}
              {t("hr")}
            </div>
          </div>
        </div>
      </div>
      {/* <PerformanceChart/> */}
      <div className="w-full mt-12">
        <FiltrationLabels
          activeFilter={activeFilter}
          setActiveFilter={setActiveFilter}
        />
        {/* test  */}
        {/* <ProfitChart trades={chartData} /> */}
      </div>
    </div>
  );
};
export default SingleStrategy;
