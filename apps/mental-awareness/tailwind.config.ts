import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#14213d",
        brand: "#1f7a8c",
        accent: "#e5172f",
        sage: "#eef6f0"
      }
    }
  },
  plugins: []
};

export default config;
