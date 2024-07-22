import type { Metadata } from "next";
import { Red_Hat_Mono } from "next/font/google";
import "./globals.css";
import React from "react";
import { GoogleAnalytics } from "@/app/components/GoogleAnalytics";

const inter = Red_Hat_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Keshav Rathinavel",
  description: "About Keshav Rathinavel, full-stack developer and solution consultant. Also, cooks and rides bikes.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <GoogleAnalytics />
      <body className={inter.className}>{children}</body>
    </html>
  );
}
