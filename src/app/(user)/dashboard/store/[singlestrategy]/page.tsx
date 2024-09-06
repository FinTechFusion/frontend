"use client";

import React, { useState, useEffect } from "react";
import { getTokenFromStorage, useAuth } from "@/context/AuthContext";
import Textbox from "@/app/_components/common/Text/Textbox";
import { API_BASE_URL } from "@/utils/api";
import Image from "next/image";
import Loading from "@/app/_components/common/loading/Loading";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
import Toast from "@/app/_components/common/Tostify/Toast";
import { useRouter } from "next/navigation";

interface SingleStrategyItemProps {
  params: {
    singlestrategy: string;
  };
}

const SingleStrategy = ({ params }: SingleStrategyItemProps) => {
  const { user } = useAuth();
  const accessToken = getTokenFromStorage("access_token");
  const [signalStrategy, setSignalStrategy] = useState<string | null>(null);
  const [aiStrategy, setAiStrategy] = useState<string | null>(null);
  const router = useRouter();

  // Wait for `user` before setting strategies
  useEffect(() => {
    if (user) {
      setSignalStrategy(user.signal_strategy || null);
      setAiStrategy(user.ai_strategy || null);
    }
  }, [user]);

  // Fetch strategy details
  const { data, loading, error } = useFetch(
    `${API_BASE_URL}/binance/strategies/${params.singlestrategy}`,
    {
      method: "GET",
      next: { revalidate: 180 },
    }
  );

  if (loading) return <Loading />;
  if (error) {
    toast.error("Error fetching strategy, please try again later.");
    return null;
  }

  // Check if `data` is available
  if (!data) {
    toast.error("No strategy data found.");
    return null;
  }

  // Handle installation of the strategy
  async function InstallStrategy() {
    if (!accessToken) {
      toast.error("User not authenticated. Please log in.");
      return;
    }

    try {
      const response = await fetch(
        `${API_BASE_URL}/users/me/strategy/${data.bot_type}/${data.id}/install`,
        {
          method: "POST",
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      );

      if (!response.ok) {
        toast.error("Error installing strategy, please try again later.");
        return;
      }

      const responseData = await response.json();

      if (responseData.success) {
        if (data.bot_type === "signal") {
          setSignalStrategy(data.name);
          router.push("/dashboard/botanalysis");
        } else {
          setAiStrategy(data.name);
          router.push("/dashboard/botai");
        }
        toast.success("Strategy installed successfully.");
      }
    } catch (error) {
      toast.error("Something went wrong, please try again later.");
      console.error("Error installing strategy:", error);
    }
  }

  return (
    <>
      <Toast />
      <div className="heading-box flex flex-col md:flex-row justify-between md:items-center items-start py-5">
        <div className="left flex flex-col md:flex-row justify-start items-start gap-5 md:w-4/5 w-full">
          <Image
            src={data.banner_url}
            alt={`${data.name} banner`}
            width={180}
            height={180}
            className="h-full w-full"
          />
          <Textbox titleClass="w-fit" title={data.name} description={data.description} />
        </div>
        <div className="right mt-4 md:mt-0">
          <button className="main-btn" onClick={InstallStrategy}>
            Install
          </button>
        </div>
      </div>
      <hr />
      <div className="news-list p-3">
        <h3 className="text-2xl font-medium py-3">What&apos;s new</h3>
        <ol className="list-decimal px-2">
          {data.whats_new && data.whats_new.length > 0 ? (
            data.whats_new.map((el: string, index: number) => (
              <li className="py-3" key={index}>
                {el}
              </li>
            ))
          ) : (
              <li className="py-3">No new updates.</li>
          )}
        </ol>
      </div>
    </>
  );
};

export default SingleStrategy;
