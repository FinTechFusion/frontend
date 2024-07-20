import { MainBtn } from "@/components/common/Buttons/MainBtn";
import Link from "next/link";

export function Error() {
   return (
      <div className="bg-[url('/assets/images/pattern-lines.png')] bg-center bg-cover">
         <div className="flex flex-col justify-center items-center text-center min-h-[80vh]">
            <h1 className="text-6xl font-extrabold">404</h1>
            <p className="mt-8 mb-10 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
               Don&apos;t worry, our team is already on it.Please try refreshing
               the page or come back later.
            </p>
            <Link href="/" className="text-center">
               <MainBtn content="back home" btnWidth="w-fit" />
            </Link>
         </div>
      </div>
   );
}

export default Error;