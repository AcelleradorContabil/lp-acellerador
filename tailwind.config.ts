import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        mainOrange: "#e76714",
        mainOrangeOpacity: "#e7671495",
        blueAcellera: "#033f6f",
        opacityblack: "#00000070",
      },
      keyframes: {
        "fade-in-top": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-scale": {
          "0%": {
            opacity: "0",
            transform: "scale(0.95) translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1) translateY(0)",
          },
        },
        fade: {
          to: {
            scale: "1",
            opacity: "1",
          },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        "fade-in-top": "fade-in-top 2s ease-out forwards",
        fade: "fade linear forwards",
        "fade-scale": "fade-scale 0.4s ease-out forwards",
        blink: "blink 1s step-end infinite",
      },
    },
  },
  plugins: [],
};
export default config;
