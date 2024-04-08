"use client";
import { NextUIProvider } from "@nextui-org/react";
import { Inter } from "next/font/google";
import "@mantine/core/styles.css";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import StoreProvider from "../lib/store/StoreProvider";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <body className={inter.className}>
        <StoreProvider>
          <MantineProvider>
            <NextUIProvider>
              <div className="">
                <div className="sticky top-0 z-50">
                  <Navbar />
                </div>
                <div className="relative">{children}</div>
              </div>
            </NextUIProvider>
          </MantineProvider>
        </StoreProvider>
      </body>
    </html>
  );
}
