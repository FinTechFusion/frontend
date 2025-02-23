import Link from "next/link";
import { MdError } from "react-icons/md";
import Textbox from "../../Text/Textbox";
import { MainBtn } from "../../Buttons/MainBtn";

export default function FailedConnect() {
  return (
    <div className="flex flex-col justify-start items-center text-center min-h-screen pt-16">
      <MdError className="p-3 bg-red-600 text-secondary text-6xl rounded-full my-5 " />
      <Textbox
        titleClass="hover:text-red-700"
        title="binance.accountNotConnecteds"
        description="binance.failedConnect"
        descriptionClass="md:w-1/2 w-full mx-auto text-lg"
      />
      <Link href="/site/exchange/connect">
        <MainBtn
          content="try again"
          btnProps="w-fit bg-red-600 hover:bg-red-700"
        />
      </Link>
    </div>
  );
}
