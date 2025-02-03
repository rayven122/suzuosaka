import type { Config } from "tailwindcss";
const plugin = require('tailwindcss/plugin')

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'gray': {
          300: "#98a6b5",
          500: "#3b4043",
          800: "#41494e",
          900: "#3c3c3c",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      typography: {
        DEFAULT: {
          css: {
            "--tw-prose-body": "text-gray-800",
            "--tw-prose-headings": "text-gray-800",
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    // NOTE: hoverを非活性な要素やタッチ操作に適用させない
    // 参照: https://zenn.dev/kagan/articles/tailwind-css-custom-hover
    plugin(function ({ addVariant }: { addVariant: any }) {
      addVariant(
        "hover",
        "@media(hover:hover){ &:where(:any-link, :enabled, summary):hover }"
      );
    }),
  ],
};
export default config;
