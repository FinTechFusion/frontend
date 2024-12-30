import DashboardContent from "@/app/_components/common/dashboard/DashboardContent/DashboardContent";
import { AssetDataProvider } from "@/context/AssetsContext";

export default function page() {
   return (
       <AssetDataProvider>
          <DashboardContent />
       </AssetDataProvider>
    );
}