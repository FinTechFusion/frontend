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
         {t(content)}
      </button>
   );
}

export { MainBtn, SpinBtn };