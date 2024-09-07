export interface TextBox {
   title: string;
   description: string;
   mainClass?: string;
   titleClass?: string;
   descriptionClass?: string;
}
export interface Heading {
   title: string;
}
export interface FeatureCard extends TextBox {
   buttonContent: string;
   cardImg?: any;
   altText?: any
}
export interface TextData {
   content: string
}
export interface PlatformFeature {
   icon: React.ElementType;
   title: string;
   description: string;
}
// utils/types.ts

export interface User {
   first_name: string;
   last_name?: string;
   phone_number?: string;
   email: string;
   id: string; 
   plan?: string;
   signal_strategy: string | null;
   ai_strategy: string | null;
   signal_cycles:number;
   ai_cycles:number;
   email_preferences?: string[];
   allowed_scopes?: string[];
   is_demo?: boolean;
   is_verified?: boolean;
   is_active?: boolean;
   is_binance?: boolean;
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
   fetchUserData: (access_token: string) => any
}
export type Strategy = {
   id: string;
   name: string;
   type: string;
   bot_type: string;
   description: string;
   whats_new: string[];
   banner_url: string;
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
