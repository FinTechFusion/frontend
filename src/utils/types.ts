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
