"use client"
import Link from 'next/link'
import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import Image from 'next/image';

export default function Header() {
   const [toggle, settoggle] = useState(false);
   const [isHovered, setIsHovered] = useState(false);
   return (
      <>
         <header className='bg-secondary flex justify-between items-center md:px-12 px-3 py-2 shadow fixed left-0 right-0 top-0 z-50'>
            <div className="logo">
               <Link href='/' className='flex justify-center items-center text-xl font-bold tracking-widest'>
                  <Image
                     src='assets/images/logo.svg'
                     alt='Wesbsite Logo'
                     width='230'
                     height='120'
                  />
               </Link>
            </div>
            <div className={`lg:flex lg:items-center lg:justify-center fixed lg:static right-0 z-10 bottom-0 transform transition-transform ease-in-out duration-300 top-20 min-h-screen lg:min-h-0 bg-teal-700 w-52 lg:w-auto lg:bg-transparent ${toggle ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}`}>
               <ul className={`w-full lg:w-auto flex flex-col lg:flex-row items-center justify-center text-secondary lg:text-black h-full lg:h-auto space-y-12 lg:space-y-0 lg:space-x-5`}>
                  <Link className={`home-link mb-6 lg:mb-0 text-center text-xl capitalize ${isHovered ? 'text-black' : 'text-teal-700'}`} href='/'>home</Link>
                  {['bot-analysis', 'bot-ai', 'plans', 'about-us', 'faq'].map((link, index) => (
                     <Link
                        key={index}
                        className='mb-6 lg:mb-0 text-center text-xl capitalize hover:text-teal-700'
                        href={`/${link}`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                     >
                        {link.replace('-', ' ')}
                     </Link>
                  ))}
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
