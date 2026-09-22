import type { Metadata } from "next";
import { SiteHeader } from "./site-header";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lubis Mental Awareness | Education, Advocacy, and Community Support",
  description: "Lubis Mental Awareness provides education, advocacy, resources, and community programs that support healthier conversations around mental wellbeing."
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
