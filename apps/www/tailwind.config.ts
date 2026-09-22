import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0b1730",
        brand: "#0b47a1",
        accent: "#e5172f",
        gold: "#c7a663"
      }
    }
  },
  plugins: []
};

export default config;
