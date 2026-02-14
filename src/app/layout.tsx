import LoginSuccessToast from "@/components/shared/login-success-toast";
import LogoutSuccessToast from "@/components/shared/logout-success-toast";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Suspense } from "react";
import { Toaster } from "sonner";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-DOC",
  description: "E-DOCTOR SYSTEM",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <Toaster richColors position="top-center" />
        {children}
        <Suspense fallback={null}>
          {" "}
          <LoginSuccessToast />
          <LogoutSuccessToast />
        </Suspense>
      </body>
    </html>
  );
}
