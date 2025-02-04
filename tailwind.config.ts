import type { Config } from "tailwindcss";
const plugin = require("tailwindcss/plugin");

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans)"],
        "shippori-antique-b1": ["var(--font-shippori-antique-b1)"],
      },
      colors: {
        gray: {
          300: "#98a6b5",
          500: "#3b4043",
          800: "#41494e",
          900: "#3c3c3c",
        },
        primary: { DEFAULT: "#00E2FF", light: "#00E2FF", dark: "#00E2FF" },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "bubble-gradient":
          "radial-gradient(50% 50% at 50% 50%, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.30) 50%, rgba(255, 255, 255, 0.20) 100%)",
        "gradient-main": "linear-gradient(to bottom right, #06F9C2, #01E7EF)",
        "gradient-hero": "linear-gradient(to bottom, #01E7EF,#06F9C2 )",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-20px)" },
        },
        scale: {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.1)" },
        },
        fadeUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(-100vh)",
          },
        },
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "scale-slow": "scale 6s ease-in-out infinite",
        "fade-up": "fadeUp 8s ease-out forwards",
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
    require("@tailwindcss/typography"),
    // NOTE: hoverを非活性な要素やタッチ操作に適用させない
    // 参照: https://zenn.dev/kagan/articles/tailwind-css-custom-hover
    plugin(function ({ addVariant }: { addVariant: any }) {
      addVariant(
        "hover",
        "@media(hover:hover){ &:where(:any-link, :enabled, summary):hover }",
      );
    }),
  ],
};
export default config;
