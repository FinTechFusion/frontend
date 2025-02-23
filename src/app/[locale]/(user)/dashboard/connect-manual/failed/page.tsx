"use client"
import { MainBtn } from "@/app/_components/common/Buttons/MainBtn";
import Textbox from "@/app/_components/common/Text/Textbox";
import Link from "next/link";
import { MdError } from "react-icons/md";

export default function page() {
  return (
    <div className="flex flex-col justify-start items-center text-center min-h-screen pt-16">
      <MdError className="p-3 bg-red-600 text-secondary text-6xl rounded-full my-5 " />
      <Textbox
        titleClass="hover:text-red-700"
        title="binance.accountNotConnected"
        description="binance.failedConnect"
        descriptionClass="md:w-1/2 w-full mx-auto text-lg"
      />
      <Link href="/dashboard/connect-manual">
        <MainBtn
          content="binance.tryAgain"
          btnProps="w-fit bg-red-600 hover:bg-red-700"
        />
      </Link>
    </div>
  );
}
