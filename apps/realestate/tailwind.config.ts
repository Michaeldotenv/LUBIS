import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#10243d",
        brand: "#0b47a1",
        accent: "#d31d2b",
        clay: "#8f6f4e"
      }
    }
  },
  plugins: []
};

export default config;
