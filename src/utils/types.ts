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
   email?: string;
   id?: string; // Assuming UUID is a string
   plan?: string;
   cycles_count_remaining?: number;
   strategy?: string;
   email_preferences?: string[];
   allowed_scopes?: string[];
   is_demo?: boolean;
   is_verified?: boolean;
   is_active?: boolean;
   is_binance_active?: boolean;
}

export interface Tokens {
   access_token: string;
   refresh_token: string;
}  

export interface AuthContextType {
   user: User | null;
   // login: (tokens: Tokens, userData: User) => void;
   login: (access_token: string, refresh_token: string) => void;
   logout: () => void;
   isLoading: boolean;
   error: string | null;
   // useRefreshToken: <T>(fn: (...args: any[]) => Promise<T>) => (...args: any[]) => Promise<T>;
}
