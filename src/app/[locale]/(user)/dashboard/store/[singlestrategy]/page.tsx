"use client";
import { useState, useEffect } from "react";
import { getFromCookies, useAuth } from "@/context/AuthContext";
import { API_BASE_URL } from "@/utils/api";
import Loading from "@/app/_components/common/loading/Loading";
import useFetch from "@/hooks/useFetch";
import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import { useRouter } from "@/i18n/routing";
import Toast from "@/app/_components/common/Tostify/Toast";
import { useAssetData } from "@/context/AssetsContext";
import {AssetData,SingleStrategyItemProps,TradingStats} from "@/utils/types";
import {FiArrowUpRight, FiBarChart2, FiDollarSign, FiPieChart,} from "react-icons/fi";
import { FaRegClock, FaSpinner } from "react-icons/fa6";
import { toast } from "react-toastify";
import FiltrationLabels from "@/app/_components/strategies/FiltrationLabels";

const SingleStrategy = ({ params }: SingleStrategyItemProps) => {
  const { user, fetchUserData } = useAuth();
  const accessToken = getFromCookies("access_token");
  const { assetData, assetLoading } = useAssetData();
  const [selectedValue, setSelectedValue] = useState<string>(""); // Default value
  const [isInstalling, setIsInstall] = useState<boolean>(false);

  const getSymbol = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
  };
  const [signalStrategy, setSignalStrategy] = useState<string | null>(null);
  const [aiStrategy, setAiStrategy] = useState<string | null>(null);
  const t = useTranslations("dashboard.strategies");
  const locale = useLocale();
  const router = useRouter();
  // get bianance backtest
  const { data: backtestData, loading } = useFetch(
    `${API_BASE_URL}/binance/backtest/${selectedValue}/${params?.singlestrategy}`,
    {
      method: "GET",
      next: { revalidate: 120 },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    },
    [selectedValue, params?.singlestrategy]
  );

  // const calculateStandardDeviation = (values: number[]): number => {
  //   const n: number = values.length;
  //   if (n < 2) return 0;

  //   const mean: number = values.reduce((a, b) => a + b, 0) / n;
  //   const variance: number =
  //     values.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (n - 1);
  //   return Math.sqrt(variance);
  // };

  const calculateStats = (data: any): TradingStats => {
    // if (!data) return { profitability: {}, risk: {}, performance: {} };

    return {
      profitability: {
        netProfit: data.profitability?.net_profit?.toFixed(2) || "0.00",
        winRate: data.profitability?.win_rate?.toFixed(2) || "0.00",
        lossRate: data.profitability?.loss_rate?.toFixed(2) || "0.00",
        avgProfit: data.profitability?.avg_profit?.toFixed(2) || "0.00",
        avgLoss: data.profitability?.avg_loss?.toFixed(2) || "0.00",
        roi: data.profitability?.roi?.toFixed(2) || "0.00",
      },
      risk: {
        sharpeRatio: data.risk?.sharpe_ratio?.toFixed(3) || "0.000",
        volatility: data.risk?.volatility?.toFixed(2) || "0.00",
        profitFactor: data.risk?.profit_factor?.toFixed(2) || "0.00",
        maxDrawdown: data.risk?.max_drawdown?.toFixed(2) || "0.00",
        riskToReward: data.risk?.risk_to_reward_ratio?.toFixed(2) || "0.00",
      },
      performance: {
        totalTrades: data.performance?.total_trades || 0,
        avgTimePerCycle:
          data.performance?.avg_time_per_cycle?.toFixed(2) || "0.00",
        correlation: data.performance?.correlation?.toFixed(2) || "0.00",
        cumulativeReturns:
          data.performance?.cumulative_returns?.toFixed(2) || "0.00",
      },
    };
  };

  // Use `calculateStats` with `backtestData`
  const { profitability, risk, performance } = backtestData
    ? calculateStats(backtestData)
    : { profitability: {}, risk: {}, performance: {} };

  // Fetch strategy details
  const { data, error } = useFetch(
    `${API_BASE_URL}/binance/strategies/${params.singlestrategy}?lang=${locale}`,
    {
      method: "GET",
      next: { revalidate: 180 },
    }
  );
  // Update the state based on the user's installed strategies
  useEffect(() => {
    if (user) {
      setSignalStrategy(user.signal_strategy);
      setAiStrategy(user.ai_strategy);
    }
  }, [user]);
  // set default first symbol at mount page
  useEffect(() => {
    setSelectedValue(assetData[0]?.symbol);
  }, []);

  if (loading || assetLoading) return <Loading />;
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
  // useEffect(() => {
  //   // const newData = generateDataForTimeframe(activeFilter);
  //   // setChartData(newData);
  //   calculateStats(backtestData);
  // }, []);
  return (
    <div className="md:px-0 px-2">
      <Toast />
      <div className="flex md:flex-row flex-col md:justify-between md:items-center gap-5">
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
      <div className="space-y-6 pt-6">
        {/* Profitability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Net Profit */}
          <div className="p-4 bg-gray-50 shadow-md rounded-lg">
            <div className="flex justify-between pb-2">
              <span className="text-lg font-medium text-gray-800">
                Net Profit
              </span>
              <FiDollarSign className="h-4 w-4 text-primary-700" />
            </div>
            <div>
              <div className="text-2xl font-bold py-1">
                ${profitability?.netProfit}
              </div>
              <div className="flex items-center text-primary-600">
                <FiArrowUpRight className="h-4 w-4 mr-1" />
                <span className="text-sm">+{profitability.roi}% <span className="text-dark">Return of investment</span></span>
              </div>
            </div>
          </div>

          {/* Win Rate */}
          <div className="p-4 bg-gray-50 shadow-md rounded-lg">
            <div className="flex justify-between pb-2">
              <span className="text-lg font-medium text-gray-800">
                Win Rate
              </span>
              <FiPieChart className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <div className="text-2xl font-bold py-1">
                {profitability.winRate}%
              </div>
              <div className="text-sm text-gray-500">
                {performance.totalTrades} total trades
              </div>
            </div>
          </div>

          {/* Profit Factor */}
          <div className="p-4 bg-gray-50 shadow-md rounded-lg">
            <div className="flex justify-between pb-2">
              <span className="text-lg font-medium text-gray-800">
                Profit Factor
              </span>
              <FiBarChart2 className="h-4 w-4 text-gray-500" />
            </div>
            <div>
              <div className="text-2xl font-bold py1">{risk.profitFactor}</div>
              <div className="text-sm text-gray-500">
                Risk-Reward: {risk.riskToReward}
              </div>
            </div>
          </div>
          {/* Average Time Per Cycle */}
          <div className="p-4 bg-gray-50 shadow-md rounded-lg">
            <div className="flex justify-between pb-2">
              <span className="text-lg font-medium text-gray-800">
                Avg Time Per Cycle
              </span>
              <FaRegClock className="h-4 w-4 text-gray-500" />
            </div>
            <div className="text-2xl font-bold py1">
              {performance?.avgTimePerCycle} hr
            </div>
          </div>
        </div>
      </div>
      {/*  */}
      <FiltrationLabels/>
    </div>
  );
};
export default SingleStrategy;
