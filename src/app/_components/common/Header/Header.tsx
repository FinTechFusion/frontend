"use client"
import React, { useState } from 'react'
import { IoCloseSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import Logo from '../Logo';
import { useAuth } from '@/context/AuthContext';
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export default function Header() {
   const { user } = useAuth();
   const [toggle, settoggle] = useState(false);
   const handleLinkClick = () => {
      settoggle(false);
   };
   const t = useTranslations('header'); 
   return (
      <>
         <header className='bg-secondary flex justify-between items-center md:px-12 px-3 py-2 shadow z-50 h-[90px]'>
            <Logo />
            <div className={`bg-primary-600 md:bg-secondary lg:flex lg:items-center lg:justify-center
               lg:static fixed right-0 top-[90px] z-10 bottom-0 mt-2 transform transition-transform ease-in-out duration-300  min-h-screen lg:min-h-0 bg-teal-700 w-52 lg:w-auto lg:bg-transparent ${toggle ? 'translate-x-0' : 'translate-x-full lg:translate-x-0 '}`}>
               <ul className={`w-full lg:w-auto flex flex-col lg:flex-row items-center justify-center  lg:text-black h-full gap-5`}>
                  <Link href='/' className={`mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary`} onClick={handleLinkClick} >{t("home")}</Link>
                  <Link href='/site/botsignal' className='mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary' onClick={handleLinkClick}>{t("botsignal")}</Link>
                  <Link href='/site/botai' className='mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary' onClick={handleLinkClick}>{t("botai")}</Link>
                  <Link href='/site/plans' className='mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary' onClick={handleLinkClick}>{t("plans")}</Link>
                  <Link href='/site/about' className='mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary' onClick={handleLinkClick}>{t("aboutus")}</Link>
                  <Link href='/site/faq' className='mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark hover:text-primary-700 text-secondary' onClick={handleLinkClick}>{t("faq")}</Link>
               </ul>
            </div>
            <div className='auth flex justify-center items-center gap-5'>
               {user ? <Link href='/dashboard' className="rounded-md bg-primary-600 hover:bg-primary-700 p-2 text-lg font-medium text-secondary shadow">{t("dashboard")}</Link> :
                  <>
                     <Link href='/login' className='rounded-md bg-primary-600 hover:bg-primary-700 px-4 py-2 font-medium text-secondary shadow'>{t("login")}</Link>
                     <Link href='/register' className='hidden md:block rounded-md bg-gray-100 px-4 py-2 font-medium text-primary-600 hover:bg-primary-600 hover:text-secondary transform transition-all ease-in-out'>{t("freetrial")}</Link>
                  </>
               }
               <div className="block lg:hidden cursor-pointer text-4xl" onClick={() => settoggle(prev => (!prev))}>
                  {toggle ? <IoCloseSharp /> : <FaBars />}
               </div>
            </div>
         </header>
      </>
   )
}
