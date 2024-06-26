import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConvexClerkProvider from "./providers/ConvexClerkProcider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PodAiCast",
  description: "Generate your podcasts with PodAiCast",
  icons:{
    icon: '/icons/logo.svg',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        <ConvexClerkProvider>
        {children}
        </ConvexClerkProvider>
        </body>
    </html>
  );
}
