import Image from "next/image";
import Link from "next/link";

export default function Logo() {
   return (
      <div className="logo">
         <Link href='/' className='flex justify-center items-center text-xl font-bold tracking-widest'>
            <Image
               src='/assets/images/logo.webp'
               alt='Wesbsite Logo'
               width='230'
               height='120'
               className="w-auto h-auto"
            />
         </Link>
      </div>)
}
