import { Link } from '@/i18n/navigation';
import { FaRegCopyright } from "react-icons/fa";
import {useTranslations } from 'next-intl';

export default function Footer() {
   const t = useTranslations('footer');
   return (
      <div className="bg-dark md:px-0 px-3  py-6 ">
         <div className="border-b-2 border-gray-600 my-6">
            <div className="container mx-auto pb-6">
               <div className="grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5">
                  <div className="col-items-1 text-primary-50">
                     <h3 className="capitalize text-2xl font-medium">{t('trading.title')}</h3>
                     <ul className="py-3">
                        <li className="py-3">
                           <Link href="/site/botai" className="capitalize text-lg hover:text-primary-500">{t('trading.botAi')}</Link>
                        </li>
                        <li className="py-3">
                           <Link href="/site/botsignal" className="capitalize text-lg hover:text-primary-500">{t('trading.botSignal')}</Link>
                        </li>
                        <li className="py-3">
                           <Link href="/site/plans" className="capitalize text-lg hover:text-primary-500">{t('trading.plans')}</Link>
                        </li>
                     </ul>
                  </div>
                  <div className="col-items-1 text-primary-50">
                     <h3 className="capitalize text-2xl font-medium">{t('information.title')}</h3>
                     <ul className="py-3">
                        <li className="py-3">
                           <Link href="/site/faq" className="capitalize text-lg hover:text-primary-500">{t('information.faq')}</Link>
                        </li>
                        <li className="py-3">
                           <span className="capitalize text-lg hover:text-primary-500">{t('information.blog')}</span>
                        </li>
                        <li className="py-3">
                           <Link href="/site/support" className="capitalize hover:text-primary-500">{t('information.support')}</Link>
                        </li>
                     </ul>
                  </div>
                  <div className="col-items-1 text-primary-50">
                     <h3 className="capitalize text-2xl font-medium">{t('company.title')}</h3>
                     <ul className="py-3">
                        <li className="py-3">
                           <Link href="/site/about" className="capitalize text-lg hover:text-primary-500">{t('company.about')}</Link>
                        </li>
                        <li className="py-3">
                           <Link href="/site/contact" className="capitalize text-lg hover:text-primary-500">{t('company.contact')}</Link>
                        </li>
                        <li className="py-3">
                           <Link href='/site/faq' className='capitalize text-lg hover:text-primary-500'>{t("company.faq")}</Link>
                        </li>
                     </ul>
                  </div>
                  <div className="subscripe-box rounded-md py-6 px-8 bg-[#3d3b3b]">
                     <h2 className="text-secondary text-2xl font-medium">{t('subscribe.title')}</h2>
                     <form action="">
                        <div className="subscripe-input relative my-4 w-full h-fit">
                           <input
                              type="email"
                              id="UserEmail"
                              placeholder={t('subscribe.emailPlaceholder')}
                              className="rounded-md w-full border-none bg-transparent outline-none focus:border-none p-2"
                              required={true}
                           />
                           {/* <button
                              className={`absolute top-0 bottom-0 ${locale === 'ar' ? "left-0" : "right-0"} flex items-center justify-center`}
                              type="submit"
                           >
                              {locale === "en" ? (
                                 <FaArrowRight className="bg-primary-700 hover:bg-primary-800 text-secondary text-xl h-full w-10 cursor-pointer rounded-br-md" />
                              ) : (
                                    <FaArrowLeft className="bg-primary-700 hover:bg-primary-800 text-secondary text-xl h-full w-10 cursor-pointer rounded-tb-md" />
                              )}
                           </button> */}

                        </div>
                     </form>
                     <p className="text-base text-primary-50">{t('subscribe.description')}</p>
                  </div>
               </div>
            </div>
         </div>
         <div className="container mx-auto">
            <div className="flex md:flex-row flex-col md:justify-between justify-center items-center md:gap-0 gap-6">
               <div className="text-secondary flex items-center gap-1">
                  <FaRegCopyright /> {t('copyright')} {new Date().getFullYear()} 
               </div>
               <ul className="flex text-primary-50 gap-5">
                  <li>
                     <Link href="/site/terms" className="capitalize text-lg hover:text-primary-500">{t('legal.terms')}</Link>
                  </li>
                  <li>
                     <Link href="/site/privacy" className="capitalize text-lg hover:text-primary-500">{t('legal.privacy')}</Link>
                  </li>
                  <li>
                     <Link href="/site/cookies" className="capitalize text-lg hover:text-primary-500">{t('legal.cookies')}</Link>
                  </li>
                  <li>
                     <Link href="/site/refund-policy" className="capitalize text-lg hover:text-primary-500">{t('legal.refund')}</Link>
                  </li>
               </ul>
            </div>
         </div>
      </div>
   );
}
