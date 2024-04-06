"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";

const inter = Inter({ subsets: ["latin"] });



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextUIProvider>
          <div className="">
            <div className="sticky top-0 z-50">
              <Navbar/>
            </div>
            <div className="relative">
              {children}
            </div>

          </div>
        </NextUIProvider>
      </body>
    </html>
  );
}
