import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#111827",
        brand: "#0b47a1",
        accent: "#e5172f",
        blush: "#fff5f5"
      }
    }
  },
  plugins: []
};

export default config;
