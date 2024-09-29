import type { Config } from "tailwindcss";
import colors from "tailwindcss/colors";
const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    darkMode: false,
    colors: {
      primary: colors.teal,
      secondary: colors.white,
      dark: colors.black,
      gray: colors.gray,
      blue: colors.blue,
      pink: colors.pink,
      red: colors.red,
    },
    variants: {
      extend: {
        textColor: ['group-hover'],
        backgroundImage: {
          'notfound-pattern': "url('/assets/images/pattern-lines.png')",
          'contact-backgroud': "url('/assets/images/contact-backgroud.jpeg')"
        },
        zIndex: {
          '100': '100',
        }
      },

    },

  },
  plugins: [],
};
export default config;
