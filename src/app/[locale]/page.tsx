import Header from '@/app/_components/common/Header/Header';
import Footer from '@/app/_components/common/Footer/Footer';
import WhatsAppIcon from '@/app/_components/common/contact/WhatsAppIcon';
import HomePage from '../_components/Home/Home';

export default function page() {
  return (
    <>
      <Header />
      <WhatsAppIcon />
      <HomePage />
      <Footer />
    </>
  );
}
