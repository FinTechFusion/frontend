import { Strategy } from "@/utils/types";
import Image from "next/image";
import { MainBtn } from "../common/Buttons/MainBtn";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function StrategieCard({
  id,
  banner_url,
  name,
  start_range,
  end_range,
  description,
}: Strategy) {
  const t = useTranslations("dashboard");

  const getTimeframeLabel = (start: number) => {
    if (start < 1) return "Short-term";
    return "Long-term";
  };
  return (
    <div className="bg-secondary rounded-xl shadow-md overflow-hidden hover:shadow-md transition-shadow duration-300 border border-primary-100">
      <div className="relative">
        {/* Header with gradient overlay */}
        <div className="h-32 bg-gradient-to-r from-primary-500 to-primary-600 flex items-center justify-start p-6">
          {/* {getStrategyIcon(strategy.name)} */}
          <Image
            src={banner_url}
            alt={name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <h2 className="text-2xl font-bold text-secondary mx-2">{name}</h2>
        </div>

        {/* Strategy Details */}
        <div className="p-6">
          <div className="mb-4">
            <span className="inline-block px-3 py-1 text-sm font-semibold text-secondary bg-primary-500 rounded-full">
              {getTimeframeLabel(start_range)}
            </span>
          </div>

          <p className="text-gray-600 mb-4 h-28">{description}</p>

          {/* Range Indicator */}
          <div className="my-4">
            <div className="flex justify-between text-sm text-primary-600 mb-2">
              <span>Range</span>
              <span>
                {start_range} - {end_range}
              </span>
            </div>
            <div className="h-2 bg-primary-100 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(end_range / 3) * 100}%`,
                  backgroundColor:
                    start_range < 1
                      ? "#14B8A6"
                      : start_range < 2
                      ? "#14B8A6"
                      : start_range < 2.5
                      ? "#14B8A6"
                      : "#14B8A6",
                }}
              />
            </div>
          </div>

          {/* Action Button */}
          <Link href={`store/${id}`}>
            <MainBtn
              content="install"
              btnProps="w-fit my-2 rounded-md p-0 text-lg"
            />
          </Link>
        </div>
      </div>
    </div>
  );
}
