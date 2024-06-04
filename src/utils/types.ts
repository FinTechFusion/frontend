export interface TextBox {
   title: string;
   description: string;
}
export interface Heading {
   title: string,
}
export interface FeatureCard extends TextBox {
   buttonContent: string
}