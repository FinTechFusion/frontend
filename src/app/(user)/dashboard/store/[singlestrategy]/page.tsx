"use client";

import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import Textbox from "@/app/_components/common/Text/Textbox";
import { API_BASE_URL } from "@/utils/api";
import Image from "next/image";
import Loading from "@/app/_components/common/loading/Loading";
import useFetch from "@/hooks/useFetch";
import { toast } from "react-toastify";
import Toast from "@/app/_components/common/Tostify/Toast";
import { useAuth } from "@/context/AuthContext";

interface SingleStrategyItemProps {
  params: {
    singlestrategy: string;
  };
}

const SingleStrategy = ({ params }: SingleStrategyItemProps) => {
  const {user} = useAuth();
  const { data, loading, error } = useFetch(`${API_BASE_URL}/binance/strategies/${params.singlestrategy}`, {
    method: "GET",
    next: { revalidate: 300 },
  });

  if (loading) {
    return <Loading />;
  }

  if (error) {
    toast.error("Error fetching strategy, please try again later.");
    return null;
  }


  async function InstallStrategy() {
    try {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        toast.error("You must be logged in to install a strategy.");
        return;
      }
      if (user?.strategy){
        return toast.info("You can only install one strategy")
      }
      const response = await fetch(`${API_BASE_URL}/users/me/strategy/${data.id}/install`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to install the strategy. Please try again.");
      }

      const responseData = await response.json();
      if (responseData.success) {
        toast.success("strategy installed successfully")
      }
    } catch (error) {
      toast.error("An error occurred while installing the strategy.");
    }
  }

  return (
    <>
      <Toast />
      <div className="heading-box flex flex-col md:flex-row justify-between md:items-center items-start py-5">
        <div className="left flex flex-col md:flex-row justify-start items-start gap-5 md:w-4/5 w-full">
          <Image
            src={data?.banner_url}
            alt={`${data?.name} banner`}
            width={180}
            height={180}
            className="h-fit"
          />
          <Textbox titleClass="w-fit" title={data?.name} description={data?.description} />
        </div>
        <div className="right mt-4 md:mt-0">
          <button onClick={InstallStrategy}>
            <MainBtn content="Install" btnWidth="w-fit" />
          </button>
        </div>
      </div>
      <hr />
      <div className="news-list py-3">
        <h3 className="text-2xl font-medium py-3">What&apos;s new</h3>
        <ol className="list-decimal px-2">
          {data.whats_new?.map((el: string, index: number) => (
            <li className="py-3" key={index}>
              {el}
            </li>
          ))}
        </ol>
      </div>
    </>
  );
};

export default SingleStrategy;
