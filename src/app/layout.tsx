import type { Metadata } from "next";
import "./globals.css";
import { ClientLayout } from "@/components/ClientLayout";

export const metadata: Metadata = {
  title: {
    template: "%s | Rust Tactical",
    default: "Rust Tactical | 腐蚀战术指挥中心",
  },
  description: "全方位 Rust 生存战术辅助平台。提供实时社区服官服查询、抄家炸药计算器、蓝图物资模拟、以及顶级战术资源规划。",
  keywords: ["Rust", "腐蚀", "抄家计算器", "服务器查询", "Rust Tactical", "游戏辅助"],
  openGraph: {
    title: "Rust Tactical | 腐蚀战术指挥中心",
    description: "最硬核的 Rust 全栈生存辅助系统",
    type: "website",
  },
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
