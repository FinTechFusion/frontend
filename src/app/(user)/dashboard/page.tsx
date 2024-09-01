import DashboardContent from "@/app/_components/common/dashboad/DashboardContent/DashboardContent";
import { AssetDataProvider } from "@/context/AssetsContext";

export default function Page() {
   return (
       <AssetDataProvider>
          <DashboardContent />
       </AssetDataProvider>
    );
}