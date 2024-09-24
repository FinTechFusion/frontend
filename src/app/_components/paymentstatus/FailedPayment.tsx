import Link from "next/link";
import { MdErrorOutline } from "react-icons/md";
import { MainBtn } from "../common/Buttons/MainBtn";

export default function FailedPayment() {
   return (
      <div className="md:bg-gradient-to-b md:from-red-50 md:to-red-100 flex items-center justify-center">
         <div className="successCard h-full py-12 rounded-md bg-secondary shadow-sm my-16 lg:1/3 md:w-2/3 w-96">
            <div className="card-heading text-center mx-auto pb-8">
               <div className="icon pb-3">
                  <MdErrorOutline className="w-20 h-20 text-red-600 mx-auto " />
               </div>
               <h3 className="text-3xl font-bold text-red-600">Payment Failed</h3>
            </div>
            <div className="px-4 ">
            <div className="card-body">
               <h5 className="text-xl font-medium pb-3 text-dark">Possible reasons:</h5>
               <ul className="pb-5 pl-5 list-disc">
                  <li className="text-lg py-2"> Insufficient funds</li>
                  <li className="text-lg py-2">Incorrect card information</li>
                  <li className="text-lg py-2">Expired card</li>
                  <li className="text-lg py-2">Transaction blocked by your bank</li>
               </ul>
            </div>
            <Link href='/site/plans'>
               <button className="main-btn w-full !bg-red-700 !my-3">Retry Payment</button>
            </Link>
            <Link href='/site/contact'>
               <button className="main-btn w-full !bg-transparent !border-1 !hover:bg-gray-100">Contact Support</button>
            </Link>
            </div>
         </div>
      </div>)
}
