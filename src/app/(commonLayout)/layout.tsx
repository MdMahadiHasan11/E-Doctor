import PublicFooter from "@/components/shared/public-footer";
import PublicNavbar from "@/components/shared/public-navbar";

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
