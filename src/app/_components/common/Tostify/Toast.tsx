import { useLocale } from 'next-intl';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Toast() {
   const locale = useLocale();
   return (
      <ToastContainer
         position={locale === "ar" ? "top-right" : "top-left"}
         autoClose={4000}
         hideProgressBar={false}
         newestOnTop={false}
         closeOnClick
         draggable
         theme="light"
      />
   )
}
