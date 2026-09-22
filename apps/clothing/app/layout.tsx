import type { Metadata } from "next";
import { Providers } from "./providers";
import { SiteHeader } from "./site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lubis Clothing | Curated Fashion, Essentials, and Custom Requests",
  description: "Shop curated clothing essentials, occasion pieces, footwear, accessories, and custom fashion requests from Lubis Clothing."
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <Providers>
          <SiteHeader />
          {children}
        </Providers>
      </body>
    </html>
  );
}
