// "use client";

// import { API_BASE_URL } from "@/utils/api";
// import { toast } from "react-toastify";
// import { useLocale, useTranslations } from "next-intl";
// import { useRouter } from "@/i18n/navigation";
// import { useState, useEffect } from "react";
// import { getTokenFromStorage, useAuth } from "@/context/AuthContext";

// export default function useSubscribe() {
//    const router = useRouter();
//    const [isLoading, setIsLoading] = useState(false);
//    const { user, fetchUserData } = useAuth();
//    const locale = useLocale();
//    const t = useTranslations("plans");

//    // Cleanup state when component unmounts
//    useEffect(() => {
//       return () => {
//          setIsLoading(false);
//       };
//    }, []);

//    const createSubscription = async (planId: string) => {
//       const accessToken = getTokenFromStorage("access_token");
//       if (!accessToken) {
//          // Save planId in sessionStorage and redirect to login
//          router.push("/login");
//          return;
//       }
//       setIsLoading(true);
//       try {
//          const endpoint = `${API_BASE_URL}/users/me/subscription?lang=${locale}`;
//          const method = user?.is_subscribed ? "PATCH" : "POST";
//          const response = await fetch(endpoint, {
//             method,
//             headers: {
//                "Content-Type": "application/json",
//                Authorization: `Bearer ${accessToken}`,
//             },
//             body: JSON.stringify({ plan: planId }),
//          });

//          const result = await response.json();

//          // Handle unsuccessful API response
//          if (!result.success) {
//             toast.info(result?.detail || t("errorOccurred"));
//             return;
//          }

//          // Handle free trial subscription
//          if (result.data.plan === "beginner_trial") {
//             toast.success(t("subscribeSuccess"));
//             fetchUserData(accessToken); // Refresh user data
//             return;
//          }

//          // Redirect to payment page for paid plans
//          if (result.success && result.data.client_secret) {
//             router.push(`/site/payment?clientSecret=${encodeURIComponent(result.data.client_secret)}`);
//          }
//       } catch (error) {
//          console.error(`Error creating subscription: ${error}`);
//          toast.error(t("errorOccurred"));
//       } finally {
//          setIsLoading(false);
//       }
//    };

//    return { createSubscription, isLoading };
// }
