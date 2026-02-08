import Layout from "@/components/template-dashboard/layout";
import type { Metadata } from "next";
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
      <body className={`  antialiased`} suppressHydrationWarning>
        <Layout>{children}</Layout>
      </body>
    </html>
  );
}
