/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

// import ManagementPageHeader from "@/components/shared/ManagementPageHeader";
import ManagementPageHeader from "@/components/shared/management-page-header";
import { TMeta } from "@/types/common.interface";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import BookScheduleDialog from "./BookScheduleDialog";

interface MySchedulesHeaderProps {
  availableSchedules: any[];
  meta: TMeta;
}

const MySchedulesHeader = ({
  availableSchedules,
  meta,
}: MySchedulesHeaderProps) => {
  const router = useRouter();
  const [, startTransition] = useTransition();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleSuccess = () => {
    setIsDialogOpen(false);
    startTransition(() => {
      router.refresh();
    });
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <BookScheduleDialog
        open={isDialogOpen}
        onClose={handleCloseDialog}
        onSuccess={handleSuccess}
        initialSchedules={availableSchedules} // renamed for clarity
        initialMeta={meta} // pass the meta you already have
      />

      <ManagementPageHeader
        title="My Schedules"
        description="Manage your availability and time slots for patient consultations"
        action={{
          label: "Book Schedule",
          icon: Plus,
          onClick: handleOpenDialog,
        }}
      />
    </>
  );
};

export default MySchedulesHeader;
