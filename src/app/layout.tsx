import type { Metadata } from "next";
import { Inter, Inter_Tight } from "next/font/google";

import { siteConfig } from "@/config/site";
import "@/styles/globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const interTight = Inter_Tight({
  variable: "--font-inter-tight",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  applicationName: siteConfig.name,
  title: {
    default: siteConfig.defaultTitle,
    template: siteConfig.titleTemplate,
  },
  description: siteConfig.description,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang={siteConfig.locale}
      className={`${inter.variable} ${interTight.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
