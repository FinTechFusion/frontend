import { ReactElement } from "react"

export interface TextBox {
   title: string;
   description: string;
   mainClass?: string;
   titleClass?: string;
   descriptionClass?: string;
}
export interface MainCardProps {
   icon: any,
   title: string;
   description: string;
}
export interface Heading {
   title: string;
}
export interface FeatureCard extends TextBox {
   buttonContent?: string;
   icon?: any;
}
export interface TextData {
   content: string
}
export interface PlatformFeature {
   icon: React.ElementType;
   titleKey: string;
   descriptionKey: string;
}
// utils/types.ts

export interface User {
   first_name: string;
   last_name: string;
   phone_number: string;
   email: string;
   id: string; 
   signal_strategy: string | null;
   ai_strategy: string | null;
   signal_cycles:number;
   ai_cycles:number;
   email_preferences?: string[];
   allowed_scopes?: string[];
   is_demo: boolean;
   is_verified: boolean;
   is_active: boolean;
   is_binance: boolean;
   is_subscribed:boolean;
   data?:Object
}

export interface Tokens {
   access_token: string;
   refresh_token: string;
}  

export interface AuthContextType {
   user: User | null;
   login: (access_token: string, refresh_token: string) => void;
   logout: () => void;
   isLoading: boolean;
   error: string | null;
   saveUserData:(access_token: string, refresh_token: string) =>any
   fetchUserData: (access_token: string) => any
}
export interface PlanType {
   id: string,
   name: string,
   price: number,
   description: string,
   frequency: string,
   features: string[],
}
export type SidebarLinkProps = {
   icon: ReactElement,
   content: string,
   weight: string,
   path: string
}

export type Strategy = {
   id: string;
   name: string;
   type: string;
   bot_type: string;
   description: string;
   whats_new: string[];
   banner_url: string;
   start_range: string;
   end_range: string;
};
export interface Order {
   id: string;
   symbol: string;
   quantity: number;
   profit_threshold: number;
   trailing_stop_loss: number;
   cycles: number;
   strategy: string;
   status: string;
   created_at: string;
   updated_at: string;
}
export interface Data {
   symbol: string;
   quantity: number;
   profit_threshold: number;
   trailing_stop_loss: number;
   cycles_count: number;
   strategy: string;
   status: string;
   created_at: string;
}

export interface AssetData {
   symbol: string;
   quantity: number;
   price_change_percent: number;
   last_price: number;
}
export interface assetsProps {
   data: {
      symbol: string;
      quantity: number;
      priceChangePercent: number;
      lastPrice: number;
      total: number;
   }[];
}
export interface UserSubscriptionProps {
   id: string;
   plan: string;
   status: string;
   created_at: string;
   expire_at: string;
   price: number;
}

export interface Log {
   timestamp: string;
   message: string;
}

export interface BotLogsProps {
   orderId: string;
}
export interface AssetInfo {
   symbol: string;
   last_price: number;
   price_change_percent: number;
   quantity: number;
}

export interface AssetInfoProps {
   symbol: string;
   price: number;
   changePercent: number;
}

export interface AccountTypeProps {
   isDemo: boolean;
   balance?: string;
}

export interface UserProfileProps {
   signalCycles: number;
   aiCycles: number;
}
export interface ApiError {
   success: boolean;
   detail: string;
   status_code: number;
}

export interface AssetDataContextType {
   assetData: any[];
   counts: number;
   assetLoading: boolean;
   assetError: string | null;
   errorMessage: ApiError | null;
   fetchAssets: () => Promise<void>;
   currentPage: number;
   handlePageClick: (event: any) => void;
}