import PublicFooter from "@/components/shared/public-footer";
import PublicNavbar from "@/components/shared/public-navbar";
import { Suspense } from "react";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <PublicNavbar />
          {children}
          <PublicFooter />
        </Suspense>
        {children}
      </div>
    </>
  );
}
