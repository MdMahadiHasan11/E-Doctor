export default function DoctorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <p>layout Doctor</p>
        <body suppressHydrationWarning>{children}</body>
      </html>
    </>
  );
}
