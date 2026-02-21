import PublicFooter from "@/components/shared/public-footer";
import PublicNavbar from "@/components/shared/public-navbar";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: 'E Doc - Healthcare Platform',
  description: 'Comprehensive healthcare solutions including consultations, health plans, medicine, diagnostics, and more',
  generator: 'v0.app',
  keywords: ['healthcare', 'consultation', 'health plans', 'diagnostics', 'medicine', 'wellness'],
  authors: [{ name: 'E Doc' }],
  openGraph: {
    title: 'E Doc - Healthcare Platform',
    description: 'Your trusted healthcare companion',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}
export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <body suppressHydrationWarning>
          <PublicNavbar />
          {children}
          <PublicFooter />
        </body>
      </html>
    </>
  );
}
