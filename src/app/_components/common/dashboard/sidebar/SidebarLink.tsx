import { SidebarLinkProps } from "@/utils/types"
import { Link } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';
import { useSidebar } from "@/context/SidebarContext";

const SidebarLink = ({ icon, content, path, weight }: SidebarLinkProps) => {
   const t = useTranslations("dashboard.sidebar");
   const { toggleVisibility } = useSidebar();
   return (
      <Link onClick={toggleVisibility} className={`hover:bg-gray-300 py-3 px-1 rounded my-2 text-xl text-primary-600 flex justify-start items-center gap-3 ${weight}`} href={`${path}`}>
         <span className="text-xl">{icon}</span>
         <p>{t(content)}</p>
      </Link>)
}

export default SidebarLink;