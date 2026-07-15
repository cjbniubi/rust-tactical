import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: "Rust Tactical Calculator",
  description: "Rust Survival Command Center",
  icons: {
    icon: '/favicon.svg',
  },
};

import { Bebas_Neue, Roboto_Condensed } from 'next/font/google';

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas-neue',
  display: 'swap',
});

const robotoCondensed = Roboto_Condensed({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-roboto-condensed',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${robotoCondensed.variable}`}>
      <body className="min-h-full flex flex-col m-0 p-0 overflow-hidden bg-black text-[#ddd] font-sans">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
