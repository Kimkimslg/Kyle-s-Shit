import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
// Removed unused Header and Footer imports

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

import Sidebar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
  title: "USER NAME | Analysis Archive",
  description: "A personal portfolio for structured industry and company analysis.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={inter.variable}>
      <body className="min-h-screen bg-[#fafafa] flex antialiased">
        <Sidebar />
        <main className="flex-grow lg:pl-[17.5rem] flex flex-col min-h-screen">
          <div className="flex-grow">
            {children}
          </div>
          {/* Footer can be kept or simplified within the main content or sidebar */}
        </main>
      </body>
    </html>
  );
}
