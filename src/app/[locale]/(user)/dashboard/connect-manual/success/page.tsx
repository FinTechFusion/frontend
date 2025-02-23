"use client"
import { FaCheck } from "react-icons/fa6";
import Textbox from '@/app/_components/common/Text/Textbox';
import { Link } from '@/i18n/navigation';
import { MainBtn } from '@/app/_components/common/Buttons/MainBtn';

export default function page() {
  return (
    <div className="flex flex-col justify-start items-center text-center min-h-screen pt-16">
    <>
       <FaCheck className="p-3 bg-primary-600 text-secondary text-6xl rounded-full my-5" />
       <Textbox title="binance.accountConnected" description="binance.successConnect" descriptionClass="md:w-1/2 w-full mx-auto text-lg" />
       <Link href='/dashboard'>
          <MainBtn content="binance.goToDashboard" btnProps="w-fit" />
       </Link>
    </> 
</div>  )
}
