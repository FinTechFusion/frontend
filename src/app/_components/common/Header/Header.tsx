"use client";
import React, { useState, useEffect } from 'react';
import { getTokenFromStorage } from "@/context/AuthContext";
import { IoCloseSharp } from "react-icons/io5";
import { FaBars } from "react-icons/fa6";
import Logo from '../Logo';
import { useAuth } from "@/context/AuthContext";
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import LanguageSelector from '@/app/_components/selector/LanguageSelector';

export default function Header() {
  const [accessToken] = useState(getTokenFromStorage("access_token"));
  const [toggle, setToggle] = useState(false);
  const t = useTranslations('header');

  useEffect(() => {
    const body = document.body;
    if (toggle) {
      body.style.position = 'fixed';
      body.style.width = '100%';
    } else {
      body.style.position = '';
    }

    const mainContent = document.querySelector('main');
    if (mainContent) {
      mainContent.style.opacity = toggle ? '0.5' : '1';
      mainContent.style.transition = 'opacity 0.3s ease-in-out';
    }

    return () => {
      body.style.position = '';
      if (mainContent) {
        mainContent.style.opacity = '1';
      }
    };
  }, [toggle]);

  const handleLinkClick = () => {
    setToggle(false);
  };

  const toggleMenu = () => {
    setToggle(prev => !prev);
  };

  return (
    <header className='bg-secondary flex justify-between items-center gap-10 md:px-12 px-3 py-2 shadow z-50 h-[90px]'>
      <Logo />
      <div className={`bg-primary-600 md:bg-secondary lg:flex lg:items-center lg:justify-center
        lg:static fixed right-0 top-[90px] z-10 bottom-0 transform transition-transform ease-in-out duration-300 min-h-screen lg:min-h-0 bg-teal-700 w-52 lg:w-auto lg:bg-transparent ${toggle ? 'translate-x-0 backdrop-blur-md' : 'translate-x-full lg:translate-x-0 '}`}>
        <ul className={`w-full lg:w-auto flex flex-col lg:flex-row items-center justify-center lg:text-black h-full gap-5`}>
          <li>
            <Link href='/' className={`mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary`} onClick={handleLinkClick}>{t("home")}</Link>
          </li>
          <li>
            <Link href='/site/botsignal' className='mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary' onClick={handleLinkClick}>{t("botsignal")}</Link>
          </li>
          <li>
            <Link href='/site/botai' className='mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary' onClick={handleLinkClick}>{t("botai")}</Link>
          </li>
          <li>
            <Link href='/site/plans' className='mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary' onClick={handleLinkClick}>{t("plans")}</Link>
          </li>
          <li>
            <Link href='/site/about' className='mb-4 lg:mb-0 text-center text-xl capitalize md:text-dark lg:hover:text-primary-700 text-secondary' onClick={handleLinkClick}>{t("aboutus")}</Link>
          </li>
          {accessToken ? <li>
            <Link href='/dashboard' className="rounded-md bg-primary-600 hover:bg-primary-700 p-2 text-lg font-medium text-secondary shadow md:hidden">{t("dashboard")}</Link>
          </li> : <li>
            <Link href='/login' className='rounded-md bg-primary-600 hover:bg-primary-700 px-4 py-2 font-medium text-secondary shadow md:hidden'>{t("login")}</Link></li>}
        </ul>
      </div>
      <div className='auth flex justify-center items-center gap-5'>
        {accessToken === null ? (
          <>
            <Link href='/login' className='rounded-md bg-primary-600 hover:bg-primary-700 px-4 py-2 font-medium text-secondary shadow md:flex hidden'>{t("login")}</Link>
            <Link href='/register' className='hidden md:flex rounded-md bg-gray-100 px-4 py-2 font-medium text-primary-600 hover:bg-primary-600 hover:text-secondary transform transition-all ease-in-out'>{t("freetrial")}</Link>
          </>
        ) : (
          <Link href='/dashboard' className="rounded-md bg-primary-600 hover:bg-primary-700 p-2 text-lg font-medium text-secondary shadow md:flex hidden">{t("dashboard")}</Link>
        )}
        <LanguageSelector />
        <div className="block lg:hidden cursor-pointer text-4xl" onClick={toggleMenu}>
          {toggle ? <IoCloseSharp /> : <FaBars />}
        </div>
      </div>
    </header>
  );
}
