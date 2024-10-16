import { useTranslations } from "next-intl";

type buttonContent = {
   content: string
   btnProps?: string
}
function MainBtn({ content, btnProps="",...rest }: buttonContent) {
   const t = useTranslations();
   return (
      <button className={`bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-secondary capitalize text-xl cursor-pointer tracking-wide ${btnProps}`} {...rest}>{t(content)}</button>
   );
}

function SpinBtn({ content, btnProps }: buttonContent) {
   const t = useTranslations();
   return (
      <button disabled={true} className={`bg-primary-600 hover:bg-primary-700 rounded-md px-4 py-2 text-secondary capitalize text-xl cursor-pointer tracking-wide flex justify-center items-center ${btnProps} cursor-none`}>
         {/* <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
         </svg> */}
         {t(content)}
      </button>
   );
}

export { MainBtn, SpinBtn };