export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <p>layout Admin</p>
        <body suppressHydrationWarning>{children}</body>
      </html>
    </>
  );
}
