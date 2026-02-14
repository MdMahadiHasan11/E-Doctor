import DashboardNavbar from "@/components/modules/Dashboard/DashboardNavbar";
import DashboardSidebar from "@/components/modules/Dashboard/DashboardSidebar";
import React, { Suspense } from "react";

const CommonDashboardLayout = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Suspense fallback={null}>
        <DashboardSidebar />
      </Suspense>
      <div className="flex flex-1 flex-col overflow-hidden">
        <Suspense fallback={null}>
          <DashboardNavbar />
        </Suspense>
        <main className="flex-1 overflow-y-auto bg-muted/10 p-4 md:p-6">
          <div className="max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  );
};

export default CommonDashboardLayout;
