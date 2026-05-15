import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        bg: {
          DEFAULT: "#070707",
          soft: "#0f0f0f",
          card: "#141414",
        },
        gold: {
          DEFAULT: "#f5d342",
          bright: "#ffd84a",
          dim: "#8b7320",
          dark: "#3a3015",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        gold: "0 0 40px -10px rgba(245, 211, 66, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
