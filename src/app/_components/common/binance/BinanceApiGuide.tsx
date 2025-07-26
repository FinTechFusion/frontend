import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import { FaCopy } from "react-icons/fa6";
import {
  MdArrowRight,
  MdWarning,
  MdVpnKey,
  MdLock,
  MdSecurity,
} from "react-icons/md";

const BinanceApiGuide = () => {
  const t = useTranslations("dashboard.binanceApiGuide");
  const locale = useLocale();
  const steps = [
    {
      id:0,
      title: t("steps.0.title"),
      instructions: [t("steps.0.instructions.0"), t("steps.0.instructions.1")],
      imageEn: "/assets/images/login-EN.png",
      imageAr: "/assets/images/login-AR.png",
      icon: <MdLock className="w-6 h-6" />,
    },
    {
      id:1,
      title: t("steps.1.title"),
      instructions: [
        t("steps.1.instructions.0"),
        t("steps.1.instructions.1"),
        t("steps.1.instructions.2"),
      ],
      imageEn: "/assets/images/verify-EN.png",
      imageAr: "/assets/images/verify-AR.png",
      icon: <MdVpnKey className="w-6 h-6" />,
    },
    {
      id:2,
      title: t("steps.2.title"),
      instructions: [
        t("steps.2.instructions.0"),
        t("steps.2.instructions.1"),
        t("steps.2.instructions.2"),
      ],
      imageEn: "/assets/images/KeyType-EN.png",
      imageAr: "/assets/images/KeyType-AR.png",
      icon: <MdSecurity className="w-6 h-6" />,
    },
    {
      id:3,
      title: t("steps.3.title"),
      instructions: [t("steps.3.instructions.0"), t("steps.3.instructions.1")],
      imageEn: "/assets/images/auth-EN.png",
      imageAr: "/assets/images/auth-AR.png",
      icon: <MdSecurity className="w-6 h-6" />,
    },
    {
      id:4,
      title: t("steps.4.title"),
      instructions: [
        t("steps.4.instructions.0"),
        t("steps.4.instructions.1"),
        t("steps.4.instructions.2"),
        t("steps.4.instructions.3"),
        t("steps.4.instructions.4"),
        t("steps.4.instructions.5"),
      ],
      imageEn: "/assets/images/premission-EN.png",
      imageAr: "/assets/images/premission-AR.png",
      icon: <MdVpnKey className="w-6 h-6" />,
    },
  ];
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="rounded-md">
      <div className="shadow-sm overflow-hidden mb-8">
        <div className="border-b border-gray-200 p-6">
          <div className="flex items-center gap-2">
            <MdVpnKey className="w-6 h-6" />
            <h2 className="text-2xl font-bold">{t("title")}</h2>
          </div>
        </div>

        <div className="p-6">
          <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
            <div className="flex items-start">
              <MdWarning className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
              <div>
                <p className="text-lg text-yellow-700">{t("warning")}</p>
              </div>
            </div>
          </div>

          <div className="space-y-8">
            {steps.map((step, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-lg p-6 bg-secondary"
              >
                <div className="flex items-center gap-3 mb-4">
                  {step.icon}
                  <h3 className="text-xl font-semibold">
                    Step {index + 1}: {step.title}
                  </h3>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 justify-between gap-6">
                  <div>
                    {step.instructions && step.instructions.length > 0 && (
                      <ul className="space-y-2">
                        {step.instructions.map((instruction, i) => (
                          <li
                            key={i}
                            className="flex items-center gap-2 text-lg"
                          >
                            <MdArrowRight className="w-4 h-4 mt-1 flex-shrink-0 text-primary-600" />
                            {instruction.includes("35.204.7.206") ? (
                              <span className="flex items-center gap-2">
                                {instruction}
                                <button
                                  onClick={() =>
                                    copyToClipboard("35.204.7.206")
                                  }
                                  className="text-primary-600 hover:text-primary-700"
                                  title="Copy IP"
                                >
                                  <FaCopy className="w-5 h-5" />
                                </button>
                              </span>
                            ) : (
                              <span>{instruction}</span>
                            )}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="md:w-1/2 w-full">
                    <Image
                      src={locale === "en" ? step?.imageEn : step?.imageAr}
                      width={200}
                      height={200}
                      alt={`Step ${index + 1} - ${step.title}`}
                      className={`rounded-lg border shadow-sm w-full  h-full object-contain ${step?.id === 4 && 'scale-125 transform origin-center'}`}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BinanceApiGuide;
