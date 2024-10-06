import { Suspense } from "react";
import Loading from "@/app/_components/common/loading/Loading";
import ConnectStatus from "@/app/_components/common/binance/ConnectStatus/ConnectStatus";

export default function page() {
   return (
      <Suspense fallback={<Loading />}>
         <ConnectStatus />
      </Suspense>)
}
