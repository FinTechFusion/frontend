import { SidebarLinkProps } from "@/utils/types"
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

const SidebarLink = ({ icon, content, path, weight }: SidebarLinkProps) => {
   const t = useTranslations("dashboard.sidebar");
   return (
      <Link className={`hover:bg-gray-300 p-3 rounded mb-2 mt-2 text-xl text-primary-600 flex justify-start items-center ${weight}`} href={`${path}`}>
         <span className="px-2 text-xl">{icon}</span>
         <p>{t(content)}</p>
      </Link>)
}

export default SidebarLink