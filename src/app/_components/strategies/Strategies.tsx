"use client";
import { Strategy } from "@/utils/types";
import StrategieCard from "./StrategieCard";
import { useLocale, useTranslations } from "next-intl";
import Loading from "../common/loading/Loading";
import { API_BASE_URL } from "@/utils/api";
import useFetch from "@/hooks/useFetch";

export default function Strategies() {
  const t = useTranslations("dashboard");
  const locale = useLocale();

  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/binance/strategies?lang=${locale}`,
    {
      method: "GET",
      next: { revalidate: 180 },
    },[]);
  if (loading) return <Loading />;
  if (error) {
    throw new Error("Error fetching strategies, try again later");
  }
  return (
    <div className="md:px-0 px-2">
      <div className="section-title pt-6">
        <h3 className="text-2xl font-medium hover:text-primary-700">
          {t("ourStrategies")}
        </h3>
      </div>
      <section className="store-strategies grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-5">
        {data && data.length > 0 ? (
          data.map((el: Strategy) => <StrategieCard key={el.id} {...el} />)
        ) : (
          <p className="text-xl">{t("noStrategiesFound")}</p>
        )}
      </section>
    </div>
  );
}
