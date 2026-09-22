import type { Metadata } from "next";
import { SiteHeader } from "./site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lubis | Real Estate, Mental Awareness, and Clothing Ventures",
  description: "Lubis develops trusted ventures in real estate, mental awareness, and clothing, serving customers and communities with quality, care, and long-term value."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <SiteHeader />
        {children}
      </body>
    </html>
  );
}
