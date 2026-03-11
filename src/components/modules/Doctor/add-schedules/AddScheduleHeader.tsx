"use client";

import ManagementPageHeader from "@/components/shared/management-page-header";
import { Calendar } from "lucide-react";
import { useRouter } from "next/navigation";

export default function SchedulesHeader() {
  const router = useRouter();

  return (
    <ManagementPageHeader
      title="Add Schedules"
      description="Select available time slots to book"
      action={{
        label: "View All Schedules",
        icon: Calendar,
        onClick: () => router.push("/dashboard/my-schedules"),
      }}
    />
  );
}