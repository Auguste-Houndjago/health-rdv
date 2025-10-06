import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/contexts/react-query-provider";
import { Toaster } from "sonner";
import Header from "@/components/layout/Header";

import { UserProvider } from "@/providers/UserProvider";
import { ThemeProvider } from "@/providers/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MedEasy",
  description: "Prenez facilement vos rendez-vous",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReactQueryProvider>
          <UserProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
            enableColorScheme
          >
          {children}
          <Toaster />
          
          </ThemeProvider>
          </UserProvider>
        </ReactQueryProvider>
      </body>
    </html>
  );
}
