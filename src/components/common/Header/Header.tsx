"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import Logo from '../Logo';

export default function Header() {
   const [toggle, settoggle] = useState(false);
   return (
      <>
         <header className='bg-secondary flex justify-between items-center md:px-12 px-3 py-2 shadow z-50'>
            <Logo />
            <div className={`lg:flex lg:items-center lg:justify-center fixed lg:static right-0 z-10 bottom-0 transform transition-transform ease-in-out duration-300 top-20 min-h-screen lg:min-h-0 bg-teal-700 w-52 lg:w-auto lg:bg-transparent ${toggle ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
               <ul className={`w-full lg:w-auto flex flex-col lg:flex-row items-center justify-center text-secondary lg:text-black h-full lg:h-auto space-y-12 lg:space-y-0 lg:space-x-5`}>
                  <Link href='/' className='mb-6 lg:mb-0 text-center text-xl capitalize text-dark hover:text-primary-700'>home</Link>
                  <Link href='/botanalysis' className='mb-6 lg:mb-0 text-center text-xl capitalize text-dark hover:text-primary-700'>bot analysis</Link>
                  <Link href='/botai' className='mb-6 lg:mb-0 text-center text-xl capitalize text-dark hover:text-primary-700'>bot ai</Link>
                  <Link href='/plans' className='mb-6 lg:mb-0 text-center text-xl capitalize text-dark hover:text-primary-700'>plans</Link>
                  <Link href='/about' className='mb-6 lg:mb-0 text-center text-xl capitalize text-dark hover:text-primary-700'>about us</Link>
                  <Link href='/faq' className='mb-6 lg:mb-0 text-center text-xl capitalize text-dark hover:text-primary-700'>FAQ</Link>
               </ul>
            </div>
            <div className='auth flex justify-center items-center gap-5'>
               <Link href='/login' className='rounded-md bg-primary-600 hover:bg-primary-700 px-4 py-2 font-medium text-secondary shadow'>Login</Link>
               <Link href='/register' className='hidden md:block rounded-md bg-gray-100 px-4 py-2 font-medium text-primary-600 hover:bg-primary-600 hover:text-secondary transform transition-all ease-in-out'>Register</Link>
               <div className="block md:hidden cursor-pointer text-4xl" onClick={() => settoggle(prev => (!prev))}>
                  {toggle ? <IoCloseSharp /> : <FaBars />}
               </div>
            </div>
         </header>
      </>
   )
}
