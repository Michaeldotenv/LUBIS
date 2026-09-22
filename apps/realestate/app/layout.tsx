import type { Metadata } from "next";
import { SiteHeader } from "./site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lubis Real Estate | Property Sales, Leasing, and Investment Guidance",
  description: "Explore curated property listings, sales and leasing support, and real estate investment guidance from Lubis Real Estate."
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
